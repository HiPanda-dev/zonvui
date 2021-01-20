var BaseCommand = require('BaseCommand');
var LobbyMessage = require('LobbyMessage');

export default class SendChangeAvatarCommand extends BaseCommand {
  execute(notification) {
    BaseCommand.prototype.execute.call(this, notification);
    var data = notification.getBody();
    var socket = this.facade.retrieveProxy('SCLobbyProxy');
    var config = this.facade.retrieveProxy('ConfigProxy').config;

    var sendData = parseInt(data.avatarId)

    socket.changeAvatar(sendData);
  }
}
