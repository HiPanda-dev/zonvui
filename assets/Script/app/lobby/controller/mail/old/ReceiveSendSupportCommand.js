var BaseCommand = require('BaseCommand');
var LobbyMessage = require('LobbyMessage');
var MailProxy = require('MailProxy');

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
            if(this.isError(notification.getBody().data))
            {

            }
            else
            {
                this.sendNotification(LobbyMessage.SHOW_ALERT,{content:notification.getBody().data.message});
            }

            var params = notification.getBody().data;
            var mail = this.facade.retrieveProxy('MailProxy');
            mail.updateSendSupport(params);
            this.sendNotification(LobbyMessage.ON_UPDATE_SEND_SUPPORT);
        }
    },

    // STATIC MEMBERS
    {
        NAME: "ReceiveGetSupportDetailCommand"
    }
);
