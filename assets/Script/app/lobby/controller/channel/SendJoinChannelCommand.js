var BaseCommand = require('BaseCommand');
var SFSSubMesseage = require('SFSSubMesseage');
var SFSMessage = require('SFSMessage');
var LobbyMessage = require('LobbyMessage');

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
            var channelId = notification.getBody().channelId;
            var channelProxy = this.facade.retrieveProxy("ChannelProxy");

            channelProxy.updateCurrentChildId(channelId);
            var sendData = {
                cmd: SFSSubMesseage.JOIN_ZONE
            };

            this.sendNotification(LobbyMessage.SEND_LEAVE_CHANNEL);
            this.sendNotification(SFSMessage.SEND_TO_SERVER, sendData);
            this.sendNotification(LobbyMessage.SHOW_LOADING);
        }
    },

    // STATIC MEMBERS
    {
        NAME: "SendJoinChannelCommand"
    }
);
