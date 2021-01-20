var i18n = require('i18n');
var BaseCommand = require('BaseCommand');
var LobbyMessage = require('LobbyMessage');

export default class SendTokenLoginCommand extends BaseCommand {
  execute(notification) {
    BaseCommand.prototype.execute.call(this, notification);
    var params = notification.getBody();
    var token = params.token;

    if(token === "" || token === undefined) return;

    var socket = this.facade.retrieveProxy('SCLobbyProxy');
    socket.loginByToken(token);
  }
}
