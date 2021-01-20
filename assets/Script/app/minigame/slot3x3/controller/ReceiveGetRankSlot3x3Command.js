var BaseCommand = require('BaseCommand');
var Constants = require('Constants');
var MiniGameMessage = require('MiniGameMessage');

export default class ReceiveGetRankSlot3x3Command extends BaseCommand {
  execute(notification) {
    BaseCommand.prototype.execute.call(this, notification);

    var params = notification.getBody();
    this.sendNotification(MiniGameMessage.ON_UPDATE_RANK_MINIGAME_SLOT3X3, params.data);
  }
}
