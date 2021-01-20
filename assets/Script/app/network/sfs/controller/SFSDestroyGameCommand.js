var BaseCommand = require('BaseCommand');
var SFSMessage = require('SFSMessage');

var puremvc = BaseCommand.puremvc;

module.exports = puremvc.define(
    // CLASS INFO
    {
        parent: BaseCommand
    },

    // INSTANCE MEMBERS
    {
        execute: function (notification) {
            this.facade.removeCommand(SFSMessage.SEND_TO_SERVER);
            this.facade.removeCommand(SFSMessage.REPONSE_NETWORK);

            this.facade.registerCommand(SFSMessage.SEND_TO_SERVER, require('SFSLobbyCommand'));
            this.facade.registerCommand(SFSMessage.REPONSE_NETWORK, require('SFSLobbyReponseCommand'));

            this.sfsProxy = this.facade.retrieveProxy('SFSGameProxy');
            this.sfsProxy.stopPingToServer();
            this.sfsProxy.startGetRoomList();
        }
    },

    // STATIC MEMBERS
    {
        NAME: "SFSDestroyGameCommand"
    }
);
