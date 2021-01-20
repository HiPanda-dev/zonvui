var BaseCommand = require('BaseCommand');
var SFSGameReponseCommand = require('SFSGameReponseCommand');
var SFSEvent = require('SFSEvent');
var GameMessage = require('GameMessage');
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
            WHITE_WIN_TYPE:'whiteWinType',
            PLAYER_LIST:'playerList',
            USER_NAME:'userName',
            WINNER:'winner'
        },

        execute: function (notification) {
            var params = notification.getBody();
            if(this.checkQueueMesseage(params)) return;
            SFSGameReponseCommand.prototype.execute.call(this, notification);
            switch (params.cmd) {
                case SFSEvent.WHITE_WIN:
                    this.onWiteWin(params);
                    break;
                case SFSEvent.DISCARD:
                    this.onDisCard(params);
                    break;
                case SFSEvent.NEXT_TURN:
                    this.onCancelCard(params);
                    break;
                case SFSEvent.END_ROUND:
                    this.onEndRound();
                    break;
                case SFSEvent.GAME_OVER:
                    this.onFinisGame(params);
                    break;
            }
        },

        onWiteWin:function (params) {
            var sfo = params.params;
            var cards = sfo[this.SFSData.CARDS];
            var winType = sfo[this.SFSData.WHITE_WIN_TYPE];
            var arrUser = Utility.convertSFSArrayToArray(sfo[this.SFSData.PLAYER_LIST]);
            for(var i=0;i<arrUser.length;i++){
                var o = arrUser[i];
                o.uid = this.dataUser.getUserByUserName(o.userName).uid;
            }
            this.sendNotification(GameMessage.RECEIVE_FINISH_GAME, {arrUser:arrUser, cards:cards, winType:winType});
        },

        /**
         * đánh bài
         */
        onDisCard:function (params) {
            var sfo = params.params;
            var cards = sfo[this.SFSData.CARDS];
            var userName = sfo[this.SFSData.USER_NAME];
            var user = this.dataUser.getUserByUserName(userName);
            this.sendNotification(GameMessage.RECEIVE_PLAY_GAME, {cards:cards, userId:user.uid});
        },

        /**
         * bỏ bài
         */
        onCancelCard:function (params) {
            var sfo = params.params;
            var userName = sfo[this.SFSData.USER_NAME];
            var user = this.dataUser.getUserByUserName(userName);
            this.sendNotification(GameMessage.RECEIVE_PLAY_GAME, {cards:[], userId:user.uid});
        },

        onEndRound:function () {
            this.sendNotification(GameMessage.RECEIVE_ENROUND);
        },

        onFinisGame:function (params) {
            var sfo = params.params;
            var arrUser = Utility.convertSFSArrayToArray(sfo[this.SFSData.PLAYER_LIST]);
            var winners =  [sfo[this.SFSData.WINNER]];

            for(var i=0;i<arrUser.length;i++){
                var o = arrUser[i];
                o.uid = this.dataUser.getUserByUserName(o.userName).uid;
            }

            for(i=0;i<winners.length;i++){
                o = winners[i];
                winners[i] = this.dataUser.getUserByUserName(winners[i]).uid;
            }

            this.sendNotification(GameMessage.RECEIVE_FINISH_GAME, {arrUser:arrUser,winners:winners});
        }
    },

    // STATIC MEMBERS
    {
        NAME: "SFSTLMNReponseCommand"
    }
);
