var BaseCommand = require('BaseCommand');
var BaseGameCommand = require('BaseGameCommand');
var GameConfig = require('GameConfig');
var GameMessage = require('GameMessage');
var LobbyMessage = require('LobbyMessage');

var puremvc = BaseCommand.puremvc;

module.exports = puremvc.define(
    // CLASS INFO
    {
        parent: BaseGameCommand
    },

    // INSTANCE MEMBERS
    {
        execute: function (notification) {
            BaseGameCommand.prototype.execute.call(this, notification);
            var tableVO = this.gameProxy.getTable();
            if (!tableVO && tableVO.id < 1) return this.showWarning(this.WARNING.THE_TABLE_DOES_NOT_EXIST);
            tableVO.reset();
            this.sendNotification(GameMessage.ON_START_GAME);
        },

    },

    // STATIC MEMBERS
    {
        NAME: "ReceiveStartGameXocDiaCommand"
    }
);
