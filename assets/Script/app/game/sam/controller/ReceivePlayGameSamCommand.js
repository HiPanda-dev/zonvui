var BaseCommand = require('BaseCommand');
var ReceivePlayGameTLMNCommand = require('ReceivePlayGameTLMNCommand');

var puremvc = BaseCommand.puremvc;

module.exports = puremvc.define(
    // CLASS INFO
    {
        parent: ReceivePlayGameTLMNCommand
    },

    // INSTANCE MEMBERS
    {
        execute: function (notification) {
            ReceivePlayGameTLMNCommand.prototype.execute.call(this, notification);
        }
    },

    // STATIC MEMBERS
    {
        NAME: "ReceivePlayGameSamCommand"
    }
);
