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
            var data = notification.getBody().data;
            var mySelf = this.facade.retrieveProxy('UserProxy').mySelf;
            var config = this.facade.retrieveProxy('ConfigProxy').config;
            var http = this.facade.retrieveProxy('HttpRequestProxy');

            var sendData = {
                displayName:mySelf.displayName,
                token:mySelf.token,
                operatorId:data.operatorId,
                clientKey:config.clientKey
            };

            http.getInfoPayBackCard(LobbyMessage.RECEIVE_GET_INFO_CARD_PAY_BACK, sendData);
        }
    },

    // STATIC MEMBERS
    {
        NAME: "SendGetInfoCardPayBackCommand"
    }
);
