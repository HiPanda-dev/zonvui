var Component = require('Component');
var GameConfig = require('GameConfig');
var Utility = require('Utility');
var TLMNCard = require('TLMNCard');
var ResultTableWinWhiteTLMN = cc.Class({
    extends: Component,

    initComponent: function (componentId, container) {
        Component.prototype.initComponent.call(this, componentId, container);

        this.SCALE = 1;
        this.tableVO = null;
        this.vtCardList = [];
    },

    applyLayout: function () {
        this.card1 = this.container.getChildByName("mcCard1");
        this.card2 = this.container.getChildByName("mcCard2");
    },

    initialize: function () {
        this.marginX = this.card1.x;
        this.marginY = this.card1.y;
        this.space = this.card2.x - this.card1.x;
        this.SCALE = this.card1.scaleX;

        this.container.removeChild(this.card1);
        this.container.removeChild(this.card2);
        this.hide();
    },

    //////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////override////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////
    finishGameWinWhite:function (arrCards, type) {
        this.showCardsResult(arrCards);
        this.show();
        TweenLite.delayedCall(this.tableVO.TIME_DISPLAY_WIN_WITE_CARDS, function () {
            this.clearAllCards();
        }.bind(this));
    },

    //////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////

    showCardsResult: function (arrCards) {
        this.clearAllCards();
        if (!arrCards || arrCards.length === 0) return;

        Utility.sortArray(arrCards, "NUMERIC");
        for (var i = 0; i < arrCards.length; i++) {
            var cardId = arrCards[i];
            var cardNode = new TLMNCard.create(cardId, true);
            this.addCard(cardNode);
        }
    },

    addCard: function (card) {
        if (card === null) return;
        card.setAnchorPoint(0, 1);
        card.scaleX = card.scaleY = this.SCALE;
        card.zIndex = this.container.childrenCount;
        card.x = this.marginX + this.vtCardList.length * this.space;
        card.y = this.marginY;
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

ResultTableWinWhiteTLMN.create = function (componentId, container) {
    var component = new ResultTableWinWhiteTLMN();
    component.initComponent(componentId, container);
    return component;
};

module.exports = ResultTableWinWhiteTLMN;