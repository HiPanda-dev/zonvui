var BaseCommand = require('BaseCommand');
var LobbyMessage = require('LobbyMessage');
var SlotMessage = require('SlotMessage');

export default class SendLeaveRoomLCCommand extends BaseCommand {
  execute(notification) {
    BaseCommand.prototype.execute.call(this, notification);
    var socket = this.facade.retrieveProxy('SlotLCProxy');
    var gameVO = socket.gameVO;
    gameVO.isSpining = false;
    gameVO.autoSpin = false;
    this.sendNotification(SlotMessage.ON_SET_AUTO_SPIN_LUCKY_CAFE, {autoSpin: false});
    this.sendNotification(SlotMessage.HIDE_MINIGAME_LUCKY_CAFE);
    socket.sendLeaveRoom();
  }
}
