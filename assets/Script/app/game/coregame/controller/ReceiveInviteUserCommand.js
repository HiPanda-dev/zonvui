var BaseCommand = require('BaseCommand');
var BaseGameCommand = require('BaseGameCommand');

var puremvc = BaseCommand.puremvc;

module.exports = puremvc.define(
    // CLASS INFO
    {
        parent: BaseGameCommand
    },

    // INSTANCE MEMBERS
    {
        execute: function (notification) {

        }
    },

    // STATIC MEMBERS
    {
        NAME: "ReceiveInviteUserCommand"
    }
);
