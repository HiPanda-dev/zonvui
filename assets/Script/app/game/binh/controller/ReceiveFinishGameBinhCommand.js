var BaseCommand = require('BaseCommand');
var GameMessage = require('GameMessage');
var TableBinhVO = require('TableBinhVO');
var SeatVO = require('SeatVO');
var LogicBinh = require('LogicBinh');
var BaseGameCommand = require('BaseGameCommand');

var puremvc = BaseCommand.puremvc;

module.exports = puremvc.define(
    // CLASS INFO
    {
        parent: BaseGameCommand
    },

    // INSTANCE MEMBERS
    {
        execute: function (notification) {
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


            var listMauBinh = this.getListMauBinh(data);
            for (var i = 0; i < listMauBinh.length; i++) {
                seat = tableVO.getSeatByUserId(listMauBinh[i]);
                if (!seat || !seat.user) continue;
                seat.isMauBinh = true;
                this.sendNotification(GameMessage.ON_SHOW_MAU_BINH, {seatId: seat.id});
            }

            var timeSoChi = (data.isSoBai) ? 0.1 : 0;
            var timeSapHam = (tableVO.isSapHam) ? TableBinhVO.TIME_SO_CHI : 0;
            var timeBatSapLang = (tableVO.isBatSapLang) ? TableBinhVO.TIME_SO_CHI : 0;
            var timeSapLang = (tableVO.isSapLang) ? TableBinhVO.TIME_SO_CHI : 0;
            var timeSoChiAt = (data.isSoAt) ? TableBinhVO.TIME_SO_CHI : 0;

            this.showAllCards(false);
            if (timeSoChi === 0) this.showAllCards(true);
            if (listMauBinh.length !== 0)this.showListMauBinhCards(listMauBinh);

            this.showBinhLung();
            if (timeSoChi !== 0) {
                this.delayCallFunction(timeSoChi, this.showSoChi.bind(this));
                timeSoChi = TableBinhVO.TIME_SO_CHI * 3;
            }

            if (timeSapHam !== 0) this.delayCallFunction(timeSoChi + timeSapHam, this.showSapHam.bind(this));
            if (timeBatSapLang !== 0) this.delayCallFunction(timeSoChi + timeSapHam+ timeBatSapLang, this.showBatSapLang.bind(this));
            if (timeSapLang !== 0) this.delayCallFunction(timeSoChi + timeSapHam + timeBatSapLang + timeSapLang, this.showSapLang.bind(this));
            if (timeSoChiAt !== 0) this.delayCallFunction(timeSoChi + timeSapHam + timeBatSapLang + timeSapLang + timeSoChiAt, this.showSoChiAt.bind(this));
            totalTime = timeSoChi + timeSapHam + timeSapLang + timeBatSapLang + timeSoChiAt + TableBinhVO.TIME_SO_CHI;

            tableVO.isPlaying = false;
            TweenLite.delayedCall(totalTime, function () {
                this.delayCallFunction(TableBinhVO.TIME_SO_CHI, this.finishGame.bind(this));
                this.sendNotification(GameMessage.ON_UPDATE_OWNER);
                this.sendNotification(GameMessage.ON_HIDE_RESULT_BINH);
                for (var i = 0; i < tableVO.seats.length; i++) {
                    var seat = tableVO.seats[i];
                    if (!seat || !seat.user || seat.status !== SeatVO.PLAY) continue;
                    this.sendNotification(GameMessage.ON_UPDATE_MONEY, {seatId: seat.id, addMoney: seat.earnMoney});
                }
                this.checkQuiters(quiters);
                this.onCheckLeaveGame(isLeave);
                this.resetUserViewState();
            }.bind(this));
        },

        getListMauBinh: function (data) {
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
        },

        checkQuiters: function (quiters) {
            for (var i = 0; i < quiters.length; i++) {
                var uid = quiters[i];
                this.sendNotification(GameMessage.RECEIVE_LEAVE_GAME, {userIdLeave: uid});
            }
        },

        finishGame: function () {
            this.sendNotification(GameMessage.ON_FINISH_GAME);
        },

        isSoChi: function (data) {
            var countLung = 0;
            for (var i = 0; i < data.result.length; i++) {
                var obj = data.result[i];
                if (obj.isBinhLung) countLung++;
            }
            if (countLung >= data.result.length - 1) return false;
            return true;
        },

        isSoChiAt: function (data) {
            for (var i = 0; i < data.result.length; i++) {
                var obj = data.result[i];
                if (obj.bonusChi > 0) return true;
            }
            return false;
        },

        showAllCards: function (isFaceUp) {
            var tableVO = this.gameProxy.getTable();
            for (var i = 0; i < tableVO.seats.length; i++) {
                var seat = tableVO.seats[i];
                if (!seat || seat.status !== SeatVO.PLAY || !seat.user) continue;
                this.sendNotification(GameMessage.ON_SHOW_ALL_CARDS_BINH, {seatId: seat.id, isFaceUp: isFaceUp});
            }
        },

        showListMauBinhCards:function (listMauBinh) {
            var tableVO = this.gameProxy.getTable();
            for (var i = 0; i < listMauBinh.length; i++) {
                var userId = listMauBinh[i];
                var seat = tableVO.getSeatByUserId(userId);
                if (!seat || seat.status !== SeatVO.PLAY || !seat.user || seat.isBinhLung) continue;
                this.sendNotification(GameMessage.ON_SHOW_ALL_CARDS_BINH, {seatId: seat.id, isFaceUp: true});
            }
        },

        isBinhLung: function (data) {
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
        },

        showBinhLung: function () {
            var tableVO = this.gameProxy.getTable();
            for (var i = 0; i < tableVO.seats.length; i++) {
                var seat = tableVO.seats[i];
                if (!seat || seat.status !== SeatVO.PLAY || !seat.user) continue;
                if (seat.isBinhLung) {
                    this.sendNotification(GameMessage.ON_SHOW_BINH_LUNG, {seatId: seat.id, isLung: true});
                } else {
                    this.sendNotification(GameMessage.ON_SHOW_BINH_LUNG, {seatId: seat.id, isLung: false});
                }
            }
        },

        showSoChi: function () {
            var tableVO = this.gameProxy.getTable();
            for (var i = 0; i < tableVO.seats.length; i++) {
                var seat = tableVO.seats[i];
                if (!seat || seat.status !== SeatVO.PLAY || !seat.user) continue;
                if (seat.isBinhLung) continue;
                this.delayShowSoChi(LogicBinh.INDEX_CHI1, 0, seat.id);
                this.delayShowSoChi(LogicBinh.INDEX_CHI2, TableBinhVO.TIME_SO_CHI, seat.id);
                this.delayShowSoChi(LogicBinh.INDEX_CHI3, TableBinhVO.TIME_SO_CHI * 2, seat.id);
            }
        },

        showSoChiAt: function () {
            this.sendNotification(GameMessage.ON_HIDE_TEXT_CHI);
            var tableVO = this.gameProxy.getTable();
            for (var i = 0; i < tableVO.seats.length; i++) {
                var seat = tableVO.seats[i];
                if (!seat || seat.status !== SeatVO.PLAY || !seat.user) continue;
                this.sendNotification(GameMessage.ON_SO_CHI, {seatId: seat.id, indexChi: LogicBinh.INDEX_CHI_AT});
            }
        },

        delayCallFunction: function (timeDelay, func) {
            TweenLite.delayedCall(timeDelay, function () {
                func.call(this);
            }.bind(this));
        },

        delayShowSoChi: function (index, timeDelay, seatId) {
            TweenLite.delayedCall(timeDelay, function () {
                this.sendNotification(GameMessage.ON_SO_CHI, {seatId: seatId, indexChi: index});
            }.bind(this));
        },

        showSapHam: function () {
            this.sendNotification(GameMessage.ON_HIDE_TEXT_CHI);
            this.sendNotification(GameMessage.ON_SHOW_SAP_HAM);
        },

        showSapLang: function () {
            this.sendNotification(GameMessage.ON_HIDE_TEXT_CHI);
            var tableVO = this.gameProxy.getTable();
            for (var i = 0; i < tableVO.seats.length; i++) {
                var seat = tableVO.seats[i];
                if (!seat) continue;
                if (seat.status === SeatVO.PLAY) {
                    this.sendNotification(GameMessage.ON_SHOW_SAP_LANG, {seatId: seat.id});
                }
            }
        },

        showBatSapLang: function () {
            this.sendNotification(GameMessage.ON_HIDE_TEXT_CHI);
            var tableVO = this.gameProxy.getTable();
            for (var i = 0; i < tableVO.seats.length; i++) {
                var seat = tableVO.seats[i];
                if (!seat) continue;
                if (seat.status === SeatVO.PLAY) {
                    this.sendNotification(GameMessage.ON_SHOW_BAT_SAP_LANG, {seatId: seat.id});
                }
            }
        }
    },

    // STATIC MEMBERS
    {
        NAME: "ReceiveFinishGameBinhCommand"
    }
);
