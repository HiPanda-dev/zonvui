var BaseCommand = require('BaseCommand');
var LobbyMessage = require('LobbyMessage');
var Constants = require('Constants');
var SFSSubMesseage = require('SFSSubMesseage');
var SFSMessage = require('SFSMessage');
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
            var mode = notification.getBody().mode;
            var channelProxy = this.facade.retrieveProxy("ChannelProxy");
            channelProxy.setMode(mode);
            var sendData = {
                cmd: SFSSubMesseage.SEND_CHANGE_MODE,
                data: {
                    mode:mode
                }
            };

            this.sendNotification(SFSMessage.SEND_TO_SERVER, sendData);
            this.sendNotification(LobbyMessage.SEND_GET_CHANNEL_INFO, {channelId:Constants.CURRENT_GAME});
        }
    },

    // STATIC MEMBERS
    {
        NAME: "SendChangeModeGameCommand"
    }
);
