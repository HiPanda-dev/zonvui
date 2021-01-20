var BaseCommand = require('BaseCommand');
var LobbyMessage = require('LobbyMessage');
var Constants = require('Constants');

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
            var data = notification.getBody();

            var mySelf = this.facade.retrieveProxy('UserProxy').mySelf;
            var http = this.facade.retrieveProxy('HttpRequestProxy');
            var shopProxy = this.facade.retrieveProxy('ShopProxy');
            var page = 1;
            if (!data) {
                page = (shopProxy.payBackVO.currentPage === 0) ? 1 : shopProxy.payBackVO.currentPage;
            } else {
                page = data.page;
            }

            var sendData = {
                displayName:mySelf.displayName,
                token:mySelf.token,
                pageIndex: page
            };


            http.getListCardPayBack(LobbyMessage.RECEIVE_GET_LIST_CARD_PAY_BACK, sendData);
        }
    },

    // STATIC MEMBERS
    {
        NAME: "SendGetListCardPayBack"
    }
);
