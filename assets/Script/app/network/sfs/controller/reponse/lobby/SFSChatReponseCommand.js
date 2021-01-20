var BaseCommand = require('BaseCommand');
var SFSEvent = require('SFSEvent');
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
            var params = notification.getBody();

            switch (params.cmd) {
                case SFSEvent.PUBLIC_CHAT:
                    this.onUpdateChat(params);
                    break;

            }
        },

        onUpdateChat:function (params) {
            if(params.userName === "") return;
            this.sendNotification(LobbyMessage.RECEIVE_CHAT, params);
        }
    },

    // STATIC MEMBERS
    {
        NAME: "SFSChatReponseCommand"
    }
);
