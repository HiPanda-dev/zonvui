var BaseCommand = require('BaseCommand');
var SFSEvent = require('SFSEvent');
var SFSSubMesseage = require('SFSSubMesseage');
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
            this.sfsProxy = this.facade.retrieveProxy('SFSVongQuayProxy');
            SFSMinigameCommand.prototype.execute.call(this, notification);

            var params = notification.getBody();
            switch (params.cmd) {
                case SFSSubMesseage.SEND_GET_INFO:
                    this.onSendGetInfo();
                    break;

                case SFSSubMesseage.SEND_SPIN:
                    this.onSendSpin();
                    break;
            }
        },

        onSendGetInfo: function () {
            var sfo = new SFS2X.SFSObject();
            this.sendExtensionRequest(SFSEvent.GET_INFO, sfo);
        },

        onSendSpin:  function () {
            var sfo = new SFS2X.SFSObject();
            this.sendExtensionRequest(SFSEvent.SEND_SPIN, sfo);
        },

        onSendGetRank: function () {
            var sfsob = new SFS2X.SFSObject();
            this.sendExtensionRequest("getTopVip", sfsob);
        },

        onSendGetHistory: function () {
            var sfsob = new SFS2X.SFSObject();
            this.sendExtensionRequest("getHistoryVip", sfsob);
        }
    },

    // STATIC MEMBERS
    {
        NAME: "SFSVongQuayCommand"
    }
);
