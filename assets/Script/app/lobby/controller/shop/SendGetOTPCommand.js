var BaseCommand = require('BaseCommand');
var LobbyMessage = require('LobbyMessage');
var i18n = require('i18n');

export default class SendGetOTPCommand extends BaseCommand {
  execute(notification) {
    BaseCommand.prototype.execute.call(this, notification);
    var socket = this.facade.retrieveProxy('SCLobbyProxy');
    var mySelf = this.facade.retrieveProxy('UserProxy').mySelf;
    if (mySelf.phoneNumber == "") {
      this.sendNotification(LobbyMessage.SHOW_FLY_ALERT,{content:i18n.t("C0202")});
      return true;
    }

    socket.sendGetOTP();
  }
}
