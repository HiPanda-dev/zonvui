var BaseCommand = require('BaseCommand');
var SeatVO = require('SeatVO');
var ReceiveJoinGameCommand = require('ReceiveJoinGameCommand');
var GameConfig = require('GameConfig');
var GameMessage = require('GameMessage');
var SFSData = require('SFSData');
var Utility = require('Utility');

var puremvc = BaseCommand.puremvc;

module.exports = puremvc.define(
    // CLASS INFO
    {
        parent: ReceiveJoinGameCommand
    },

    // INSTANCE MEMBERS
    {
        execute: function (notification) {
            ReceiveJoinGameCommand.prototype.execute.call(this, notification);
        },

        // override
        updateCurGameProperties: function (params) {
            ReceiveJoinGameCommand.prototype.updateCurGameProperties.call(this, params);
            var gameRoom = params.gameRoom;

            var tableVO = this.gameProxy.getTable();
            tableVO.isDrawCard = gameRoom.isDrawCard;
            tableVO.isLayingDone = gameRoom.isLayingDone;
            tableVO.isStealCard = gameRoom.isStealCard;
            tableVO.isSendDone = gameRoom.isSendDone;
            tableVO.timePass = gameRoom.timePass;
            tableVO.timeLeft = gameRoom.timeLeft;
            if (tableVO.gameState === SFSData.WAITING)
                tableVO.isPlaying = false;
            else
                tableVO.isPlaying = true;

            if (gameRoom.currentTurn) {
                if (gameRoom.currentTurn === tableVO.myId) {
                    if (!tableVO.isDrawCard && !tableVO.isStealCard) {
                        tableVO.playingStatus = SFSData.DRAW_CARD;
                    }
                    else {
                        var seat = tableVO.getSeatByUserId(gameRoom.currentTurn);
                        if (seat.discards.length < 3) {
                            tableVO.playingStatus = SFSData.DISCARD;
                        }
                        else {
                            if (!tableVO.isLayingDone) {
                                tableVO.playingStatus = SFSData.DOWN_CARD;
                            }
                            else {
                                if (!tableVO.isSendDone)
                                    tableVO.playingStatus = SFSData.SEND_CARD;
                                else
                                    tableVO.playingStatus = SFSData.DISCARD;
                            }
                        }
                    }
                }

                tableVO.curTurn = gameRoom.currentTurn;
            }
        },

        // override
        updateMoreInfoForSeat: function (seat, player, table) {
            if (seat.status !== SeatVO.WAITING)
                seat.status = SeatVO.PLAY;

            table.cardRemain = table.TOTAL_CARDS;
            this.addUnleaveCardsInfo(seat, player, table);
            this.addStealCardsInfo(seat, player, table);
            this.addDiscardCardsInfo(seat, player, table);
            this.addLayingCardsInfo(seat, player, table);
        },

        addUnleaveCardsInfo: function (seat, player, table) {
            seat.cards = Utility.convertServerToClientCardsBinh(seat.cards);
            seat.numCard = 0;
            if (player.numCard) {
                seat.numCard = player.numCard;
                table.cardRemain -= seat.numCard
            }
            if (player.cards)
                seat.numCard = player.cards.length;
            if (seat.cards.length == 0 && seat.numCard != 0) {
                for (var j = 0; j < seat.numCard; j++) {
                    seat.cards.push(-1);
                }
            }
        },

        addLayingCardsInfo: function (seat, player, table) {
            if (player.layingCards) {
                var tempArray = [];
                for (var k = 0; k < player.layingCards.size(); k++) {
                    var tempObject = Utility.convertSFSObjectToObject(player.layingCards.getSFSObject(k));
                    tempArray.push(tempObject);
                }
                player.layingCards = tempArray;
                seat.downCards = [];
                for (var j = 0; j < player.layingCards.length; j++) {
                    seat.downCards[player.layingCards[j].layingCardsIndex] = player.layingCards[j].layingCard;
                    seat.downCards[player.layingCards[j].layingCardsIndex] = Utility.convertServerToClientCardsBinh(seat.downCards[player.layingCards[j].layingCardsIndex]);
                    table.cardRemain -= player.layingCards[j].layingCard.length;
                }
            }
        },

        addDiscardCardsInfo: function (seat, player, table) {
            if (player.discardedCards) {
                seat.discards = player.discardedCards;
                seat.discards = Utility.convertServerToClientCardsBinh(seat.discards);
                table.cardRemain -= seat.discards.length;
            }
        },

        addStealCardsInfo: function (seat, player, table) {
            if (player.stoleCards) {
                seat.stealCards = player.stoleCards;
                seat.stealCards = Utility.convertServerToClientCardsBinh(seat.stealCards);
                table.cardRemain -= seat.stealCards.length;
            }

            for (var j = 0; j < seat.stealCards.length; j++) {
                seat.cards.unshift(seat.stealCards[j]);
            }
        },
    },

    // STATIC MEMBERS
    {
        NAME: "ReceiveJoinGamePhomCommand"
    }
);
