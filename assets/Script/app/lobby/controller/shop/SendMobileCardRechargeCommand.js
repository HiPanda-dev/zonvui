var BaseCommand = require('BaseCommand');
var LobbyMessage = require('LobbyMessage');
var Utility = require('Utility');
var i18n = require('i18n');


export default class SendMobileCardRechargeCommand extends BaseCommand {
  execute(notification) {
    BaseCommand.prototype.execute.call(this, notification);
    var data = notification.getBody();
    if(this.isError(data)) return;

    var socket = this.facade.retrieveProxy('StaticsicProxy');

    var sendData = {
        t: data.provider,
        s: data.serial,
        c: data.code,
        a: data.money,
        cc:data.captcha,
    };

    this.sendNotification(LobbyMessage.SHOW_ALERT_WITH_CONFIRM,
    {
        content: Utility.setText(i18n.t("C0031"), [data.nameProvider, data.money, data.code, data.serial]),
        acceptLabel: i18n.t("C0041"),
        callback: function(sendData){
          socket.sendMobileCardRecharge(sendData);
        }.bind(this, sendData)
    });
  }

  isError (data) {
      if(!data.code || data.code === "") {
          this.sendNotification(LobbyMessage.SHOW_FLY_ALERT,{content:i18n.t("C0012")});
          return true;
      }

      if(!data.serial || data.serial === "") {
          this.sendNotification(LobbyMessage.SHOW_FLY_ALERT,{content:i18n.t("C0013")});
          return true;
      }

      if(!data.money || data.money === 0){
          this.sendNotification(LobbyMessage.SHOW_FLY_ALERT,{content:i18n.t("C0198")});
          return true;
      }

      if(!data.captcha || data.captcha === ""){
          this.sendNotification(LobbyMessage.SHOW_FLY_ALERT,{content:i18n.t("C0034")});
          return true;
      }

      return false;
  }
}
