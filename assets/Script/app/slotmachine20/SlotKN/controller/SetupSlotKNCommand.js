var BaseGameCommand = require('BaseGameCommand');
var SlotMessage = require('SlotMessage');
var SlotKNProxy = require('SlotKNProxy');

export default class SetupSlotKNCommand extends BaseGameCommand {
  execute(notification) {
    BaseGameCommand.prototype.execute.call(this, notification);
    this.gameMediator =  notification.getBody().gameMediator;
    this.gameProxy = notification.getBody().gameProxy;
    SlotKNProxy.proxy = this.gameProxy;

    this.registerCommand(SlotMessage.INIT_SLOT_KEO_NGOT, require('InitSlotKNCommand'));
    this.registerCommand(SlotMessage.SEND_SPIN_KEO_NGOT, require('SendSpinKNCommand'));
    this.registerCommand(SlotMessage.SEND_GET_RANK_KEO_NGOT, require('SendGetRankKNCommand'));
    this.registerCommand(SlotMessage.SEND_GET_MY_HISTORY_KEO_NGOT, require('SendGetMyHistoryKNCommand'));
    this.registerCommand(SlotMessage.SEND_LEAVE_ROOM_KEO_NGOT, require('SendLeaveRoomKNCommand'));

    this.registerCommand(SlotMessage.RECEIVE_SPIN_KEO_NGOT, require('ReceiveSpinKNCommand'));
    this.registerCommand(SlotMessage.RECEIVE_UPDATE_JACKPOT_KEO_NGOT, require('ReceiveUpdateJackPotKNCommand'));
    this.registerCommand(SlotMessage.RECEIVE_GET_RANK_KEO_NGOT, require('ReceiveGetRankKNCommand'));
    this.registerCommand(SlotMessage.RECEIVE_GET_MY_HISTORY_KEO_NGOT, require('ReceiveGetMyHistoryKNCommand'));
    this.facade.registerMediator(this.gameMediator);
  }
}
