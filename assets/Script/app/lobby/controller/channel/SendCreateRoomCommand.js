var BaseCommand = require('BaseCommand');
var GameConfig = require('GameConfig');
var SFSMessage = require('SFSMessage');
var LobbyMessage = require('LobbyMessage');
var SFSSubMesseage = require('SFSSubMesseage');

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
            var channelProxy = this.facade.retrieveProxy('ChannelProxy');
            var minBet = channelProxy.getMinBetRateCreateRoom(params.roomBet);
            if(this.checkEnoughMoney(minBet)) {
                this.sendNotification(LobbyMessage.HIDE_CREATE_ROOM_POPUP);
                return;
            }

            var sendData = {
                cmd: SFSSubMesseage.CREATE_ROOM,
                data: {
                    maxPlayer: params.maxPlayer,
                    password: params.password,
                    roomBet: params.roomBet,
                    roomName: params.roomName,
                    isSendCard:false
                }
            };

            this.sendNotification(SFSMessage.SEND_TO_SERVER, sendData);
            this.sendNotification(LobbyMessage.SHOW_LOADING);
        }
    },

    // STATIC MEMBERS
    {
        NAME: "SendCreateRoomCommand"
    }
);
