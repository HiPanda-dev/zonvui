var BaseCommand = require('BaseCommand');
var LobbyMessage = require('LobbyMessage');
var Utility = require('Utility');
var i18n = require('i18n');

export default class ReceiveCashOutCardCommand extends BaseCommand {
  execute(notification) {
    BaseCommand.prototype.execute.call(this, notification);
    var data = notification.getBody().data;
    var mySelf = this.facade.retrieveProxy('UserProxy').mySelf;
    this.sendNotification(LobbyMessage.SHOW_ALERT,{content: i18n.t("C0226")});
    if (cc.sys.isBrowser) {
      ga('send', 'event', 'Đổi thưởng', 'Đổi thưởng thành công', mySelf.displayName);
    }
  }
}
