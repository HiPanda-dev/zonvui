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

            var ownerId = params.ownerId;
            var tableVO = this.gameProxy.getTable();

            tableVO.ownerId = ownerId;

            this.sendNotification(GameMessage.ON_UPDATE_OWNER);
        }
    },

    // STATIC MEMBERS
    {
        NAME: "ReceiveChangeOwnerCommand"
    }
);
