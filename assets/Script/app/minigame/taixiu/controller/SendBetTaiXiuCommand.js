var BaseCommand = require('BaseCommand');
var LobbyMessage = require('LobbyMessage');

export default class SendBetTaiXiuCommand extends BaseCommand {
  execute(notification) {
    BaseCommand.prototype.execute.call(this, notification);
    var params = notification.getBody().data;
    this.gameProxy = this.facade.retrieveProxy("TaiXiuProxy");
    this.gameProxy.sendBet(params);
  }
}
