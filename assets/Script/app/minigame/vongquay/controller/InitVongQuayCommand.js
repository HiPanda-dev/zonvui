var BaseCommand = require('BaseCommand');
var MiniGameMessage = require('MiniGameMessage');

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

            this.sendNotification(MiniGameMessage.SHOW_MINIGAME_VONG_QUAY);
        }
    },

    // STATIC MEMBERS
    {
        NAME: "InitVongQuayCommand"
    }
);
