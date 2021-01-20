var BaseCommand = require('BaseCommand');
var SetupGameCommand = require('SetupGameCommand');
var GameMessage = require('GameMessage');
var PhomProxy = require('PhomProxy');
var puremvc = BaseCommand.puremvc;

module.exports = puremvc.define(
    // CLASS INFO
    {
        parent: SetupGameCommand
    },

    // INSTANCE MEMBERS
    {
        execute: function (notification) {
            this.gameProxy = new PhomProxy();
            SetupGameCommand.prototype.execute.call(this, notification);

            //remove command in base
            this.removeCommand(GameMessage.RECEIVE_LEAVE_GAME);
            this.removeCommand(GameMessage.RECEIVE_JOIN_GAME);

            this.registerCommand(GameMessage.RECEIVE_LEAVE_GAME, require('ReceiveLeaveGamePhomCommand'));
            this.registerCommand(GameMessage.RECEIVE_JOIN_GAME, require('ReceiveJoinGamePhomCommand'));
            this.registerCommand(GameMessage.RECEIVE_DEAL_CARDS, require('ReceiveDealCardsPhomCommand'));
            this.registerCommand(GameMessage.RECEIVE_OTHER_USER_DRAW_CARD, require('ReceiveOtherUserDrawCardPhomCommand'));
            this.registerCommand(GameMessage.RECEIVE_ME_DRAW_CARD, require('ReceiveMeDrawCardPhomCommand'));
            this.registerCommand(GameMessage.RECEIVE_PLAY_GAME, require('ReceivePlayGamePhomCommand'));
            this.registerCommand(GameMessage.RECEIVE_STEAL_CARD, require('ReceiveStealCardPhomCommand'));
            this.registerCommand(GameMessage.RECEIVE_DOWN_CARD, require('ReceiveDownCardPhomCommand'));
            this.registerCommand(GameMessage.RECEIVE_DOWN_CARD_FINISH, require('ReceiveDownCardFinishPhomCommand'));
            this.registerCommand(GameMessage.RECEIVE_SEND_CARD, require('ReceiveSendCardPhomCommand'));
            this.registerCommand(GameMessage.RECEIVE_SEND_CARD_FINISH, require('ReceiveSendCardFinishPhomCommand'));
            this.registerCommand(GameMessage.RECEIVE_FULL_LAYING_CARDS, require('ReceiveFullLayingCardsCommand'));
            this.registerCommand(GameMessage.RECEIVE_FINISH_GAME, require('ReceiveFinishGamePhomCommand'));

            this.registerCommand(GameMessage.SEND_PLAY_GAME, require('SendPlayGamePhomCommand'));
            this.registerCommand(GameMessage.SEND_SEND_CARD, require('SendSendCardPhomCommand'));
            this.registerCommand(GameMessage.SEND_SEND_CARD_FINISH, require('SendSendCardFinishPhomCommand'));
            this.registerCommand(GameMessage.SEND_DOWN_CARD, require('SendDownCardPhomCommand'));
            this.registerCommand(GameMessage.SEND_DOWN_CARD_FINISH, require('SendDownCardFinishPhomCommand'));
            this.registerCommand(GameMessage.SEND_STEAL_CARD, require('SendStealCardPhomCommand'));
            this.registerCommand(GameMessage.SEND_DRAW_CARD, require('SendDrawCardPhomCommand'));
            this.registerCommand(GameMessage.SEND_FULL_LAYING_CARDS, require('SendFullLayingCardsPhomCommand'));

            //register command
            this.registerCommand(GameMessage.INIT_GAME, require('InitGamePhomCommand'));

            //register proxy
            this.registerProxy(this.gameProxy);

            //register mediator
            this.registerMediator(require('GamePhomMediator').getInstance());
        }
    },

    // STATIC MEMBERS
    {
        NAME: "SetupPhomCommand"
    }
);
