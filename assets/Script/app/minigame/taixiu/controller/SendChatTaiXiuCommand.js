var BaseCommand = require('BaseCommand');

export default class SendChatTaiXiuCommand extends BaseCommand {
  execute(notification) {
    BaseCommand.prototype.execute.call(this, notification);
    var message = notification.getBody();
    var sendData = message;
    this.gameProxy = this.facade.retrieveProxy("TaiXiuProxy");
    this.gameProxy.sendChat(sendData);
  }
}
