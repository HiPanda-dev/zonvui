var BaseCommand = require('BaseCommand');
var LobbyMessage = require('LobbyMessage');
var i18n = require('i18n');

export default class SendChangePassCommand extends BaseCommand {
  execute(notification) {
    BaseCommand.prototype.execute.call(this, notification);
    var params = notification.getBody();
    if(params.oldPass === "" || params.newPass === "" || params.reNewPass === "" || params.captcha === "")
      return this.sendNotification(LobbyMessage.SHOW_FLY_ALERT,{content:i18n.t("C0005")});
    if(params.newPass !== params.reNewPass )
      return this.sendNotification(LobbyMessage.SHOW_FLY_ALERT,{content:i18n.t("C0006")});

    var socket = this.facade.retrieveProxy('SCLobbyProxy');
    var sendData = {
        pass: params.oldPass,
        passNew: params.newPass,
        captcha: params.captcha,
    };

    socket.changePassword(sendData);

  }
}
