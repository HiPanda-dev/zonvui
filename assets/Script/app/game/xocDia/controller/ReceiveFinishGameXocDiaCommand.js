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
            var tableVO = this.gameProxy.getTable();
            if (!tableVO && tableVO.id < 1) return this.showWarning(this.WARNING.THE_TABLE_DOES_NOT_EXIST);
            var vtPlayer = params.vtPlayer;
            tableVO.resultVO = vtPlayer;
            tableVO.registerOwerId = -1;
            tableVO.updateBetHistory();
            for(var i=0;i<vtPlayer.length;i++){
                var player = vtPlayer[i];
                var seat = tableVO.getSeatByUserId(player.uid);
                tableVO.myGold = (player.uid === tableVO.myId)? tableVO.myGold + player.money:tableVO.myGold;
                var user = this.dataUser.getUserById(player.uid);
                if(user) user.money += player.money;
                if(seat && seat.user){
                    seat.earnMoney = player.money;
                    this.sendNotification(GameMessage.ON_UPDATE_USER_INFO, {seatId: seat.id, user: seat.user});
                }
            }
            this.sendNotification(GameMessage.ON_FINISH_GAME);
            this.sendNotification(GameMessage.ON_SHOW_BUY_MASTER_GAME);
        }
    },

    // STATIC MEMBERS
    {
        NAME: "ReceiveFinishGameXocDiaCommand"
    }
);
