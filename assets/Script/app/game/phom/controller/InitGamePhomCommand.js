var BaseCommand = require('BaseCommand');
var InitGameCommand = require('InitGameCommand');

var puremvc = BaseCommand.puremvc;

module.exports = puremvc.define(
    // CLASS INFO
    {
        parent: InitGameCommand
    },

    // INSTANCE MEMBERS
    {
        execute: function (notification) {
            InitGameCommand.prototype.execute.call(this, notification);
        }
    },

    // STATIC MEMBERS
    {
        NAME: "InitGamePhomCommand"
    }
);
