var BaseCommand = require('BaseCommand');
var BaseGameCommand = require('BaseGameCommand');
var SFSEvent = require('SFSEvent');
var MiniGameMessage = require('MiniGameMessage');
var SFSMiniGameResponseCommand = require('SFSMiniGameResponseCommand');
var Constants = require('Constants');
var Utility = require('Utility');
var puremvc = BaseCommand.puremvc;

// var isFakeClient = true;
// var lenListCard = 4;
// var listFakeCard = [
//                         [44,45,46,47,10],
//                         [40,41,42,5,6],
//                         [8,12,16,20,24],
//                         [5,13,21,33, 37]
//                    ];
// var listMoney = [150, 50, 1000, 20];
// var listTypeFake = [2 , 3, 1, 4];
// var countFake = 0;

module.exports = puremvc.define(
    // CLASS INFO
    {
        parent: SFSMiniGameResponseCommand
    },

    // INSTANCE MEMBERS
    {


        execute: function (notification) {
            var params = notification.getBody();
            this.minigameProxy = this.facade.retrieveProxy('MiniPokerProxy');
            if (this.checkQueueMesseage(params)) return;

            SFSMiniGameResponseCommand.prototype.execute.call(this, notification);

            switch (params.cmd) {
                case SFSEvent.USER_JOIN_MINIGAME:
                    this.onUserJoinMiniGame(params);
                    break;
                case SFSEvent.USER_DISCONNECT:
                    this.onUserDis(params);
                    break;
                case SFSEvent.SPIN:
                    this.onUpdateResult(params);
                    break;
                case SFSEvent.UPDATE_POT:
                    this.onUpdatePot(params);
                    break;
                case SFSEvent.GET_USER_HISTORY:
                    this.onShowHistoryMiniPoker(params);
                    break;
                case SFSEvent.GET_TOP:
                    this.onShowRankMiniPoker(params);
                    break;
            }
        },

        onUserDis: function(){
            //this.sendNotification(MiniGameMessage.RECEIVE_DISCONNECT_MINI_POKER, {});
        },

        onUserJoinMiniGame: function (params) {
            this.sendNotification(MiniGameMessage.RECEIVE_JOIN_MINIGAME, {curMiniGame: Constants.MINIGAME_MINI_POKER, data: params});
        },

        onUpdateResult: function(params){
            cc.log("onUpdateResult: " );
            var data = Utility.convertSFSObjectToObject(params.params);
            cc.log(data);

            if(data.success) {
                data.result = Utility.convertSFSObjectToObject(data.result);

                data.result.cards = Utility.convertServerToClientCardsMiniPoker(data.result.cards);
                //data.result.cards =
                // if(isFakeClient){
                //     data.result.cards = listFakeCard[countFake];
                //     data.result.money = (listMoney[countFake] -1)*data.value;
                //     data.result.type = listTypeFake[countFake];
                //     countFake = (countFake + 1)%lenListCard;
                //}
                //data.result.money;
            }

            this.sendNotification(MiniGameMessage.RECEIVE_RESULT_SPIN_MINI_POKER, data);
        },

        onUpdatePot: function(params){
            var data = Utility.convertSFSObjectToObject(params.params);
            this.sendNotification(MiniGameMessage.RECEIVE_UPDATE_POT_MINI_POKER, data);
        },

        onShowHistoryMiniPoker: function (params) {
            var data = Utility.convertSFSObjectToObject(params.params);
            this.sendNotification(MiniGameMessage.UPDATE_HISTORY_MINIGAME, {curMiniGame: Constants.MINIGAME_MINI_POKER, data: data});
        },

        onShowRankMiniPoker: function (params) {
            var data = Utility.convertSFSObjectToObject(params.params);
            this.sendNotification(MiniGameMessage.UPDATE_RANK_MINIGAME, {curMiniGame: Constants.MINIGAME_MINI_POKER, data: data});
        }


    },

    // STATIC MEMBERS
    {
        NAME: "SFSMiniPokerReponseCommand"
    }
);
