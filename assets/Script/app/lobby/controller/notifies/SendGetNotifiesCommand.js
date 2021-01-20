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

            var sendData = {
                displayName:mySelf.displayName,
                token:mySelf.token
            };

            http.sendGetNotifies(LobbyMessage.RECEIVE_GET_NOTIFIES, sendData);
        }
    },

    // STATIC MEMBERS
    {
        NAME: "SendGetNotifiesCommand"
    }
);
