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
            if (!tableVO) return this.showWarning(BaseGameCommand.WARNING.THE_TABLE_DOES_NOT_EXIST);
            tableVO.registerOwerId = params.userId;
            this.sendNotification(GameMessage.ON_SHOW_BUY_MASTER_GAME);
        }
    },

    // STATIC MEMBERS
    {
        NAME: "ReceiveBuyMasterGameCommand"
    }
);
