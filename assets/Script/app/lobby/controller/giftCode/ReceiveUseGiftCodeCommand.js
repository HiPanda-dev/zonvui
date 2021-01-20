var BaseCommand = require('BaseCommand');
var LobbyMessage = require('LobbyMessage');

export default class SendUseGiftCodeCommand extends BaseCommand {
  execute(notification) {
    BaseCommand.prototype.execute.call(this, notification);
    var params = notification.getBody();
    var mySelf =  this.facade.retrieveProxy('UserProxy').mySelf;
    mySelf.money = params.money;
    this.sendNotification(LobbyMessage.ON_UPDATE_MY_INFO);
    this.sendNotification(LobbyMessage.ON_SHOW_USE_GIFT_CODE_COMPLETE, {giftMoney:params.giftMoney});
  }
}
