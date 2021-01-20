var BaseCommand = require('BaseCommand');
var LobbyMessage = require('LobbyMessage');
var Utility = require('Utility');
var i18n = require('i18n');

var puremvc = BaseCommand.puremvc;

module.exports = puremvc.define(
    // CLASS INFO
    {
        parent: BaseCommand
    },

    // INSTANCE MEMBERS
    {
        execute: function (notification) {
            BaseCommand.prototype.execute.call(this, notification);
            if (this.isError(notification.getBody().data)) return;
            var data = notification.getBody().data;

            this.sendNotification(LobbyMessage.SHOW_ALERT_WITH_CONFIRM,
            {
                content: Utility.setText(i18n.t("C0031"), [data.telco, data.value, data.code, data.serial]),
                acceptLabel: i18n.t("C0041"),
                callback: this.onComfirmPayBackCard.bind(this, data)
            });
        },

        onComfirmPayBackCard: function (data) {
            var params = {
                partnerCode:data.telco,
                numSerial:data.serial,
                numCard:data.code
            };
            this.sendNotification(LobbyMessage.SEND_MOBILE_CARD_RECHARGE, params);
        }
    },

    // STATIC MEMBERS
    {
        NAME: "ReceiveGetInfoCardPayBackCommand"
    }
);
