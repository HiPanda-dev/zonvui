var BaseGameCommand = require('BaseGameCommand');
var LobbyMessage = require('LobbyMessage');

export default class ReceiveComfirmOtpPhoneCommand extends BaseGameCommand {
  execute(notification) {
      BaseGameCommand.prototype.execute.call(this, notification);
      var params = notification.getBody();
      var mySelf =  this.facade.retrieveProxy('UserProxy').mySelf;
      mySelf.money = params.b ? params.b : mySelf.money ;

      this.sendNotification(LobbyMessage.ON_UPDATE_MY_INFO);
      this.sendNotification(LobbyMessage.SHOW_ALERT, {content:i18n.t("C0211")});
  }
}
