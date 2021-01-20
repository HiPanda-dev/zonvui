var BaseCommand = require('BaseCommand');
var SFSMiniGameResponseCommand = require('SFSMiniGameResponseCommand');
var SFSEvent = require('SFSEvent');
var MiniGameMessage = require('MiniGameMessage');
var Constants = require('Constants');
var puremvc = BaseCommand.puremvc;
var Utility = require("Utility");


module.exports = puremvc.define(
    // CLASS INFO
    {
        parent: SFSMiniGameResponseCommand
    },

    // INSTANCE MEMBERS
    {
        execute: function (notification) {
            var params = notification.getBody();
            this.minigameProxy = this.facade.retrieveProxy('PokeGoProxy');
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
                case SFSEvent.USER_DISCONNECT:
                    this.onUserDis(params);
                    break;
                case SFSEvent.RESULT_SPIN:
                    this.onUpdateResult(params);
                    break;
                case SFSEvent.CHANGE_ROOM:
                    this.onUpdateRoom(params);
                    break;
                case SFSEvent.UPDATE_POT:
                    this.onUpdatePot(params);
                    break;
                case SFSEvent.GET_USER_HISTORY:
                    this.onShowHistoryPokego(data);
                    break;
                case SFSEvent.GET_RANK:
                    this.onShowRankPokego(data);
                    break;
            }
        },

        onUserDis: function(){
            this.sendNotification(MiniGameMessage.RECEIVE_DISCONNECT, {});
        },

        onUserJoinMiniGame: function (params) {
            this.sendNotification(MiniGameMessage.RECEIVE_JOIN_MINIGAME, {curMiniGame: Constants.MINIGAME_SLOT3X3, data: params});
        },

        onUpdateResult: function(params){

            var sfsob = params.params;
            var result =  sfsob.getInt("result");
            this.currentMoney = sfsob.getLong("currentMoney");
            this.currentChip = sfsob.getLong("currentChip");

            if(result !== 0) {
                this.prize = sfsob.getInt("prize");
                this.matrix = [];

                var matrixArray = sfsob.getIntArray("matrix");

                for (var index = 0; index < matrixArray.length; index++) {
                    this.matrix.push(matrixArray[index]);
                }

                this.winLines = sfsob.getIntArray("winLines");
                this.moneyType = sfsob.getInt("moneyType");
                this.moneyAfterMinus = sfsob.getLong("moneyAfterMinus");
            }
            else{
                this.prize = 0;
                this.matrix = [];
                this.winLines = [];
                this.moneyType = 1;
                this.moneyAfterMinus = 0;
            }

            this.sendNotification(MiniGameMessage.RECEIVE_RESULT_SPIN_POKEGO, {result: result, prize: this.prize, matrix: this.matrix, winLines: this.winLines,
                    currentMoney: this.currentMoney, currentChip: this.currentChip, moneyType: this.moneyType, moneyAfterMinus: this.moneyAfterMinus});
        },

        onUpdateRoom: function(params){
            var sfsob = params.params;
            var jackpot = sfsob.getLong("jackpot");
            var roomId = sfsob.getInt("roomId");

            this.sendNotification(MiniGameMessage.RECEIVE_UPDATE_ROOM_POKEGO, {jackpot: jackpot, roomId: roomId});
        },

        onUpdatePot: function(params){
            var sfsob = params.params;
            var jackpot = sfsob.getLong("jackpot");
            this.sendNotification(MiniGameMessage.RECEIVE_UPDATE_POT_POKEGO, {jackpot: jackpot});
        },

        //onUpdateHistory: function(params){
        //    var sfsob = params.params;
        //    var content = sfsob.getSFSArray("content");
        //
        //    var array = Utility.convertSFSArrayToArray(content);
        //    var currentPage = sfsob.getInt("page");
        //    var moneyType = sfsob.getInt("moneyType");
        //
        //    cc.log("currentPage: " + currentPage);
        //    cc.log("moneyType:" + moneyType);
        //    this.sendNotification(MiniGameMessage.RECEIVE_HISTORY_POKEGO, {content: array, currentPage: currentPage, moneyType: moneyType});
        //    cc.log("sfs content" + content);
        //},
        //
        //
        //
        //onUpdateThanhTich: function(params){
        //    var sfsob = params.params;
        //    var content = sfsob.getSFSArray("content");
        //
        //    var array = Utility.convertSFSArrayToArray(content);
        //    var currentPage = sfsob.getInt("page");
        //    var moneyType = sfsob.getInt("moneyType");
        //
        //    cc.log("currentPage: " + currentPage);
        //    cc.log("moneyType:" + moneyType);
        //    cc.log("sfs content" + array);
        //    this.sendNotification(MiniGameMessage.RECEIVE_THANH_TICH, {content: array, currentPage: currentPage, moneyType: moneyType});
        //
        //},

        onShowHistoryPokego: function (params) {
            this.sendNotification(MiniGameMessage.UPDATE_HISTORY_MINIGAME, {curMiniGame: Constants.MINIGAME_SLOT3X3, data: params});
        },

        onShowRankPokego: function (params) {
            this.sendNotification(MiniGameMessage.UPDATE_RANK_MINIGAME, {curMiniGame: Constants.MINIGAME_SLOT3X3, data: params});
        }

    },

    // STATIC MEMBERS
    {
        NAME: "SFSPokeGoReponseCommand"
    }
);
