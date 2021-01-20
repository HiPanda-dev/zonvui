var BaseCommand = require('BaseCommand');
var Utility = require('Utility');
var MiniPokerProxy = require('MiniPokerProxy');
var MiniGameMessage = require('MiniGameMessage');
var i18n = require('i18n');

export default class SendSpinMiniPokerCommand extends BaseCommand {
  execute(notification) {
    BaseCommand.prototype.execute.call(this, notification);
    var params = notification.getBody();
    var gameProxy = this.facade.retrieveProxy("MiniPokerProxy");
    var gameVO = gameProxy.gameVO;
    if(gameVO.isSpining === true){
      this.sendNotification(MiniGameMessage.ON_SHOW_MESSAGE_MINI_POKER, {message: i18n.t("T0012")});
      return;
    }
    gameVO.isSpining = true;
    gameProxy.sendSpin(params.data);
  }
}
