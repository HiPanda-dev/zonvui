var BaseCommand = require('BaseCommand');
var BaseGameCommand = require('BaseGameCommand');
var MiniGameMessage = require('MiniGameMessage');

export default class InitTaiXiuCommand extends BaseCommand {
  execute(notification) {
    BaseCommand.prototype.execute.call(this, notification);
    this.sendNotification(MiniGameMessage.ON_INIT_GAME_TAI_XIU);
    this.sendNotification(MiniGameMessage.SHOW_MINIGAME_TAI_XIU);
  }
}
