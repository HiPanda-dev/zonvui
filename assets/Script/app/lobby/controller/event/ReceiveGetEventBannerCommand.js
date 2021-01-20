/**
 * Created by Dell Precision on 10/21/2017.
 */
var BaseCommand = require('BaseCommand');
var LobbyMessage = require('LobbyMessage');
var EventProxy = require('EventProxy');

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
            if (this.isError(params)) return;
            if (params.dataList.length === 0) return;

            var proxy = this.facade.retrieveProxy(EventProxy.NAME);

            proxy.updateBannerList(params.dataList);
            this.sendNotification(LobbyMessage.ON_UPDATE_EVENT_BANNER , params);
        }
    },

    // STATIC MEMBERS
    {
        NAME: "ReceiveGetEventBannerCommand"
    }
);
