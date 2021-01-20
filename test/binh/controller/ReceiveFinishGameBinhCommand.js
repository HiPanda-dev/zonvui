var BaseCommand = require('BaseCommand');
var GameMessage = require('GameMessage');
var TableBinhVO = require('TableBinhVO');
var SeatVO = require('SeatVO');
var LogicBinh = require('LogicBinh');
var BaseGameCommand = require('BaseGameCommand');

export default class ReceiveFinishGameBinhCommand extends BaseGameCommand {
    execute(notification) {
        BaseGameCommand.prototype.execute.call(this, notification);
        var params = notification.getBody();
        var data = params.data;

        var tableVO = this.gameProxy.getTable();
        if (!tableVO) return this.showWarning(BaseGameCommand.WARNING.THE_TABLE_DOES_NOT_EXIST);
        if (!tableVO.isPlaying) return this.showWarning(BaseGameCommand.WARNING.TABLE_DOES_NOT_PLAYING);
        this.sendNotification(GameMessage.ON_FINISH_SORT_CHI);

        var quiters = data.quiters;
        var isLeave = tableVO.registerLeave;
        var totalTime = 0;

        tableVO.isSapHam = data.isSapHam;
        tableVO.isSapLang = data.isSapLang;
        tableVO.isBatSapLang = data.isBatSapLang;

        for (var i = 0; i < data.result.length; i++) {
            var obj = data.result[i];
            var seat = tableVO.getSeatByUserId(obj.uid);
            if (!seat || !seat.user) continue;
            seat.updateData(obj);
            seat.isSort = false;
        }

        var mySeat = tableVO.getSeatByUserId(tableVO.myId);
        if (mySeat.status === SeatVO.PLAY) {
            this.sendNotification(GameMessage.ON_RESET_CARDS, { seatId: mySeat.id, cards: mySeat.cards });
        }

        var listMauBinh = this.getListMauBinh(data);
        for (var i = 0; i < listMauBinh.length; i++) {
            seat = tableVO.getSeatByUserId(listMauBinh[i]);
            if (!seat || !seat.user) continue;
            seat.isMauBinh = true;
            this.sendNotification(GameMessage.ON_SHOW_MAU_BINH, { seatId: seat.id });
        }

        var timeSoChi = (data.isSoBai) ? 0.1 : 0;
        var timeSapHam = (tableVO.isSapHam) ? tableVO.TIME_SO_CHI : 0;
        var timeBatSapLang = (tableVO.isBatSapLang) ? tableVO.TIME_SO_CHI : 0;
        var timeSapLang = (tableVO.isSapLang) ? tableVO.TIME_SO_CHI : 0;
        var timeSoChiAt = (data.isSoAt) ? tableVO.TIME_SO_CHI : 0;

        this.showAllCards(false);
        if (timeSoChi === 0) this.showAllCards(true);
        if (listMauBinh.length !== 0) this.showListMauBinhCards(listMauBinh);

        if (!seat.isMauBinh)
            this.showBinhLung();
        if (timeSoChi !== 0 && !this.isLungAll()) {
            this.delayCallFunction(timeSoChi, this.showSoChi.bind(this));
            timeSoChi = tableVO.TIME_SO_CHI * 2;
        }

        if (timeSapHam !== 0) this.delayCallFunction(timeSoChi + timeSapHam, this.showSapHam.bind(this));
        if (timeSapLang !== 0) this.delayCallFunction(timeSoChi + timeSapHam + timeSapLang, this.showSapLang.bind(this));
        if (timeBatSapLang !== 0) this.delayCallFunction(timeSoChi + timeSapHam + timeSapLang + timeBatSapLang, this.showBatSapLang.bind(this));
        if (timeSoChiAt !== 0) this.delayCallFunction(timeSoChi + timeSapHam + timeSapLang + timeBatSapLang + timeSoChiAt, this.showSoChiAt.bind(this));
        totalTime = timeSoChi + timeSapHam + timeSapLang + timeBatSapLang + timeSoChiAt + tableVO.TIME_SO_CHI;

        tableVO.isPlaying = false;
        tableVO.totalTime = totalTime;
        TweenLite.delayedCall(totalTime, function () {
            this.delayCallFunction(tableVO.TIME_SHOW_RESULT, this.finishGame.bind(this), data.result);
            this.showResult(data.result);
            this.sendNotification(GameMessage.ON_HIDE_RESULT_BINH);
            for (var i = 0; i < tableVO.seats.length; i++) {
                var seat = tableVO.seats[i];
                if (!seat || !seat.user || seat.status !== SeatVO.PLAY) continue;
                this.sendNotification(GameMessage.ON_UPDATE_MONEY, { seatId: seat.id, addMoney: seat.earnMoney });
            }
            this.checkQuiters(quiters);
            this.onCheckLeaveGame(isLeave);
            this.resetUserViewState();
        }.bind(this));
    }

    getListMauBinh(data) {
        var result = [];
        for (var i = 0; i < data.result.length; i++) {
            var obj = data.result[i];
            var hasMauBinh = false;
            switch (obj.winType) {
                case LogicBinh.IDX_RONG_CUON:
                    hasMauBinh = true;
                    break;
                case LogicBinh.IDX_SANH_RONG:
                    hasMauBinh = true;
                    break;
                case LogicBinh.IDX_13_CAY_DEN:
                    hasMauBinh = true;
                    break;
                case LogicBinh.IDX_13_CAY_DO:
                    hasMauBinh = true;
                    break;
                case LogicBinh.IDX_12_CAY_DEN:
                    hasMauBinh = true;
                    break;
                case LogicBinh.IDX_12_CAY_DO:
                    hasMauBinh = true;
                    break;
                case LogicBinh.IDX_5_DOI_1_XAM:
                    hasMauBinh = true;
                    break;
                case LogicBinh.IDX_LUC_PHE_BON:
                    hasMauBinh = true;
                    break;
                case LogicBinh.IDX_BA_CHI_SANH:
                    hasMauBinh = true;
                    break;
                case LogicBinh.IDX_BA_CHI_THUNG:
                    hasMauBinh = true;
                    break;
            }

            if (hasMauBinh) {
                result.push(obj.uid);
            }
        }
        return result;
    }

    checkQuiters(quiters) {
        for (var i = 0; i < quiters.length; i++) {
            var uid = quiters[i];
            this.sendNotification(GameMessage.RECEIVE_LEAVE_GAME, { userIdLeave: uid });
        }
    }

    finishGame(listResult) {
        this.sendNotification(GameMessage.ON_FINISH_GAME, { listResult: listResult });
    }

    isSoChi(data) {
        var countLung = 0;
        for (var i = 0; i < data.result.length; i++) {
            var obj = data.result[i];
            if (obj.isBinhLung) countLung++;
        }
        if (countLung >= data.result.length - 1) return false;
        return true;
    }

    isSoChiAt(data) {
        for (var i = 0; i < data.result.length; i++) {
            var obj = data.result[i];
            if (obj.bonusChi > 0) return true;
        }
        return false;
    }

    showAllCards(isFaceUp) {
        var tableVO = this.gameProxy.getTable();
        for (var i = 0; i < tableVO.seats.length; i++) {
            var seat = tableVO.seats[i];
            if (!seat || seat.status !== SeatVO.PLAY || !seat.user) continue;
            this.sendNotification(GameMessage.ON_SHOW_ALL_CARDS_BINH, { seatId: seat.id, isFaceUp: isFaceUp });
        }
    }

    showListMauBinhCards(listMauBinh) {
        var tableVO = this.gameProxy.getTable();
        for (var i = 0; i < listMauBinh.length; i++) {
            var userId = listMauBinh[i];
            var seat = tableVO.getSeatByUserId(userId);
            if (!seat || seat.status !== SeatVO.PLAY || !seat.user || seat.isBinhLung) continue;
            this.sendNotification(GameMessage.ON_SHOW_ALL_CARDS_BINH, { seatId: seat.id, isFaceUp: true });
        }
    }

    isBinhLung(data) {
        var tableVO = this.gameProxy.getTable();
        var isLung = false;
        for (var i = 0; i < tableVO.seats.length; i++) {
            var seat = tableVO.seats[i];
            if (!seat || seat.status !== SeatVO.PLAY || !seat.user) continue;
            if (seat.isBinhLung) {
                isLung = true;
                break;
            }
        }
        return isLung;
    }

    showBinhLung() {
        var tableVO = this.gameProxy.getTable();
        for (var i = 0; i < tableVO.seats.length; i++) {
            var seat = tableVO.seats[i];
            if (!seat || seat.status !== SeatVO.PLAY || !seat.user) continue;
            if (seat.isBinhLung) {
                this.sendNotification(GameMessage.ON_SHOW_BINH_LUNG, { seatId: seat.id, isLung: true });
            } else {
                this.sendNotification(GameMessage.ON_SHOW_BINH_LUNG, { seatId: seat.id, isLung: false });
            }
        }
    }

    isLungAll() {
        var tableVO = this.gameProxy.getTable();
        for (var i = 0; i < tableVO.seats.length; i++) {
            var seat = tableVO.seats[i];
            if (!seat || seat.status !== SeatVO.PLAY || !seat.user) continue;
            if (!seat.isBinhLung) {
                return false;
            }
        }
        return true;
    }

    showSoChi() {
        var tableVO = this.gameProxy.getTable();
        for (var i = 0; i < tableVO.seats.length; i++) {
            var seat = tableVO.seats[i];
            if (!seat || seat.status !== SeatVO.PLAY || !seat.user) continue;
            // if (seat.isBinhLung) continue;
            this.delayShowSoChi(LogicBinh.INDEX_CHI1, 0, seat.id);
            this.delayShowSoChi(LogicBinh.INDEX_CHI2, tableVO.TIME_SO_CHI, seat.id);
            this.delayShowSoChi(LogicBinh.INDEX_CHI3, tableVO.TIME_SO_CHI * 2, seat.id);
        }
    }

    showSoChiAt() {
        this.sendNotification(GameMessage.ON_HIDE_TEXT_CHI);
        var tableVO = this.gameProxy.getTable();
        for (var i = 0; i < tableVO.seats.length; i++) {
            var seat = tableVO.seats[i];
            if (!seat || seat.status !== SeatVO.PLAY || !seat.user) continue;
            this.sendNotification(GameMessage.ON_SO_CHI, { seatId: seat.id, indexChi: LogicBinh.INDEX_CHI_AT });
        }
    }

    delayCallFunction(timeDelay, func) {
        TweenLite.delayedCall(timeDelay, function () {
            func.call(this);
        }.bind(this));
    }

    delayShowSoChi(index, timeDelay, seatId) {
        TweenLite.delayedCall(timeDelay, function () {
            this.sendNotification(GameMessage.ON_SO_CHI, { seatId: seatId, indexChi: index });
        }.bind(this));
    }

    showSapHam() {
        this.sendNotification(GameMessage.ON_HIDE_TEXT_CHI);
        this.sendNotification(GameMessage.ON_SHOW_SAP_HAM);
    }

    showSapLang() {
        this.sendNotification(GameMessage.ON_HIDE_TEXT_CHI);
        var tableVO = this.gameProxy.getTable();
        for (var i = 0; i < tableVO.seats.length; i++) {
            var seat = tableVO.seats[i];
            if (!seat) continue;
            if (seat.status === SeatVO.PLAY) {
                this.sendNotification(GameMessage.ON_SHOW_SAP_LANG, { seatId: seat.id });
            }
        }
    }

    showBatSapLang() {
        this.sendNotification(GameMessage.ON_HIDE_TEXT_CHI);
        var tableVO = this.gameProxy.getTable();
        for (var i = 0; i < tableVO.seats.length; i++) {
            var seat = tableVO.seats[i];
            if (!seat) continue;
            if (seat.status === SeatVO.PLAY) {
                this.sendNotification(GameMessage.ON_SHOW_BAT_SAP_LANG, { seatId: seat.id });
            }
        }
    }

    showResult(data) {
        var tableVO = this.gameProxy.getTable();

        for (var i = 0; i < data.length; i++) {
            data[i].name = data[i].displayName;
            data[i].gold = data[i].money;
            if (data[i].total > 0)
                data[i].result = 'Thắng ' + data[i].total + ' chi';
            else
                data[i].result = 'Thua ' + Math.abs(data[i].total) + ' chi';

            if (data[i].userName === tableVO.userName) {
                data[i].isMe = true;
            } else {
                data[i].isMe = false;
            }
        }

        data.sort((a, b) => {
            if (parseInt(a.gold) > parseInt(b.gold)) {
                return -1;
            } else if (parseInt(a.gold) < parseInt(b.gold)) {
                return 1;
            } else {
                return 0;
            }
        });
        TweenLite.delayedCall(3, function () {
            this.updateUserInfo();
            this.sendNotification(GameMessage.ON_SHOW_RESULT_BINH, data);
        }.bind(this));
    }
}