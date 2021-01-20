var BaseCommand = require('BaseCommand');
var LobbyMessage = require('LobbyMessage');
var SFSSubMesseage = require('SFSSubMesseage');
var SFSMessage = require('SFSMessage');

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
            var channelProxy = this.facade.retrieveProxy('ChannelProxy');

            var limitIn = channelProxy.getLimitInWithBet(data.roomBet);

            if(this.checkEnoughMoney(limitIn)) return;

            var sendData = {
                cmd: SFSSubMesseage.JOIN_GAME,
                data:data
            };

            this.sendNotification(SFSMessage.SEND_TO_SERVER, sendData);
            this.sendNotification(LobbyMessage.SHOW_LOADING);
        }
    },

    // STATIC MEMBERS
    {
        NAME: "SendJoinGameCommand"
    }
);
