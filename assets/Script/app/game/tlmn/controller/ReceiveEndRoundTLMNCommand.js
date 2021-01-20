var BaseCommand = require('BaseCommand');
var BaseGameCommand = require('BaseGameCommand');
var GameMessage = require('GameMessage');

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
            var tableVO  = this.gameProxy.getTable();
            if (!tableVO && tableVO.id < 1) return this.showWarning(BaseGameCommand.WARNING.THE_TABLE_DOES_NOT_EXIST);

            tableVO.playCards = [];
            tableVO.resetIsCancel();
            this.sendNotification(GameMessage.ON_END_ROUND);

        }
    },

    // STATIC MEMBERS
    {
        NAME: "ReceiveEndRoundTLMNCommand"
    }
);
