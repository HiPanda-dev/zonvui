var BaseCommand = require('BaseCommand');
var MiniGameMessage = require('MiniGameMessage');
var SFSData = require('SFSData');
var SFSEvent = require('SFSEvent');
var SFSMinigameCommand = require('SFSMinigameCommand');
var puremvc = BaseCommand.puremvc;

module.exports = puremvc.define(
    // CLASS INFO
    {
        parent: SFSMinigameCommand
    },

    // INSTANCE MEMBERS
    {
        execute: function (notification) {

            this.sfsProxy = this.facade.retrieveProxy('SFSMiniPokerProxy');
            this.dataUser = this.facade.retrieveProxy('UserProxy');
            SFSMinigameCommand.prototype.execute.call(this, notification);

            var params = notification.getBody();

            switch (params.cmd) {
                case MiniGameMessage.SEND_SPIN_MINI_POKER:
                    this.sendSpin(params);
                    break;
            }

        },

        sendSpin: function(params){
            var sfo = {};
            sfo[SFSData.VALUE] = params.params.value;
            sfo[SFSData.TYPE] = params.params.type;

            this.sendExtensionRequest(SFSEvent.SPIN, sfo);
        },

        onSendGetRank: function (params) {
            params = params.params;
            var page = params.page;
            var type = params.moneyType;
            var sfo = {};
            sfo[this.SFSData.PAGE] = page;
            sfo[this.SFSData.MONEY_TYPE] = type;

            this.sendExtensionRequest("getTop", sfo);
        }

        // onSendGetHistory: function (params) {
        //     params = params.params;
        //     var page = params.page;
        //     var type = params.moneyType;
        //     var sfsob = new SFS2X.SFSObject();
        //     sfsob.putInt(this.SFSData.PAGE, page);
        //     sfsob.putInt(this.SFSData.MONEY_TYPE, type);
        //     this.sendExtensionRequest("getHistory", sfsob);
        // }
    },

    // STATIC MEMBERS
    {
        NAME: "SFSMiniPokerCommand"
    }
);
