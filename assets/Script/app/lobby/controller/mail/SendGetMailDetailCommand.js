var BaseCommand = require('BaseCommand');
var LobbyMessage = require('LobbyMessage');
var Utility = require('Utility');

export default class SendGetMailDetailCommand extends BaseCommand {
  execute(notification) {
    BaseCommand.prototype.execute.call(this, notification);
    var params = notification.getBody();
    var socket = this.facade.retrieveProxy("StaticsicProxy");
    socket.sendReadInbox({id:params.id});
  }
}
