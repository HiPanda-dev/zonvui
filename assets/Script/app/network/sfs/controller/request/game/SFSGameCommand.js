var BaseCommand = require('BaseCommand');
var UserProxy = require('UserProxy');
var SFSData = require('SFSData');
var SFSEvent = require('SFSEvent');
var SFSSubMesseage = require('SFSSubMesseage');

var puremvc = BaseCommand.puremvc;

module.exports = puremvc.define(
    // CLASS INFO
    {
        parent: BaseCommand
    },

    // INSTANCE MEMBERS
    {
        execute: function (notification) {
            var params = notification.getBody();
            this.dataUser = this.facade.retrieveProxy(UserProxy.NAME);
            this.sfsProxy = this.facade.retrieveProxy('SFSGameProxy');

            switch (params.cmd) {
                case  SFSSubMesseage.SEND_FAKE_CARDS:
                    this.onSendFakeCard(params);
                    break;
                case SFSSubMesseage.SEND_LEAVE_GAME:
                    this.onSendLeaveGame();
                    break;
                case SFSSubMesseage.SEND_CANCEL_REGISTER_QUIT:
                    this.onSendCancelRegisterQuit();
                    break;
                case SFSSubMesseage.SEND_SIT_DOWN:
                    this.onSitDown(params);
                    break;
                case SFSSubMesseage.SEND_BUY_MASTER:
                    this.onBuyMasterGame();
                    break;
                case SFSSubMesseage.SEND_CHAT:
                    this.onSendChat(params.data);
                    break;
            }
        },

        sendExtensionRequest: function (command, sfo) {
            sfo[SFSData.USER_NAME] = this.sfsProxy.userName;

            var room = this.sfsProxy.sfs.lastJoinedRoom;
            var request = new SFS2X.Requests.System.ExtensionRequest(command, sfo, room);
            this.sfsProxy.send(request);
        },

        onSendFakeCard: function (params) {

        },

        onSendLeaveGame:function () {
             var sfo = {}
             this.sendExtensionRequest(SFSEvent.REGISTER_QUIT, sfo);
        },

        onSendCancelRegisterQuit:function () {
            var sfo = {};
            this.sendExtensionRequest(SFSEvent.CANCEL_REGISTER_QUIT, sfo);
        },

        onSitDown:function (params) {

        },

        onBuyMasterGame:function () {

        },

        onSendChat:function (params) {
            var sfo = {};
            sfo[SFSData.COMMAND] = SFSData.PUBLIC_CHAT;
            sfo[SFSData.MESSAGE] = params.message.content;
            sfo[SFSData.TYPE] = params.message.type;
            sfo[SFSData.DISPLAY_NAME] = params.displayName;
            sfo[SFSData.USER_NAME] = this.dataUser.mySelf.uid;

            var room = this.sfsProxy.sfs.lastJoinedRoom;
            var request = new SFS2X.Requests.System.PublicMessageRequest(SFSEvent.PUBLIC_CHAT, sfo, room);
            this.sfsProxy.send(request);
        },
    },

    // STATIC MEMBERS
    {
        NAME: "SFSGameCommand"
    }
);
