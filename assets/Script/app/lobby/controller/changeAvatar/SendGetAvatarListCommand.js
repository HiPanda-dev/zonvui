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
            var data = notification.getBody();

            var http = this.facade.retrieveProxy('HttpRequestProxy');
            var mySelf = this.facade.retrieveProxy('UserProxy').mySelf;
            var avatar = this.facade.retrieveProxy('AvatarProxy');
            if(avatar.isGetAvatarList)
                return;

            var sendData = {
                displayName: mySelf.displayName,
                token: mySelf.token,
            };

            this.sendNotification(LobbyMessage.SHOW_LOADING);
            http.getAvatarList(LobbyMessage.RECEIVE_GET_AVATAR_LIST, sendData);
        }
    },

    // STATIC MEMBERS
    {
        NAME: "SendGetAvatarListCommand"
    }
);
