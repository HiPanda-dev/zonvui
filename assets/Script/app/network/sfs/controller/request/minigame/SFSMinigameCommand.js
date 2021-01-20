var BaseCommand = require('BaseCommand');
var SFSSubMesseage = require('SFSSubMesseage');
var SFSData = require('SFSData');
var GameConfig = require('GameConfig');
var SFSEvent = require('SFSEvent');

var puremvc = BaseCommand.puremvc;

module.exports = puremvc.define(
    // CLASS INFO
    {
        parent: BaseCommand
    },

    // INSTANCE MEMBERS
    {

        SFSData:{
            ROOM_ID:'roomId',
            LINES:'lines',
            PAGE: 'page',
            MONEY_TYPE: 'moneyType'
        },

        execute: function (notification) {
            BaseCommand.prototype.execute.call(this, notification);
            this.dataUser = this.facade.retrieveProxy('UserProxy');
            var params = notification.getBody();
            switch (params.cmd) {
                case SFSSubMesseage.JOIN_GAME:
                    this.onJoinGame(params);
                    break;
                case SFSSubMesseage.DISCONNECT_NETWORK:
                    this.onDisconnect(params);
                    break;
                case SFSSubMesseage.SEND_GET_RANK:
                    this.onSendGetRank(params);
                    break;
                case SFSSubMesseage.SEND_GET_HISTORY:
                    this.onSendGetHistory(params);
                    break;
            }
        },

        sendExtensionRequest: function (command, sfo) {
            if(this.sfsProxy.sfs === null)
                return;

            sfo[SFSData.USER_NAME] = this.sfsProxy.userName;

            var room = this.sfsProxy.sfs.lastJoinedRoom;
            var request = new SFS2X.Requests.System.ExtensionRequest(command, sfo, room);
            this.sfsProxy.send(request);
        },

        onJoinGame: function (params) {
            cc.log("" + GameConfig.SOCKET_IP + "" + GameConfig.SOCKET_PORT);
            this.sfsProxy.joinZone(GameConfig.SOCKET_IP, GameConfig.SOCKET_PORT, params.data.userJoin, "", params.data.zoneName, this.dataUser.mySelf.token);
            // this.sfsProxy.joinZone("192.168.0.135", 8080, params.data.userJoin, "", "minipoker", this.dataUser.mySelf.token);
        },

        onDisconnect:function () {
            this.sfsProxy.onDisconnect();
        },

        onSendGetRank: function (params) {
            params = params.params;
            var page = params.page;
            var type = params.moneyType;
            var sfsob = {};

            sfsob[this.SFSData.PAGE] = page;
            sfsob[this.SFSData.MONEY_TYPE] = type;

            this.sendExtensionRequest(SFSEvent.GET_RANK, sfsob);
        },

        onSendGetHistory: function (params) {
            params = params.params;
            var page = params.page;
            var type = params.moneyType;
            var sfsob = {};

            sfsob[this.SFSData.PAGE] = page;
            sfsob[this.SFSData.MONEY_TYPE] = type;

            this.sendExtensionRequest(SFSEvent.GET_USER_HISTORY, sfsob);
        }
    },

    // STATIC MEMBERS
    {
        NAME: "SFSMinigameCommand"
    }
);
