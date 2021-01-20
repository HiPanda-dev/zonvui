
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

            var event = this.facade.retrieveProxy('EventProxy');
            var http = this.facade.retrieveProxy('HttpRequestProxy');
            var mySelf = this.facade.retrieveProxy('UserProxy').mySelf;

            if(event.eventList.length !== 0)
                return;

            var sendData = {
                displayName: mySelf.displayName,
                token: mySelf.token
            };

            http.getAllCurrentEvent(LobbyMessage.RECEIVE_GET_ALL_CURRENT_EVENT, sendData);
        }

    },

    // STATIC MEMBERS
    {
        NAME: "SendGetAllCurrentEventCommand"
    }
);
