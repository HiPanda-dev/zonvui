var BaseCommand = require('BaseCommand');
var LobbyMessage = require('LobbyMessage');

export default class ReceiveGetRechargeInfoCommand extends BaseCommand {
  execute(notification) {
    BaseCommand.prototype.execute.call(this, notification);
    var params = notification.getBody().data;
    this.sendNotification(LobbyMessage.ON_UPDATE_RECHARGE_INFO, params);

  }
}
