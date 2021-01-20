var BaseCommand = require('BaseCommand');
var BaseGameCommand = require('BaseGameCommand');
var GameMessage = require('GameMessage');
var SFSData = require('SFSData');

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

            var card = params.card;
            var userId = params.userId;
            var moneyAR = params.moneyAR;
            var moneyBR = params.moneyBR;
            var tableVO = this.gameProxy.getTable();

            var stealerSeat = tableVO.getSeatByUserId(userId);
            var stealedPlayerSeat = tableVO.getPreviousSeat(stealerSeat.id);

            if (!tableVO && tableVO.id < 1) return this.showWarning(BaseGameCommand.WARNING.THE_TABLE_DOES_NOT_EXIST);

            stealedPlayerSeat.discards.pop();
            stealerSeat.cards.push(card);
            stealerSeat.stealCards.push(card);
            this.sendNotification(GameMessage.ON_STEAL_CARD, {
                card: card,
                userId: userId,
                moneyAR: moneyAR,
                moneyBR: moneyBR
            });
        }
    },
    // STATIC MEMBERS
    {
        NAME: "ReceiveStealCardPhomCommand"
    }
);
