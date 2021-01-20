var BaseCommand = require('BaseCommand');
var LobbyMessage = require('LobbyMessage');
var SlotMessage = require('SlotMessage');

export default class SendLeaveRoomKNCommand extends BaseCommand {
  execute(notification) {
    BaseCommand.prototype.execute.call(this, notification);
    var socket = this.facade.retrieveProxy('SlotKNProxy');
    var gameVO = socket.gameVO;
    gameVO.isSpining = false;
    gameVO.autoSpin = false;
    this.sendNotification(SlotMessage.ON_SET_AUTO_SPIN_KEO_NGOT, {autoSpin: false});
    this.sendNotification(SlotMessage.HIDE_MINIGAME_KEO_NGOT);
    socket.sendLeaveRoom();
  }
}
