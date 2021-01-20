var BaseCommand = require('BaseCommand');
var MiniGameMessage = require('MiniGameMessage');
var i18n = require('i18n');

export default class SendSpinSlot3x3Command extends BaseCommand {
  execute(notification) {
    BaseCommand.prototype.execute.call(this, notification);
    var params = notification.getBody();
    var gameVO = this.facade.retrieveProxy('Slot3x3Proxy').gameVO;
    if(gameVO.isSpining === true){
      this.sendNotification(MiniGameMessage.ON_SHOW_MESSAGE_SLOT3X3, {message: i18n.t("T0012")});
      return;
    }
    gameVO.isSpining = true;
    gameVO.prevDataSpin = params.data;

    this.gameProxy = this.facade.retrieveProxy("Slot3x3Proxy");
    this.gameProxy.sendSpin(params.data);
    this.sendNotification(MiniGameMessage.ON_HIDE_ALL_LINE_SLOT3X3);
  }
}
