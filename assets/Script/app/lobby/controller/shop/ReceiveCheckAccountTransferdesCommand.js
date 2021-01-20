var BaseCommand = require('BaseCommand');
var LobbyMessage = require('LobbyMessage');

export default class ReceiveCheckAccountTransferdesCommand extends BaseCommand {
  execute(notification) {
    BaseCommand.prototype.execute.call(this, notification);
    var params =notification.getBody().data;
    if(params.m !== ""){
      this.sendNotification(LobbyMessage.ON_UPDATE_CHECK_ACCOUNT_TRANSFERDES, {isError: true, message: params.m});
    }
  }
}
