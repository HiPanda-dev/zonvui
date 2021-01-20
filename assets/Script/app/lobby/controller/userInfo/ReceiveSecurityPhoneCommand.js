var BaseGameCommand = require('BaseGameCommand');
var LobbyMessage = require('LobbyMessage');

export default class ReceiveSecurityPhoneCommand extends BaseGameCommand {
  execute(notification) {
      BaseGameCommand.prototype.execute.call(this, notification);
      this.sendNotification(LobbyMessage.SHOW_FORM_OTP_USER_INFO);
  }
}
