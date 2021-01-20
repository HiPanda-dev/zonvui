var BaseCommand = require('BaseCommand');
var MiniGameMessage = require('MiniGameMessage');
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
            this.sendNotification(MiniGameMessage.ON_INIT_GAME_MINI_POKER);
            this.sendNotification(MiniGameMessage.SHOW_MINIGAME_MINI_POKER);
        }
    },

    // STATIC MEMBERS
    {
        NAME: "InitGameCommand"
    }
);
