var BaseCommand = require('BaseCommand');
var LobbyMessage = require('LobbyMessage');

var puremvc = BaseCommand.puremvc;

/**
 * Lấy thông tin của user (đang ở room nào để join luôn)
 * @type {Function}
 */
module.exports = puremvc.define(
    // CLASS INFO
    {
        parent: BaseCommand
    },

    // INSTANCE MEMBERS
    {
        execute: function (notification) {
            BaseCommand.prototype.execute.call(this, notification);
            if (this.isError(notification.getBody().data)) return;

            var data = notification.body.data;
            var gameCode = data.gameCode;
            if(gameCode === undefined || gameCode === ""){
                this.sendNotification(LobbyMessage.HIDE_LOGIN_SCENE);
                this.sendNotification(LobbyMessage.SHOW_SELECT_GAME_SCENE);
                this.sendNotification(LobbyMessage.SHOW_EVENT_BANNER_SCENE);
                this.sendNotification(LobbyMessage.SHOW_TOP_MENU);
                this.sendNotification(LobbyMessage.SHOW_BOTTOM_MENU);
            }else{
                this.sendNotification(LobbyMessage.SEND_GET_CHANNEL_INFO, {channelId:gameCode});
                this.sendNotification(LobbyMessage.HIDE_LOGIN_SCENE);
            }
        }
    },

    // STATIC MEMBERS
    {
        NAME: "ReceiveGetMyOnlineInfoCommand"
    }
);
