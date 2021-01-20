var BaseCommand = require('BaseCommand');

export default class SendGetCashOutCardInfoCommand extends BaseCommand {
  execute(notification) {
    BaseCommand.prototype.execute.call(this, notification);
    var socket = this.facade.retrieveProxy('StaticsicProxy');
    socket.sendGetOutCardInfo();
  }
}
