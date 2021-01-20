var BaseCommand = require('BaseCommand');
var BaseGameCommand = require('BaseGameCommand');
var ResultTLMNVO = require('ResultTLMNVO');
var GameMessage = require('GameMessage');
var GameConfig = require('GameConfig');

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
            var arrUser = params.arrUser;
            var tableVO  = this.gameProxy.getTable();
            var winWhiteType = params.winType;
            var winWhiteCards = params.cards;
            var winners = params.winners;
            if (!tableVO) return this.showWarning(BaseGameCommand.WARNING.THE_TABLE_DOES_NOT_EXIST);
            if (!tableVO.isPlaying) return this.showWarning(BaseGameCommand.WARNING.TABLE_DOES_NOT_PLAYING);

            var isLeave = tableVO.registerLeave;

            for(var i=0;i<arrUser.length;i++){
                var seat = tableVO.getSeatByUserId(arrUser[i].uid);
                if(seat){
                    seat.cards = arrUser[i].cards;
                    seat.earnMoney = (GameConfig.CURRENT_MODE === "MONEY")?parseInt(arrUser[i].money):parseInt(arrUser[i].chip);
                }
            }

            if(winWhiteType !== undefined){
                TweenLite.delayedCall(1.5, function () {
                    this.sendNotification(GameMessage.ON_FINISH_GAME_WIN_WHITE, { arrCards:winWhiteCards, type:winWhiteType } );
                    this.onCheckLeaveGame(isLeave);
                }.bind(this));
            }else{
                TweenLite.delayedCall(1.5, function () {
                    this.showFinish(arrUser, tableVO, winners);
                    this.onCheckLeaveGame(isLeave);
                }.bind(this));
            }
            tableVO.isPlaying = false;
        },

        showFinish: function (arrUser, tableVO, winners) {
            var listResult = new ResultTLMNVO();
            for (var i = 0; i < arrUser.length; i++) {
                var user = arrUser[i];
                var seat = tableVO.getSeatByUserId(user.uid);
                if(seat){
                    var resultVO = new ResultTLMNVO();
                    resultVO.setupData(user);
                    resultVO.seatId = seat.id;
                    listResult.addResultList(resultVO);
                    if(seat.user && winners.indexOf(seat.user.id) !== -1){
                        seat.isWin = true;
                    }
                }
            }

            this.sendNotification(GameMessage.ON_FINISH_GAME, { listResult:listResult } );
            this.resetUserViewState();
        },

        updateSeat:function (user, seat) {

        }
    },

    // STATIC MEMBERS
    {
        NAME: "ReceiveFinishGameTLMNCommand"
    }
);
