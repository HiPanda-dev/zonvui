var BaseCommand = require('BaseCommand');
var LobbyMessage = require('LobbyMessage');
var Utility = require('Utility');
var i18n = require('i18n');

export default class SendRegisterCommand extends BaseCommand {
  execute(notification) {
    BaseCommand.prototype.execute.call(this, notification);
    var params = notification.getBody();
    var userName = params.userName;
    var password = params.password;
    var displayName = params.displayName;
    var captcha = params.captcha;

    if(this.isError(userName, password, captcha, displayName)) return;

    var socket = this.facade.retrieveProxy('SCLobbyProxy');
    var config = this.facade.retrieveProxy('ConfigProxy').config;

    var sendData = {
        name: userName,
        pass: password,
        alias: displayName,
        captcha: captcha,
        des:'register'
    };

    socket.register(sendData);
  }

  isError(userName, password, captcha , displayName) {
      if(userName === "" || password === "" || displayName === "" || captcha === ""){
          this.sendNotification(LobbyMessage.SHOW_FLY_ALERT,{content:i18n.t("C0005")});
          return true;
      }

      if(password.length < 6){
          this.sendNotification(LobbyMessage.SHOW_FLY_ALERT,{content:i18n.t("C0007")});
          return true;
      }

      return false;
  }
}
