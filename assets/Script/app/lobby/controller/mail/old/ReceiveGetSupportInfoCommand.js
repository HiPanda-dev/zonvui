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
            var mail = this.facade.retrieveProxy('MailProxy');
            mail.isGetSupportInfo = true;
            mail.updateSupportInfo(params);
            this.sendNotification(LobbyMessage.ON_UPDATE_SUPPORT_INFO);
        }
    },

    // STATIC MEMBERS
    {
        NAME: "ReceiveGetSupportInfoCommand"
    }
);
