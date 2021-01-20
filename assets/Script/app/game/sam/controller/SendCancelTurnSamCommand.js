var BaseCommand = require('BaseCommand');
var SendCancelTurnTLMNCommand = require('SendCancelTurnTLMNCommand');

var puremvc = BaseCommand.puremvc;

module.exports = puremvc.define(
    // CLASS INFO
    {
        parent: SendCancelTurnTLMNCommand
    },

    // INSTANCE MEMBERS
    {
        execute: function (notification) {
            SendCancelTurnTLMNCommand.prototype.execute.call(this, notification);
        }
    },

    // STATIC MEMBERS
    {
        NAME: "SendCancelTurnSamCommand"
    }
);
