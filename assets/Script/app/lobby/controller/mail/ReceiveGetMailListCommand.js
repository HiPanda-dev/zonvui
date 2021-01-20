var BaseCommand = require('BaseCommand');
var LobbyMessage = require('LobbyMessage');

export default class ReceiveGetMailListCommand extends BaseCommand {
  execute(notification) {
    BaseCommand.prototype.execute.call(this, notification);
    var params = notification.getBody().data;
    this.sendNotification(LobbyMessage.ON_UPDATE_MAIL_LIST, params);
    this.sendNotification(LobbyMessage.HIDE_LOADING);

  }
}
