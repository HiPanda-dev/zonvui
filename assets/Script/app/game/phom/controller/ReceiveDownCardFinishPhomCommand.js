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
            var params = notification.getBody();

            var userId = params.userId;
            var tableVO = this.gameProxy.getTable();

            if (!tableVO && tableVO.id < 1) return this.showWarning(BaseGameCommand.WARNING.THE_TABLE_DOES_NOT_EXIST);

            this.sendNotification(GameMessage.ON_DOWN_CARD_FINISH, {
                userId: userId
            });
        }
    },
    // STATIC MEMBERS
    {
        NAME: "ReceiveDownCardFinishPhomCommand"
    }
);
