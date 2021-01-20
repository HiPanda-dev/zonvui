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
            var event = this.facade.retrieveProxy('EventProxy');

            var params = notification.getBody().data;
            if (this.isError(params)) return;

            if (params.dataList.length === 0)
                return;

            event.updateEventDaily(params);
            this.sendNotification(LobbyMessage.ON_UPDATE_INFO_STARTGAME_POPUP , params);

            var ls = cc.sys.localStorage;
            var timeClickNotShow = ls.getItem("timeClickNotShow");

            if(timeClickNotShow !== null) {
                var date = new Date();
                if (date.getTime() - timeClickNotShow < 86400000) //86400000 is milliseconds in one day
                    return;
            }

            this.sendNotification(LobbyMessage.SHOW_STARTGAME_POPUP_SCENE);

        }
    },

    // STATIC MEMBERS
    {
        NAME: "ReceiveGetInfoStartGamePopupCommand"
    }
);
