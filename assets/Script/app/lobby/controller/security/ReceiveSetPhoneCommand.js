var BaseCommand = require('BaseCommand');
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
            this.sendNotification(LobbyMessage.HIDE_LOADING);
            if (this.isError(notification.getBody().data)) return;

            var params = notification.getBody().data;
            this.sendNotification(LobbyMessage.ON_UPDATE_SET_PHONE);
        }
    },

    // STATIC MEMBERS
    {
        NAME: "ReceiveSetPhoneCommand"
    }
);
