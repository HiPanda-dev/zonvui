var BaseCommand = require('BaseCommand');
var LobbyMessage = require('LobbyMessage');
var i18n = require('i18n');

export default class ReceiveTransferdesCommand extends BaseCommand {
  execute(notification) {
    BaseCommand.prototype.execute.call(this, notification);
    var money =notification.getBody().data;
    var mySelf = this.facade.retrieveProxy('UserProxy').mySelf;
    mySelf.money = money;

    this.sendNotification(LobbyMessage.ON_RESET_TRANSFERDES);
    this.sendNotification(LobbyMessage.ON_UPDATE_MY_INFO);
    this.sendNotification(LobbyMessage.SHOW_ALERT,{content:i18n.t("C0204")});
  }
}
