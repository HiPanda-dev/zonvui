var BaseMediator = require('BaseMediator');
var CoreGameProxy = require('CoreGameProxy');
var GameMessage = require('GameMessage');
var LobbyMessage = require('LobbyMessage');
var puremvc = BaseMediator.puremvc;
var Constants = require('Constants');

var CoreGameMediator = puremvc.define
(
    // CLASS INFO
    {
        name: 'CoreGameMediator',
        parent: BaseMediator,
        constructor: function () {
            this.tableVO = null;
        }
    },
    // INSTANCE MEMBERS
    {
        initialize: function () {
            this.userProxy = this.facade.retrieveProxy('UserProxy');
        },

        /** @override */
        listNotificationInterests: function () {
            return [
                GameMessage.ON_INIT_GAME_UI,
                GameMessage.ON_SHOW_GAME,
                GameMessage.ON_HIDE_GAME,
                GameMessage.ON_SIT_DOWN,
                GameMessage.ON_STAND_UP,
                GameMessage.ON_UPDATE_OWNER,
                GameMessage.ON_UPDATE_USER_INFO,
                GameMessage.ON_LEAVE_GAME,
                GameMessage.ON_USER_LEAVE_GAME,
                GameMessage.ON_COUNT_DOWN_START_GAME,
                GameMessage.ON_START_GAME,
                GameMessage.ON_DEAL_CARDS,
                GameMessage.ON_DEAL_RANDOM_CARD,
                GameMessage.ON_UPDATE_CURRENT_TURN,
                GameMessage.ON_SHOW_CARDS,
                GameMessage.ON_UPDATE_MONEY,
                GameMessage.ON_DESTROY_GAME,
                GameMessage.ON_SHOW_BUY_MASTER_GAME,
                GameMessage.ON_UPDATE_GAME_STATE,
                GameMessage.ON_HIDE_READY_GAME,
                GameMessage.ON_UPDATE_USER_VIEW_STATE,
                GameMessage.ON_SHOW_CHAT_GAME_CONTENT,
                GameMessage.ON_REGISTER_QUIT,
                LobbyMessage.ON_UPDATE_MY_INFO
            ];
        },

        /** @override */
        handleNotification: function (notification) {
            var data = notification.getBody();
            switch (notification.getName()) {
                case GameMessage.ON_INIT_GAME_UI:
                    this.tableVO = this.facade.retrieveProxy(CoreGameProxy.NAME).getTable();
                    this.view.tableVO = this.facade.retrieveProxy(CoreGameProxy.NAME).getTable();
                    this.view.buildUI();
                    break;
                case GameMessage.ON_SHOW_GAME:
                    this.view.show();
                    this.view.initialize();
                    break;
                case GameMessage.ON_HIDE_GAME:
                    this.view.hide();
                    break;
                case GameMessage.ON_UPDATE_USER_VIEW_STATE:
                    this.view.onUpdateUserViewState();
                    break;
                case GameMessage.ON_SIT_DOWN:
                    this.view.onSitdown(data.seatId, data.user);
                    break;
                case GameMessage.ON_STAND_UP:
                    this.view.onStandup(data.seatId);
                    break;
                case GameMessage.ON_UPDATE_OWNER:
                    if (this.view) this.view.onUpdateOwner();
                    break;
                case GameMessage.ON_UPDATE_USER_INFO:
                    this.view.onUpdateUserInfo(data.seatId, data.user);
                    if (data.user && data.user.id === this.tableVO.myId) this.sendNotification(LobbyMessage.ON_UPDATE_MY_INFO);
                    break;
                case GameMessage.ON_UPDATE_MONEY:
                    this.view.onUpdateMoney(data.seatId, data.addMoney);
                    break;
                case GameMessage.ON_LEAVE_GAME:
                    this.view.onLeaveGame();
                    break;
                case GameMessage.ON_USER_LEAVE_GAME:
                    this.view.onUserExitGame(data.seatId);
                    break;
                case GameMessage.ON_COUNT_DOWN_START_GAME:
                    this.view.onCountDownStartGame(data.timeLeft);
                    break;
                case GameMessage.ON_START_GAME:
                    this.view.onStartGame();
                    break;
                case GameMessage.ON_DEAL_CARDS:
                    this.view.onDealCards();
                    break;
                case GameMessage.ON_DEAL_RANDOM_CARD:
                    this.view.onDealRandomCard();
                    break;
                case GameMessage.ON_UPDATE_CURRENT_TURN:
                    this.view.onUpdateCurrentTurn();
                    break;
                case GameMessage.ON_SHOW_CARDS:
                    this.view.onShowCards(data.seatId, data.cards);
                    break;
                case GameMessage.ON_DESTROY_GAME:
                    if (this.view !== null && this.view !== undefined) {
                        this.view.onDestroyGame();
                        this.viewComponent = null;
                        this.view = null;
                    }
                    break;
                case GameMessage.ON_SHOW_BUY_MASTER_GAME:
                    this.view.onShowBuyMasterGame();
                    break;
                case GameMessage.ON_UPDATE_GAME_STATE:
                    this.view.onUpdateGameState();
                    break;
                case GameMessage.ON_HIDE_READY_GAME:
                    this.view.onHideReadyGame();
                    break;
                case GameMessage.ON_SHOW_CHAT_GAME_CONTENT:
                    this.view.onShowChatGameContent(data.seatId, data.chatContent, data.chatType);
                    break;
                case GameMessage.ON_REGISTER_QUIT:
                    this.view.onRegisterQuit(data.seatId, data.isQuit);
                    break;
                case LobbyMessage.ON_UPDATE_MY_INFO:
                    if (this.view) this.view.onUpdateMyInfo(this.userProxy.mySelf);
                    break;
                default:
                    break;
            }
        },

        addHanlers: function () {
            this.view.onLoadGameDone = this.onLoadGameDone.bind(this);
            this.view.activeBackGame = this.activeBackGame.bind(this);
            this.view.activeShowRecharge = this.activeShowRecharge.bind(this);
            this.view.activeShowChat = this.activeShowChat.bind(this);
            this.view.activeShowSetting = this.activeShowSetting.bind(this);
        },

        activeShowChat: function (chatType) {
            this.sendNotification(LobbyMessage.SHOW_CHAT_GAME_SCENE,{currentGame:Constants.CURRENT_GAME, chatType:chatType});
        },

        onLoadGameDone: function () {
            this.sendNotification(GameMessage.INIT_GAME);
            this.sendNotification(GameMessage.ON_UPDATE_GAME_STATE);
        },

        activeBackGame: function () {
            this.sendNotification(GameMessage.SEND_LEAVE_GAME);
        },

        activeShowRecharge: function () {
            this.sendNotification(LobbyMessage.SHOW_RECHARGE_SCENE);
        },

        activeShowSetting: function () {
            this.sendNotification(LobbyMessage.SHOW_SETTING_SCENE);
        }
    },
    // STATIC MEMBERS
    {
        getInstance: function () {
            if (this.instance === null) {
                this.instance = new CoreGameMediator();
            }
            return this.instance;
        },
        instance: null,
        NAME: 'CoreGameMediator'
    }
);

module.exports = CoreGameMediator;
