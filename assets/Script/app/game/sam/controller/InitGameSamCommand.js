var BaseCommand = require('BaseCommand');
var InitGameCommand = require('InitGameCommand');
var GameMessage = require('GameMessage');
var SeatSamVO = require('SeatSamVO');
var puremvc = BaseCommand.puremvc;

module.exports = puremvc.define(
    // CLASS INFO
    {
        parent: InitGameCommand
    },

    // INSTANCE MEMBERS
    {
        execute: function (notification) {
            InitGameCommand.prototype.execute.call(this, notification);
            var tableVO = this.gameProxy.getTable();
            this.updateCards(tableVO);
            this.updateTurn(tableVO);
            this.updateSam(tableVO);
        },

        updateCards: function (tableVO) {
            tableVO.playCards = (this.gameProxy.gameRoom.gameRoom.cardsPlace) ? this.gameProxy.gameRoom.gameRoom.cardsPlace : [];

            if (tableVO.isPlaying && tableVO.playCards.length != 0) {
                this.sendNotification(GameMessage.ON_SHOW_CARDS_PLACE, {cards: tableVO.playCards});
            }
        },

        updateTurn: function (tableVO) {
            if (tableVO.curTurn !== -1) {
                this.sendNotification(GameMessage.ON_UPDATE_CURRENT_TURN);
            }
        },

        updateSam: function (tableVO) {
            //show trạng thái đang báo sâm

            if (tableVO.gameState === SeatSamVO.SAM) {
                this.sendNotification(GameMessage.ON_SHOW_BAO_SAM_STATE);
            }

            //update thằng đang báo sâm trong ván
            var seatBaoSam = tableVO.getSeatByUserId(tableVO.userIdBaoSam);
            if (seatBaoSam) {
                tableVO.seatIdBaoSam = seatBaoSam.id;
                tableVO.userIdBaoSam = seatBaoSam.user.id;
                this.sendNotification(GameMessage.ON_BAO_SAM, {seatId: seatBaoSam.id, sam: 1});
            } else {
                //update bao sâm trong trạng thái báo sam
                for (var i = 0; i < tableVO.seats.length; i++) {
                    var seat = tableVO.seats [i];
                    if (!seat) continue;
                    if (tableVO.gameState !== SeatSamVO.SAM) continue;
                    this.sendNotification(GameMessage.ON_BAO_SAM, {seatId: seat.id, sam: seat.sam});
                }
            }
        }
    },

    // STATIC MEMBERS
    {
        NAME: "InitGameSamCommand"
    }
);
