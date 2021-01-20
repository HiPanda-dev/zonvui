var BaseCommand = require('BaseCommand');
var SFSMessage = require('SFSMessage');
var SFSSubMesseage = require('SFSSubMesseage');

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

            var data = {
                cmd: SFSSubMesseage.SEND_GET_INFO

            };

            this.sendNotification(SFSMessage.SEND_TO_SERVER_VONG_QUAY, data);
        }
    },

    // STATIC MEMBERS
    {
        NAME: "SendGetInfoVongQuayCommand"
    }
);
