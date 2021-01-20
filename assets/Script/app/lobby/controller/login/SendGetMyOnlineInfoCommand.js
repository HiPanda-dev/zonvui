
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
            var params = notification.getBody();
            var userId = params.userId;

            var http = this.facade.retrieveProxy('HttpRequestProxy');
            var config = this.facade.retrieveProxy('ConfigProxy').config;

            var sendData = {
                userId:userId,
                securityCode:config.securityCode
            };
            http.getUserOnlineInfo(LobbyMessage.RECEIVE_GET_MY_ONLINE_INFO, sendData);
        }
    },

    // STATIC MEMBERS
    {
        NAME: "SendGetMyOnlineInfoCommand"
    }
);
