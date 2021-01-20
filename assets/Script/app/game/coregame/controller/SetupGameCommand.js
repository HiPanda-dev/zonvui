var BaseCommand = require('BaseCommand');
var BaseGameCommand = require('BaseGameCommand');
var GameMessage = require('GameMessage');
var SFSMessage = require('SFSMessage');
var CoreGameProxy = require('CoreGameProxy');
var puremvc = BaseCommand.puremvc;

module.exports = puremvc.define(
    // CLASS INFO
    {
        parent: BaseGameCommand
    },

    // INSTANCE MEMBERS
    {
        execute: function (notification) {
            BaseGameCommand.prototype.execute.call(this, notification);

            //setup command
            this.registerCommand(GameMessage.RECEIVE_JOIN_GAME, require('ReceiveJoinGameCommand'));
            this.registerCommand(GameMessage.RECEIVE_USER_JOIN_GAME, require('ReceiveUserJoinGameCommand'));
            this.registerCommand(GameMessage.RECEIVE_CHANGE_OWNER, require('ReceiveChangeOwnerCommand'));
            this.registerCommand(GameMessage.RECEIVE_LEAVE_GAME, require('ReceiveLeaveGameCommand'));
            this.registerCommand(GameMessage.RECEIVE_COUNT_DOWN_START_GAME, require('ReceiveCounDownStartGameCommand'));
            this.registerCommand(GameMessage.RECEIVE_START_GAME, require('ReceiveStartGameCommand'));
            this.registerCommand(GameMessage.RECEIVE_UPDATE_CURRENT_TURN, require('ReceiveUpdateCurrentTurnCommand'));
            this.registerCommand(GameMessage.RECEIVE_UPDATE_USER_INFO, require('ReceiveUpdateUserInfoCommand'));
            this.registerCommand(GameMessage.RECEIVE_UPDATE_MONEY, require('ReceiveUpdateMoneyCommand'));
            this.registerCommand(GameMessage.RECEIVE_BUY_MASTER_GAME, require('ReceiveBuyMasterGameCommand'));
            this.registerCommand(GameMessage.RECEIVE_REGISTER_QUIT, require('ReceiveRegisterQuitCommand'));


            this.registerCommand(GameMessage.SEND_LEAVE_GAME, require('SendLeaveGameCommand'));
            this.registerCommand(GameMessage.SEND_START_GAME, require('SendStartGameCommand'));
            this.registerCommand(GameMessage.SEND_INVITE_USER, require('SendInviteUserCommand'));
            this.registerCommand(GameMessage.SEND_KICK_USER, require('SendKickUserCommand'));
            this.registerCommand(GameMessage.SEND_FAKE_CARDS, require('SendFakeCardsCommand'));
            this.registerCommand(GameMessage.SEND_BUY_MASTER_GAME, require('SendBuyMasterGameCommand'));

            this.registerCommand(GameMessage.DESTROY_GAME, require('DestroyGameCommand'), true);

            //setup network
            this.registerCommand(SFSMessage.SETUP_GAME_NETWORK, require('SFSSetupGameCommand'));
            this.sendNotification(SFSMessage.SETUP_GAME_NETWORK);
        }
    },

    // STATIC MEMBERS
    {
        NAME: "SetupGameCommand"
    }
);
