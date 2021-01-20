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
            if (this.isError(notification.getBody().data)) return;

            var listChat = notification.getBody().data;
            var iStart = (listChat.length - 10  > 0)?listChat.length - 10:0;
            for (var i = iStart; i < listChat.length; i++) {
                var displayName = listChat[i].displayName;
                var message = listChat[i].chatContent;
                this.sendNotification(LobbyMessage.ON_UPDATE_CHAT, {displayName: displayName, message: message});
            }
        }
    },

    // STATIC MEMBERS
    {
        NAME: "ReceiveGetChatDataCommand"
    }
);
