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
            var tableVO = this.gameProxy.getTable();
            var params = notification.getBody();

            var mySelf = this.dataUser.mySelf;
            var card = tableVO.cardOfPreviousPlayer;

            var data = {
                cmd:SFSSubMesseage.SEND_STEAL_CARD,
                params:{
                    card:card,
                    userId:mySelf.id
                }
            };

            this.sendNotification(SFSMessage.SEND_TO_SERVER, data);
        }
    },

    // STATIC MEMBERS
    {
        NAME: "SendStealCardPhomCommand"
    }
);
