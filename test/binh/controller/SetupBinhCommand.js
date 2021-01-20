var SetupGameCommand = require('SetupGameCommand');
var GameMessage = require('GameMessage');
var BinhProxy = require('BinhProxy');

export default class SetupBinhCommand extends SetupGameCommand {
    execute(notification) {
        this.gameProxy = this.facade.retrieveProxy(BinhProxy.NAME);
        if (!this.gameProxy) {
            this.gameProxy = new BinhProxy();
            this.gameProxy.initialize();
            this.registerProxy(this.gameProxy);
        }
        SetupGameCommand.prototype.execute.call(this, notification);

        //remove command in base
        this.facade.removeCommand(GameMessage.RECEIVE_JOIN_GAME);
        this.facade.removeCommand(GameMessage.RECEIVE_START_GAME);

        //register command
        this.registerCommand(GameMessage.INIT_GAME, require('InitGameBinhCommand'));

        this.registerCommand(GameMessage.RECEIVE_JOIN_GAME, require('ReceiveJoinGameBinhCommand'));
        this.registerCommand(GameMessage.RECEIVE_START_GAME, require('ReceiveStartGameBinhCommand'));
        this.registerCommand(GameMessage.RECEIVE_DEAL_CARDS, require('ReceiveDealCardsBinhCommand'));
        this.registerCommand(GameMessage.RECEIVE_PLAY_GAME, require('ReceivePlayGameBinhCommand'));
        this.registerCommand(GameMessage.RECEIVE_FINISH_GAME, require('ReceiveFinishGameBinhCommand'));

        this.registerCommand(GameMessage.SEND_PLAY_GAME, require('SendPlayGameBinhCommand'));
        this.registerCommand(GameMessage.SEND_SUBMIT_HAND, require('SendSubmitHandCommand'));

        //register mediator
        this.registerMediator(require('GameBinhMediator').getInstance);
    }
}