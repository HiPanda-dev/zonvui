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
            var seatId = params.seatId;
            var uid = params.uid;
            var user = this.dataUser.getUserById(uid);
            var tableVO = this.gameProxy.getTable();
            if (!tableVO && tableVO.id < 1) return this.showWarning(this.WARNING.THE_TABLE_DOES_NOT_EXIST);

            var seat = tableVO.getSeatBySeatId(seatId);
            if(seat){
                seat.user = user;
                this.sendNotification(GameMessage.ON_SIT_DOWN, { seatId:seat.id, user:seat.user} );
            }
        }
    },

    // STATIC MEMBERS
    {
        NAME: "ReceiveSitDownCommand"
    }
);
