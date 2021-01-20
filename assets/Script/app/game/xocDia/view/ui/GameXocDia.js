var CoreGame = require('CoreGame');
var GameEvent = require('GameEvent');
var CompositeNode = require('CompositeNode');
var PlayerTableXocDia = require('PlayerTableXocDia');
var ListButtonXocDia = require('ListButtonXocDia');
var McHistoryXocDia = require('McHistoryXocDia');
var McBetXocDia = require('McBetXocDia');
var McBatXocDia = require('McBatXocDia');
var TableXocDiaVO = require('TableXocDiaVO');
var i18n = require('i18n');
var Utility = require('Utility');
var GameXocDiaMediator = require('GameXocDiaMediator');

cc.Class({
    extends: CoreGame,

    properties: {
        listChipSprite: {
          type: cc.Texture2D, // use 'type:' to define an array of Texture2D objects
          default: []
        },
        listChipBet: [cc.Toggle],
        txtNotice: cc.Label,
        txtMyMoney: cc.Label
    },


    // use this for initialization
    onLoad: function () {
        GameXocDiaMediator.getInstance().init(this);
        CoreGame.prototype.onLoad.call(this);
        this.timerDestroy = null;
        this.timerLeftDestroy = 0;
    },

    buildUI: function () {
        CoreGame.prototype.buildUI.call(this);
        this.mcListButton = new ListButtonXocDia.create(CompositeNode.LIST_BUTTON_XOC_DIA_NODE);
        this.mcBet = new McBetXocDia.create(CompositeNode.MC_BET_XOC_DIA_NODE);
        this.mcBat = new McBatXocDia.create(CompositeNode.MC_BAT_XOC_DIA_NODE);
        this.mcHistory = new McHistoryXocDia.create(CompositeNode.MC_HISTORY_XOC_DIA_NODE);

        this.rootGame.add(this.mcListButton);
        this.rootGame.add(this.mcBet);
        this.rootGame.add(this.mcBat);
        this.rootGame.add(this.mcHistory);

        this.rootGame.buildUI();
        this.setup();
        this.applyLayout();
        this.initialize();
        this.addEventListeners();
    },

    setup: function () {
        CoreGame.prototype.setup.call(this);

        for (var i = 1; i <= this.tableVO.TOTAL_PLAYER; i++) {
            var seat = this.tableVO.getSeatBySeatId(i);
            if (seat === undefined) continue;

            var player = new PlayerTableXocDia.create(CompositeNode.PLAYER_NODE + "_" + i);
            player.setup(seat.id, this.tableVO);
            this.playerMgr.add(player);

        }
    },

    applyLayout: function () {
        this.mcListButton.container = this.component.getChildByName("ctnButton");
        this.mcHistory.container = this.component.getChildByName("mcHistory");
        this.mcBet.container = this.component.getChildByName("mcBet");
        this.mcBat.container = this.component.getChildByName("mcBat");

        this.mcListButton.tableVO = this.tableVO;
        this.mcHistory.tableVO = this.tableVO;
        this.mcBat.tableVO = this.tableVO;
        this.mcBet.tableVO = this.tableVO;
        this.mcBet.listChipBet = this.listChipBet;
        this.mcBet.playerMgr = this.playerMgr;
        this.mcBet.mcMoney = this.txtMyMoney.node.parent;

        CoreGame.prototype.applyLayout.call(this);
    },

    initialize: function () {
        CoreGame.prototype.initialize.call(this);
        this.tableVO.curIdxChip = 0;
        this.mcBet.listChipSprite = this.listChipSprite;
        this.setNotice("");
        this.updateMyMoney();
    },

    addEventListeners: function () {
        CoreGame.prototype.addEventListeners.call(this);

        for (var i = 1; i <= this.tableVO.TOTAL_PLAYER; i++) {
            var node = this.inviteMgr.getChild(CompositeNode.INVITE_NODE + "_" + i).container;
            node.on(GameEvent.SIT_DOWN, this.onHanlerSitDown, this);
        }
        this.mcBet.container.on(GameEvent.UPDATE_USER_MONEY_EVENT, this.onUpdateUserMoney.bind(this));
    },

    removeEventListeners: function () {
        CoreGame.prototype.removeEventListeners.call(this);

        for (var i = 1; i <= this.tableVO.TOTAL_PLAYER; i++) {
            var node = this.inviteMgr.getChild(CompositeNode.INVITE_NODE + "_" + i).container;
            node.off(GameEvent.SIT_DOWN, this.onHanlerSitDown, this);
        }

        this.mcBet.container.off(GameEvent.UPDATE_USER_MONEY_EVENT, this.onUpdateUserMoney.bind(this));
    },

    //==================================================================================================================
    //===========================OVERRIDE===============================================================================
    //==================================================================================================================


    onStartGame: function () {
        CoreGame.prototype.onStartGame.call(this);
        this.tableVO.gameState = TableXocDiaVO.STATE_START;
        this.rootGame.countDownStartGame(this.tableVO.START_TIME);
        this.setNotice(i18n.t("G0002"));
    },

    onStartBettingGame: function () {
        this.tableVO.gameState = TableXocDiaVO.STATE_START_BET;
        this.rootGame.startBettingGame();
        this.rootGame.countDownStartGame(this.tableVO.START_TIME_BETTING);
        this.setNotice(i18n.t("G0003"));
    },

    onStopBettingGame: function () {
        var time = ('LVC' === this.tableVO.ownerId) ? this.tableVO.STOP_TIME_BETTING_LVC : this.tableVO.STOP_TIME_BETTING;
        this.rootGame.stopBettingGame();
        this.tableVO.gameState = TableXocDiaVO.STATE_STOP_BET;
        this.rootGame.countDownStartGame(time);
        this.setNotice(i18n.t("G0004"));
    },

    onDiceResult: function (arrDice, arrPos) {
        this.rootGame.diceResult(arrDice, arrPos);
        this.tableVO.gameState = TableXocDiaVO.STATE_RESULT;
        this.rootGame.countDownStartGame(this.tableVO.TIME_SHOW_RESULT);

        var str = (this.isChan(arrDice)) ? i18n.t("G0005") : i18n.t("G0006");
        this.setNotice(str);
    },

    onUpdateBet: function (params) {
        this.mcBet.playBet(params.pos, params.typeBet, params.userName, params.bet);
        this.mcBet.updateBet();
        this.updateMyMoney();
    },


    onFinishGame: function () {
        this.rootGame.finishGame();
        this.updateMyMoney();
    },

    onCoutDownGame: function (time) {
        this.rootGame.countDownStartGame(time);
    },

    onCountDownDestroyGame:function (time) {
        this.rootGame.countDownDestroyGame(time);
        this.timerLeftDestroy = time;
        if(this.timerDestroy) {
            clearInterval(this.timerDestroy);
            this.timerDestroy = null;
        }
        this.timerDestroy = setInterval(this.onTimerDestroyGame.bind(this), 1000);
    },

    onSoldBet:function (position) {
        this.rootGame.soldBet(position);
    },

    onUpdateGameState: function () {
        CoreGame.prototype.onUpdateGameState.call(this);

        if (this.tableVO.timeBet && this.tableVO.timeBet > 0) {
            this.rootGame.countDownStartGame(this.tableVO.timeBet);
        }

        switch (this.tableVO.gameState) {
            case  TableXocDiaVO.STATE_WAIT:
                this.setNotice(i18n.t("G0001"));
                break;
            case TableXocDiaVO.STATE_START:
                this.setNotice(i18n.t("G0002"));
                break;
            case TableXocDiaVO.STATE_START_BET:
                this.setNotice(i18n.t("G0003"));
                break;
            case TableXocDiaVO.STATE_STOP_BET:
                this.setNotice(i18n.t("G0004"));
                break;
            default:
                this.setNotice(i18n.t("G0001"));
                break;
        }


    },


    //==================================================================================================================
    //==================================================================================================================
    //==================================================================================================================
    onTimerDestroyGame:function () {
        this.timerLeftDestroy--;
        this.setNotice(Utility.setText(i18n.t("G0008"), [this.timerLeftDestroy]));
        if(this.timerLeftDestroy <= 0){
            clearInterval(this.timerDestroy);
            this.timerDestroy = null;
        }
    },

    onHanlerDuoiChan: function () {
        this.activeDuoiChan();
    },

    onHanlerDuoiLe: function () {
        this.activeDuoiLe();
    },

    onHanlerCanTat: function () {
        this.activeCanTat();
    },

    onHanlerBuyMaster: function () {
        this.activeBuyMaster();
    },

    onHanlerHuyCuocClick: function () {
        this.mcBet.clearBet();
        this.mcBet.clearListBet();
    },

    onHanlerDatLaiClick: function () {
        this.activeDatLai();
    },

    onHanlerDatGapDoiClick: function () {
        this.activeX2();
    },

    onHanlerBet1Click: function () {
        this.tableVO.curIdxChip = 0;
    },

    onHanlerBet2Click: function () {
        this.tableVO.curIdxChip = 1;
    },

    onHanlerBet3Click: function () {
        this.tableVO.curIdxChip = 2;
    },

    onHanlerBet4Click: function () {
        this.tableVO.curIdxChip = 3;
    },

    onHanlerChanClick: function () {
        this.activePlayGame(this.tableVO.getCurrentMoneyChip(), TableXocDiaVO.POS_CHAN, this.tableVO.myId);
    },

    onHanlerLeClick: function () {
        this.activePlayGame(this.tableVO.getCurrentMoneyChip(), TableXocDiaVO.POS_LE, this.tableVO.myId);
    },

    onHanlerSpec1Click: function () {
        this.activePlayGame(this.tableVO.getCurrentMoneyChip(), TableXocDiaVO.POS_SPECIAL_1, this.tableVO.myId);
    },

    onHanlerSpec2Click: function () {
        this.activePlayGame(this.tableVO.getCurrentMoneyChip(), TableXocDiaVO.POS_SPECIAL_2, this.tableVO.myId);
    },

    onHanlerSpec3Click: function () {
        this.activePlayGame(this.tableVO.getCurrentMoneyChip(), TableXocDiaVO.POS_SPECIAL_3, this.tableVO.myId);
    },

    onHanlerSpec4Click: function () {
        this.activePlayGame(this.tableVO.getCurrentMoneyChip(), TableXocDiaVO.POS_SPECIAL_4, this.tableVO.myId);
    },

    onUpdateUserMoney: function (params) {
        var seatId = params.detail.seatId;
        var money = params.detail.money;

        this.updateMyMoney();
        this.rootGame.updateMoney(seatId, money);
    },

    updateMyMoney: function () {
        this.txtMyMoney.string = this.tableVO.myGold;
    },
    /**
     *
     * @param params
     * params.seatId
     */
    onHanlerSitDown: function (params) {
        this.activeSitDown(params.detail);
    },


    isChan: function (array) {
        var count = 0;
        for (var i = 0; i < array.length; i++) {
            if (array[i] === 0) {
                count++;
            }
        }

        if (count % 2 === 0) return true;
        return false;
    },

    setNotice: function (value) {
        this.txtNotice.string = value;
    }
});
