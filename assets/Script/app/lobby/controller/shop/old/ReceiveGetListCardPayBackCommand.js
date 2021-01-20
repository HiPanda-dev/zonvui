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
            var params = notification.getBody().data;

            var shopProxy = this.facade.retrieveProxy('ShopProxy');
            shopProxy.updatePayBack(params);

            this.sendNotification(LobbyMessage.ON_UPDATE_LIST_CARD_PAY_BACK);
        }
    },

    // STATIC MEMBERS
    {
        NAME: "ReceiveGetListCardPayBackCommand"
    }
);
