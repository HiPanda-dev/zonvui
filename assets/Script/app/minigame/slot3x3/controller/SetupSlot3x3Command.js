var BaseGameCommand = require('BaseGameCommand');
var MiniGameMessage = require('MiniGameMessage');
var Slot3x3SceneMediator = require('Slot3x3SceneMediator');

export default class SetupTaiXiuCommand extends BaseGameCommand {
  execute(notification) {
    BaseGameCommand.prototype.execute.call(this, notification);
    if(!this.gameProxy){
        this.gameProxy = this.facade.retrieveProxy('Slot3x3Proxy')
    }

    this.registerCommand(MiniGameMessage.INIT_SLOT3X3, require('InitSlot3x3Command'));
    this.registerCommand(MiniGameMessage.SEND_SPIN_SLOT3X3, require('SendSpinSlot3x3Command'));
    this.registerCommand(MiniGameMessage.SEND_LEAVE_ROOM_SLOT3X3, require('SendLeaveRoomSlot3x3Command'));
    this.registerCommand(MiniGameMessage.SEND_GET_RANK_SLOT3X3, require('SendGetRankSlot3x3Command'));
    this.registerCommand(MiniGameMessage.SEND_GET_HISTORY_SLOT3X3, require('SendGetHistorySlot3x3Command'));

    this.registerCommand(MiniGameMessage.RECEIVE_SPIN_SLOT3X3, require('ReceiveSpinSlot3x3Command'));
    this.registerCommand(MiniGameMessage.RECEIVE_UPDATE_JACKPOT_SLOT3X3, require('ReceiveUpdateJackPotSlot3x3Command'));
    this.registerCommand(MiniGameMessage.RECEIVE_GET_RANK_SLOT3X3, require('ReceiveGetRankSlot3x3Command'));
    this.registerCommand(MiniGameMessage.RECEIVE_GET_HISTORY_SLOT3X3, require('ReceiveGetHistorySlot3x3Command'));

    //register mediator
    this.registerMediator(Slot3x3SceneMediator.getInstance);

  }
}
