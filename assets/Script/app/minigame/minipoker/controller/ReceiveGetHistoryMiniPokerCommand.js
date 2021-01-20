var BaseCommand = require('BaseCommand');
var Constants = require('Constants');
var MiniGameMessage = require('MiniGameMessage');

export default class ReceiveGetHistoryMiniPokerCommand extends BaseCommand {
  execute(notification) {
    BaseCommand.prototype.execute.call(this, notification);

    var params = notification.getBody();
    this.sendNotification(MiniGameMessage.ON_UPDATE_HISTORY_MINIGAME_MINI_POKER, params.data);
  }
}
