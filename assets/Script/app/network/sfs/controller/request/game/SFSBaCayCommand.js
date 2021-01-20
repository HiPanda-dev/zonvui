var BaseCommand = require('BaseCommand');
var SFSGameCommand = require('SFSGameCommand');

var puremvc = BaseCommand.puremvc;

module.exports = puremvc.define(
    // CLASS INFO
    {
        parent: SFSGameCommand
    },

    // INSTANCE MEMBERS
    {
        execute: function (notification) {
            SFSGameCommand.prototype.execute.call(this, notification);
        }
    },

    // STATIC MEMBERS
    {
        NAME: "SFSBaCayCommand"
    }
);
