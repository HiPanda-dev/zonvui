var BaseMediator = require('BaseMediator');
var CoreGameMediator = require('CoreGameMediator');
var puremvc = BaseMediator.puremvc;
var GameMessage = require('GameMessage');
var LobbyMessage = require('LobbyMessage');
var GamePhomMediator = puremvc.define
(
    // CLASS INFO
    {
        name: 'GamePhomMediator',
        parent: CoreGameMediator,
        constructor: function () {
            puremvc.Mediator.call(this, this.constructor.NAME);
        }
    },
    // INSTANCE MEMBERSa
    {
        onRegister: function () {
            CoreGameMediator.prototype.onRegister.call(this);
        },

        /** @override */
        listNotificationInterests: function () {
            return [
                GameMessage.ON_OTHER_USER_DRAW_CARD,
                GameMessage.ON_ME_DRAW_CARD,
                GameMessage.ON_DISCARD,
                GameMessage.ON_STEAL_CARD,
                GameMessage.ON_DOWN_CARD,
                GameMessage.ON_DOWN_CARD_FINISH,
                GameMessage.ON_SEND_CARD,
                GameMessage.ON_SEND_CARD_FINISH,
                GameMessage.ON_FINISH_GAME,
                GameMessage.ON_FULL_LAYING_CARDS
            ].concat(CoreGameMediator.prototype.listNotificationInterests.call(this));
        },

        /** @override */
        handleNotification: function (notification) {
            var data = notification.getBody();
            CoreGameMediator.prototype.handleNotification.call(this, notification);
            switch (notification.getName()) {
                case GameMessage.ON_SHOW_CARDS:
                    this.view.onShowCards(data.seatId, data.cards);
                    break;
                case GameMessage.ON_OTHER_USER_DRAW_CARD:
                    this.view.onOtherUserDrawCard(data.seatId);
                    break;
                case GameMessage.ON_ME_DRAW_CARD:
                    this.view.onMeDrawCard(data.card);
                    break;
                case GameMessage.ON_DISCARD:
                    this.view.onDiscard(data.card, data.userId, data.nextTurn);
                    break;
                case GameMessage.ON_STEAL_CARD:
                    this.view.onStealCard(data.card, data.userId, data.moneyAR, data.moneyBR);
                    break;
                case GameMessage.ON_FULL_LAYING_CARDS:
                    this.view.onFullLayingCards(data.layingCards, data.userId);
                    break;
                case GameMessage.ON_DOWN_CARD:
                    this.view.onDownCard(data.cards, data.userId, data.index);
                    break;
                case GameMessage.ON_DOWN_CARD_FINISH:
                    this.view.onDownCardFinish(data.userId);
                    break;
                case GameMessage.ON_SEND_CARD:
                    this.view.onSendCard(data.cards, data.userId, data.index, data.playerDes);
                    break;
                case GameMessage.ON_SEND_CARD_FINISH:
                    this.view.onSendCardFinish(data.userId);
                    break;
                case GameMessage.ON_FINISH_GAME:
                    this.view.onFinishGame(data.listResult);
                    break;
            }
        },

        addHanlers: function () {
            CoreGameMediator.prototype.addHanlers.call(this);
            this.view.activePlayCards = this.activePlayCards.bind(this);
            this.view.activeSendCards = this.activeSendCards.bind(this);
            this.view.activeSendCardsFinish = this.activeSendCardsFinish.bind(this);
            this.view.activeDownCards = this.activeDownCards.bind(this);
            this.view.activeDownCardsFinish = this.activeDownCardsFinish.bind(this);
            this.view.activeDrawCards = this.activeDrawCards.bind(this);
            this.view.activeStealCards = this.activeStealCards.bind(this);
            this.view.noticeFullDeck = this.noticeFullDeck.bind(this);
            this.view.activeFakeCards = this.activeFakeCards.bind(this);
        },

        activeFakeCards:function (params) {
            this.sendNotification(GameMessage.SEND_FAKE_CARDS, params);
        },

        activePlayCards:function (params) {
            this.sendNotification(GameMessage.SEND_PLAY_GAME, params);
        },

        activeSendCards:function (params) {
            this.sendNotification(GameMessage.SEND_SEND_CARD, params);
        },

        activeSendCardsFinish:function (params) {
            this.sendNotification(GameMessage.SEND_SEND_CARD_FINISH, params);
        },

        activeDownCards:function (params) {
            this.sendNotification(GameMessage.SEND_DOWN_CARD, params);
        },

        activeDownCardsFinish:function (params) {
            this.sendNotification(GameMessage.SEND_DOWN_CARD_FINISH, params);
        },

        activeDrawCards:function (params) {
            this.sendNotification(GameMessage.SEND_DRAW_CARD, params);
        },

        activeStealCards:function (params) {
            this.sendNotification(GameMessage.SEND_STEAL_CARD, params);
        },

        noticeFullDeck:function (params) {
            this.sendNotification(GameMessage.SEND_FULL_LAYING_CARDS, params);
        },
    },
    // STATIC MEMBERS
    {
        getInstance: function () {
            if (this.instance === null) {
                this.instance = new GamePhomMediator();
            }
            return this.instance;
        },
        instance: null,
        NAME: 'GamePhomMediator'
    }
);

module.exports = GamePhomMediator;
