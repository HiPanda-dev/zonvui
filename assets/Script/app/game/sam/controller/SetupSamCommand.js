var BaseCommand = require('BaseCommand');
var SamProxy = require('SamProxy');
var GameMessage = require('GameMessage');
var SetupGameCommand = require('SetupGameCommand');

var puremvc = BaseCommand.puremvc;

module.exports = puremvc.define(
    // CLASS INFO
    {
        parent: SetupGameCommand
    },

    // INSTANCE MEMBERS
    {
        execute: function (notification) {
            this.gameProxy  = this.facade.retrieveProxy(SamProxy.NAME);
            if(!this.gameProxy){
                this.gameProxy = new SamProxy();
                this.registerProxy(this.gameProxy);
            }

            SetupGameCommand.prototype.execute.call(this, notification);

            //remove command in base
            this.removeCommand(GameMessage.RECEIVE_JOIN_GAME);

            //register command
            this.registerCommand(GameMessage.INIT_GAME, require('InitGameSamCommand'));

            this.registerCommand(GameMessage.RECEIVE_JOIN_GAME, require('ReceiveJoinGameSamCommand'));
            this.registerCommand(GameMessage.RECEIVE_DEAL_CARDS, require('ReceiveDealCardsSamCommand'));
            this.registerCommand(GameMessage.RECEIVE_PLAY_GAME, require('ReceivePlayGameSamCommand'));
            this.registerCommand(GameMessage.RECEIVE_ENROUND, require('ReceiveEndRoundSamCommand'));
            this.registerCommand(GameMessage.RECEIVE_FINISH_GAME, require('ReceiveFinishGameSamCommand'));
            this.registerCommand(GameMessage.RECEIVE_BAO_SAM, require('ReceiveBaoSamCommand'));

            this.registerCommand(GameMessage.SEND_PLAY_GAME, require('SendPlayGameSamCommand'));
            this.registerCommand(GameMessage.SEND_CANNEL_TURN, require('SendCancelTurnSamCommand'));
            this.registerCommand(GameMessage.SEND_BAO_SAM, require('SendBaoSamCommand'));

            //register mediator
            this.registerMediator(require('GameSamMediator').getInstance());
        }
    },

    // STATIC MEMBERS
    {
        NAME: "SetupSamCommand"
    }
);
