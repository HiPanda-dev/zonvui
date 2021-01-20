var BaseCommand = require('BaseCommand');
var MiniGameMessage = require('MiniGameMessage');
var MiniPokerProxy = require('MiniPokerProxy');

export default class ReceiveUpdateJackPotMiniPokerCommand extends BaseCommand {
  execute(notification) {
    BaseCommand.prototype.execute.call(this, notification);
    var params = notification.getBody();
    var gameVO = this.facade.retrieveProxy('MiniPokerProxy').gameVO;
    this.sendNotification(MiniGameMessage.ON_UPDATE_JACKPOT_MINI_POKER, {roomJackPot: gameVO.getCurrentJackpot()});
  }
}
