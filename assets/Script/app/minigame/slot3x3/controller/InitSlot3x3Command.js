var BaseCommand = require('BaseCommand');
var MiniGameMessage = require('MiniGameMessage');

export default class InitSlot3x3Command extends BaseCommand {
  execute(notification) {
    BaseCommand.prototype.execute.call(this, notification);
    this.sendNotification(MiniGameMessage.ON_INIT_GAME_SLOT3X3);
    this.sendNotification(MiniGameMessage.SHOW_MINIGAME_SLOT3X3);
  }
}
