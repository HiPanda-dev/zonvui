var BaseCommand = require('BaseCommand');
var LobbyMessage = require('LobbyMessage');
var i18n = require('i18n');

export default class SendTransferdesCommand extends BaseCommand {
  execute(notification) {
    BaseCommand.prototype.execute.call(this, notification);
    if(this.isError(notification.getBody())) return;
    var socket = this.facade.retrieveProxy('SCLobbyProxy');
    var data = notification.getBody();
    var sendData = {
        v: data.amount,
        aa: data.toDisplayName,
        o: data.otp,
        d: data.reason,
    };
    socket.sendTransferdes(sendData);
  }

  isError(data) {
    var mySelf = this.facade.retrieveProxy('UserProxy').mySelf;
    if(data.toDisplayName === "" || data.amount === "" || data.otp  === ""){
      this.sendNotification(LobbyMessage.SHOW_ALERT,{content:i18n.t("C0005")});
      return true;
    }

    if(parseInt(data.amount) <= 0){
      this.sendNotification(LobbyMessage.SHOW_ALERT,{content:i18n.t("C0203")});
      return true;
    }

    return false;
  }
}
