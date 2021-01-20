var BaseCommand = require('BaseCommand');
var LobbyMessage = require('LobbyMessage');
var MiniGameMessage = require('MiniGameMessage');

export default class ReceiveBetTaiXiuCommand extends BaseCommand {
  execute(notification) {
    BaseCommand.prototype.execute.call(this, notification);
    var params = notification.getBody().data;
    if(this.isErrorMinigame(params)) return;
    var mySelf =  this.facade.retrieveProxy('UserProxy').mySelf;
    mySelf.money = params.money;

    this.sendNotification(LobbyMessage.ON_UPDATE_MY_INFO);
    this.sendNotification(MiniGameMessage.ON_BET_TAI_XIU, {
        totalBet:params.totalBet,
        typeBet:params.typeBet,
    });
  }
}
