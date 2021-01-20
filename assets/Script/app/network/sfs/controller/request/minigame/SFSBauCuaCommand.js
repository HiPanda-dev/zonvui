var BaseCommand = require('BaseCommand');
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
        }
    },

    // STATIC MEMBERS
    {
        NAME: "SFSBauCuaCommand"
    }
);
