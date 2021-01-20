var BaseCommand = require('BaseCommand');
var BaseGameCommand = require('BaseGameCommand');
var GameConfig = require('GameConfig');
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
            var arrUser = params.playerList;
            var tableVO  = this.gameProxy.getTable();
            if (!tableVO) return this.showWarning(BaseGameCommand.WARNING.THE_TABLE_DOES_NOT_EXIST);
            if (!tableVO.isPlaying) return this.showWarning(BaseGameCommand.WARNING.TABLE_DOES_NOT_PLAYING);

            var isLeave = tableVO.registerLeave;

            for(var i=0;i<arrUser.length;i++){
                var seat = tableVO.getSeatByUserId(arrUser[i].uid);
                if(seat){
                    seat.userName = arrUser[i].uid;
                    seat.cards = arrUser[i].playerCards;
                    seat.point = arrUser[i].point;
                    seat.resultPosition = arrUser[i].resultPosition;
                    seat.earnMoney = (GameConfig.CURRENT_MODE === "MONEY")?parseInt(arrUser[i].money):parseInt(arrUser[i].chip);
                }
            }

            this.showFinish(arrUser, tableVO);
            this.onCheckLeaveGame(isLeave);
            tableVO.isPlaying = false;
        },

        showFinish: function (arrUser, tableVO, winners) {
            this.resetUserViewState();
            this.sendNotification(GameMessage.ON_FINISH_GAME, { listResult:arrUser } );
        }
    },

    // STATIC MEMBERS
    {
        NAME: "ReceiveFinishGamePhomCommand"
    }
);
