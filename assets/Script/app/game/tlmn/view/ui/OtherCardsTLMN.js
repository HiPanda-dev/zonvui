var Component = require('Component');
var TLMNCard = require('TLMNCard');
var OtherCardsTLMN = cc.Class({
    extends: Component,

    initComponent: function (componentId, container) {
        Component.prototype.initComponent.call(this, componentId, container);
        this.tableVO = null;
        this.seatId = -1;
        this.vtCardList = [];
    },

    applyLayout: function () {
        this.txtNum = this.container.getChildByName("txtNum").getComponent(cc.Label);
        this.mcCard = this.container.getChildByName("mcCard");
        this.bgSobai = this.container.getChildByName("bg_solabai");

    },

    initialize: function () {
        this.hide();

        this.marginX = this.mcCard.x;
        this.marginY = this.mcCard.y;
        this.CARD_WIDTH = 100;//this.mcCard.width;
        this.CARD_HEIGHT = 125;//this.mcCard.height;

    },

    setup: function (seatId, tableVO) {
        this.tableVO = tableVO;
        this.seatId = seatId;
    },

    //////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////override////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////
    dealRandomCard:function () {
        this.clearAllCards();
        var seat = this.tableVO.getSeatBySeatId(this.seatId);
        if (!seat || seat.randomCard === -1) return;
        this.playDealRandomCards(seat.randomCard);
    },

    dealCards: function () {
        this.clearAllCards();
        this.updateNumText();
    },

    showCards: function (seatId, arrCards) {
        this.updateNumText();
    },

    placeCard: function (playCards, startPlayCards, seatId) {
        this.updateNumText();
    },

    finishGame: function (listResult) {
        this.hide();
    },

    leaveGame: function () {
        this.hide();
    },

    finishGameWinWhite: function (arrCards, type) {
        this.hide();
    },

    updateNumText: function () {
        var seat = this.tableVO.getSeatBySeatId(this.seatId);
        if (seat.cardNrReminder === 0) {
            this.hide();
            return;
        }
        this.txtNum.string = seat.cardNrReminder;
        this.bgSobai.active = (seat.cardNrReminder === 1)?false:true;
        this.show();
    },

    //===============================================================================
    //===============================================================================
    //===============================================================================
    /**
     * trả ra vị trí mảng các quân bài đánh tren tay
     */
    getStartPlayCards: function (playCards) {
        var startPlayCards = [];
        for (var i = 0; i < playCards.length; i++) {
            startPlayCards.push({
                pos: (this.mcCard) ? new cc.Vec2(this.mcCard.parent.x, this.mcCard.parent.y) : new cc.Vec2(0, 0),
                scale: (this.mcCard) ? new cc.Vec2(this.mcCard.scaleX, this.mcCard.scaleY) : new Vec2(1, 1)
            });
        }
        return startPlayCards;
    },


    clearAllCards:function () {
        for (var i = 0; i < this.vtCardList.length; i++) {
            var card = this.vtCardList[i];
            this.container.removeChild(card);
            card.destroy();
        }

        this.vtCardList = [];
    },

    playDealRandomCards:function (cardId) {
        var randomCard = new TLMNCard.create(cardId, false);
        randomCard.setCardState(TLMNCard.FACE_DOWN);
        randomCard.angle = 90;
        this.addCard(randomCard);
        TweenLite.to(randomCard, 0.5, {
            x: this.container.x, y: this.container.y, angle: 0, onComplete: function (mcCard) {
                TweenLite.delayedCall(0.1, function () {
                    mcCard.animShowCard(0, TLMNCard.FACE_UP);
                }.bind(this));
            }.bind(this), onCompleteParams: [randomCard]
        });
    },

    addCard: function (card) {
        if (card === null) return;
        card.setAnchorPoint(0.5, 0.5);
        card.zIndex = this.container.childrenCount;
        card.scaleX = 0.8;
        card.scaleY = 0.8;

        this.container.parent.addChild(card);
        this.vtCardList.push(card);
    },

});

OtherCardsTLMN.create = function (componentId, container) {
    var component = new OtherCardsTLMN();
    component.initComponent(componentId, container);
    return component;
};

module.exports = OtherCardsTLMN;
