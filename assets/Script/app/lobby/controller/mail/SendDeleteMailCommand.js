var BaseCommand = require('BaseCommand');

export default class SendDeleteMailCommand extends BaseCommand {
  execute(notification) {
    BaseCommand.prototype.execute.call(this, notification);
    var params = notification.getBody();
    var socket = this.facade.retrieveProxy("StaticsicProxy");
    socket.sendDeleteInbox({id:params.id});
  }
}
