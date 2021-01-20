var BaseCommand = require('BaseCommand');
var GameMessage = require('GameMessage');
var ReceiveLeaveGameCommand = require('ReceiveLeaveGameCommand');

var puremvc = BaseCommand.puremvc;

module.exports = puremvc.define(
    // CLASS INFO
    {
        parent: ReceiveLeaveGameCommand
    },

    // INSTANCE MEMBERS
    {
        execute: function (notification) {
            ReceiveLeaveGameCommand.prototype.execute.call(this, notification);
            var params = notification.getBody();
            var userId = params.userIdLeave;
            var tableVO = this.gameProxy.getTable();
            if(userId === tableVO.ownerId){
                tableVO.ownerId = -1;
                this.sendNotification(GameMessage.ON_UPDATE_OWNER);
            }
        }
    },

    // STATIC MEMBERS
    {
        NAME: "ReceiveLeaveGameXocDiaCommand"
    }
);
