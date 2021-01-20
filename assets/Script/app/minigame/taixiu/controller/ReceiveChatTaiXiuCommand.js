var BaseCommand = require('BaseCommand');
var MiniGameMessage = require('MiniGameMessage');

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
            var listChat = notification.getBody();
            for (var i=0 ; i<listChat.length ; i++){
                var o = {
                    displayName: listChat[i].displayName,
                    message: listChat[i].message
                }
                this.sendNotification(MiniGameMessage.ON_UPDATE_CHAT_TAI_XIU, o);
            }
        }
    },

    // STATIC MEMBERS
    {
        NAME: "ReceiveChatTaiXiuCommand"
    }
);
