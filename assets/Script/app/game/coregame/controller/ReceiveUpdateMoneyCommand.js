var BaseCommand = require('BaseCommand');
var BaseGameCommand = require('BaseGameCommand');
var GameMessage= require('GameMessage');

var puremvc = BaseCommand.puremvc;

/**
 * hiện animation tiên (chặt chém)
 * @type {Function}
 */
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
            var plusName = params.plusName;
            var plusMoney = parseInt(params.plusMoney);
            var subName = params.subName;
            var subMoney = parseInt(params.subMoney);

            var tableVO = this.gameProxy.getTable();

            var plusSeat = tableVO.getSeatByUserId(plusName);
            if(plusSeat && plusSeat.user){
                this.sendNotification(GameMessage.ON_UPDATE_USER_INFO, {seatId:plusSeat.id, user:plusSeat.user});
                this.sendNotification(GameMessage.ON_UPDATE_MONEY, {seatId:plusSeat.id, addMoney:plusMoney});
            }

            var subSeat = tableVO.getSeatByUserId(subName);
            if(subSeat && subSeat.user){
                this.sendNotification(GameMessage.ON_UPDATE_USER_INFO, {seatId:subSeat.id, user:subSeat.user});
                this.sendNotification(GameMessage.ON_UPDATE_MONEY, {seatId:subSeat.id, addMoney:subMoney});
            }
        }
    },

    // STATIC MEMBERS
    {
        NAME: "ReceiveUpdateMoneyCommand"
    }
);
