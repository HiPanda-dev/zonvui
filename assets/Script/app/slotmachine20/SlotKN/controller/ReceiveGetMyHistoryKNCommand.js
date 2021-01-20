var BaseCommand = require('BaseCommand');
var SlotMessage = require('SlotMessage');
export default class ReceiveGetMyHistoryKNCommand extends BaseCommand {
  execute(notification) {
    BaseCommand.prototype.execute.call(this, notification);
    var params = notification.getBody();
    this.sendNotification(SlotMessage.ON_UPDATE_MY_HISTORY_KEO_NGOT, params.data);
  }
}
