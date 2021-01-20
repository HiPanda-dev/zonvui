var BaseCommand = require('BaseCommand');
var LobbyMessage = require('LobbyMessage');
var GameConfig = require('GameConfig');

var puremvc = BaseCommand.puremvc;

module.exports = puremvc.define(
    // CLASS INFO
    {
        parent: BaseCommand
    },

    // INSTANCE MEMBERS
    {
        execute: function(notification) {
            BaseCommand.prototype.execute.call(this, notification);

            var channelProxy = this.facade.retrieveProxy('ChannelProxy');
            var params = notification.getBody();
            var roomProxy = this.facade.retrieveProxy('RoomProxy');
            roomProxy.initData(params);
            this.sendRefreshMoney();
            this.sendNotification(LobbyMessage.SHOW_CHANNEL_SCENE);
            this.sendNotification(LobbyMessage.HIDE_TOP_PLAYER);
            this.sendNotification(LobbyMessage.HIDE_SELECT_GAME_SCENE);
            this.sendNotification(LobbyMessage.HIDE_EVENT_BANNER_SCENE);
            this.sendNotification(LobbyMessage.SEND_GET_TOP_PLAY);
            this.sendNotification(LobbyMessage.HIDE_LOADING);

            this.preloadScene(channelProxy.getGameSceneByZoneName(channelProxy.zoneName));
        },

        preloadScene:function (currentScene) {
            cc.director.preloadScene(currentScene, function () {
                console.log("PRELOAD SCENE: " + currentScene);
            });
        }
    },

    // STATIC MEMBERS
    {
        NAME: "ReceiveJoinChannelCommand"
    }
);
