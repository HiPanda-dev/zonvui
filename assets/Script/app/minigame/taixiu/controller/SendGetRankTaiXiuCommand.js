var BaseCommand = require('BaseCommand');
var Constants = require('Constants');

export default class SendGetRankTaiXiuCommand extends BaseCommand {
  execute(notification) {
    BaseCommand.prototype.execute.call(this, notification);

    var params = notification.getBody();
    var page = (params.page !== undefined) ? params.page : 1;
    this.staticProxy = this.facade.retrieveProxy("StaticsicProxy");
    this.staticProxy.sendGetRank(Constants.MINIGAME_TAI_XIU, page);
  }
}
