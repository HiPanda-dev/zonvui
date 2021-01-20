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
            var data = notification.getBody();
            var mailProxy = this.facade.retrieveProxy('MailProxy');
            if (mailProxy.isGetSupportInfo) {
                console.log("Support Info Already Exists");
                return;
            }

            var http = this.facade.retrieveProxy('HttpRequestProxy');
            var mySelf = this.facade.retrieveProxy('UserProxy').mySelf;

            var sendData = {
                displayName: mySelf.displayName,
                token: mySelf.token
            };

            this.sendNotification(LobbyMessage.SHOW_LOADING);
            http.getSupportInfo(LobbyMessage.RECEIVE_GET_SUPPORT_INFO, sendData);
        }
    },

    // STATIC MEMBERS
    {
        NAME: "SendGetSupportInfoCommand"
    }
);
