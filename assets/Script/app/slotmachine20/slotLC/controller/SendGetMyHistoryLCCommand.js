var BaseCommand = require('BaseCommand');
var Constants = require('Constants');
var SlotLCProxy = require('SlotLCProxy');
export default class SendGetMyHistoryLCCommand extends BaseCommand {
  execute(notification) {
    BaseCommand.prototype.execute.call(this, notification);
    var params = notification.getBody();
    var page = (params.page !== undefined) ? params.page : 1;
    this.gameProxy = SlotLCProxy.proxy;
    this.gameProxy.sendGetMyHistory(page);
  }
}
