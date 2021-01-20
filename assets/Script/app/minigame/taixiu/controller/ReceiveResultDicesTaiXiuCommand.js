var BaseCommand = require('BaseCommand');
var LobbyMessage = require('LobbyMessage');
var MiniGameMessage = require('MiniGameMessage');

export default class ReceiveResultDicesTaiXiuCommand extends BaseCommand {
  execute(notification) {
    BaseCommand.prototype.execute.call(this, notification);
    var params = notification.getBody().data;
    this.sendNotification(MiniGameMessage.ON_SHOW_RESULT_DICE_TAI_XIU, {dices:params.dices});
  }
}
