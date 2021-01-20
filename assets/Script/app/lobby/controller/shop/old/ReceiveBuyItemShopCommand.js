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
            var params = notification.getBody().data;
            var mySelf = this.facade.retrieveProxy('UserProxy').mySelf;

            if (this.isError(params)) {
                // this.sendNotification(LobbyMessage.HIDE_SHOP_SCENE);
                if(mySelf.isActivePhone === 0) {
                    this.sendNotification(LobbyMessage.SHOW_SECURITY_SCENE, LobbyMessage.VALIDATE_TAB_INDEX);
                    this.sendNotification(LobbyMessage.HIDE_SHOP_SCENE);
                }
            }

            mySelf.money += params.money;

            this.sendNotification(LobbyMessage.SHOW_ALERT, {content:params.message});
            this.sendNotification(LobbyMessage.ON_UPDATE_MY_INFO);
        }
    },


    // STATIC MEMBERS
    {
        NAME: "ReceiveBuyItemShopCommand"
    }
);
