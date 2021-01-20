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
            var user = params.user;

            var tableVO = this.gameProxy.getTable();
            if (!tableVO && tableVO.id < 1) return this.showWarning(this.WARNING.THE_TABLE_DOES_NOT_EXIST);
            tableVO.myGold = (tableVO.myId === user.id) ? user.gold() : tableVO.myGold;

            var seat = tableVO.getSeatByUserId(user.id);
            if(seat && seat.user){
                this.sendNotification(GameMessage.ON_UPDATE_USER_INFO, {seatId:seat.id, user:seat.user});
            }
        }
    },

    // STATIC MEMBERS
    {
        NAME: "ReceiveUpdateUserInfoCommand"
    }
);
