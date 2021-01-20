var BaseCommand = require('BaseCommand');
var SFSGameReponseCommand = require('SFSGameReponseCommand');
var LobbyMessage = require('LobbyMessage');
var SFSEvent = require('SFSEvent');

var puremvc = BaseCommand.puremvc;

module.exports = puremvc.define(
    // CLASS INFO
    {
        parent: SFSGameReponseCommand
    },

    // INSTANCE MEMBERS
    {
        execute: function (notification) {
            SFSGameReponseCommand.prototype.execute.call(this, notification);
        }
    },

    // STATIC MEMBERS
    {
        NAME: "SFSPokerReponseCommand"
    }
);
