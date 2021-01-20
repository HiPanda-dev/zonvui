var BaseCommand = require('BaseCommand');
var ReceiveEndRoundTLMNCommand = require('ReceiveEndRoundTLMNCommand');

var puremvc = BaseCommand.puremvc;

module.exports = puremvc.define(
    // CLASS INFO
    {
        parent: ReceiveEndRoundTLMNCommand
    },

    // INSTANCE MEMBERS
    {
        execute: function (notification) {
            ReceiveEndRoundTLMNCommand.prototype.execute.call(this, notification);
        }
    },

    // STATIC MEMBERS
    {
        NAME: "ReceiveEndRoundSamCommand"
    }
);
