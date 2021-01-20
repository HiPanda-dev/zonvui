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

            var http = this.facade.retrieveProxy('HttpRequestProxy');
            var config = this.facade.retrieveProxy('ConfigProxy').config;
            var sendData = {
                securityCode: config.securityCode
            };

            http.sendGetChatData(LobbyMessage.RECEIVE_GET_CHAT_DATA, sendData);
        }
    },

    // STATIC MEMBERS
    {
        NAME: "SendGetChatDataCommand"
    }
);
