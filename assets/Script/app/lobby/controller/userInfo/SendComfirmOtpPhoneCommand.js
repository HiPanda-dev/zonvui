var BaseGameCommand = require('BaseGameCommand');
var LobbyMessage = require('LobbyMessage');
var i18n = require('i18n');
var Constants = require('Constants');

export default class SendComfirmOtpPhoneCommand extends BaseGameCommand {
  execute(notification) {
      BaseGameCommand.prototype.execute.call(this, notification);
      var data = notification.getBody();
      var socket = this.facade.retrieveProxy('SCLobbyProxy');
      var sendData = {
          p:data.phone,
          c:data.otp
      };

      socket.sendConfirmOtpPhonePhone(sendData);
  }
}
