var BaseCommand = require('BaseCommand');
var SetupGameCommand = require('SetupGameCommand');
var TLMNProxy = require('TLMNProxy');
var GameMessage = require('GameMessage');
var puremvc = BaseCommand.puremvc;

module.exports = puremvc.define(
    // CLASS INFO
    {
        parent: SetupGameCommand
    },

    // INSTANCE MEMBERS
    {
        execute: function (notification) {
            this.gameProxy  = this.facade.retrieveProxy(TLMNProxy.NAME);
            if(!this.gameProxy){
                this.gameProxy = new TLMNProxy();
                this.registerProxy(this.gameProxy);
            }
            SetupGameCommand.prototype.execute.call(this, notification);

            //register command
            this.registerCommand(GameMessage.INIT_GAME, require('InitGameTLMNCommand'));

            this.registerCommand(GameMessage.RECEIVE_DEAL_CARDS, require('ReceiveDealCardsTLMNCommand'));
            this.registerCommand(GameMessage.RECEIVE_PLAY_GAME, require('ReceivePlayGameTLMNCommand'));
            this.registerCommand(GameMessage.RECEIVE_ENROUND, require('ReceiveEndRoundTLMNCommand'));
            this.registerCommand(GameMessage.RECEIVE_FINISH_GAME, require('ReceiveFinishGameTLMNCommand'));

            this.registerCommand(GameMessage.SEND_PLAY_GAME, require('SendPlayGameTLMNCommand'));
            this.registerCommand(GameMessage.SEND_CANNEL_TURN, require('SendCancelTurnTLMNCommand'));

            //register mediator
            this.registerMediator(require('GameTLMNMediator').getInstance());


        }
    },

    // STATIC MEMBERS
    {
        NAME: "SetupTLMNCommand"
    }
);
