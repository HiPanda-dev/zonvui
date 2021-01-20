var BaseCommand = require('BaseCommand');
var LobbyMessage = require('LobbyMessage');
var Utility = require('Utility');
var i18n = require('i18n');

export default class ReceiveMobileCardRechargeCommand extends BaseCommand {
  execute(notification) {
    BaseCommand.prototype.execute.call(this, notification);
    if (this.isError(notification.getBody().data)) {
      if (cc.sys.isBrowser)
        ga('send', 'event', 'Nạp thẻ', 'Click nạp thẻ', 'Nạp lỗi');
      return;
    }

    var params =notification.getBody().data;
    var mySelf =  this.facade.retrieveProxy('UserProxy').mySelf;
    mySelf.money = params.money;

    if (cc.sys.isBrowser)
      ga('send', 'event', 'Nạp thẻ', 'Click nạp thẻ', mySelf.displayName, params.money);

    this.sendNotification(LobbyMessage.SHOW_ALERT,{content:Utility.setText(i18n.t("C0199"), [params.addMoney])});
    this.sendNotification(LobbyMessage.ON_RESET_MOBILE_CARD_RECHARGE);
    this.sendNotification(LobbyMessage.ON_UPDATE_MY_INFO);
  }
}
