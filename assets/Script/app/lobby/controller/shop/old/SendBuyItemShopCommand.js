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
        execute: function (notification) {
            BaseCommand.prototype.execute.call(this, notification);
            var data = notification.getBody();
            if(this.isError(data)) return;

            var http = this.facade.retrieveProxy('HttpRequestProxy');
            var config = this.facade.retrieveProxy('ConfigProxy').config;
            var mySelf = this.facade.retrieveProxy('UserProxy').mySelf;

            var sendData = {
                displayName:mySelf.displayName,
                token:mySelf.token,
                provider:data.provider,
                cardValue:data.cardValue,
                quantity:data.quantity,
                otp:data.otp,
                clientKey:config.clientKey
            };

            http.buyItemShop(LobbyMessage.RECEIVE_BUY_ITEM_SHOP, sendData);
        },

        isError:function (data) {
            if(data.quantity === ""){
                this.sendNotification(LobbyMessage.SHOW_ALERT,{content:i18n.t("C0038")});
                return true;
            }

            if(data.otp === ""){
                this.sendNotification(LobbyMessage.SHOW_ALERT,{content:i18n.t("C0039")});
                return true;
            }

            return false;
        }
    },

    // STATIC MEMBERS
    {
        NAME: "SendBuyItemShopCommand"
    }
);
