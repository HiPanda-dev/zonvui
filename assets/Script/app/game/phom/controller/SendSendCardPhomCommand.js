var BaseCommand = require('BaseCommand');
var BaseGameCommand = require('BaseGameCommand');
var LogicTLMN = require('LogicTLMN');
var SFSSubMesseage = require('SFSSubMesseage');
var SFSMessage = require('SFSMessage');
var Utility = require('Utility');

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

            var mySelf = this.dataUser.mySelf;
            var card = params.card;
            var index = params.index;
            var destinationUser = params.receiveName;

            var data = {
                cmd:SFSSubMesseage.SEND_SEND_CARD,
                params:{
                    card:card,
                    index:index,
                    destinationUser:destinationUser,
                    userId:mySelf.id
                }
            };

            this.sendNotification(SFSMessage.SEND_TO_SERVER, data);
        }
    },

    // STATIC MEMBERS
    {
        NAME: "SendSendCardPhomCommand"
    }
);
