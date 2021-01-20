var BaseCommand = require('BaseCommand');
var LobbyMessage = require('LobbyMessage');
var Utility = require('Utility');
var i18n = require('i18n');

export default class ReceiveGetRechargeInfoCommand extends BaseCommand {
  execute(notification) {
    BaseCommand.prototype.execute.call(this, notification);
    var socket = this.facade.retrieveProxy('StaticsicProxy');
    socket.sendGetRechargeInfo();
  }
}
