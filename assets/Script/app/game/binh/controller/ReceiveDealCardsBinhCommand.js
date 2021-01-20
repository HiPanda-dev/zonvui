var BaseCommand = require('BaseCommand');
var GameMessage = require('GameMessage');
var BaseGameCommand = require('BaseGameCommand');

var puremvc = BaseCommand.puremvc;

module.exports = puremvc.define(
    // CLASS INFO
    {
        parent: BaseGameCommand
    },

    // INSTANCE MEMBERS
    {
        execute: function (notification) {
            BaseGameCommand.prototype.execute.call(this, notification);
            var params = notification.getBody();

            var arrCard = params.arrCard;
            var playerList = params.playerList;
            var mySelf = this.dataUser.mySelf;
            var tableVO = this.gameProxy.getTable();
            var mySseat = this.gameProxy.getSeatByUserId(mySelf.id);

            if (!tableVO && tableVO.id < 1) return this.showWarning(BaseGameCommand.WARNING.THE_TABLE_DOES_NOT_EXIST);
            if (!arrCard) return this.showWarning(BaseGameCommand.WARNING.THE_CARDS_DOES_NOT_EXIST);
            if (!mySseat) return this.showWarning(BaseGameCommand.WARNING.THE_SEAT_DOES_NOT_EXIST);

            tableVO.reset();
            tableVO.playCards = [];
            mySseat.cards = [];

            for (var i = 0; i < playerList.length; i++) {
                var seat = tableVO.getSeatByUserId(playerList[i]);
                if (!seat) continue;
                if (seat.id === mySseat.id) {
                    for (var j = 0; j < arrCard.length; j++) {
                        seat.cards.push(arrCard[j]);
                    }
                } else {
                    for (var j = 0; j < 13; j++) {
                        seat.cards.push(0);
                    }
                }
                seat.cardNrReminder = seat.cards.length;
                seat.isSort = false;
            }
            this.sendNotification(GameMessage.ON_DEAL_CARDS);
        }
    },

    // STATIC MEMBERS
    {
        NAME: "ReceiveDealCardsBinhCommand"
    }
);
