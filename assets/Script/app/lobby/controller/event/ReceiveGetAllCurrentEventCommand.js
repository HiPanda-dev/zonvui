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
            var configProxy = this.facade.retrieveProxy('ConfigProxy');
            var event = this.facade.retrieveProxy('EventProxy');

            if(params.dataList.length === 0)
                return;
            event.updateEvent(params);

            for(var i = 0;i<params.dataList.length;i++){
                configProxy.updateConfigDataList(params.dataList[i].buttons);
            }

            this.sendNotification(LobbyMessage.ON_UPDATE_DETAIL_EVENT , params);
        }
    },

    // STATIC MEMBERS
    {
        NAME: "ReceiveGetAllCurrentEventCommand"
    }
);
