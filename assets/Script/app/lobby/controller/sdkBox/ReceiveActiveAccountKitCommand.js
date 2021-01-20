var BaseCommand = require('BaseCommand');
var UserProxy = require('UserProxy');
var LobbyMessage = require('LobbyMessage');

export default class ReceiveActiveAccountKitCommand extends BaseCommand {
  execute(notification) {
    BaseCommand.prototype.execute.call(this, notification);
    var params = notification.getBody().data;
    if(params.c > 0){
      var mess = Utility.setText(i18n.t("C0219"), [params.b]);
      this.sendNotification(LobbyMessage.SHOW_FLY_ALERT,{content:mess});
      if (cc.sys.isBrowser)
        ga('send', 'event', 'Xác thực SĐT thành công');

    }
    this.dataUser = this.facade.retrieveProxy(UserProxy.NAME);
    this.dataUser.mySelf.money -= this.gameVO.getTotalBet();
    this.sendNotification(LobbyMessage.ON_UPDATE_MY_INFO);
    this.sendNotification(LobbyMessage.ON_UPDATE_USER_INFO_DETAIL);
    console.log(params);
  }
}
