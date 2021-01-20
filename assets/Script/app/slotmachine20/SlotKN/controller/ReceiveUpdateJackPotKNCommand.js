var BaseCommand = require('BaseCommand');
var SlotKNProxy = require('SlotKNProxy');
var SlotMessage = require('SlotMessage');

export default class ReceiveUpdateJackPotKNCommand extends BaseCommand {
  execute(notification) {
    BaseCommand.prototype.execute.call(this, notification);
    var params = notification.getBody();
    var gameVO = SlotKNProxy.proxy.gameVO;
    this.sendNotification(SlotMessage.ON_UPDATE_JACKPOT_KEO_NGOT, {roomJackPot: gameVO.getCurrentJackpot(), listRoomJackPot: gameVO.getListRoomJackpot()});
  }
}
