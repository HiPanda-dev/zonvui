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

            var tableVO = this.gameProxy.getTable();
            var otherUserSeat = this.gameProxy.getSeatByUserId(params.data.uid);

            if (!tableVO && tableVO.id < 1) return this.showWarning(BaseGameCommand.WARNING.THE_TABLE_DOES_NOT_EXIST);

            if(tableVO.mySeatId !== otherUserSeat.id)
                otherUserSeat.cards.push(-1);
            this.sendNotification(GameMessage.ON_OTHER_USER_DRAW_CARD, {
                seatId: otherUserSeat.id
            });
        }
    },
    // STATIC MEMBERS
    {
        NAME: "ReceiveOtherUserDrawCardPhomCommand"
    }
);
