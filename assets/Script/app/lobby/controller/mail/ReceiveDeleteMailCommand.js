var BaseCommand = require('BaseCommand');
var LobbyMessage = require('LobbyMessage');

export default class ReceiveDeleteMailCommand extends BaseCommand {
  execute(notification) {
    BaseCommand.prototype.execute.call(this, notification);
    this.sendNotification(LobbyMessage.HIDE_LOADING);
    if (this.isError(notification.getBody().data)) return;

    var params = notification.getBody().data;
    this.sendNotification(LobbyMessage.ON_UPDATE_DELETE_MAIL);
  }
}
