var BaseCommand = require('BaseCommand');
var SFSEvent = require('SFSEvent');
var SFSMiniGameResponseCommand = require('SFSMiniGameResponseCommand');
var Utility = require('Utility');
var MiniGameMessage = require('MiniGameMessage');
var Constants = require('Constants');

var puremvc = BaseCommand.puremvc;

module.exports = puremvc.define(
    // CLASS INFO
    {
        parent: SFSMiniGameResponseCommand
    },

    // INSTANCE MEMBERS
    {
        execute: function (notification) {
            var params = notification.getBody();
            this.minigameProxy = this.facade.retrieveProxy('TaiXiuProxy');
            if (this.checkQueueMesseage(params)) return;
            SFSMiniGameResponseCommand.prototype.execute.call(this, notification);

            var data = null;
            if(typeof params.params === "object"){
                data = Utility.convertSFSObjectToObject(params.params);
            }

            switch (params.cmd) {
                case SFSEvent.USER_JOIN_MINIGAME:
                    this.onUserJoinMiniGame(params);
                    break;
                case SFSEvent.GET_PLAYING_INFO:
                    this.onGetPlayingInfo(data);
                    break;
                case SFSEvent.UPDATE_GAME_STATE:
                    this.onUpdateGameState(data);
                    break;
                case SFSEvent.UPDATE_BOARD_BET:
                    this.onUpdateBoardBet(data);
                    break;
                case SFSEvent.REPAY:
                    this.onRepay(data);
                    break;
                case SFSEvent.GAME_OVER:
                    this.onGameOver(data);
                    break;

                case SFSEvent.UPDATE_MONEY:
                    this.onUpdateMoney(data);
                    break;
                case SFSEvent.BET:
                    this.onBetTaiXiu(data);
                    break;
                case SFSEvent.CHANGE_MONEY_TYPE:
                    this.onChangeMoneyTypeTaiXiu(data);
                    break;
                case SFSEvent.GET_USER_HISTORY:
                    this.onShowHistoryTaiXiu(data);
                    break;

                case SFSEvent.GET_RANK:
                    this.onShowRankTaiXiu(data);
                    break;

                case SFSEvent.GET_DETAIL_SESSION:
                    this.onShowDetailSessionTaiXiu(data);
                    break;

                case SFSEvent.PUBLIC_CHAT:
                    this.onUpdateChat(params);
                    break;

                case "getTopEvent":
                    this.onUpdateTopEventTaiXiu(params);
                    break;
            }
        },

        onUserJoinMiniGame: function (params) {
            this.sendNotification(MiniGameMessage.RECEIVE_JOIN_MINIGAME, {curMiniGame: Constants.MINIGAME_TAI_XIU, data: params});
        },

        onGetPlayingInfo: function (params) {
            this.sendNotification(MiniGameMessage.RECEIVE_GET_PLAYING_INFO_TAIXIU, {curMiniGame: Constants.MINIGAME_TAI_XIU, data: params});
        },

        onUpdateGameState: function (params) {
            this.sendNotification(MiniGameMessage.RECEIVE_UPDATE_GAME_STATE_TAIXIU, {curMiniGame: Constants.MINIGAME_TAI_XIU, data: params});
        },

        onUpdateBoardBet: function (params) {
            this.sendNotification(MiniGameMessage.RECEIVE_UPDATE_BOARD_BET_TAIXIU, {curMiniGame: Constants.MINIGAME_TAI_XIU, data: params});
        },

        onRepay: function (params) {
            this.sendNotification(MiniGameMessage.RECEIVE_REPAY_TAIXIU, {curMiniGame: Constants.MINIGAME_TAI_XIU, data: params});
        },

        onGameOver: function (params) {
            this.sendNotification(MiniGameMessage.RECEIVE_GAME_OVER_TAIXIU, {curMiniGame: Constants.MINIGAME_TAI_XIU, data: params});
        },

        onUpdateMoney: function (params) {
            this.sendNotification(MiniGameMessage.RECEIVE_UPDATE_MONEY_TAIXIU, {curMiniGame: Constants.MINIGAME_TAI_XIU, data: params});
        },

        onBetTaiXiu: function (params) {
            this.sendNotification(MiniGameMessage.RECEIVE_BET_TAIXIU, {curMiniGame: Constants.MINIGAME_TAI_XIU, data: params});
        },

        onShowHistoryTaiXiu: function (params) {
            this.sendNotification(MiniGameMessage.UPDATE_HISTORY_MINIGAME, {curMiniGame: Constants.MINIGAME_TAI_XIU, data: params});
        },

        onShowRankTaiXiu: function (params) {
            this.sendNotification(MiniGameMessage.UPDATE_RANK_MINIGAME, {curMiniGame: Constants.MINIGAME_TAI_XIU, data: params});
        },

        onShowDetailSessionTaiXiu: function (params) {
            this.sendNotification(MiniGameMessage.UPDATE_DETAIL_SESSION_TAI_XIU, params);

        },

        onChangeMoneyTypeTaiXiu: function (params) {
            this.sendNotification(MiniGameMessage.RECEIVE_CHANGE_MONEY_TYPE_TAIXIU, params);
        },

        onUpdateChat:function (params) {
            if(params.userName === "") return;
            this.sendNotification(MiniGameMessage.RECEIVE_CHAT_TAIXIU, params);
        },

        onUpdateTopEventTaiXiu: function (params) {
            this.sendNotification(MiniGameMessage.UPDATE_TOP_EVENT_TAIXIU, params);
        }
    },

    // STATIC MEMBERS
    {
        NAME: "SFSTaiXiuReponseCommand"
    }
);
