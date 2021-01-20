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

            var cards = params.cards;
            var userId = params.userId;
            var index = params.index;
            var playerDes = params.playerDes;
            var tableVO = this.gameProxy.getTable();
            var fromSeat = this.gameProxy.getSeatByUserId(userId);
            var toSeat = this.gameProxy.getSeatByUserId(playerDes);

            if (!tableVO && tableVO.id < 1) return this.showWarning(BaseGameCommand.WARNING.THE_TABLE_DOES_NOT_EXIST);

            fromSeat.cardNrReminder -= cards.length;
            fromSeat.removeCard(cards);
            toSeat.updateDownCards(cards,index);
            this.sendNotification(GameMessage.ON_SEND_CARD, {
                cards: cards,
                userId: userId,
                playerDes: playerDes,
                index: index
            });
        }
    },
    // STATIC MEMBERS
    {
        NAME: "ReceiveSendCardPhomCommand"
    }
);
