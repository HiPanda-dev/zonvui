var BaseCommand = require('BaseCommand');
var SFSGameReponseCommand = require('SFSGameReponseCommand');
var GameMessage = require('GameMessage');
var SFSEvent = require('SFSEvent');
var Utility = require('Utility');

var puremvc = BaseCommand.puremvc;

module.exports = puremvc.define(
    // CLASS INFO
    {
        parent: SFSGameReponseCommand
    },

    // INSTANCE MEMBERS
    {
        SFSData:{
            CARDS:'cards',
            IS_SORT:'isSort',
            PLAYER_LIST:'playerList',
            USER_NAME:'userName',
            CURRENT_TURN:'currentTurn',
            RESULT:'result',
            QUITERS:'quiters'
        },


        execute: function (notification) {
            var params = notification.getBody();
            if (this.checkQueueMesseage(params)) return;
            SFSGameReponseCommand.prototype.execute.call(this, notification);
            switch (params.cmd) {
                case SFSEvent.SORT_FINISH:
                    this.onSortFinish(params);
                    break;
                case SFSEvent.GAME_OVER:
                    this.onFinisGame(params);
                    break;
            }
        },

        convertCardInCurrentGame:function (cards) {
            return (cards)?Utility.convertServerToClientCardsBinh(cards):null;
        },

        //override
        onDealCards: function (params) {
            var sfo = params.params;
            var arrCard = sfo[this.SFSData.CARDS];
            var curTurn = sfo[this.SFSData.CURRENT_TURN];
            var playerList = sfo[this.SFSData.PLAYER_LIST];
            var arrUser = [];

            for(var i=0;i<playerList.length;i++){
                var uid = this.dataUser.getUserByUserName(playerList[i]).uid;
                arrUser.push(uid)
            }

            arrCard = (arrCard === null)?[]:Utility.convertServerToClientCardsBinh(arrCard);

            this.sendNotification(GameMessage.RECEIVE_DEAL_CARDS, {
                arrCard: arrCard,
                curTurn: curTurn,
                playerList: arrUser
            });
        },

        onSortFinish: function (params) {
            var sfo = params.params;
            var isSort = sfo[this.SFSData.IS_SORT];
            var userName = sfo[this.SFSData.USER_NAME];
            var user = this.dataUser.getUserByUserName(userName);
            this.sendNotification(GameMessage.RECEIVE_PLAY_GAME, {userId: user.uid, isSort: isSort});
        },

        onFinisGame: function (params) {
            var sfo = Utility.convertSFSObjectToObject(params.params);
            var result = Utility.convertSFSArrayToArray(sfo[this.SFSData.RESULT]);
            var quiters = Utility.convertSFSArrayToArray(sfo[this.SFSData.QUITERS]);
            var arrQuiters = [];
            for (var i = 0; i < result.length; i++) {
                var obj = result[i];
                obj.cardsChi1 = Utility.convertServerToClientCardsBinh(obj.cardsChi1);
                obj.cardsChi2 = Utility.convertServerToClientCardsBinh(obj.cardsChi2);
                obj.cardsChi3 = Utility.convertServerToClientCardsBinh(obj.cardsChi3);
                obj.uid = this.dataUser.getUserByUserName(obj.userName).uid;
            }

            for (i = 0; i < quiters.length; i++) {
                arrQuiters.push(this.dataUser.getUserByUserName(quiters[i]).uid)
            }

            sfo.result = result;
            sfo.quiters = arrQuiters;

            this.sendNotification(GameMessage.RECEIVE_FINISH_GAME, {data: sfo});
        }
    },

    // STATIC MEMBERS
    {
        NAME: "SFSBinhReponseCommand"
    }
);
