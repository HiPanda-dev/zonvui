var BaseCommand = require('BaseCommand');

export default class SendGetMailListCommand extends BaseCommand {
  execute(notification) {
    BaseCommand.prototype.execute.call(this, notification);
    var params = notification.getBody();
    var page = (params.pageIndex !== undefined) ? params.pageIndex : 1;
    var socket = this.facade.retrieveProxy("StaticsicProxy");
    socket.sendGetInboxPage(page);
  }
}
