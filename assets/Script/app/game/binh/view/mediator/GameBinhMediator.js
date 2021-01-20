var BaseMediator = require('BaseMediator');
var CoreGameMediator = require('CoreGameMediator');
var GameMessage = require('GameMessage');
var puremvc = BaseMediator.puremvc;
var GameBinhMediator = puremvc.define
(
    // CLASS INFO
    {
        name: 'GameBinhMediator',
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
                GameMessage.ON_SORT_FINISH,
                GameMessage.ON_SHOW_BINH_LUNG,
                GameMessage.ON_SO_CHI,
                GameMessage.ON_SHOW_SAP_HAM,
                GameMessage.ON_SHOW_SAP_LANG,
                GameMessage.ON_SHOW_BAT_SAP_LANG,
                GameMessage.ON_SHOW_MAU_BINH,
                GameMessage.ON_SHOW_ALL_CARDS_BINH,
                GameMessage.ON_HIDE_RESULT_BINH,
                GameMessage.ON_HIDE_TEXT_CHI,
                GameMessage.ON_FINISH_SORT_CHI,
                GameMessage.ON_FINISH_GAME
            ].concat(CoreGameMediator.prototype.listNotificationInterests.call(this));
        },

        /** @override */
        handleNotification: function (notification) {
            var data = notification.getBody();
            CoreGameMediator.prototype.handleNotification.call(this, notification);
            switch (notification.getName()) {
                case GameMessage.ON_SORT_FINISH:
                    this.view.onSortFinishBinh(data.seatId, data.isSort);
                    break;
                case GameMessage.ON_SO_CHI:
                    this.view.onSoChi(data.seatId, data.indexChi);
                    break;
                case GameMessage.ON_SHOW_SAP_HAM:
                    this.view.onSapHam();
                    break;
                case GameMessage.ON_SHOW_SAP_LANG:
                    this.view.onSapLang(data.seatId);
                    break;
                case GameMessage.ON_SHOW_BAT_SAP_LANG:
                    this.view.onBatSapLang(data.seatId);
                    break;
                case GameMessage.ON_SHOW_BINH_LUNG:
                    this.view.onBinhLung(data.seatId, data.isLung);
                    break;
                case GameMessage.ON_SHOW_MAU_BINH:
                    this.view.onMauBinh(data.seatId);
                    break;
                case GameMessage.ON_HIDE_RESULT_BINH:
                    this.view.onHideResultBinh();
                    break;
                case GameMessage.ON_SHOW_ALL_CARDS_BINH:
                    this.view.onShowAllCardsBinh(data.seatId, data.isFaceUp);
                    break;
                case GameMessage.ON_HIDE_TEXT_CHI:
                    this.view.onHideTextChi();
                    break;
                case GameMessage.ON_FINISH_SORT_CHI:
                    this.view.onFinishSortChi();
                    break;
                case GameMessage.ON_FINISH_GAME:
                    this.view.onFinishGame();
                    break;
                default:
                    break;
            }
        },

        addHanlers: function () {
            CoreGameMediator.prototype.addHanlers.call(this);
            this.view.activeFakeCards = this.activeFakeCards.bind(this);
            this.view.activePlayGame = this.activePlayGame.bind(this);
            this.view.activeSubmitHand = this.activeSubmitHand.bind(this);
        },

        activeFakeCards:function (params) {
            this.sendNotification(GameMessage.SEND_FAKE_CARDS, params);
        },

        activePlayGame:function (params) {
            this.sendNotification(GameMessage.SEND_PLAY_GAME, params);
        },

        activeSubmitHand:function (params) {
            this.sendNotification(GameMessage.SEND_SUBMIT_HAND, params);
        }
    },
    // STATIC MEMBERS
    {
        getInstance: function () {
            if (this.instance === null) {
                this.instance = new GameBinhMediator();
            }
            return this.instance;
        },
        instance: null,
        NAME: 'GameBinhMediator'
    }
);

module.exports = GameBinhMediator;
