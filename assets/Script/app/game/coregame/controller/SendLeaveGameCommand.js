var BaseGameCommand = require('BaseGameCommand');
var SFSSubMesseage = require('SFSSubMesseage');
var SFSMessage = require('SFSMessage');
var BaseCommand = require('BaseCommand');

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
            var data = {
                cmd:(tableVO.registerLeave)?SFSSubMesseage.SEND_LEAVE_GAME:SFSSubMesseage.SEND_CANCEL_REGISTER_QUIT,
                params:{}
            };

            this.sendNotification(SFSMessage.SEND_TO_SERVER, data);
        }
    },

    // STATIC MEMBERS
    {
        NAME: "SendLeaveGameCommand"
    }
);
