var BaseCommand = require('BaseCommand');
var GameMessage = require('GameMessage');
var BaseGameCommand = require('BaseGameCommand');

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
            var params = notification.getBody();
            var tableVO = this.gameProxy.getTable();
            if (!tableVO && tableVO.id < 1) return this.showWarning(this.WARNING.THE_TABLE_DOES_NOT_EXIST);

            this.sendNotification(GameMessage.ON_DICE_RESULT, params);
        }
    },

    // STATIC MEMBERS
    {
        NAME: "ReceiveDiceResultXocDiaCommand"
    }
);
