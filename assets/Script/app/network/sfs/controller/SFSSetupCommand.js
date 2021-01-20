var BaseCommand = require('BaseCommand');
var SFSMessage = require('SFSMessage');
var SFSGameProxy = require('SFSGameProxy');
var SFSBauCuaProxy = require('SFSBauCuaProxy');
var SFSMiniPokerProxy = require('SFSMiniPokerProxy');
var SFSTaiXiuProxy = require('SFSTaiXiuProxy');
var SFSToNhoProxy = require('SFSToNhoProxy');
var SFSVongQuayProxy = require('SFSVongQuayProxy');
var SFSPokeGoProxy = require('SFSPokeGoProxy');
var SFSChatProxy = require('SFSChatProxy');

var puremvc = BaseCommand.puremvc;

module.exports = puremvc.define(
    // CLASS INFO
    {
        parent: BaseCommand
    },

    // INSTANCE MEMBERS
    {
        execute: function(notification) {
            //register command
            this.facade.registerCommand(SFSMessage.SEND_TO_SERVER, require('SFSLobbyCommand'));
            this.facade.registerCommand(SFSMessage.REPONSE_NETWORK, require('SFSLobbyReponseCommand'));

            this.facade.registerCommand(SFSMessage.SEND_TO_SERVER_CHAT, require('SFSChatCommand'));
            this.facade.registerCommand(SFSMessage.REPONSE_NETWORK_CHAT, require('SFSChatReponseCommand'));

            this.facade.registerCommand(SFSMessage.SEND_TO_SERVER_BAU_CUA, require('SFSBauCuaCommand'));
            this.facade.registerCommand(SFSMessage.REPONSE_NETWORK_BAU_CUA, require('SFSBauCuaReponseCommand'));

            this.facade.registerCommand(SFSMessage.SEND_TO_SERVER_TAI_XIU, require('SFSTaiXiuCommand'));
            this.facade.registerCommand(SFSMessage.REPONSE_NETWORK_TAI_XIU, require('SFSTaiXiuReponseCommand'));

            this.facade.registerCommand(SFSMessage.SEND_TO_SERVER_MINI_POKER, require('SFSMiniPokerCommand'));
            this.facade.registerCommand(SFSMessage.REPONSE_NETWORK_MINI_POKER, require('SFSMiniPokerReponseCommand'));

            this.facade.registerCommand(SFSMessage.SEND_TO_SERVER_TO_NHO, require('SFSToNhoCommand'));
            this.facade.registerCommand(SFSMessage.REPONSE_NETWORK_TO_NHO, require('SFSToNhoReponseCommand'));

            this.facade.registerCommand(SFSMessage.SEND_TO_SERVER_VONG_QUAY, require('SFSVongQuayCommand'));
            this.facade.registerCommand(SFSMessage.REPONSE_NETWORK_VONG_QUAY, require('SFSVongQuayReponseCommand'));

            this.facade.registerCommand(SFSMessage.SEND_TO_SERVER_POKE_GO, require('SFSPokeGoCommand'));
            this.facade.registerCommand(SFSMessage.REPONSE_NETWORK_POKE_GO, require('SFSPokeGoReponseCommand'));

            //register proxy
            this.facade.registerProxy(new SFSGameProxy());
            this.facade.registerProxy(new SFSChatProxy());

            //register minigame proxy
            this.facade.registerProxy(new SFSBauCuaProxy());
            this.facade.registerProxy(new SFSMiniPokerProxy());
            this.facade.registerProxy(new SFSTaiXiuProxy());
            this.facade.registerProxy(new SFSToNhoProxy());
            this.facade.registerProxy(new SFSVongQuayProxy());
            this.facade.registerProxy(new SFSPokeGoProxy());
        }


    },

    // STATIC MEMBERS
    {
        NAME: "SFSSetupCommand"
    }
);