var BaseCommand = require('BaseCommand');
var LobbyMessage = require('LobbyMessage');
var i18n = require('i18n');

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
            var data = notification.getBody();
            switch (data.cmd){
                case LobbyMessage.ERROR_SIT_DOWN:
                    this.sendNotification(LobbyMessage.SHOW_ALERT, {content: i18n.t(("E0001"))});
                    break;

            }
        }
    },

    // STATIC MEMBERS
    {
        NAME: "GameErrorCommand"
    }
);
