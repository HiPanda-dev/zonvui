var CoreGame = require('CoreGame');
var AddMoneySam = require('AddMoneySam');
var PlayerTableSam = require('PlayerTableSam');
var PlayerCardsSam  = require('PlayerCardsSam');
var PlaceCardsSam = require('PlaceCardsSam');
var ListButtonSam = require('ListButtonSam');
var ResultTableSam = require('ResultTableSam');
var FakeCardSam = require('FakeCardSam');
var OtherCardsSam = require('OtherCardsSam');
var StatusPlaceCardsSam = require('StatusPlaceCardsSam');
var ResultTableWinWhiteSam = require('ResultTableWinWhiteSam');
var BaoSamPannel = require('BaoSamPannel');
var ResultStatusSam = require('ResultStatusSam');
var CompositeNode = require('CompositeNode');
var Composite = require('Composite');
var GameEvent = require('GameEvent');
var GameSamMediator = require('GameSamMediator');

cc.Class({
    extends: CoreGame,

    properties: {
        isSnapWithPlayer:true
    },

    // use this for initialization
    onLoad: function () {
        GameSamMediator.getInstance().init(this);
        CoreGame.prototype.onLoad.call(this);
    },

    buildUI:function () {
        CoreGame.prototype.buildUI.call(this);
        this.mcPlayerCards = new PlayerCardsSam.create(CompositeNode.PLAYER_CARDS_PANEL_SAM_NODE);
        this.mcListButton = new ListButtonSam.create(CompositeNode.LIST_BUTTON_SAM_NODE);
        this.mcPlaceCard = new PlaceCardsSam.create(CompositeNode.PLACE_CARD_SAM_NODE);
        this.mcFakeCard = new FakeCardSam.create(CompositeNode.FAKE_CARD_SAM_NODE);
        this.mcStatusPlaceCard = new StatusPlaceCardsSam.create(CompositeNode.STATUS_PLACE_CARD_NODE);
        this.resultTableMgr = new Composite.create(CompositeNode.RESULT_TABLE_MANAGER_NODE);
        this.otherCardsMgr = new Composite.create(CompositeNode.OTHER_CARDS_MANAGER_NODE);
        this.mcBaoSam = new BaoSamPannel.create(CompositeNode.BAO_SAM_NODE);
        this.addMoneyMgr = new Composite.create(CompositeNode.ADD_MONEY_MANAGER_NODE);

        this.rootGame.add(this.mcPlayerCards);
        this.rootGame.add(this.mcListButton);
        this.rootGame.add(this.mcPlaceCard);
        this.rootGame.add(this.mcFakeCard);
        this.rootGame.add(this.mcStatusPlaceCard);
        this.rootGame.add(this.resultTableMgr);
        this.rootGame.add(this.otherCardsMgr);
        this.rootGame.add(this.mcBaoSam);
        this.rootGame.add(this.addMoneyMgr);

        this.rootGame.buildUI();
        this.setup();
        this.applyLayout();
        this.initialize();
        this.addEventListeners();
        if(this.isSnapWithPlayer){
            this.rootGame.snapWithPlayer();
        }
    },

    setup:function () {
        CoreGame.prototype.setup.call(this);

        for (var i = 1; i <= this.tableVO.TOTAL_PLAYER; i++){
            var seat = this.tableVO.getSeatBySeatId(i);
            if(seat === undefined) continue;

            var player = new PlayerTableSam.create(CompositeNode.PLAYER_NODE + "_" + i);
            player.setup(seat.id, this.tableVO);
            this.playerMgr.add(player);

            var resultTable = new ResultTableSam.create(CompositeNode.RESULT_TABLE_NODE+ "_" + i);
            resultTable.setup(seat.id, this.tableVO);
            this.resultTableMgr.add(resultTable);

            var addMoney = new AddMoneySam.create(CompositeNode.ADD_MONEY_NODE + "_" + i);
            addMoney.setup(seat.id, this.tableVO);
            this.addMoneyMgr.add(addMoney);

            if(i!==1){
                var ontherCards =   new OtherCardsSam.create(CompositeNode.OTHER_CARDS_NODE+ "_" + i);
                ontherCards.setup(seat.id, this.tableVO);
                this.otherCardsMgr.add(ontherCards);
            }
        }

        this.resultWinWhite = new ResultTableWinWhiteSam.create(CompositeNode.RESULT_TABLE_WIN_WHITE_NODE);
        this.mcResultSatus = new ResultStatusSam.create(CompositeNode.RESULT_STATUS_NODE);
        this.resultTableMgr.add(this.resultWinWhite);
        this.resultTableMgr.add(this.mcResultSatus);
    },

    applyLayout:function () {
        this.mcPlayerCards.container = this.component.getChildByName("mcPlayerCards");
        this.mcListButton.container = this.component.getChildByName("ctnButton");
        this.mcPlaceCard.container = this.component.getChildByName("mcPlaceCard");
        this.mcFakeCard.container = this.component.getChildByName("mcFakeCard");
        this.resultTableMgr.container = this.component.getChildByName("ctnResult");
        this.mcStatusPlaceCard.container = this.component.getChildByName("mcStatusPlace");
        this.resultWinWhite.container = this.resultTableMgr.container.getChildByName("mcResultWinWhite");
        this.mcResultSatus.container = this.resultTableMgr.container.getChildByName("mcResultSatus");
        this.otherCardsMgr.container = this.component.getChildByName("ctnOtherCards");
        this.mcBaoSam.container = this.component.getChildByName("mcBaoSam");
        this.addMoneyMgr.container = this.component.getChildByName("ctnAddMoney");

        this.mcPlayerCards.tableVO = this.tableVO;
        this.mcListButton.tableVO = this.tableVO;
        this.mcPlaceCard.tableVO = this.tableVO;
        this.mcStatusPlaceCard.tableVO = this.tableVO;
        this.resultWinWhite.tableVO = this.tableVO;
        this.mcResultSatus.tableVO = this.tableVO;
        this.mcBaoSam.tableVO = this.tableVO;
        this.mcFakeCard.tableVO = this.tableVO;

        for (var i = 1; i <= this.tableVO.TOTAL_PLAYER; i++) {
            this.addMoneyMgr.getChild(CompositeNode.ADD_MONEY_NODE + "_" + i).container = this.addMoneyMgr.container.getChildByName("player" + i);
            this.resultTableMgr.getChild(CompositeNode.RESULT_TABLE_NODE + "_" + i).container = this.resultTableMgr.container.getChildByName("mcReultSeat" + i);
            if(i!==1){
                this.otherCardsMgr.getChild(CompositeNode.OTHER_CARDS_NODE + "_" + i).container = this.otherCardsMgr.container.getChildByName("mcPlayerCards" + i);
            }
        }

        CoreGame.prototype.applyLayout.call(this);
    },

    initialize:function () {
        CoreGame.prototype.initialize.call(this);
        this.showResultGame(false);
    },

    addEventListeners: function () {
        CoreGame.prototype.addEventListeners.call(this);

        this.mcPlayerCards.container.on(GameEvent.SELECT_CARDS, this.onCheckReSelectCards.bind(this));
    },

    removeEventListeners: function () {
        CoreGame.prototype.removeEventListeners.call(this);

        this.mcPlayerCards.container.off(GameEvent.SELECT_CARDS, this.onCheckReSelectCards.bind(this));
    },

    //==================================================================================================================
    //===========================OVERRIDE===============================================================================
    //==================================================================================================================
    onStartGame:function () {
        CoreGame.prototype.onStartGame.call(this);
        this.showResultGame(false);
    },

    onPlaceCard:function (playCards,  seatId) {
        var startPlayCards = null;
        if(seatId === this.tableVO.mySeatId){
            startPlayCards = this.mcPlayerCards.getStartPlayCards(playCards);
        }else{
            var mcOtherCard = this.otherCardsMgr.getChild(CompositeNode.OTHER_CARDS_NODE + "_" + seatId);
            startPlayCards = mcOtherCard.getStartPlayCards(playCards);
        }
        this.rootGame.placeCard(playCards, startPlayCards,seatId);
    },

    onEndRound:function () {
        this.rootGame.endRound();
    },

    onCancelTurn:function (seatId) {
        this.rootGame.cancelTurn(seatId);
    },

    onBaoSam:function (seatId, sam) {
        this.rootGame.baoSam(seatId, sam);
    },

    onShowBaoSamState:function () {
        this.rootGame.showBaoSamState();
    },

    onUpdateCurrentTurn:function () {
        CoreGame.prototype.onUpdateCurrentTurn.call(this);
        this.onCheckReSelectCards();
    },

    onShowCardsPlace:function (cards) {
        this.rootGame.showCardsPlace(cards);
    },

    onFinishCoundownTime:function () {
        CoreGame.prototype.onFinishCoundownTime.call(this);
        if(this.tableVO.curTurn !== this.tableVO.myId) return;

        if (this.mcPlaceCard.vtExistCard.length <= 0) this.activePlayCards({cards: null});
        else this.activeCancelTurn();
    },

    onFinishGame:function (listResult) {
        this.rootGame.finishGame(listResult);
        this.showResultGame(true);
        TweenLite.delayedCall(this.tableVO.TIME_SHOW_RESULT, function () {
            this.showResultGame(false);
        }.bind(this));
    },

    onFinishGameWinWhite:function (arrCards, type) {
        this.rootGame.finishGameWinWhite(arrCards, type);
        this.showResultGame(true);
        TweenLite.delayedCall(this.tableVO.TIME_SHOW_RESULT_WIN_WHITE, function () {
            this.showResultGame(false);
        }.bind(this));
    },
    //==================================================================================================================
    //==================================================================================================================
    //==================================================================================================================
    onHanlerBaoSamClick:function () {
        this.activeBaoSam(1);
        this.mcBaoSam.hide();
    },

    onHanlerHuyBaoSamClick:function () {
        this.activeBaoSam(-1);
        this.mcBaoSam.hide();
    },

    onHanlerSendCardFake:function () {
        var arrCards = this.mcFakeCard.getPlayerCards();
        this.activeFakeCards({arrCards: arrCards});
        this.mcFakeCard.hide();
    },

    onHanlerXepBaiClick:function () {
        this.mcPlayerCards.onSortCards();
    },

    onHanlerBoLuotClick:function () {
        this.activeCancelTurn();
    },

    onHanlerFakeClick:function () {
        this.mcFakeCard.show();
    },

    onHanlerChonLaiClick:function () {
        this.mcPlayerCards.onReSelectCards();
    },

    onHanlerDanhBaiClick:function () {
        var listCards = this.mcPlayerCards.getCardAcceptArr();
        if(listCards.length === 0) return;
        this.activePlayCards({cards: listCards});
    },

    onHanlerBackGameClick:function (backToggle) {
        CoreGame.prototype.onHanlerBackGameClick.call(this,backToggle);
    },

    onCheckReSelectCards:function () {
        if(this.mcPlayerCards.cardAcceptArr.length!==0){
            this.mcListButton.checkActiveDanhBai();
            this.mcListButton.checkEnablePlayCards(this.mcPlayerCards.cardAcceptArr);
        }else{
            this.mcListButton.checkActiveDanhBai();
        }
    },

    showResultGame:function (isShow) {
        this.resultTableMgr.container.active  = isShow;
    }
});

