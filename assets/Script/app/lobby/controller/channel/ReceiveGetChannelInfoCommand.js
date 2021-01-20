var BaseCommand = require('BaseCommand');
var SFSMessage = require('SFSMessage');
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
            BaseCommand.prototype.execute.call(this, notification);
            if (this.isError(notification.getBody().data)) return;

            var params = notification.getBody();
            var channel = this.facade.retrieveProxy('ChannelProxy');
            channel.initData(params.data.channelList);
            channel.setZoneName(params.sendData.gameCode);


            this.joinZoneChannel();
            this.joinZoneChat();
        },

        joinZoneChannel:function(){
            var sendData = {
                cmd: SFSSubMesseage.JOIN_ZONE
            };

            this.sendNotification(SFSMessage.SEND_TO_SERVER, sendData);
        },

        joinZoneChat:function () {
            var sendData = {
                cmd: SFSSubMesseage.JOIN_CHAT_ZONE
            };

            this.sendNotification(SFSMessage.SEND_TO_SERVER_CHAT, sendData);
        },

        isError: function (params) {
            if (!params.isError) return false;
            this.sendNotification(LobbyMessage.SHOW_ALERT, {content: params.message});
            return true;
        }
    },

    // STATIC MEMBERS
    {
        NAME: "ReceiveGetChannelInfoCommand"
    }
);
