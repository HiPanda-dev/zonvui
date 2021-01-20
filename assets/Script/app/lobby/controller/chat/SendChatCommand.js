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
            var message = notification.getBody();
            var userName = this.facade.retrieveProxy('UserProxy').mySelf.userName;
            var displayName = this.facade.retrieveProxy('UserProxy').mySelf.displayName;

            var sendData = {
                cmd: SFSSubMesseage.SEND_CHAT,
                data:{
                    message:message,
                    userName:userName,
                    displayName:displayName
                }
            };

            this.sendNotification(SFSMessage.SEND_TO_SERVER_CHAT, sendData);
        }
    },

    // STATIC MEMBERS
    {
        NAME: "SendChatCommand"
    }
);
