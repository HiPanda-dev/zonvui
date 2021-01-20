var BaseCommand = require('BaseCommand');
var Constants = require('Constants');

export default class SendGetRankSlot3x3Command extends BaseCommand {
  execute(notification) {
    BaseCommand.prototype.execute.call(this, notification);

    var params = notification.getBody();
    var page = (params.page !== undefined) ? params.page : 1;
    this.staticProxy = this.facade.retrieveProxy("StaticsicProxy");
    this.staticProxy.sendGetRank(Constants.MINIGAME_SLOT3X3, page);
  }
}
