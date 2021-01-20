var CoreGame = require('CoreGame');
var GameBinhMediator = require('GameBinhMediator');
var PlayerCardsBinh = require('PlayerCardsBinh');
var ListButtonBinh = require('ListButtonBinh');
var FakeCardBinh = require('FakeCardBinh');
var CompareStatusBinh = require('CompareStatusBinh');
var PlayerTableBinh = require('PlayerTableBinh');
var OtherCardsBinh = require('OtherCardsBinh');
var CompositeNode = require('CompositeNode');
var Composite = require('Composite');
var GameEvent = require('GameEvent');
var LogicBinh = require('LogicBinh');
var LobbyMessage = require('LobbyMessage');
var McClockBinh = require('McClockBinh');
var Utility = require('Utility');
var i18n = require('i18n');

cc.Class({
    extends: CoreGame,

    properties: {
        isSnapWithPlayer: true
    },

    // use this for initialization
    onLoad: function () {
        GameBinhMediator.getInstance().init(this);
        CoreGame.prototype.onLoad.call(this);
    },

    buildUI: function () {
        CoreGame.prototype.buildUI.call(this);
        this.isFinishTime = false;

        this.mcPlayerCards = new PlayerCardsBinh.create(CompositeNode.PLAYER_CARDS_PANEL_BINH_NODE);
        this.mcListButton = new ListButtonBinh.create(CompositeNode.LIST_BUTTON_BINH_NODE);
        this.mcFakeCard = new FakeCardBinh.create(CompositeNode.FAKE_CARD_BINH_NODE);
        this.mcCompareStatus = new CompareStatusBinh.create(CompositeNode.COMPARE_CARDS_BINH_NODE);
        this.resultTableMgr = new Composite.create(CompositeNode.RESULT_TABLE_MANAGER_NODE);
        this.otherCardsMgr = new Composite.create(CompositeNode.OTHER_CARDS_MANAGER_NODE);
        this.mcClock = new McClockBinh.create(CompositeNode.CLOCK_BINH_NODE);

        this.rootGame.add(this.mcPlayerCards);
        this.rootGame.add(this.mcListButton);
        this.rootGame.add(this.mcFakeCard);
        this.rootGame.add(this.mcCompareStatus);
        this.rootGame.add(this.resultTableMgr);
        this.rootGame.add(this.otherCardsMgr);
        this.rootGame.add(this.mcClock);

        this.rootGame.buildUI();
        this.setup();
        this.applyLayout();
        this.initialize();
        this.addEventListeners();
        if (this.isSnapWithPlayer) {
            this.rootGame.snapWithPlayer();
        }
    },

    setup: function () {
        CoreGame.prototype.setup.call(this);

        for (var i = 1; i <= this.tableVO.TOTAL_PLAYER; i++) {
            var seat = this.tableVO.getSeatBySeatId(i);
            if (seat === undefined) continue;

            var player = new PlayerTableBinh.create(CompositeNode.PLAYER_NODE + "_" + i);
            player.setup(seat.id, this.tableVO);
            this.playerMgr.add(player);

            if (i !== 1) {
                var ontherCards = new OtherCardsBinh.create(CompositeNode.OTHER_CARDS_NODE + "_" + i);
                ontherCards.setup(seat.id, this.tableVO);
                this.otherCardsMgr.add(ontherCards);
            }
        }
    },

    applyLayout: function () {
        this.mcPlayerCards.container = this.component.getChildByName("mcPlayerCards");
        this.mcListButton.container = this.component.getChildByName("ctnButton");
        this.mcFakeCard.container = this.component.getChildByName("mcFakeCard");
        this.resultTableMgr.container = this.component.getChildByName("mcResult");
        this.mcCompareStatus.container = this.component.getChildByName("mcCompareStatus");
        this.otherCardsMgr.container = this.component.getChildByName("ctnOtherCards");
        this.mcClock.container = this.component.getChildByName("mcClock");
        this.mcCheckChi = this.component.getChildByName("mcCheckChi");
        this.chi = [];
        this.chi[0] = this.mcCheckChi.getChildByName("chi1").getComponent(cc.Label);
        this.chi[1] = this.mcCheckChi.getChildByName("chi2").getComponent(cc.Label);
        this.chi[2] = this.mcCheckChi.getChildByName("chi3").getComponent(cc.Label);

        this.mcPlayerCards.tableVO = this.tableVO;
        this.mcListButton.tableVO = this.tableVO;
        this.mcCompareStatus.tableVO = this.tableVO;
        this.mcFakeCard.tableVO = this.tableVO;
        this.mcClock.tableVO = this.tableVO;

        for (var i = 1; i <= this.tableVO.TOTAL_PLAYER; i++) {
            if (i !== 1) {
                this.otherCardsMgr.getChild(CompositeNode.OTHER_CARDS_NODE + "_" + i).container = this.otherCardsMgr.container.getChildByName("mcPlayer" + i);
            }
        }

        CoreGame.prototype.applyLayout.call(this);
    },

    initialize: function () {
        CoreGame.prototype.initialize.call(this);
        this.showResultGame(false);
    },

    addEventListeners: function () {
        CoreGame.prototype.addEventListeners.call(this);
        this.mcPlayerCards.container.on(GameEvent.CHANGE_SORTED_CARDS_EVENT, this.onChangeSorterdCards, this);
    },

    removeEventListeners: function () {
        CoreGame.prototype.removeEventListeners.call(this);
        this.mcPlayerCards.container.off(GameEvent.CHANGE_SORTED_CARDS_EVENT, this.onChangeSorterdCards, this);
    },

    //==================================================================================================================
    //===========================OVERRIDE===============================================================================
    //==================================================================================================================
    onStartGame: function () {
        CoreGame.prototype.onStartGame.call(this);
        this.isFinishTime = false;
        this.showResultGame(false);
    },

    onHideTextChi: function () {
        this.rootGame.hideTextChi();
    },

    onFinishSortChi: function () {
        this.rootGame.finishSortChi();
        this.rootGame.zoomInCards();
        this.mcCheckChi.active = false;
    },

    onFinishGame: function () {
        this.rootGame.finishGame();
        //this.resultTableMgr.container.active = false;
    },

    onSortFinishBinh: function (seatId, isSort) {
        this.rootGame.sortFinishBinh(seatId, isSort);
    },

    onSoChi: function (seatId, indexChi) {
        this.rootGame.soChi(seatId, indexChi);
       // this.resultTableMgr.container.active = true;
    },

    onSapHam: function () {
        this.rootGame.sapHam();
    },

    onSapLang: function (seatId) {
        this.rootGame.sapLang(seatId);
    },

    onBatSapLang: function (seatId) {
        this.rootGame.batSapLang(seatId);
    },

    onBinhLung: function (seatId, isLung) {
        this.rootGame.binhLung(seatId, isLung);
       // this.resultTableMgr.container.active = true;
    },

    onMauBinh: function (seatId) {
        this.rootGame.mauBinh(seatId);
        //this.resultTableMgr.container.active = true;
    },

    onShowAllCardsBinh: function (seatId, isFaceUp) {
        this.rootGame.showAllCardsBinh(seatId, isFaceUp);
    },

    onHideResultBinh: function () {
        this.rootGame.hideResultBinh();
        //this.resultTableMgr.container.active = false;
    },

    onFinishCoundownTime: function () {
        CoreGame.prototype.onFinishCoundownTime.call(this);
        if (!this.tableVO.isSort) {
            if (this.mcListButton.isMauBinh) this.onHanlerMauBinh();
            else this.onSendXepXong();
        }
        this.isFinishTime = true;
    },

    //==================================================================================================================
    //==================================================================================================================
    //==================================================================================================================
    onChangeSorterdCards: function () {
        var arrCards = this.mcPlayerCards.getVtCardListId();
        var typeMauBinh = LogicBinh.check_MauBinh(arrCards);
        if (typeMauBinh > 0) {
            this.mcCompareStatus.setCardTypeList(1,0);
            this.mcListButton.showMauBinhButton(true);
            this.onSubmitHand();
            return;
        }
        var typeChi = LogicBinh.check_chi(arrCards);
        if (typeChi) {
            this.mcCompareStatus.setCardTypeList(-1,0);
        } else {
            this.mcCompareStatus.setCardTypeList(0,0);
        }
        this.mcListButton.showMauBinhButton(false);
        this.showNamePerChi(arrCards);
        this.onSubmitHand();
    },

    onSubmitHand: function () {
        var params = {
            arrCards: this.mcPlayerCards.getListCardsId()
        };

        this.activeSubmitHand(params);
    },

    onHanlerSendCardFake: function () {
        var arrCards = this.mcFakeCard.getPlayerCards();
        this.activeFakeCards({arrCards: arrCards});
        this.mcFakeCard.hide();
    },

    onHanlerXepXong: function () {
        if (this.mcListButton.isMauBinh) {
            GameBinhMediator.getInstance().sendNotification(LobbyMessage.SHOW_ALERT_WITH_CONFIRM,
                {
                    content: i18n.t('G0009'),
                    timeClose: 10,
                    callback: this.onSendXepXong.bind(this)
                });
        } else {
            this.onSendXepXong();
        }
    },

    onHanlerMauBinh: function () {
        var listCardsId = this.mcPlayerCards.getListCardsId();
        var arrCards = this.mcPlayerCards.getVtCardListId();
        var typeMauBinh = LogicBinh.check_MauBinh(arrCards);
        if (typeMauBinh <= 0) return;

        var cards = LogicBinh.getListCardMauBinhAutoSort(listCardsId, typeMauBinh);
        if (cards) {
            this.mcPlayerCards.sortVtCardList(cards);
            listCardsId = cards[0].concat(cards[1]).concat(cards[2]);
        } else {
            this.onSortCardsChi(arrCards);
        }

        var params = {
            arrCards: listCardsId,
            isSort: true,
            type: typeMauBinh
        };

        this.activePlayGame(params);
        this.activeSubmitHand({arrCards:params.arrCards});
        // this.mcCheckChi.active = true;
    },

    onSendXepXong: function () {
        var arrCards = this.mcPlayerCards.getVtCardListId();
        this.onSortCardsChi(arrCards);
        var params = {
            arrCards: this.mcPlayerCards.getListCardsId(),
            isSort: true,
            type: 0
        };

        var typeChi = LogicBinh.check_chi(arrCards);
        if (typeChi) {
            this.mcCompareStatus.setCardTypeList(-1,1);
        } else {
            this.mcCompareStatus.setCardTypeList(0,1);
        }

        this.activePlayGame(params);
        this.activeSubmitHand({arrCards:params.arrCards});
        this.mcCheckChi.active = false;
        this.rootGame.zoomInCards();

    },

    onSortCardsChi: function (arrCards) {
        var typeChi = LogicBinh.check_chi(arrCards);
        if (typeChi !== null) {
            this.mcPlayerCards.updateCardsChi(typeChi, arrCards);
        } else {
            for (var i = 0; i < arrCards.length; i++) {
                Utility.sortArray(arrCards[i], "NUMERIC");
                LogicBinh.moveCard2ToTop(arrCards[i]);
            }
            this.mcPlayerCards.sortVtCardList(arrCards);
        }
        //this.showNamePerChi(arrCards);
        //this.rootGame.zoomOutCards();
    },

    showFormSortCards: function () {

    },

    hideFormSortCards: function () {

    },

    showNamePerChi: function (arrCards) {
        if(!this.mcCheckChi.active) {
            this.mcCheckChi.active = true;
            this.rootGame.zoomOutCards();
        }
        var resultCardsName = LogicBinh.namePerChi(arrCards);
        for(var i=0 ; i<3 ; i++){
            this.chi[i].string = resultCardsName[i];
        }
        this.mcPlayerCards.greyBiggestCards();
    },

    onHandlerSwapChi: function () {
        var arrCards = this.mcPlayerCards.getVtCardListId();
        var arrTemp = arrCards[0];
        arrCards[0] = arrCards[1];
        arrCards[1] = arrTemp;
        this.mcPlayerCards.sortVtCardList(arrCards);
        this.onChangeSorterdCards();
    },

    onHanlerXepLai: function () {
        if (this.isFinishTime) return;
        var params = {
            arrCards: this.mcPlayerCards.getListCardsId(),
            isSort: false,
            type: 0
        };
        this.activePlayGame(params);
        this.mcCheckChi.active = true;
        this.rootGame.zoomOutCards();
    },

    onHanlerFakeClick: function () {
        this.mcFakeCard.show();
    },

    onHanlerBackGameClick: function (backToggle) {
        CoreGame.prototype.onHanlerBackGameClick.call(this, backToggle);
    },

    showResultGame: function (isShow) {
        //this.resultTableMgr.container.active = isShow;
    }
});

