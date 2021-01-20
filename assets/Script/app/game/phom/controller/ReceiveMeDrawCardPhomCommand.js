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

            var card = params.data.card;
            var tableVO = this.gameProxy.getTable();
            var mySeat = tableVO.getSeatByUserId(tableVO.myId);

            if (!tableVO && tableVO.id < 1) return this.showWarning(BaseGameCommand.WARNING.THE_TABLE_DOES_NOT_EXIST);

            mySeat.cards.push(card);
            this.sendNotification(GameMessage.ON_ME_DRAW_CARD, {
                card: card
            });
        }
    },
    // STATIC MEMBERS
    {
        NAME: "ReceiveMeDrawCardPhomCommand"
    }
);
