var BaseCommand = require('BaseCommand');
var TaiXiuVO = require('TaiXiuVO');
var MiniGameMessage = require('MiniGameMessage');

export default class ReceiveGetPlayingInfoTaiXiuCommand extends BaseCommand {
  execute(notification) {
    BaseCommand.prototype.execute.call(this, notification);
    var txVO = notification.getBody().data;
    this.sendNotification(MiniGameMessage.ON_UPDATE_GAME_STATE_TAI_XIU, {txVO: txVO});
  }
}
