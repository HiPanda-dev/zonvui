var BaseCommand = require('BaseCommand');
var LobbyMessage = require('LobbyMessage');
var i18n = require('i18n');

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
            if(!this.isLogin(i18n.t("C0036"))) return;

            var params = notification.getBody();
            var channelId = params.channelId;
            var http = this.facade.retrieveProxy('HttpRequestProxy');
            var mySelf = this.facade.retrieveProxy('UserProxy').mySelf;
            var channelProxy = this.facade.retrieveProxy('ChannelProxy');

            var mode = channelProxy.getMode();
            var sendData = {
                displayName: mySelf.displayName,
                token:mySelf.token,
                gameCode:channelId,
                channelMoney:mode
            };
            
            http.getChannelInfo(LobbyMessage.RECEIVE_GET_CHANNEL_INFO, sendData);
        }
    },

    // STATIC MEMBERS
    {
        NAME: "SendGetChannelInfoCommand"
    }
);