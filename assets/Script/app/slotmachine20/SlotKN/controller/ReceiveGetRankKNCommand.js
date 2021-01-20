var BaseCommand = require('BaseCommand');
var SlotMessage = require('SlotMessage');
export default class ReceiveGetRankKNCommand extends BaseCommand {
  execute(notification) {
    BaseCommand.prototype.execute.call(this, notification);
    var params = notification.getBody();
    this.sendNotification(SlotMessage.ON_UPDATE_RANK_KEO_NGOT, params.data);
  }
}
