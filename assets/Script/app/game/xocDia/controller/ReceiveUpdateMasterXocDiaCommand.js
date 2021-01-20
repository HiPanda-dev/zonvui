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
            var body = notification.getBody();
            // var user = this.dataUser.getUserById(body.ownerId);
            // var tableVO = this.gameProxy.getTable();

            //this.sendNotification(GameMessage.ON_SIT_DOWN, { seatId:seat.id, user:seat.user} );
        }
    },

    // STATIC MEMBERS
    {
        NAME: "ReceiveUpdateMasterXocDiaCommand"
    }
);
