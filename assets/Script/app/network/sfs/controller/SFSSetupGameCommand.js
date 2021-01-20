var BaseCommand = require('BaseCommand');
var Constants = require('Constants');
var SFSMessage = require('SFSMessage');
var GameConfig = require('GameConfig');

var puremvc = BaseCommand.puremvc;

module.exports = puremvc.define(
    // CLASS INFO
    {
        parent: BaseCommand
    },

    // INSTANCE MEMBERS
    {
        execute: function (notification) {
            var channelProxy = this.facade.retrieveProxy('ChannelProxy');
            this.facade.removeCommand(SFSMessage.SEND_TO_SERVER);
            this.facade.removeCommand(SFSMessage.REPONSE_NETWORK);
            Constants.CURRENT_GAME = channelProxy.zoneName;
            Constants.CURRENT_SCENE = channelProxy.zoneName;
            switch (channelProxy.zoneName){

                case Constants.GAME_TLMN:
                case Constants.GAME_TLMN_SOLO:
                    GameConfig.CURRENT_SCENE = GameConfig.TLMN_SCENE;
                    this.facade.registerCommand(SFSMessage.REPONSE_NETWORK, require('SFSTLMNReponseCommand'));
                    this.facade.registerCommand(SFSMessage.SEND_TO_SERVER, require('SFSTLMNCommand'));
                    break;
                case Constants.GAME_SAM:
                case Constants.GAME_SAM_SOLO:
                    GameConfig.CURRENT_SCENE = GameConfig.SAM_SCENE;
                    this.facade.registerCommand(SFSMessage.REPONSE_NETWORK, require('SFSSamReponseCommand'));
                    this.facade.registerCommand(SFSMessage.SEND_TO_SERVER, require('SFSSamCommand'));
                    break;
                case Constants.GAME_BINH:
                    GameConfig.CURRENT_SCENE = GameConfig.BINH_SCENE;
                    this.facade.registerCommand(SFSMessage.REPONSE_NETWORK, require('SFSBinhReponseCommand'));
                    this.facade.registerCommand(SFSMessage.SEND_TO_SERVER, require('SFSBinhCommand'));
                    break;
                case Constants.GAME_PHOM:
                    GameConfig.CURRENT_SCENE = GameConfig.PHOM_SCENE;
                    this.facade.registerCommand(SFSMessage.REPONSE_NETWORK, require('SFSPhomReponseCommand'));
                    this.facade.registerCommand(SFSMessage.SEND_TO_SERVER, require('SFSPhomCommand'));
                    break;
                case Constants.GAME_POKER:
                    GameConfig.CURRENT_SCENE = GameConfig.POKER_SCENE;
                    this.facade.registerCommand(SFSMessage.REPONSE_NETWORK, require('SFSPokerReponseCommand'));
                    this.facade.registerCommand(SFSMessage.SEND_TO_SERVER, require('SFSPokerCommand'));
                    break;
                case Constants.GAME_BACAY:
                    GameConfig.CURRENT_SCENE = GameConfig.BACAY_SCENE;
                    this.facade.registerCommand(SFSMessage.REPONSE_NETWORK, require('SFSBaCayReponseCommand'));
                    this.facade.registerCommand(SFSMessage.SEND_TO_SERVER, require('SFSBaCayCommand'));
                    break;
                case Constants.GAME_XOCDIA:
                    GameConfig.CURRENT_SCENE = GameConfig.XOCDIA_SCENE;
                    this.facade.registerCommand(SFSMessage.REPONSE_NETWORK, require('SFSXocDiaReponseCommand'));
                    this.facade.registerCommand(SFSMessage.SEND_TO_SERVER, require('SFSXocDiaCommand'));
                    break;
            }

            this.sfsProxy = this.facade.retrieveProxy('SFSGameProxy');
            this.sfsProxy.stopGetRoomList();
            this.sfsProxy.startPingToServer();
        }
    },

    // STATIC MEMBERS
    {
        NAME: "SFSSetupGameCommand"
    }
);
