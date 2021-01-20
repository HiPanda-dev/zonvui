var BaseCommand = require('BaseCommand');
var ReceiveFinishGameTLMNCommand = require('ReceiveFinishGameTLMNCommand');

var puremvc = BaseCommand.puremvc;

module.exports = puremvc.define(
    // CLASS INFO
    {
        parent: ReceiveFinishGameTLMNCommand
    },

    // INSTANCE MEMBERS
    {
        execute: function (notification) {
            ReceiveFinishGameTLMNCommand.prototype.execute.call(this, notification);
        }
    },

    // STATIC MEMBERS
    {
        NAME: "ReceiveFinishGameSamCommand"
    }
);
