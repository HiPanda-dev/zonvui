var BaseCommand = require('BaseCommand');
var BaseGameCommand = require('BaseGameCommand');
var MiniGameMessage = require('MiniGameMessage');
var MiniPokerProxy = require('MiniPokerProxy');
var MiniPokerSceneMediator = require('MiniPokerSceneMediator');

export default class SetupMiniPokerCommand extends BaseGameCommand {
  execute(notification) {
    BaseGameCommand.prototype.execute.call(this, notification);
    if(!this.gameProxy){
        this.gameProxy = this.facade.retrieveProxy('MiniPokerProxy')
    }

    this.registerCommand(MiniGameMessage.INIT_MINI_POKER, require('InitMiniPokerCommand'));

    this.registerCommand(MiniGameMessage.SEND_SPIN_MINI_POKER, require('SendSpinMiniPokerCommand'));
    this.registerCommand(MiniGameMessage.SEND_LEAVE_ROOM_MINI_POKER, require('SendSpinMiniPokerCommand'));
    this.registerCommand(MiniGameMessage.SEND_GET_RANK_MINI_POKER, require('SendGetRankMiniPokerCommand'));
    this.registerCommand(MiniGameMessage.SEND_GET_HISTORY_MINI_POKER, require('SendGetHistoryMiniPokerCommand'));

    this.registerCommand(MiniGameMessage.RECEIVE_SPIN_MINI_POKER, require('ReceiveSpinMiniPokerCommand'));
    this.registerCommand(MiniGameMessage.RECEIVE_UPDATE_JACKPOT_MINI_POKER, require('ReceiveUpdateJackPotMiniPokerCommand'));
    this.registerCommand(MiniGameMessage.RECEIVE_GET_RANK_MINI_POKER, require('ReceiveGetRankMiniPokerCommand'));
    this.registerCommand(MiniGameMessage.RECEIVE_GET_HISTORY_MINI_POKER, require('ReceiveGetHistoryMiniPokerCommand'));

    //register mediator
    this.registerMediator(MiniPokerSceneMediator.getInstance);
  }
}
