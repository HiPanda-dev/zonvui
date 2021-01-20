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
            var mySelf = this.facade.retrieveProxy('UserProxy').mySelf;
            var config = this.facade.retrieveProxy('ConfigProxy').config;

            var sendData = {
                displayName: mySelf.displayName,
                token: mySelf.token,
                clientKey:config.clientKey
            };

            http.getInGameConfig(LobbyMessage.RECEIVE_GET_IN_GAME_CONFIG, sendData);
        }
    },

    // STATIC MEMBERS
    {
        NAME: "SendGetInGameConfigCommand"
    }
);
