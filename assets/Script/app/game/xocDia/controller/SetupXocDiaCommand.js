var BaseCommand = require('BaseCommand');
var SetupGameCommand = require('SetupGameCommand');
var XocDiaProxy = require('XocDiaProxy');
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
            this.gameProxy  = this.facade.retrieveProxy(XocDiaProxy.NAME);
            if(!this.gameProxy){
                this.gameProxy = new XocDiaProxy();
                this.registerProxy(this.gameProxy);
            }
            SetupGameCommand.prototype.execute.call(this, notification);

            this.removeCommand(GameMessage.RECEIVE_START_GAME);
            this.removeCommand(GameMessage.RECEIVE_JOIN_GAME);
            this.removeCommand(GameMessage.RECEIVE_CHANGE_OWNER);
            this.removeCommand(GameMessage.RECEIVE_LEAVE_GAME);

            //register command
            this.registerCommand(GameMessage.INIT_GAME, require('InitGameXocDiaCommand'));
            this.registerCommand(GameMessage.RECEIVE_JOIN_GAME, require('ReceiveJoinGameXocDiaCommand'));
            this.registerCommand(GameMessage.RECEIVE_SIT_DOWN, require('ReceiveSitDownCommand'));
            this.registerCommand(GameMessage.RECEIVE_START_GAME, require('ReceiveStartGameXocDiaCommand'));
            this.registerCommand(GameMessage.RECEIVE_START_BETTING_GAME, require('ReceiveStartBettingGameXocDiaCommand'));
            this.registerCommand(GameMessage.RECEIVE_STOP_BETTING_GAME, require('ReceiveStopBettingGameXocDiaCommand'));
            this.registerCommand(GameMessage.RECEIVE_DICE_RESULT, require('ReceiveDiceResultXocDiaCommand'));
            this.registerCommand(GameMessage.RECEIVE_PLAY_GAME, require('ReceivePlayGameXocDiaCommand'));
            this.registerCommand(GameMessage.RECEIVE_TIME_COUNT_DOWN, require('ReceiveTimeCountDownXocDiaCommand'));
            this.registerCommand(GameMessage.RECEIVE_FINISH_GAME, require('ReceiveFinishGameXocDiaCommand'));
            this.registerCommand(GameMessage.RECEIVE_CHANGE_OWNER, require('ReceiveChangeOwnerXocDiaCommand'));
            this.registerCommand(GameMessage.RECEIVE_SOLD_BET, require('ReceiveSoldBetXocDiaCommand'));
            this.registerCommand(GameMessage.RECEIVE_LEAVE_GAME, require('ReceiveLeaveGameXocDiaCommand'));
            this.registerCommand(GameMessage.RECEIVE_COUNT_DOWN_DESTROY_GAME, require('ReceiveCountDownDestroyGameCommand'));

            this.registerCommand(GameMessage.SEND_SIT_DOWN, require('SendSitDownCommand'));
            this.registerCommand(GameMessage.SEND_PLAY_GAME, require('SendPlayGameXocDiaCommand'));
            this.registerCommand(GameMessage.SEND_CANCEL_BET, require('SendCancelBetXocdiaCommand'));
            this.registerCommand(GameMessage.SEND_SOLD_BET, require('SendSoldBetXocdiaCommand'));
            this.registerCommand(GameMessage.SEND_RE_BET, require('SendReBetXocDiaCommand'));
            this.registerCommand(GameMessage.SEND_X2_BET, require('SendX2BetXocDiaCommand'));

            //register mediator
            this.registerMediator(require('GameXocDiaMediator').getInstance());
        }
    },

    // STATIC MEMBERS
    {
        NAME: "SetupXocDiaCommand"
    }
);
