var BaseCommand = require('BaseCommand');
var Constants = require('Constants');
var LobbyMessage = require('LobbyMessage');
var SoundGameMessage = require('SoundGameMessage');

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
            var channelProxy = this.facade.retrieveProxy('ChannelProxy');

            switch (channelProxy.zoneName){
                case Constants.GAME_TLMN:
                case Constants.GAME_TLMN_SOLO:
                    this.sendNotification(LobbyMessage.SETUP_GAME_TLMN);
                    break;
                case Constants.GAME_SAM:
                case Constants.GAME_SAM_SOLO:
                    this.sendNotification(LobbyMessage.SETUP_GAME_SAM);
                    break;
                case Constants.GAME_BINH:
                    this.sendNotification(LobbyMessage.SETUP_GAME_BINH);
                    break;
                case Constants.GAME_PHOM:
                    this.sendNotification(LobbyMessage.SETUP_GAME_PHOM);
                    break;
                case Constants.GAME_POKER:
                    this.sendNotification(LobbyMessage.SETUP_GAME_POKER);
                    break;
                case Constants.GAME_BACAY:
                    this.sendNotification(LobbyMessage.SETUP_GAME_BACAY);
                    break;
                case Constants.GAME_XOCDIA:
                    this.sendNotification(LobbyMessage.SETUP_GAME_XOCDIA);
                    break;
            }
            this.sendRefreshMoney();
            this.sendNotification(LobbyMessage.HIDE_CREATE_ROOM_POPUP);
            this.sendNotification(LobbyMessage.PLAY_BACKGROUND_MUSIC , SoundGameMessage.IN_TABLE_SOUND);
        }
    },

    // STATIC MEMBERS
    {
        NAME: "ReceiveJoinRoomCommand"
    }
);
