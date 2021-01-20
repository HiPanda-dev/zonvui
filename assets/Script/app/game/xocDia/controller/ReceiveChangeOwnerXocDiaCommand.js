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
            if (!tableVO && tableVO.id < 1) return this.showWarning(this.WARNING.THE_TABLE_DOES_NOT_EXIST);

            var ownerId = params.ownerId;
            var seatUser = tableVO.getSeatByUserId(ownerId);
            if(seatUser){
                this.sendNotification(GameMessage.ON_STAND_UP, {seatId:seatUser.id});
            }
            tableVO.ownerId = ownerId;
            var seat = tableVO.getSeatBySeatId(1);
            if(seat){
                seat.user = this.dataUser.getUserById(ownerId);
                this.sendNotification(GameMessage.ON_SIT_DOWN, { seatId:seat.id, user:seat.user} );
            }

            this.sendNotification(GameMessage.ON_UPDATE_OWNER);
        }
    },

    // STATIC MEMBERS
    {
        NAME: "ReceiveChangeOwnerXocDiaCommand"
    }
);
