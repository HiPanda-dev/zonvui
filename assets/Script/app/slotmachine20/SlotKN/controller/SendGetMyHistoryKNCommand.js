var BaseCommand = require('BaseCommand');
var Constants = require('Constants');
var SlotKNProxy = require('SlotKNProxy');
export default class SendGetMyHistoryKNCommand extends BaseCommand {
  execute(notification) {
    BaseCommand.prototype.execute.call(this, notification);
    var params = notification.getBody();
    var page = (params.page !== undefined) ? params.page : 1;
    this.gameProxy = SlotKNProxy.proxy;
    this.gameProxy.sendGetMyHistory(page);
  }
}
