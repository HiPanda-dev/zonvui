var BaseCommand = require('BaseCommand');
var SFSGameReponseCommand = require('SFSGameReponseCommand');
var LobbyMessage = require('LobbyMessage');
var GameMessage = require('GameMessage');
var SFSEvent = require('SFSEvent');
var Utility = require('Utility');

var puremvc = BaseCommand.puremvc;

module.exports = puremvc.define(
    // CLASS INFO
    {
        parent: SFSGameReponseCommand
    },

    // INSTANCE MEMBERS
    {
        SFSData: {
            CARD: 'card',
            CARDS: 'cards',
            ADD_MONEY: 'addMoney',
            SUB_MONEY: 'subMoney',
            USER_NAME: 'userName',
            PLAYER_DESTINATION: 'playerDestination',
            LAYING_CARDS_INDEX: 'layingCardsIndex',
            LAYING_CARDS: 'layingCards',
            PLAYER_LIST: 'playerList',
            IS_DRAW_CARD: 'isDrawCard',
            IS_STEAL_CARD: 'isStealCard',
            IS_LAYING_DONE: 'isLayingDone',
            IS_SEND_DONE: 'isSendDone',
            TIME_PASS: 'timePass',
            TIME_LEFT: 'timeLeft',
            CURRENT_TURN: 'currentTurn',
            SUCCESS: 'success'
        },

        execute: function (notification) {
            var params = notification.getBody();

            if (!this.checkSuccess(params)) return;
            if (this.checkQueueMesseage(params)) return;
            SFSGameReponseCommand.prototype.execute.call(this, notification);
            switch (params.cmd) {
                case SFSEvent.DRAW_CARD:
                    this.onOtherUserDrawCard(params);
                    if (params.params.get(this.SFSData.CARD) !== undefined && params.params.get(this.SFSData.CARD) !== null)
                        this.onMeDrawCard(params);
                    break;
                case SFSEvent.CARD_RESPONSE:
                    //this.onMeDrawCard(params);
                    break;
                case SFSEvent.DISCARD:
                    this.onDisCard(params);
                    break;
                case SFSEvent.STEAL_CARD:
                    this.onStealCard(params);
                    break;
                case SFSEvent.LAYING_CARD:
                    this.onLayingCard(params);
                    break;
                case SFSEvent.FULL_LAYING_CARDS:
                    this.onFullLayingCard(params);
                    break;
                case SFSEvent.LAYING_DONE:
                    this.onLayingDone(params);
                    break;
                case SFSEvent.SEND_CARD:
                    this.onSendCard(params);
                    break;
                case SFSEvent.SEND_CARD_FINISH:
                    this.onSendCardFinish(params);
                    break;
                case SFSEvent.GAME_OVER:
                    this.onFinisGame(params);
                    break;
            }
        },

        /**
         * đánh bài
         */
        onDisCard: function (params) {
            var sfo = params.params;
            var card = sfo.get(this.SFSData.CARD);
            var userName = sfo.get(this.SFSData.USER_NAME);
            var user = this.dataUser.getUserByUserName(userName);
            card = Utility.convertServerToClientCardsBinh([card])[0];

            this.sendNotification(GameMessage.RECEIVE_PLAY_GAME, {card: card, userId: user.uid, nextTurn: null});
        },

        /**
         * ăn bài
         */
        onStealCard: function (params) {
            var sfo = params.params;
            var card = sfo.get(this.SFSData.CARD);
            var moneyAR = sfo.get(this.SFSData.ADD_MONEY);
            var moneyBR = sfo.get(this.SFSData.SUB_MONEY);
            var userName = sfo.get(this.SFSData.USER_NAME);
            var user = this.dataUser.getUserByUserName(userName);
            card = Utility.convertServerToClientCardsBinh([card])[0];

            this.sendNotification(GameMessage.RECEIVE_STEAL_CARD, {
                card: card,
                userId: user.uid,
                moneyAR: moneyAR,
                moneyBR: moneyBR
            });
        },

        /**
         * hạ bài
         */
        onLayingCard: function (params) {
            var sfo = params.params;
            var cards = sfo.get(this.SFSData.CARDS);
            var index = sfo.get(this.SFSData.LAYING_CARDS_INDEX);
            var userName = sfo.get(this.SFSData.USER_NAME);
            var user = this.dataUser.getUserByUserName(userName);
            cards = Utility.convertServerToClientCardsBinh(cards);

            this.sendNotification(GameMessage.RECEIVE_DOWN_CARD, {cards: cards, userId: user.uid, index: index});
        },

        /**
         * hạ bài xong
         */
        onLayingDone: function (params) {
            var sfo = params.params;
            var userName = sfo.get(this.SFSData.USER_NAME);
            var user = this.dataUser.getUserByUserName(userName);

            this.sendNotification(GameMessage.RECEIVE_DOWN_CARD_FINISH, {userId: user.uid});
        },

        /**
         * gửi bài
         */
        onSendCard: function (params) {
            var sfo = params.params;
            var cards = sfo.get(this.SFSData.CARDS);
            var index = sfo.get(this.SFSData.LAYING_CARDS_INDEX);
            var playerDes = sfo.get(this.SFSData.PLAYER_DESTINATION);
            var userName = sfo.get(this.SFSData.USER_NAME);
            var user = this.dataUser.getUserByUserName(userName);
            var userPlayerDestination = this.dataUser.getUserByUserName(playerDes);
            cards = Utility.convertServerToClientCardsBinh(cards);

            this.sendNotification(GameMessage.RECEIVE_SEND_CARD, {
                cards: cards,
                userId: user.uid,
                index: index,
                playerDes: userPlayerDestination.uid
            });

        },

        /**
         * gửi bài xong
         */
        onSendCardFinish: function (params) {
            var sfo = params.params;
            var userName = sfo.get(this.SFSData.USER_NAME);
            var user = this.dataUser.getUserByUserName(userName);

            this.sendNotification(GameMessage.RECEIVE_SEND_CARD_FINISH, {userId: user.uid});
        },

        /**
         * Có user Ù
         */
        onFullLayingCard: function (params) {
            var sfo = params.params;
            var layingCards = sfo.get(this.SFSData.LAYING_CARDS);

            if(layingCards)
            {
                var tempArray = [];
                for (var i = 0; i < layingCards.size(); i++) {
                    tempArray[i] = layingCards.get(i);
                }

                layingCards = tempArray;

                layingCards;
                layingCards;
                if(layingCards.length > 0)
                {
                    var userName = sfo.get(this.SFSData.USER_NAME);
                    var user = this.dataUser.getUserByUserName(userName);
                    for(var i = 0; i < layingCards.length; i++)
                    {
                        layingCards[i] = Utility.convertServerToClientCardsBinh(layingCards[i]);
                    }

                    this.sendNotification(GameMessage.RECEIVE_FULL_LAYING_CARDS, {layingCards: layingCards, userId: user.uid});
                }
            }
        },

        //override
        updateMoreInfoJoinGame: function (params) {
            var sfo = params.params;
            var playerList = sfo.get(this.SFSData.PLAYER_LIST);
            if (playerList) {
                for (var i = 0; i < playerList.length; i++) {
                    var playerInfo = Utility.convertSFSObjectToObject(playerList.getSFSObject(i));
                    if (playerInfo.cards) {
                        playerInfo.cards = Utility.convertServerToClientCardsBinh(playerInfo.cards);
                    }
                    if (playerInfo.stoleCards) {
                        playerInfo.stoleCards = Utility.convertServerToClientCardsBinh(playerInfo.stoleCards);
                    }
                    if (playerInfo.discardedCards) {
                        playerInfo.discardedCards = Utility.convertServerToClientCardsBinh(playerInfo.discardedCards);
                    }
                    if (playerInfo.layingCards) {
                        for (var j = 0; j < playerInfo.layingCards.length; j++) {
                            if (playerInfo.layingCards[j].layingCard)
                                playerInfo.layingCards[j].layingCard = Utility.convertServerToClientCardsBinh(playerInfo.layingCards[j].layingCard);
                            if (!playerInfo.layingCards[j].index)
                                playerInfo.layingCards[j].index = j;
                        }
                    }

                    playerInfo.uid = this.dataUser.getUserByUserName(playerInfo.userName).uid;
                }
            }

            this.gameProxy.gameRoom.gameRoom.isDrawCard = false;
            this.gameProxy.gameRoom.gameRoom.isStealCard = false;
            this.gameProxy.gameRoom.gameRoom.isLayingDone = false;
            this.gameProxy.gameRoom.gameRoom.isSendDone = false;
            this.gameProxy.gameRoom.gameRoom.timePass = 0;
            this.gameProxy.gameRoom.gameRoom.timeLeft = 0;

            if (sfo.get(this.SFSData.IS_DRAW_CARD))
                this.gameProxy.gameRoom.gameRoom.isDrawCard = sfo.get(this.SFSData.IS_DRAW_CARD);
            if (sfo.get(this.SFSData.IS_STEAL_CARD))
                this.gameProxy.gameRoom.gameRoom.isStealCard = sfo.get(this.SFSData.IS_STEAL_CARD);
            if (sfo.get(this.SFSData.IS_LAYING_DONE))
                this.gameProxy.gameRoom.gameRoom.isLayingDone = sfo.get(this.SFSData.IS_LAYING_DONE);
            if (sfo.get(this.SFSData.IS_SEND_DONE))
                this.gameProxy.gameRoom.gameRoom.isSendDone = sfo.get(this.SFSData.IS_SEND_DONE);
            if (sfo.get(this.SFSData.TIME_PASS))
                this.gameProxy.gameRoom.gameRoom.timePass = sfo.get(this.SFSData.TIME_PASS);
            if (sfo.get(this.SFSData.TIME_LEFT))
                this.gameProxy.gameRoom.gameRoom.timeLeft = sfo.get(this.SFSData.TIME_LEFT);
            if (sfo.get(this.SFSData.CURRENT_TURN))
                this.gameProxy.gameRoom.gameRoom.currentTurn = this.dataUser.getUserByUserName(sfo.get(this.SFSData.CURRENT_TURN)).uid;

            //SFSGameReponseCommand.prototype.onJoinGame.call(this, params);
        },

        //override
        onDealCards: function (params) {
            var sfo = params.params;

            var arrCard = sfo.get(this.SFSData.CARDS);
            var playerList = sfo.get(this.SFSData.PLAYER_LIST);
            var currentTurn = sfo.get(this.SFSData.CURRENT_TURN);
            var userIdList = [];

            for (var i = 0; i < playerList.length; i++) {
                var uid = this.dataUser.getUserByUserName(playerList[i]).uid;
                userIdList.push(uid);
            }

            arrCard = Utility.convertServerToClientCardsBinh(arrCard);
            currentTurn = this.dataUser.getUserByUserName(currentTurn).uid;

            this.sendNotification(GameMessage.RECEIVE_DEAL_CARDS, {
                arrCard: arrCard,
                playerList: userIdList,
                currentTurn: currentTurn
            });
        },

        onFinisGame: function (params) {
            var sfo = params.params;
            var playerList = Utility.convertSFSArrayToArray(sfo.get(this.SFSData.PLAYER_LIST));
            for (var i = 0; i < playerList.length; i++) {
                playerList[i].playerCards = Utility.convertServerToClientCardsBinh(playerList[i].cards);
                if(this.dataUser.getUserByUserName(playerList[i].userName) !== undefined)
                    playerList[i].uid = this.dataUser.getUserByUserName(playerList[i].userName).uid;
            }

            this.sendNotification(GameMessage.RECEIVE_FINISH_GAME, {playerList: playerList});
        },

        onOtherUserDrawCard: function (params) {
            var sfo = params.params;
            var data = {};
            data.userName = sfo.get(this.SFSData.USER_NAME);
            data.uid = this.dataUser.getUserByUserName(data.userName).uid;

            this.sendNotification(GameMessage.RECEIVE_OTHER_USER_DRAW_CARD, {data: data});
        },

        onMeDrawCard: function (params) {
            var data = {};
            var sfo = params.params;
            data.card = Utility.convertServerToClientCardsBinh([sfo.get(this.SFSData.CARD)])[0];
            this.sendNotification(GameMessage.RECEIVE_ME_DRAW_CARD, {data: data});
        },

        checkSuccess: function (params) {
            var sfo = params.params;
            if (sfo === undefined || sfo === null)
                return true;
            var success = sfo.get(this.SFSData.SUCCESS);
            if (success === undefined || success === null)
                success = true;
            return success;
        }
    },

    // STATIC MEMBERS
    {
        NAME: "SFSPhomReponseCommand"
    }
);
