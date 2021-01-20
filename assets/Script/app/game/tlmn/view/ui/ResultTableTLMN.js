var Component = require('Component');
var TLMNCard = require('TLMNCard');
var Utility = require('Utility');
var ResultTableTLMN = cc.Class({
    extends: Component,

    initComponent: function (componentId, container) {
        Component.prototype.initComponent.call(this, componentId, container);

        this.SCALE = 1;
        this.tableVO = null;
        this.seatId = -1;
        this.vtCardList = [];
    },

    applyLayout: function () {
        this.card1 = this.container.getChildByName("mcCard1");
        this.card2 = this.container.getChildByName("mcCard2");
    },

    initialize: function () {
        this.SCALE = this.card1.scaleX;

        this.container.removeChild(this.card1);
        this.container.removeChild(this.card2);
        this.hide();
    },

    setup: function (seatId, tableVO) {
        this.tableVO = tableVO;
        this.seatId = seatId;
    },

    //////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////override////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////
    startGame: function () {
        this.hide();
        this.clearAllCards();
    },

    finishGame: function (listResult) {
        var resultVO = listResult.getResultBySeatId(this.seatId);
        if (!resultVO) return;
        this.showCardsResult(resultVO.cards);
        this.show();

        TweenLite.delayedCall(this.tableVO.TIME_SHOW_RESULT,function () {
            this.hide();
        }.bind(this))
    },

    finishGameWinWhite:function (arrCards, type) {
        this.hide();
        TweenLite.delayedCall(this.tableVO.TIME_DISPLAY_WIN_WITE_CARDS, function () {
            var seat = this.tableVO.getSeatBySeatId(this.seatId);
            if(seat.cards && seat.cards.length>0){
                this.show();
                this.showCardsResult(seat.cards);
            }
        }.bind(this))
    },

    snapWithPlayer: function () {
        // var pos = this.tableVO.listPlayerPos[this.seatId];
        // if (pos) {
        //     this.container.x = pos.x;
        //     this.container.y = pos.y;
        // }
    },

    //////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////

    showCardsResult: function (listCards) {
        this.clearAllCards();
        if (!listCards || listCards.length === 0) return;

        Utility.sortArray(listCards, "NUMERIC");
        for (var i = 0; i < listCards.length; i++) {
            var cardId = listCards[i];
            var cardNode = new TLMNCard.create(cardId, true);
            this.addCard(cardNode);
        }
    },

    addCard: function (card) {
        if (card === null) return;
        var archorPoint = this.card1.getAnchorPoint();
        card.scaleX = card.scaleY = this.SCALE;
        card.zIndex = this.container.childrenCount;
        card.setAnchorPoint(archorPoint.x, archorPoint.y);
        this.container.addChild(card);
        this.vtCardList.push(card);
    },

    clearAllCards: function () {
        for (var i = 0; i < this.vtCardList.length; i++) {
            var card = this.vtCardList[i];
            this.container.removeChild(card);
            card.destroy();
        }

        this.vtCardList = [];
    }
});

ResultTableTLMN.create = function (componentId, container) {
    var component = new ResultTableTLMN();
    component.initComponent(componentId, container);
    return component;
};

module.exports = ResultTableTLMN;