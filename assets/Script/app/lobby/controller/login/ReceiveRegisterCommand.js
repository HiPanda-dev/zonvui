var BaseCommand = require('BaseCommand');
var LobbyMessage = require('LobbyMessage');
var i18n = require('i18n');

export default class ReceiveRegisterCommand extends BaseCommand {
  execute(notification) {
    BaseCommand.prototype.execute.call(this, notification);
    if (this.isError(notification.getBody().data)) return;

    var data = notification.getBody().data;

    this.sendNotification(LobbyMessage.HIDE_REGISTER_SCENE);
    this.sendNotification(LobbyMessage.RECEIVE_LOGIN, {data:data});
    this.sendNotification(LobbyMessage.SHOW_ALERT, {content: i18n.t("C0092")});
    if (cc.sys.isBrowser)
      ga('send', 'event', 'Đăng ký thành công');

  }
}
