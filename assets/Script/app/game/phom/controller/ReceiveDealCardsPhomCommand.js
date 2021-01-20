var BaseCommand = require('BaseCommand');
var BaseGameCommand = require('BaseGameCommand');
var GameMessage = require('GameMessage');
var SFSData = require('SFSData');
var SeatVO = require('SeatVO');

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
            //var arrCard = [15,31,12,7,20,11,30,41,29];
            var playerList = params.playerList;
            var currentTurn = params.currentTurn;
            var isCurrentWinner = false;
            var mySelf = this.dataUser.mySelf;
            var tableVO = this.gameProxy.getTable();
            var mySseat = this.gameProxy.getSeatByUserId(mySelf.id);

            if (!tableVO && tableVO.id < 1) return this.showWarning(BaseGameCommand.WARNING.THE_TABLE_DOES_NOT_EXIST);
            if (!arrCard) return this.showWarning(BaseGameCommand.WARNING.THE_CARDS_DOES_NOT_EXIST);
            if (!mySseat) return this.showWarning(BaseGameCommand.WARNING.THE_SEAT_DOES_NOT_EXIST);

            tableVO.isPlaying = true;
            tableVO.reset();
            tableVO.playCards = [];
            mySseat.cards = [];
            this.updateCurGameProperties(params);
            tableVO.curTurn = currentTurn;

            for (var i = 0; i < playerList.length; i++) {
                var seat = tableVO.getSeatByUserId(playerList[i]);
                seat.status = SeatVO.PLAY;
                if (!seat) continue;
                if (seat.id === mySseat.id) {
                    for (var j = 0; j < arrCard.length; j++) {
                        seat.cards.push(arrCard[j]);
                    }
                    if(currentTurn == tableVO.myId)
                    {
                        isCurrentWinner = true;
                        tableVO.nextTurn = playerList[i];
                    }
                } else {
                    if(playerList[i] == currentTurn)
                        var cardLength = 10;
                    else
                        cardLength = 9;
                    for (var j = 0; j < cardLength; j++) {
                        seat.cards.push(-1);
                    }
                    if(cardLength === 10)
                        tableVO.nextTurn = playerList[i];
                }
                seat.cardNrReminder = seat.cards.length;
            }
            this.sendNotification(GameMessage.ON_DEAL_CARDS, {
                isCurrentWinner: isCurrentWinner
            });
        },

        updateCurGameProperties:function (params) {
            
        },
    },
    // STATIC MEMBERS
    {
        NAME: "ReceiveDealCardsPhomCommand"
    }
);
