var BaseCommand = require('BaseCommand');
var GameMessage = require('GameMessage');
var BaseGameCommand = require('BaseGameCommand');

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
            var position = params.position;
            var tableVO = this.gameProxy.getTable();
            if (!tableVO && tableVO.id < 1) return this.showWarning(this.WARNING.THE_TABLE_DOES_NOT_EXIST);
            if (!params.sucess) return;
            tableVO.listMyBet[position] = 0;
            tableVO.listTotalBet[position] = 0;
            this.sendNotification(GameMessage.ON_SOLD_BET, {position: position});
            for(var i=0;i<tableVO.seats.length;i++){
                var seat = tableVO.seats[i];
                if(!seat || !seat.user) continue;
                this.sendNotification(GameMessage.ON_UPDATE_USER_INFO, {seatId: seat.id, user: seat.user});
            }
        }
    },

    // STATIC MEMBERS
    {
        NAME: "ReceiveSoldBetXocDiaCommand"
    }
);
