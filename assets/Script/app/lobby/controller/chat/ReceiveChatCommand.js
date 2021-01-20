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

            var displayName = notification.getBody().displayName;
            var message = notification.getBody().message;
            if(message === "") return;

            var http = this.facade.retrieveProxy('HttpRequestProxy');
            var mySelf = this.facade.retrieveProxy('UserProxy').mySelf;

            var sendData = {
                displayName:mySelf.displayName,
                token:mySelf.token,
                chatContent: message
            };

            http.sendSaveChatData(null, sendData);
            this.sendNotification(LobbyMessage.ON_UPDATE_CHAT, {displayName: displayName, message:message});
        }
    },

    // STATIC MEMBERS
    {
        NAME: "ReceiveChatCommand"
    }
);
