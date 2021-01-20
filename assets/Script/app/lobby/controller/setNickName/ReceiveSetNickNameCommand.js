var BaseCommand = require('BaseCommand');
var LobbyMessage = require('LobbyMessage');
var UserProxy = require('UserProxy');

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
            if(this.isError(notification.getBody().data)) return;

            var params = notification.getBody().data;
            var sendData = notification.getBody().sendData;
            var dataUser = this.facade.retrieveProxy('UserProxy');
            var mySelf = dataUser.mySelf;
            mySelf.displayName = sendData.displayName;

            this.sendNotification(LobbyMessage.SHOW_ALERT,{content:params.message});
            this.sendNotification(LobbyMessage.ON_UPDATE_MY_INFO);
            this.sendNotification(LobbyMessage.HIDE_FACEBOOK_VALIDATE_SCENE);
        }
    },

    // STATIC MEMBERS
    {
        NAME: "ReceiveSetNickNameCommand"
    }
);
