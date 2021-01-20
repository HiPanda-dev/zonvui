var BaseCommand = require('BaseCommand');
var BaseGameCommand = require('BaseGameCommand');
var GameMessage = require('GameMessage');
var Utility = require('Utility');

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
            //Utility.sortArray(cards, "NUMERIC");
            Utility.sortDownCardPhom(cards);
            var userId = params.userId;
            var index = params.index;
            var tableVO = this.gameProxy.getTable();
            var seat = this.gameProxy.getSeatByUserId(userId);

            if (!tableVO && tableVO.id < 1) return this.showWarning(BaseGameCommand.WARNING.THE_TABLE_DOES_NOT_EXIST);

            seat.cardNrReminder -= cards.length;
            seat.removeCard(cards);
            seat.addDownCards(cards, index);
            this.sendNotification(GameMessage.ON_DOWN_CARD, {
                cards: cards,
                userId: userId,
                index: index
            });
        }
    },
    // STATIC MEMBERS
    {
        NAME: "ReceiveDownCardPhomCommand"
    }
);
