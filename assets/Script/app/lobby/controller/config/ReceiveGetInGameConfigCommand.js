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

            var data = notification.getBody().data;
            var config = this.facade.retrieveProxy('ConfigProxy');
            config.updateIngameConfig(data);
            config.checkAllButtonState();
        }
    },

    // STATIC MEMBERS
    {
        NAME: "ReceiveGetInGameConfigCommand"
    }
);
