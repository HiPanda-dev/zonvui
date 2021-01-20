var BaseCommand = require('BaseCommand');
var LobbyMessage = require('LobbyMessage');

export default class SendCheckAccountTransferdesCommand extends BaseCommand {
  execute(notification) {
    BaseCommand.prototype.execute.call(this, notification);
    var data = notification.getBody();
    var socket = this.facade.retrieveProxy('SCLobbyProxy');
    socket.sendCheckAccountTransferdes(data.displayName);
  }
}
