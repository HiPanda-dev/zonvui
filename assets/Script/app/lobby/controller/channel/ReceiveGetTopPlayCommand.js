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
            if (this.isError(notification.getBody().data)) return;

            var params = notification.getBody().data;
            var topMoneyList = params.topMoneyList;
            var topChipList = params.topChipList;

            this.sendNotification(LobbyMessage.ON_UPDATE_RANKING, {topMoneyList:topMoneyList, topChipList:topChipList});
        }
    },

    // STATIC MEMBERS
    {
        NAME: "ReceiveGetTopPlayCommand"
    }
);
