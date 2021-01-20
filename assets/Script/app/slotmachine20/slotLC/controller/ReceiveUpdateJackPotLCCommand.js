var BaseCommand = require('BaseCommand');
var SlotLCProxy = require('SlotLCProxy');
var SlotMessage = require('SlotMessage');

export default class ReceiveUpdateJackPotLCCommand extends BaseCommand {
  execute(notification) {
    BaseCommand.prototype.execute.call(this, notification);
    var params = notification.getBody();
    var gameVO = SlotLCProxy.proxy.gameVO;
    this.sendNotification(SlotMessage.ON_UPDATE_JACKPOT_LUCKY_CAFE, {roomJackPot: gameVO.getCurrentJackpot(), listRoomJackPot: gameVO.getListRoomJackpot()});
  }
}
