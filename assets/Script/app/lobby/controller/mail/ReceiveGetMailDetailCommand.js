var BaseCommand = require('BaseCommand');
var LobbyMessage = require('LobbyMessage');

export default class SendGetMailDetailCommand extends BaseCommand {
  execute(notification) {
    BaseCommand.prototype.execute.call(this, notification);
    this.sendNotification(LobbyMessage.HIDE_LOADING);
    if (this.isError(notification.getBody().data)) return;

    var params = notification.getBody().data;
    var mail = this.facade.retrieveProxy('MailProxy');
    mail.updateMailDetail(params);
    this.sendNotification(LobbyMessage.ON_UPDATE_MAIL_DETAIL);
  }
}
