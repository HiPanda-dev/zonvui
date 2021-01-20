var BaseCommand = require('BaseCommand');
var BaseGameCommand = require('BaseGameCommand');
var GameMessage = require('GameMessage');

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
            var arrCards = params.cards;
            var userId = params.userId;

            var tableVO = this.gameProxy.getTable();
            if (!tableVO) return this.showWarning(BaseGameCommand.WARNING.THE_TABLE_DOES_NOT_EXIST);
            if (!tableVO.isPlaying) return this.showWarning(BaseGameCommand.WARNING.TABLE_DOES_NOT_PLAYING);

            tableVO.isShot = false;
            var preSeat = tableVO.getSeatByUserId(userId);
            var preSeatId = (preSeat === null) ? -1 : preSeat.id;
            tableVO.preTurn = tableVO.curTurn;

            if (!arrCards || arrCards.length === 0) { //gửi lệnh cancel turn khi không có cây bài nào gửi về
                if (preSeat) preSeat.isCancel = true;
                this.sendNotification(GameMessage.ON_CANCEL_TURN, {seatId: preSeatId});
            } else {
                tableVO.playCards = arrCards.concat();
                if (preSeat) {
                    preSeat.removeCard(arrCards);
                    preSeat.cardNrReminder -= arrCards.length;
                    this.sendNotification(GameMessage.ON_PLACE_CARD, {
                        seatId: preSeatId,
                        playCards: arrCards
                    });
                }
            }
        }
    },

    // STATIC MEMBERS
    {
        NAME: "ReceivePlayGameTLMNCommand"
    }
);
