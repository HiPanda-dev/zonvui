var BaseMediator = require('BaseMediator');
var CoreGameMediator = require('CoreGameMediator');
var GameMessage = require('GameMessage');
var SeatVO = require('SeatVO');

var puremvc = BaseMediator.puremvc;
var GameXocDiaMediator = puremvc.define
(
    // CLASS INFO
    {
        name: 'GameXocDiaMediator',
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
                GameMessage.ON_START_BETTING_GAME,
                GameMessage.ON_STOP_BETTING_GAME,
                GameMessage.ON_DICE_RESULT,
                GameMessage.ON_UPDATE_BET,
                GameMessage.ON_FINISH_GAME,
                GameMessage.ON_COUNT_DOWN_GAME,
                GameMessage.ON_SOLD_BET,
                GameMessage.ON_COUNT_DOWN_DESTROY_GAME

            ].concat(CoreGameMediator.prototype.listNotificationInterests.call(this));
        },

        /** @override */
        handleNotification: function (notification) {
            var data = notification.getBody();
            CoreGameMediator.prototype.handleNotification.call(this, notification);
            switch (notification.getName()) {
                case GameMessage.ON_START_BETTING_GAME:
                    this.view.onStartBettingGame();
                    break;
                case GameMessage.ON_STOP_BETTING_GAME:
                    this.view.onStopBettingGame();
                    break;
                case GameMessage.ON_DICE_RESULT:
                    this.view.onDiceResult(data.arrDice, data.arrPos);
                    break;
                case GameMessage.ON_UPDATE_BET:
                    this.view.onUpdateBet(data);
                    break;
                case GameMessage.ON_FINISH_GAME:
                    this.view.onFinishGame();
                    break;
                case GameMessage.ON_COUNT_DOWN_GAME:
                    this.view.onCoutDownGame(data.timeCoutDown);
                    break;
                case GameMessage.ON_SOLD_BET:
                    this.view.onSoldBet(data.position);
                    break;
                case GameMessage.ON_COUNT_DOWN_DESTROY_GAME:
                    this.view.onCountDownDestroyGame(data.timeLeft);
                    break;
                default:
                    break;
            }
        },

        addHanlers: function () {
            CoreGameMediator.prototype.addHanlers.call(this);
            this.view.activeSitDown = this.activeSitDown.bind(this);
            this.view.activePlayGame = this.activePlayGame.bind(this);
            this.view.activeCancelBet = this.activeCancelBet.bind(this);
            this.view.activeBuyMaster = this.activeBuyMaster.bind(this);
            this.view.activeDatLai = this.activeDatLai.bind(this);
            this.view.activeX2 = this.activeX2.bind(this);

            this.view.activeDuoiChan = this.activeDuoiChan.bind(this);
            this.view.activeDuoiLe = this.activeDuoiLe.bind(this);
            this.view.activeCanTat = this.activeCanTat.bind(this);
        },

        activeDuoiChan:function () {
            this.sendNotification(GameMessage.SEND_SOLD_BET, {type:3});
        },

        activeDuoiLe:function () {
            this.sendNotification(GameMessage.SEND_SOLD_BET, {type:0});
        },

        activeCanTat:function () {
            this.sendNotification(GameMessage.SEND_SOLD_BET, {type:-1});
        },

        activeDatLai:function () {
            this.sendNotification(GameMessage.SEND_RE_BET);
        },

        activeX2:function () {
            this.sendNotification(GameMessage.SEND_X2_BET);
        },

        activePlayGame: function (bet, pos, userId) {
            this.sendNotification(GameMessage.SEND_PLAY_GAME, {
                bet: bet,
                pos: pos,
                userId: userId,
                typeBet:this.tableVO.curIdxChip
            });
        },

        activeSitDown:function (params) {
            if(params.seatId === 1) return;
            if(this.tableVO.getSeatBySeatId(params.seatId).status !== SeatVO.BLANK) return;
            if(this.tableVO.getSeatByUserId(this.tableVO.myId)) return;

            this.sendNotification(GameMessage.SEND_SIT_DOWN, params);
        },

        activeCancelBet:function () {
            this.sendNotification(GameMessage.SEND_CANCEL_BET);
        },

        activeBuyMaster:function () {
            this.sendNotification(GameMessage.SEND_BUY_MASTER_GAME);
        }
    },
    // STATIC MEMBERS
    {
        getInstance: function () {
            if (this.instance === null) {
                this.instance = new GameXocDiaMediator();
            }
            return this.instance;
        },
        instance: null,
        NAME: 'GameXocDiaMediator'
    }
);

module.exports = GameXocDiaMediator;
