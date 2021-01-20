var BaseCommand = require('BaseCommand');
var LobbyMessage = require('LobbyMessage');
var MiniGameMessage = require('MiniGameMessage');
var Utility = require('Utility');
var i18n = require('i18n');

export default class ReceiveRepayTaiXiuCommand extends BaseCommand {
  execute(notification) {
    BaseCommand.prototype.execute.call(this, notification);
    var params = notification.getBody().data;
    var message = Utility.setText(i18n.t("T0011"), [params.bet])
    var mySelf =  this.facade.retrieveProxy('UserProxy').mySelf;
    mySelf.money = params.money;
    this.sendNotification(LobbyMessage.ON_UPDATE_MY_INFO);
    this.sendNotification(MiniGameMessage.ON_SHOW_MESSAGE_TAI_XIU, {message:message});
  }
}
