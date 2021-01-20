var BaseCommand = require('BaseCommand');
var i18n = require('i18n');
var MiniGameMessage = require('MiniGameMessage');

export default class ReceiveUpdateJackPotSlot3x3Command extends BaseCommand {
  execute(notification) {
    BaseCommand.prototype.execute.call(this, notification);
    var params = notification.getBody();
    var gameVO = this.facade.retrieveProxy('Slot3x3Proxy').gameVO;
    this.sendNotification(MiniGameMessage.ON_UPDATE_JACKPOT_SLOT3X3, {roomJackPot: gameVO.getCurrentJackpot()});
  }
}
