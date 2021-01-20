var BaseCommand = require('BaseCommand');
var BaseGameCommand = require('BaseGameCommand');
var GameMessage = require('GameMessage');

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
            var curTurn = params.curTurn;
            //var randomCardList = params.randomCardList;
            var playerList =  params.playerList;
            var mySelf = this.dataUser.mySelf;
            var tableVO = this.gameProxy.getTable();
            var mySseat = this.gameProxy.getSeatByUserId(mySelf.id);

            if (!tableVO && tableVO.id < 1) return this.showWarning(BaseGameCommand.WARNING.THE_TABLE_DOES_NOT_EXIST);
            if (!arrCard) return this.showWarning(BaseGameCommand.WARNING.THE_CARDS_DOES_NOT_EXIST);
            if (!mySseat) return this.showWarning(BaseGameCommand.WARNING.THE_SEAT_DOES_NOT_EXIST);

            tableVO.reset();
            tableVO.curTurn = curTurn;
            tableVO.playCards = [];
            mySseat.cards = [];
            this.updateCurGameProperties(params);

            //this.onDealRandomCardList(randomCardList);
            //TweenLite.delayedCall(3, this.onDealCards.bind(this),[playerList, tableVO, arrCard]);
            this.onDealCards(playerList, tableVO, arrCard);
        },

        // onDealRandomCardList: function (randomCardList) {
        //     var tableVO = this.gameProxy.getTable();
        //     for (var i = 0; i < randomCardList.length; i++) {
        //         var seat = tableVO.getSeatByUserId(randomCardList[i].uid);
        //         if (!seat) continue;
        //         seat.randomCard = randomCardList[i].randomCard;
        //     }
        //     this.sendNotification(GameMessage.ON_DEAL_RANDOM_CARD);
        // },

        onDealCards: function (playerList, tableVO, arrCard) {
            var i, j;
            var mySelf = this.dataUser.mySelf;
            var mySseat = this.gameProxy.getSeatByUserId(mySelf.id);

            for (i = 0; i < playerList.length; i++) {
                var seat = tableVO.getSeatByUserId(playerList[i]);
                if (!seat) continue;
                if (seat.id === mySseat.id) {
                    for (j = 0; j < arrCard.length; j++) {
                        seat.cards.push(arrCard[j]);
                    }
                } else {
                    for (j = 0; j < tableVO.TOTAL_CARDS; j++) {
                        seat.cards.push(0);
                    }
                }
                seat.cardNrReminder = seat.cards.length;
            }
            this.sendNotification(GameMessage.ON_DEAL_CARDS);
        },

        updateCurGameProperties: function (params) {

        }
    },

    // STATIC MEMBERS
    {
        NAME: "ReceiveDealCardsTLMNCommand"
    }
);
