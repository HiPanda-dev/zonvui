var BaseCommand = require('BaseCommand');
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
            this.onDisconnectChannel();
            this.onDisconnectChat();

        },

        onDisconnectChannel:function () {
            var sendData = {
                cmd: SFSSubMesseage.DISCONNECT_NETWORK,
                data: {
                }
            };

            this.sendNotification(SFSMessage.SEND_TO_SERVER, sendData);
        },

        onDisconnectChat:function () {
            var sendData = {
                cmd: SFSSubMesseage.DISCONNECT_NETWORK,
                data: {
                }
            };

            this.sendNotification(SFSMessage.SEND_TO_SERVER_CHAT, sendData);
        }
    },

    // STATIC MEMBERS
    {
        NAME: "SendLeaveChannelCommand"
    }
);
