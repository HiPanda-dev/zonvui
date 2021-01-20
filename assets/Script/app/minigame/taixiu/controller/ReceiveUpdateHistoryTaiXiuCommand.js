var BaseCommand = require('BaseCommand');
var Utility = require('Utility');
var MiniGameMessage = require('MiniGameMessage');

export default class ReceiveUpdateHistoryTaiXiuCommand extends BaseCommand {
  execute(notification) {
    BaseCommand.prototype.execute.call(this, notification);
    var history = notification.getBody().data;
    this.sendNotification(MiniGameMessage.ON_UPDATE_MY_HISTORY_TAI_XIU, {history: history});
  }
}
