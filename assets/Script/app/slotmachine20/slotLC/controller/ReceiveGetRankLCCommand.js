var BaseCommand = require('BaseCommand');
var SlotMessage = require('SlotMessage');
export default class ReceiveGetRankLCCommand extends BaseCommand {
  execute(notification) {
    BaseCommand.prototype.execute.call(this, notification);
    var params = notification.getBody();
    this.sendNotification(SlotMessage.ON_UPDATE_RANK_LUCKY_CAFE, params.data);
  }
}
