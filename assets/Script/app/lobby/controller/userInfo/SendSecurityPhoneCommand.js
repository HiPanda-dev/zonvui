var BaseGameCommand = require('BaseGameCommand');
var LobbyMessage = require('LobbyMessage');
var i18n = require('i18n');
var Constants = require('Constants');

export default class SendSecurityPhoneCommand extends BaseGameCommand {
  execute(notification) {
      BaseGameCommand.prototype.execute.call(this, notification);
      var data = notification.getBody();
      var socket = this.facade.retrieveProxy('SCLobbyProxy');
      socket.sendGetOTPSecurityPhone(data.phone);
  }
}
