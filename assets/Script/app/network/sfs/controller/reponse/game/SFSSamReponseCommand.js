var BaseCommand = require('BaseCommand');
var SFSGameReponseCommand = require('SFSGameReponseCommand');
var SFSEvent = require('SFSEvent');
var Utility = require('Utility');
var GameMessage = require('GameMessage');

var puremvc = BaseCommand.puremvc;

module.exports = puremvc.define(
    // CLASS INFO
    {
        parent: SFSGameReponseCommand
    },

    // INSTANCE MEMBERS
    {
        SFSData:{
            TIME_PASS:'timePass',
            SAM_PLAYER:'samPlayer',
            PLAYER_LIST:'playerList',
            IS_WHITE_WIN:'isWhiteWin',
            IS_SAM:'isSam',
            USER_NAME:'userName',
            CARDS:'cards',
            WHITE_WIN_TYPE:'whiteWinType',
            WINNERS:'winners',
            // RANDOM_CARD_LIST: 'randomCardList'
        },

        execute: function (notification) {
            var params = notification.getBody();
            if (this.checkQueueMesseage(params)) return;
            SFSGameReponseCommand.prototype.execute.call(this, notification);
            switch (params.cmd) {
                case SFSEvent.SAM:
                    this.onBaoSam(params);
                    break;
                case SFSEvent.WHITE_WIN:
                    this.onWhiteWin(params);
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

        //overrride
        onJoinGame: function (params) {
            var timePass = params.params[this.SFSData.TIME_PASS];
            var samPlayer = params.params[this.SFSData.SAM_PLAYER];
            samPlayer = (samPlayer)?this.dataUser.getUserByUserName(samPlayer).uid:"-1";

            this.gameProxy.gameRoom.gameRoom.timePass = (timePass) ? timePass : 0;
            this.gameProxy.gameRoom.gameRoom.samPlayer = samPlayer;

            SFSGameReponseCommand.prototype.onJoinGame.call(this, params);
        },

        //override
        onDealCards: function (params) {
            var sfo = params.params;
            var arrCard = sfo[this.SFSData.CARDS];
            var curTurn = -1;
            var playerList = sfo[this.SFSData.PLAYER_LIST];
            //var randomCardList = sfo.get(this.SFSBaseData.RANDOM_CARD_LIST);
            var isWhiteWin = sfo[this.SFSData.IS_WHITE_WIN];
            var arrUser = [];
            var uid, randomCard, arrCardList = [];

            for(var i=0;i<playerList.length;i++){
                uid = this.dataUser.getUserByUserName(playerList[i]).uid;
                arrUser.push(uid)
            }

            // // mảng cac quân bài random để chia lượt đánh trước
            // for (i = 0; i < randomCardList.size(); i++) {
            //     var obj = Utility.convertSFSObjectToObject(randomCardList.getSFSObject(i));
            //     uid = this.dataUser.getUserByUserName(obj.userName).uid;
            //     randomCard = obj.randomCard;
            //     arrCardList.push({
            //         uid: uid,
            //         randomCard: randomCard
            //     });
            // }


            this.sendNotification(GameMessage.RECEIVE_DEAL_CARDS, {
                arrCard: arrCard,
                curTurn: curTurn,
                isWhiteWin: isWhiteWin,
                playerList: arrUser,
                // randomCardList: arrCardList
            });
        },

        onBaoSam: function (params) {
            var sfo = params.params;
            var sam = sfo[this.SFSData.IS_SAM];
            var userName = sfo[this.SFSData.USER_NAME];
            var user = this.dataUser.getUserByUserName(userName);
            this.sendNotification(GameMessage.RECEIVE_BAO_SAM, {
                sam: sam,
                userId: user.uid
            });
        },

        onWhiteWin: function (params) {
            var sfo = params.params;
            var arrUser = Utility.convertSFSArrayToArray(sfo[this.SFSData.PLAYER_LIST]);
            var cards = sfo[this.SFSData.CARDS];
            var winners = sfo[this.SFSData.WINNERS];
            var winType = sfo[this.SFSData.WHITE_WIN_TYPE];
            for(var i=0;i<arrUser.length;i++){
                var o = arrUser[i];
                o.uid = this.dataUser.getUserByUserName(o.userName).uid;
            }

            for(i=0;i<winners.length;i++){
                o = winners[i];
                winners[i] = this.dataUser.getUserByUserName(winners[i]).uid;
            }

            this.sendNotification(GameMessage.RECEIVE_FINISH_GAME, {arrUser: arrUser, cards: cards, winType: winType});

        },

        onDisCard: function (params) {
            var sfo = params.params;
            var cards = sfo[this.SFSData.CARDS];
            var userName = sfo[this.SFSData.USER_NAME];
            var user = this.dataUser.getUserByUserName(userName);

            this.sendNotification(GameMessage.RECEIVE_PLAY_GAME, {cards: cards, userId: user.uid});
        },

        onCancelCard: function (params) {
            var sfo = params.params;
            var userName = sfo[this.SFSData.USER_NAME];
            var user = this.dataUser.getUserByUserName(userName);
            this.sendNotification(GameMessage.RECEIVE_PLAY_GAME, {cards: [], userId: user.uid});
        },

        onEndRound: function (params) {
            this.sendNotification(GameMessage.RECEIVE_ENROUND);
        },

        onFinisGame: function (params) {
            var sfo = params.params;
            var arrUser = Utility.convertSFSArrayToArray(sfo[this.SFSData.PLAYER_LIST]);
            var winners = sfo[this.SFSData.WINNERS];
            for(var i=0;i<arrUser.length;i++){
                var o = arrUser[i];
                o.uid = this.dataUser.getUserByUserName(o.userName).uid;
            }

            for(i=0;i<winners.length;i++){
                o = winners[i];
                winners[i] = this.dataUser.getUserByUserName(winners[i]).uid;
            }

            this.sendNotification(GameMessage.RECEIVE_FINISH_GAME, {arrUser: arrUser, winners: winners});
        }
    },

    // STATIC MEMBERS
    {
        NAME: "SFSSamReponseCommand"
    }
);
