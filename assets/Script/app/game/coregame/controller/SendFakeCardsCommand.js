var BaseCommand = require('BaseCommand');
var BaseGameCommand = require('BaseGameCommand');
var SFSSubMesseage = require('SFSSubMesseage');
var SFSMessage = require('SFSMessage');

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
            var data = {
                cmd:SFSSubMesseage.SEND_FAKE_CARDS,
                params:{
                    arrCards:params.arrCards
                }
            };

            this.sendNotification(SFSMessage.SEND_TO_SERVER, data);
        }
    },

    // STATIC MEMBERS
    {
        NAME: "SendFakeCardsCommand"
    }
);
