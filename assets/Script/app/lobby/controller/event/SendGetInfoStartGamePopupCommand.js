var BaseCommand = require('BaseCommand');
var LobbyMessage = require('LobbyMessage');
var i18n = require('i18n');
var LocalStorage = require('LocalStorage');

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

            var event = this.facade.retrieveProxy('EventProxy');
            var http = this.facade.retrieveProxy('HttpRequestProxy');
            var mySelf = this.facade.retrieveProxy('UserProxy').mySelf;

            if(event.eventDailyList.length !== 0)
                return;

            var sendData = {
                displayName: mySelf.displayName,
                token: mySelf.token
            };
            // this.sendNotification(LobbyMessage.SHOW_LOADING);
            http.getInfoStartGamePopup(LobbyMessage.RECEIVE_GET_INFO_STARTGAME_POPUP, sendData);


        }

    },

    // STATIC MEMBERS
    {
        NAME: "SendGetInfoStartGamePopupCommand"
    }
);
