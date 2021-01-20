var BaseCommand = require('BaseCommand');
var LobbyMessage = require('LobbyMessage');
var Utility = require('Utility');
var i18n = require('i18n');

export default class SendCashOutCardCommand extends BaseCommand {
  execute(notification) {
    BaseCommand.prototype.execute.call(this, notification);
    var data = notification.getBody();

    this.sendNotification(LobbyMessage.SHOW_ALERT_WITH_CONFIRM, {
        content:Utility.setText(i18n.t("C0225"), [data.telco, Utility.formatCurrency(data.card), Utility.formatCurrency(data.money)]),
        acceptLabel: i18n.t("C0123"),
        callback: function () {
            this.sendCashOut(data);
        }.bind(this)
    });
  }
  sendCashOut(data) {
    var sendData = {
        t: data.provider,
        a: parseInt(data.card),
        q:1
    };
    var socket = this.facade.retrieveProxy('StaticsicProxy');
    socket.sendCashOutCard(sendData);
  }
}
