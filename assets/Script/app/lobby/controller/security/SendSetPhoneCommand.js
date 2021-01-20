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

            var sendData = {
                displayName: mySelf.displayName,
                token: mySelf.token,
                phone: data.phone,
                OTP: data.OTP
            };

            this.sendNotification(LobbyMessage.SHOW_LOADING);
            if(mySelf.phone !== '' && mySelf.isActivePhone === 1)
                http.resetPhone(LobbyMessage.RECEIVE_SET_PHONE, sendData);
            else
                http.setPhone(LobbyMessage.RECEIVE_SET_PHONE, sendData);
        }
    },

    // STATIC MEMBERS
    {
        NAME: "SendSetPhoneCommand"
    }
);
