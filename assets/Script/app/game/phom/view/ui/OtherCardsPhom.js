var Component = require('Component');
var PhomCard = require('PhomCard');
var OtherCardsPhom = cc.Class({
    extends: Component,

    initComponent: function (componentId, container) {
        Component.prototype.initComponent.call(this, componentId, container);
        this.tableVO = null;
        this.seatId = -1;
        this.vtCardList = [];
        this.discardList = [];
        this.downCardList = [];
    },

    applyLayout: function () {
        var handCards = this.container.getChildByName("handCards");
        this.handCard1 = handCards.getChildByName("mcCard1");
        this.handCard2 = handCards.getChildByName("mcCard2");

        var disCards = this.container.getChildByName("disCards");
        this.disCard1 = disCards.getChildByName("mcCard1");
        this.disCard2 = disCards.getChildByName("mcCard2");

        var downCards = this.container.getChildByName("downCards");
        var downCards1 = downCards.getChildByName("downCards1");
        this.downCard11 = downCards1.getChildByName("mcCard1");
        this.downCard12 = downCards1.getChildByName("mcCard2");

        var downCards2 = downCards.getChildByName("downCards2");
        this.downCard21 = downCards2.getChildByName("mcCard1");
        this.downCard22 = downCards2.getChildByName("mcCard2");

        var downCards3 = downCards.getChildByName("downCards3");
        this.downCard31 = downCards3.getChildByName("mcCard1");
        this.downCard32 = downCards3.getChildByName("mcCard2");
    },

    initialize: function () {
        this.handCardMarginX = this.handCard1.x;
        this.handCardMarginY = this.handCard1.y;
        this.handCardSpace = Math.abs(this.handCard2.x - this.handCard1.x);
        this.handCardSCALE_X = this.handCard1.scaleX;
        this.handCardSCALE_Y = this.handCard1.scaleY;

        if (this.handCard1.parent) {
            this.handCard1.parent.removeChild(this.handCard1);
            this.handCard2.parent.removeChild(this.handCard2);
        }


        this.disCardMarginX = this.disCard1.x;
        this.disCardMarginY = this.disCard1.y;
        this.disCardSpace = Math.abs(this.disCard2.x - this.disCard1.x);
        this.disCardSCALE_X = this.disCard1.scaleX;
        this.disCardSCALE_Y = this.disCard1.scaleY;

        if (this.disCard1.parent) {
            this.disCard1.parent.removeChild(this.disCard1);
            this.disCard2.parent.removeChild(this.disCard2);
        }

        this.downCard1MarginX = this.downCard11.x;
        this.downCard1MarginY = this.downCard11.y;
        this.downCardSpace = Math.abs(this.downCard12.x - this.downCard11.x);
        this.downCardSCALE_X = this.downCard11.scaleX;
        this.downCardSCALE_Y = this.downCard11.scaleY;

        this.downCard2MarginX = this.downCard21.x;
        this.downCard2MarginY = this.downCard21.y;

        this.downCard3MarginX = this.downCard31.x;
        this.downCard3MarginY = this.downCard31.y;

        if (this.downCard11.parent) {
            this.downCard11.parent.removeChild(this.downCard11);
            this.downCard12.parent.removeChild(this.downCard12);

            this.downCard21.parent.removeChild(this.downCard21);
            this.downCard22.parent.removeChild(this.downCard22);

            this.downCard31.parent.removeChild(this.downCard31);
            this.downCard32.parent.removeChild(this.downCard32);
        }

        this.hide();
    },

    setup: function (seatId, tableVO) {
        this.tableVO = tableVO;
        this.seatId = seatId;
    },

    //////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////override////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////
    dealCards: function () {
        this.clearAllCards();
        if (this.seatId === this.tableVO.mySeatId)
            return;
        var seat = this.tableVO.getSeatBySeatId(this.seatId);
        var arrCards = seat.cards;
        if (!arrCards || arrCards.length === 0) return;
        this.vtCardList = [];

        for (var i = 0; i < arrCards.length; i++) {
            var cardNode = new PhomCard.create(-1, true);
            this.addCardBack(cardNode)
        }
        this.playDealCardsAnimation(true);
        this.show();
    },

    showCards: function (seatId, arrCards) {
        if (this.seatId !== seatId) return;
        this.clearAllCards();

        var arrCards, card;
        var seat = this.tableVO.getSeatBySeatId(seatId);

        if (seat.user.id !== this.tableVO.myId) {
            arrCards = seat.cards;
            this.vtCardList = [];

            for (var i = 0; i < arrCards.length; i++) {
                var cardNode = new PhomCard.create(arrCards[i], true);
                this.addCardBack(cardNode)
            }
            this.playDealCardsAnimation(false);
        }

        for (i = 0; i < seat.discards.length; i++) {
            card = new PhomCard.create(seat.discards[i], true);
            this.addDiscard(card);
            this.playDiscardAnimation(card, false);
        }

        for (i = 0; i < seat.downCards.length; i++) {
            for (var j = 0; j < seat.downCards[i].length; j++) {
                card = new PhomCard.create(seat.downCards[i][j], true);
                this.addDowncard(card, i);
                this.playDownCardAnimation(card, i);
            }
        }

        this.show();
    },

    drawCard: function (seatId) {
        if (this.seatId !== seatId) return;
        if (this.seatId === this.tableVO.mySeatId) return;

        var cardNode = new PhomCard.create(-1, true);
        this.addCardBack(cardNode);
        this.playOneCardsAnimation();
        this.show();
    },

    discard: function (cardId, userId, nextTurn) {
        var card;
        var seat = this.tableVO.getSeatByUserId(userId);
        if (seat === null || seat === undefined) return;
        if (this.seatId === seat.id) {
            if (this.tableVO.myId !== userId) {
                card = this.vtCardList.pop();
                this.container.removeChild(card);
            }
            card = new PhomCard.create(cardId, true);
            this.addDiscard(card);
            this.playDiscardAnimation(card);
            this.show();
        }
    },

    stealCard: function (card, userId) {
        var cardNode;
        var stealerSeat = this.tableVO.getSeatByUserId(userId);
        var stealedPlayerSeat = this.tableVO.getPreviousSeat(stealerSeat.id);
        if (this.seatId === stealerSeat.id && this.seatId !== this.tableVO.mySeatId) // vị trí ăn bài
        {
            cardNode = new PhomCard.create(card, true);
            this.addStealCard(cardNode);
            this.playStealCardAnimation();
            this.arrangeVtCardList();
        }
        else if (this.seatId === stealedPlayerSeat.id) // vị trí bị ăn bài
        {
            cardNode = this.discardList.pop();
            this.container.removeChild(cardNode);
        }
        this.show();
    },

    downCard: function (cards, userId, index) {
        var card;
        var seat = this.tableVO.getSeatByUserId(userId);
        if (seat === null || seat === undefined)
            return;
        if (this.seatId === seat.id) {
            if (this.tableVO.myId !== userId) {
                for (var i = 0; i < cards.length; i++) {
                    card = this.vtCardList.pop();
                    this.container.removeChild(card);
                }
            }
            for (i = 0; i < cards.length; i++) {
                card = new PhomCard.create(cards[i], true);
                this.addDowncard(card, index);
                this.playDownCardAnimation(card, index);
            }
        }
        this.show();
    },

    downCardFinish: function (userId) {

    },

    sendCard: function (cards, userId, index, playerDes) {
        var seat = this.tableVO.getSeatByUserId(userId);
        var card, i;
        var seatDes = this.tableVO.getSeatByUserId(playerDes);

        if (seat === null || seat === undefined)
            return;

        if (seatDes === null || seatDes === undefined)
            return;

        if (this.seatId === seat.id) {
            if (this.tableVO.myId !== userId) {
                for (i = 0; i < this.vtCardList.length; i++) {
                    card = this.vtCardList.pop();
                    this.container.removeChild(card);
                }
                this.show();
            }
        }
        if (this.seatId === seatDes.id) {
            for (i = 0; i < cards.length; i++) {
                card = new PhomCard.create(cards[i], true);
                this.addDowncard(card, index);
                this.playDownCardAnimation(card, index);
            }
            this.reAddDownCard();
            this.show();
        }
    },

    reAddDownCard: function () {
        for (var i = 0; i < this.downCardList.length; i++) {
            for (var j = 0; j < this.downCardList[i].length; j++) {
                if (this.downCardList[i][j].parent)
                    this.downCardList[i][j].zIndex = 10 + i;
            }
        }
    },

    sendCardFinish: function (userId) {

    },

    placeCard: function (arrCards, vtPosPlayCards, seatId) {
        if (this.seatId !== seatId) return;
        for (var i = 0; i < arrCards.length; i++) {
            var card = this.vtCardList.pop();
            this.container.removeChild(card);
        }
    },

    finishGame: function (listResult) {
        if (this.seatId === this.tableVO.mySeatId)
            return;
        var seat = this.tableVO.getSeatBySeatId(this.seatId);
        if (seat === null || seat === undefined)
            return;
        if (!seat.user)
            return;
        for (var i = 0; i < this.vtCardList.length; i++) {
            this.vtCardList[i].parent.removeChild(this.vtCardList[i]);
        }
        for (i = 0; i < listResult.length; i++) {
            if (seat.user.uid === listResult[i].uid) {
                var result = listResult[i];

                this.vtCardList = [];

                if (result.point !== 0) {
                    for (var j = 0; j < result.playerCards.length; j++) {
                        var cardNode = new PhomCard.create(result.playerCards[j], true);
                        this.addCardBack(cardNode);
                    }
                    this.playDealCardsAnimation(false);
                }

                this.show();
            }
        }
    },

    leaveGame: function () {
        this.clearAllCards();
    },

    finishGameWinWhite: function (arrCards, type) {
        this.clearAllCards();
    },

    //////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////

    addCardBack: function (card) {
        if (card === null) return;
        card.setAnchorPoint(0, 1);
        card.zIndex = this.container.childrenCount;
        card.scaleX = this.handCardSCALE_X;
        card.scaleY = this.handCardSCALE_Y;
        this.container.addChild(card);
        this.vtCardList.push(card);
    },

    addStealCard: function (card) {
        if (card === null) return;
        card.setAnchorPoint(0, 1);
        card.scaleX = this.handCardSCALE_X;
        card.scaleY = this.handCardSCALE_Y;
        this.container.addChild(card);
        this.vtCardList.unshift(card);
    },

    playStealCardAnimation: function () {
        var time = 0.5;
        var timeDelay = 0;
        var i = 0;
        var card = this.vtCardList[i];
        TweenLite.killTweensOf(card);
        card.opacity = 0;
        card.x = this.handCardMarginX + Math.max(0, i - 5) * this.handCardSpace;
        TweenLite.to(card, time, {
            opacity: 255,
            x: this.handCardMarginX + i * this.handCardSpace,
            y: this.handCardMarginY,
            delay: timeDelay
        });
    },

    playDealCardsAnimation: function (isAnim) {
        for (var i = 0; i < this.vtCardList.length; i++) {
            var time = isAnim ? 0.2 : 0;
            var timeDelay = isAnim ? 0.05 : 0;
            var card = this.vtCardList[i];
            TweenLite.killTweensOf(card);
            card.opacity = 0;
            card.x = this.handCardMarginX + Math.max(0, i - 5) * this.handCardSpace;
            TweenLite.to(card, time, {
                opacity: 255,
                x: this.handCardMarginX + i * this.handCardSpace,
                y: this.handCardMarginY,
                delay: timeDelay * i
            });
        }
    },

    playOneCardsAnimation: function () {
        var time = 0.5;
        var timeDelay = 0;
        var i = this.vtCardList.length - 1;
        var card = this.vtCardList[i];
        TweenLite.killTweensOf(card);
        card.opacity = 0;
        card.x = this.handCardMarginX + Math.max(0, i - 5) * this.handCardSpace;
        TweenLite.to(card, time, {
            opacity: 255,
            x: this.handCardMarginX + i * this.handCardSpace,
            y: this.handCardMarginY,
            delay: timeDelay
        });
    },

    addDiscard: function (card) {
        if (card === null) return;
        card.setAnchorPoint(0, 1);
        this.container.addChild(card);
        this.discardList.push(card);
    },

    playDiscardAnimation: function (card, isAnim) {
        var time = isAnim ? 0.15 : 0;
        card.scaleX = this.disCardSCALE_X;
        card.scaleY = this.disCardSCALE_Y;
        card.x = this.disCardMarginX + (this.discardList.length - 1) * this.disCardSpace;
        card.y = this.disCardMarginY;
        TweenLite.from(card, time, {alpha: 0, scaleX: this.SCALE * 2, scaleY: this.SCALE * 2});
    },

    addDowncard: function (card, index) {
        card.setAnchorPoint(0, 1);
        this.container.addChild(card);
        if (!this.downCardList[index])
            this.downCardList[index] = [];
        this.downCardList[index].push(card);
    },

    playDownCardAnimation: function (card, index, isAnim) {
        var time = isAnim ? 0.15 : 0;
        card.scaleX = this.downCardSCALE_X;
        card.scaleY = this.downCardSCALE_Y;
        switch (index) {
            case 0:
                card.x = this.downCard1MarginX + (this.downCardList[index].length - 1) * this.downCardSpace;
                card.y = this.downCard1MarginY;
                TweenLite.from(card, time, {alpha: 0, scaleX: this.SCALE * 2, scaleY: this.SCALE * 2});
                break;
            case 1:
                card.x = this.downCard2MarginX + (this.downCardList[index].length - 1) * this.downCardSpace;
                card.y = this.downCard2MarginY;
                TweenLite.from(card, time, {alpha: 0, scaleX: this.SCALE * 2, scaleY: this.SCALE * 2});
                break;
            case 2:
                card.x = this.downCard3MarginX + (this.downCardList[index].length - 1) * this.downCardSpace;
                card.y = this.downCard3MarginY;
                TweenLite.from(card, time, {alpha: 0, scaleX: this.SCALE * 2, scaleY: this.SCALE * 2});
                break;
        }
    },

    arrangeVtCardList: function () {
        for (var i = 0; i < this.vtCardList.length; i++) {
            this.vtCardList[i].x = this.handCardMarginX + i * this.handCardSpace;
            this.vtCardList[i].y = this.handCardMarginY;
            this.vtCardList[i].setSiblingIndex(i);
            //cc.warn("arrangeVtCardList" + i + this.vtCardList[i].x);
        }
    },

    clearAllCards: function () {
        this.container.removeAllChildren();
        this.vtCardList = [];
        this.discardList = [];
        this.downCardList = [];
    },

    getPosFromDiscards: function (cardId) {
        var pos = new cc.Vec2(0, 0);
        for (var i = this.discardList.length - 1; i >= 0; i--) {
            if (this.discardList[i].id === cardId) {
                pos.x = this.discardList[i].x;
                pos.y = this.discardList[i].y;
                pos = this.parent.convertToWorldSpace(pos);
                return pos;
            }
        }
        return pos;
    },

    addDiscardFromOtherPlayerDiscard: function (cardId, pos) {
        var card = new PhomCard.create(cardId, true);
        this.addDiscard(card);
        this.playDiscardAnimation(card);
        this.show();
    },

    popDiscard: function () {
        var card = this.discardList.pop();
        this.container.removeChild(card);
    }
});

OtherCardsPhom.create = function (componentId, container) {
    var component = new OtherCardsPhom();
    component.initComponent(componentId, container);
    return component;
};

module.exports = OtherCardsPhom;