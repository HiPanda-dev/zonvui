var BaseCommand = require('BaseCommand');
var LobbyMessage = require('LobbyMessage');
var i18n = require('i18n');

export default class ReceiveChangePassCommand extends BaseCommand {
  execute(notification) {
    BaseCommand.prototype.execute.call(this, notification);
    this.sendNotification(LobbyMessage.HIDE_LOADING);
    this.sendNotification(LobbyMessage.SHOW_ALERT,{content:i18n.t("C0093")});
  }
}
