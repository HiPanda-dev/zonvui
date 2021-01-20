var BaseCommand = require('BaseCommand');
var SFSEvent = require('SFSEvent');
var MiniGameMessage = require('MiniGameMessage');
var Constants = require('Constants');
var Utility = require('Utility');
var SFSMiniGameResponseCommand = require('SFSMiniGameResponseCommand');

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
            this.minigameProxy = this.facade.retrieveProxy('VongQuayProxy');
            // if (this.checkQueueMesseage(params)) return;
            SFSMiniGameResponseCommand.prototype.execute.call(this, notification);

            switch (params.cmd) {
                case SFSEvent.USER_JOIN_MINIGAME:
                    this.onUserJoinMiniGame(params);
                    break;

                case SFSEvent.GET_INFO:
                    this.onUpdateResult(params);
                    break;

                case "spin":
                    this.onUpdateInfo(params);
                    break;

                case "getHistoryVip":
                    this.onShowHistoryVongQuay(params);
                    break;

                case "getTopVip":
                    this.onShowRankVongQuay(params);
                    break;

            }
        },

        onUserJoinMiniGame: function (params) {
            this.sendNotification(MiniGameMessage.RECEIVE_JOIN_MINIGAME, {curMiniGame: Constants.MINIGAME_VONG_QUAY, data: params});
        },

        onUpdateResult: function (params) {
            var data = Utility.convertSFSObjectToObject(params.params);
            this.sendNotification(MiniGameMessage.ON_UPDATE_INFO_VONG_QUAY, data);
        },

        onUpdateInfo: function (params) {
            var data = Utility.convertSFSObjectToObject(params.params);
            this.sendNotification(MiniGameMessage.RECEIVE_RESULT_SPIN_VONG_QUAY, data);
        },

        onShowHistoryVongQuay: function (params) {
            var data = Utility.convertSFSObjectToObject(params.params);
            this.sendNotification(MiniGameMessage.UPDATE_HISTORY_MINIGAME, {curMiniGame: Constants.MINIGAME_VONG_QUAY, data: data});
        },

        onShowRankVongQuay: function (params) {
            var data = Utility.convertSFSObjectToObject(params.params);
            this.sendNotification(MiniGameMessage.UPDATE_RANK_MINIGAME, {curMiniGame: Constants.MINIGAME_VONG_QUAY, data: data});
        }
    },

    // STATIC MEMBERS
    {
        NAME: "SFSVongQuayReponseCommand"
    }
);
