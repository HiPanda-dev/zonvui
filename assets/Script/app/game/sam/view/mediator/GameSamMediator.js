var BaseMediator = require('BaseMediator');
var CoreGameMediator = require('CoreGameMediator');
var GameMessage = require("GameMessage");
var puremvc = BaseMediator.puremvc;
var GameSamMediator = puremvc.define
(
    // CLASS INFO
    {
        name: 'GameSamMediator',
        parent: CoreGameMediator,
        constructor: function () {
            puremvc.Mediator.call(this, this.constructor.NAME);
        }
    },
    // INSTANCE MEMBERS
    {
        onRegister: function () {
            CoreGameMediator.prototype.onRegister.call(this);
        },

        /** @override */
        listNotificationInterests: function () {
            return [
                GameMessage.ON_BAO_SAM,
                GameMessage.ON_PLACE_CARD,
                GameMessage.ON_CANCEL_TURN,
                GameMessage.ON_END_ROUND,
                GameMessage.ON_SHOW_CARDS_PLACE,
                GameMessage.ON_FINISH_GAME,
                GameMessage.ON_FINISH_GAME_WIN_WHITE,
                GameMessage.ON_SHOW_BAO_SAM_STATE
            ].concat(CoreGameMediator.prototype.listNotificationInterests.call(this));
        },

        /** @override */
        handleNotification: function (notification) {
            var data = notification.getBody();
            CoreGameMediator.prototype.handleNotification.call(this, notification);
            switch (notification.getName()) {
                case GameMessage.ON_PLACE_CARD:
                    this.view.onPlaceCard(data.playCards, data.seatId);
                    break;
                case GameMessage.ON_CANCEL_TURN:
                    this.view.onCancelTurn(data.seatId);
                    break;
                case GameMessage.ON_SHOW_BAO_SAM_STATE:
                    this.view.onShowBaoSamState();
                    break;
                case GameMessage.ON_BAO_SAM:
                    this.view.onBaoSam(data.seatId, data.sam);
                    break;
                case GameMessage.ON_END_ROUND:
                    this.view.onEndRound();
                    break;
                case GameMessage.ON_SHOW_CARDS_PLACE:
                    this.view.onShowCardsPlace(data.cards);
                    break;
                case GameMessage.ON_FINISH_GAME:
                    this.view.onFinishGame(data.listResult);
                    break;
                case GameMessage.ON_FINISH_GAME_WIN_WHITE:
                    this.view.onFinishGameWinWhite(data.arrCards, data.type);
                    break;
                default:
                    break;
            }
        },

        addHanlers: function () {
            CoreGameMediator.prototype.addHanlers.call(this);
            this.view.activePlayCards = this.activePlayCards.bind(this);
            this.view.activeCancelTurn = this.activeCancelTurn.bind(this);
            this.view.activeFakeCards = this.activeFakeCards.bind(this);
            this.view.activeBaoSam = this.activeBaoSam.bind(this);
        },

        activeBaoSam:function (params) {
            this.sendNotification(GameMessage.SEND_BAO_SAM, params);
        },

        activeFakeCards:function (params) {
            this.sendNotification(GameMessage.SEND_FAKE_CARDS, params);
        },

        activePlayCards:function (params) {
            this.sendNotification(GameMessage.SEND_PLAY_GAME, params);
        },

        activeCancelTurn:function (params) {
            this.sendNotification(GameMessage.SEND_CANNEL_TURN);
        }
    },
    // STATIC MEMBERS
    {
        getInstance: function () {
            if (this.instance === null) {
                this.instance = new GameSamMediator();
            }
            return this.instance;
        },
        instance: null,
        NAME: 'GameSamMediator'
    }
);

module.exports = GameSamMediator;
