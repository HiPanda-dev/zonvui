var BaseCommand = require('BaseCommand');
var SFSSubMesseage = require('SFSSubMesseage');
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
            COMMAND:'command',
            MESSAGE:'message',
            USER_NAME:'userName',
            DISPLAY_NAME:'displayName',
            PUBLIC_CHAT:'PUBLIC_CHAT'
        },

        execute: function (notification) {
            this.sfsProxy = this.facade.retrieveProxy('SFSChatProxy');
            this.dataUser = this.facade.retrieveProxy('UserProxy');

            BaseCommand.prototype.execute.call(this, notification);
            var params = notification.getBody();
            switch (params.cmd) {
                case SFSSubMesseage.JOIN_CHAT_ZONE:
                    this.onJoinChatZone();
                    break;
                case SFSSubMesseage.SEND_CHAT:
                    this.onSendChat(params.data);
                    break;
                case SFSSubMesseage.DISCONNECT_NETWORK:
                    this.onDisconnect();
                    break;
            }
        },

        onJoinChatZone:function () {
            // var mySelf = this.dataUser.mySelf;
            // this.sfsProxy.joinZone(GameConfig.SOCKET_IP, GameConfig.SOCKET_PORT, "chatall_" + mySelf.uid, mySelf.password, "chatall", mySelf.token);
        },

        onSendChat:function (params) {
            var sfo = new SFS2X.SFSObject();
            sfo.putUtfString(this.SFSData.COMMAND, this.SFSData.PUBLIC_CHAT);
            sfo.putUtfString(this.SFSData.MESSAGE, params.message);
            sfo.putUtfString(this.SFSData.DISPLAY_NAME, params.displayName);
            sfo.putUtfString(this.SFSData.USER_NAME, this.dataUser.mySelf.uid);

            var room = this.sfsProxy.sfs.lastJoinedRoom;
            var request = new SFS2X.PublicMessageRequest(SFSEvent.PUBLIC_CHAT, sfo, room);
            this.sfsProxy.send(request);
        },

        onDisconnect: function () {
            //this.sfsProxy.onDisconnect();
        }
    },

    // STATIC MEMBERS
    {
        NAME: "SFSChatCommand"
    }
);
