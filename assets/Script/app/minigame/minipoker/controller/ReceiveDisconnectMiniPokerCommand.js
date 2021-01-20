/**
 * Created by Dell Precision on 9/12/2017.
 */

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
            var params = notification.getBody();
            //this.sendNotification(MiniGameMessage.ON_DISCONNECT);
        }
    },

    // STATIC MEMBERS
    {
        NAME: "ReceiveDisconnectMiniPokerCommand"
    }
);
