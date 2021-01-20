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

            var userProxy = this.facade.retrieveProxy('UserProxy');
            var channelProxy = this.facade.retrieveProxy('ChannelProxy');
            var limitIn = channelProxy.getListBetCreateTable(userProxy.mySelf.money);
            if(!data){
                data = {};
                data.roomBet = null;
            }

            if(this.checkEnoughMoney(parseInt(channelProxy.getCurrentLimitIn()[0]))) return;

            var sendData = {
                cmd: SFSSubMesseage.QUICK_JOIN_GAME,
                data:{
                    roomBet: data.roomBet,
                    maxPlayer: channelProxy.getCurrentMaxTablePlayer()
                }
            };

            this.sendNotification(SFSMessage.SEND_TO_SERVER, sendData);
            this.sendNotification(LobbyMessage.SHOW_LOADING);
        }
    },

    // STATIC MEMBERS
    {
        NAME: "SendQuickJoinGameCommand"
    }
);
