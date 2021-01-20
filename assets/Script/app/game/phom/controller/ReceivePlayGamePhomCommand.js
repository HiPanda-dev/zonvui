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
            var nextTurn = params.nextTurn;

            var tableVO = this.gameProxy.getTable();
            tableVO.curTurn = nextTurn;
            var seat = this.gameProxy.getSeatByUserId(userId);

            if (!tableVO && tableVO.id < 1) return this.showWarning(BaseGameCommand.WARNING.THE_TABLE_DOES_NOT_EXIST);

            tableVO.nextTurn = nextTurn;
            tableVO.cardOfPreviousPlayer = card;
            seat.discards.push(card);
            seat.cardNrReminder -= 1;
            seat.removeCard([card]);
            this.sendNotification(GameMessage.ON_DISCARD, {
                card: card,
                userId: userId,
                nextTurn: nextTurn
            });
        }
    },
    // STATIC MEMBERS
    {
        NAME: "ReceivePlayGamePhomCommand"
    }
);
