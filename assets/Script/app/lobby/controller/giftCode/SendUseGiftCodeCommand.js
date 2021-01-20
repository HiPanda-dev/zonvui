var BaseCommand = require('BaseCommand');
var LobbyMessage = require('LobbyMessage');
var i18n = require('i18n');

export default class SendUseGiftCodeCommand extends BaseCommand {
  execute(notification) {
    BaseCommand.prototype.execute.call(this, notification);
    var params = notification.getBody();
    var giftCode = params.giftCode;
    var captcha = params.captcha;
    if(giftCode === "" || captcha === ""){
        this.sendNotification(LobbyMessage.SHOW_ALERT,{content:i18n.t("C0005")});
        return;
    }
    var sendData = {
      code: giftCode,
      captcha: captcha
    }
    var socket = this.facade.retrieveProxy('StaticsicProxy');
    socket.useGiftCode(sendData);
  }
}
