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
                birthday: data.birthday
            };

            this.sendNotification(LobbyMessage.SHOW_LOADING);
            http.setBirthday(LobbyMessage.RECEIVE_SET_BIRTHDAY, sendData);
        }
    },

    // STATIC MEMBERS
    {
        NAME: "SendSetBirthdayCommand"
    }
);
