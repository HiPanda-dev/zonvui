var BaseCommand = require('BaseCommand');
var Constants = require('Constants');
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
            //get rankking
            var http = this.facade.retrieveProxy('HttpRequestProxy');
            var mySelf = this.facade.retrieveProxy('UserProxy').mySelf;

            var sendData = {
                displayName: mySelf.displayName,
                token:mySelf.token,
                gameCode:Constants.CURRENT_GAME
            };

            http.getTopPlayer(LobbyMessage.RECEIVE_GET_TOP_PLAY, sendData);
        }
    },

    // STATIC MEMBERS
    {
        NAME: "SendGetTopPlayCommand"
    }
);
