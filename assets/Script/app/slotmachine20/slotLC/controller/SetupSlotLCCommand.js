var BaseGameCommand = require('BaseGameCommand');
var SlotMessage = require('SlotMessage');
var SlotLCProxy = require('SlotLCProxy');

export default class SetupSlotLCCommand extends BaseGameCommand {
  execute(notification) {
    BaseGameCommand.prototype.execute.call(this, notification);
    this.gameMediator =  notification.getBody().gameMediator;
    this.gameProxy = notification.getBody().gameProxy;
    SlotLCProxy.proxy = this.gameProxy;

    this.registerCommand(SlotMessage.INIT_SLOT_LUCKY_CAFE, require('InitSlotLCCommand'));
    this.registerCommand(SlotMessage.SEND_SPIN_LUCKY_CAFE, require('SendSpinLCCommand'));
    this.registerCommand(SlotMessage.SEND_GET_RANK_LUCKY_CAFE, require('SendGetRankLCCommand'));
    this.registerCommand(SlotMessage.SEND_GET_MY_HISTORY_LUCKY_CAFE, require('SendGetMyHistoryLCCommand'));
    this.registerCommand(SlotMessage.SEND_LEAVE_ROOM_LUCKY_CAFE, require('SendLeaveRoomLCCommand'));

    this.registerCommand(SlotMessage.RECEIVE_SPIN_LUCKY_CAFE, require('ReceiveSpinLCCommand'));
    this.registerCommand(SlotMessage.RECEIVE_UPDATE_JACKPOT_LUCKY_CAFE, require('ReceiveUpdateJackPotLCCommand'));
    this.registerCommand(SlotMessage.RECEIVE_GET_RANK_LUCKY_CAFE, require('ReceiveGetRankLCCommand'));
    this.registerCommand(SlotMessage.RECEIVE_GET_MY_HISTORY_LUCKY_CAFE, require('ReceiveGetMyHistoryLCCommand'));
    this.facade.registerMediator(this.gameMediator);
  }
}
