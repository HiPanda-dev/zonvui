var BaseCommand = require('BaseCommand');
var SFSGameReponseCommand = require('SFSGameReponseCommand');
var LobbyMessage = require('LobbyMessage');
var UserProxy = require('UserProxy');
var GameMessage = require('GameMessage');
var SFSEvent = require('SFSEvent');
var Utility = require('Utility');
var i18n = require('i18n');

var puremvc = BaseCommand.puremvc;

module.exports = puremvc.define(
    // CLASS INFO
    {
        parent: SFSGameReponseCommand
    },

    // INSTANCE MEMBERS
    {
        SFSData:{
            USER_NAME:'userName',
            POSITION:'position',
            SUCCESS:'success',
            PLAYER_LIST: 'playerList',
            TYPE_BET:'typeBet',
            TIME_LEFT:'timeLeft',
            GAME_STATE:'gameState',
            BOARD_BETS:'boardBets',
            PLAYER_BETS:'playerBets',
            DICE_RESULT:'diceResult',
            TYPE_RESULT:'typeResult',
            UPDATE_MONEY_LIST:'updateMoneyList',
            MONEY:'money',
            COUNT_DOWN_DESTROY:'countdownDestroy'
        },

        execute: function (notification) {
            var params = notification.getBody();
            if (this.checkQueueMesseage(params)) return;
            this.dataUser = this.facade.retrieveProxy(UserProxy.NAME);
            SFSGameReponseCommand.prototype.execute.call(this, notification);
            switch (params.cmd) {
                case SFSEvent.UPDATE_ROOM_MASTER:
                    this.onUpdateOwnerIdXocDia(params);
                    break;
                case SFSEvent.START_GAME:
                    this.onStartGameXocDia(params);
                    break;
                case SFSEvent.START_BETTING:
                    this.onStartBettingXocDia(params);
                    break;
                case SFSEvent.STOP_BETTING:
                    this.onStopBettingXocDia(params);
                    break;
                case SFSEvent.DICE_RESULT:
                    this.onShowDiceResultXocDia(params);
                    break;
                case SFSEvent.BET:
                    this.onUpdateBetXocDia(params);
                    break;
                case SFSEvent.GAME_OVER:
                    this.onGameOverXocDia(params);
                    break;
                case SFSEvent.SOLD_OUT:
                    this.onSoldOutXocDia(params);
                    break;
                case SFSEvent.UPDATE_ROOM:
                    this.onUpdateRoomXocDia(params);
                    break;
                case SFSEvent.BUY_ROOM_MASTER:
                    this.onBuyRoomMasterXocDia(params);
                    break;
                case SFSEvent.CANCEL_BET:
                    this.onCancelBetXocDia(params);
                    break;
                case SFSEvent.COUNT_DOWN:
                    this.onCountDownXocDia(params);
                    break;
                case SFSEvent.SOLD:
                    this.onSoldBetXocDia(params);
                    break;
                case SFSEvent.COUNT_DOWN_DESTROY:
                    this.onCountDownDestroyXocDia(params);
                    break;
            }
        },

        //override
        onSitDown: function (params) {
            var sfo = params.params;
            var userName = sfo.get(this.SFSData.USER_NAME);
            var seatId = sfo.get(this.SFSData.POSITION) + 1;
            var success = sfo.get(this.SFSData.SUCCESS);
            var user = this.dataUser.getUserByUserName(userName);

            if (success) {
                this.sendNotification(GameMessage.RECEIVE_SIT_DOWN, {uid: user.uid, seatId: seatId});
            } else {
                this.sendNotification(LobbyMessage.SEND_GAME_ERROR, {cmd: LobbyMessage.ERROR_SIT_DOWN});
            }

        },

        onUpdateOwnerIdXocDia: function (params) {
            var sfo = params.params;
            var userName = sfo.get(this.SFSData.USER_NAME);
            var user = this.dataUser.getUserByUserName(userName);
            this.sendNotification(GameMessage.RECEIVE_CHANGE_OWNER, {ownerId: user.uid});
        },

        //override
        onJoinGame: function (params) {
            var sfo = params.params;
            var listTotalBet = sfo.get(this.SFSData.BOARD_BETS);
            var listMyBet = sfo.get(this.SFSData.PLAYER_BETS);
            var timeBet = sfo.get(this.SFSData.TIME_LEFT);

            this.gameProxy.gameRoom.gameRoom.listTotalBet = listTotalBet;
            this.gameProxy.gameRoom.gameRoom.listMyBet = listMyBet;
            this.gameProxy.gameRoom.gameRoom.timeBet = timeBet;
            SFSGameReponseCommand.prototype.onJoinGame.call(this, params);
        },

        onStartGameXocDia: function (params) {
            this.sendNotification(GameMessage.RECEIVE_START_GAME);
        },

        onStartBettingXocDia: function (params) {
            this.sendNotification(GameMessage.RECEIVE_START_BETTING_GAME);
        },

        onStopBettingXocDia: function (params) {
            this.sendNotification(GameMessage.RECEIVE_STOP_BETTING_GAME);
        },

        onShowDiceResultXocDia: function (params) {
            var sfo = params.params;
            var diceResult = sfo.get(this.SFSData.DICE_RESULT);
            var posResult = sfo.get(this.SFSData.TYPE_RESULT);
            this.sendNotification(GameMessage.RECEIVE_DICE_RESULT, {arrDice: diceResult, arrPos: posResult});
        },

        onUpdateBetXocDia: function (params) {
            var sfo = params.params;
            var obj = {};
            obj.sucess = sfo.get(this.SFSData.SUCCESS);
            obj.bet = parseInt(sfo.get(this.SFSData.MONEY));
            obj.pos = sfo.get(this.SFSData.POSITION);
            obj.typeBet = sfo.get(this.SFSData.TYPE_BET);
            obj.userName = sfo.get(this.SFSData.USER_NAME);
            obj.uid = this.dataUser.getUserByUserName(obj.userName).uid;
            this.sendNotification(GameMessage.RECEIVE_PLAY_GAME, obj);
        },

        onGameOverXocDia: function (params) {
            var sfo = params.params;
            var vtPlayer = [];
            var playerList = Utility.convertSFSArrayToArray(sfo.get(this.SFSData.UPDATE_MONEY_LIST));
            for (var i = 0; i < playerList.length; i++) {
                var obj = playerList[i];
                var o = {};
                if(obj.userName === "") continue;
                o.money = obj.money;
                o.uid = this.dataUser.getUserByUserName(obj.userName).uid;
                vtPlayer.push(o);
            }
            this.sendNotification(GameMessage.RECEIVE_FINISH_GAME, {vtPlayer: vtPlayer});
        },

        onSoldOutXocDia: function (params) {
            this.sendNotification(GameMessage.RECEIVE_SOLD_BET, params.params);
        },

        onUpdateRoomXocDia: function (params) {
            cc.log("onUpdateRoomXocDia")
        },

        onBuyRoomMasterXocDia: function (params) {
            var sfo = params.params;
            var userName = sfo.get(this.SFSData.USER_NAME);
            var sucess = sfo.get(this.SFSData.SUCCESS);
            var user = this.dataUser.getUserByUserName(userName);
            if(sucess && user.uid === this.dataUser.mySelf.id){
                this.sendNotification(LobbyMessage.SHOW_ALERT, {content: i18n.t("G0007")});
            }
            this.sendNotification(GameMessage.RECEIVE_BUY_MASTER_GAME, {userId:userId});
        },

        onCancelBetXocDia: function (params) {
            //this.sendNotification(GameMessage.RECEIVE_CANCEL_BET, obj);
        },

        onCountDownXocDia: function (params) {
            var sfo = params.params;
            var timeCoutDown = sfo.get(this.SFSData.TIME_LEFT);
            this.sendNotification(GameMessage.RECEIVE_TIME_COUNT_DOWN, {timeCoutDown: timeCoutDown});
        },

        onSoldBetXocDia:function (params) {
            var sfo = params.params;
            var position = sfo.get(this.SFSData.POSITION);
            var sucess = sfo.get(this.SFSData.SUCCESS);
            this.sendNotification(GameMessage.RECEIVE_SOLD_BET, {position: position, sucess:sucess});
        },

        onCountDownDestroyXocDia:function(params){
            var sfo = params.params;
            var time = sfo.get(this.SFSData.TIME_LEFT);
            this.sendNotification(GameMessage.RECEIVE_COUNT_DOWN_DESTROY_GAME, {time: time});
        }


    },

    // STATIC MEMBERS
    {
        NAME: "SFSPokerReponseCommand"
    }
);
