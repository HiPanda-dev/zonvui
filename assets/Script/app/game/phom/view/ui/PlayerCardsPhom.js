var Utility = require("Utility");
var PhomCard = require("PhomCard");
var PlayerCards = require("PlayerCards");
var AssetVO = require("AssetVO");
var LogicPhom = require("LogicPhom");
var GameEvent = require('GameEvent');
var SFSData = require('SFSData');

var PlayerCardsPhom = cc.Class({
    extends: PlayerCards,

    initComponent: function (componentId, container) {
        PlayerCards.prototype.initComponent.call(this, componentId, container);
        this.tableVO = null;

        this.SCALE_X = 1;
        this.SCALE_Y = 1;

        this.CARD_SELECTED_SPACE = 40;
        this.vtCardList/*Vector.<PhomCard>*/ = [];
        this.vtNewPos/*Vector.<PhomCard>*/ = [];
        this.vtOldPos/*Vector.<PhomCard>*/ = [];
        this.draggingCard = null;
        this.isMouseDown = false;
        this.isMouseMove = false;
        this.draggingCardTargetX = 0;
        this.draggingCardTargetY = 0;
        this.draggingDistanceX = 0;
        this.draggingDistanceY = 0;

        this.changePos = false;
        this.enableSelectCardSuit = true;
        this.enabled = true;
        this.isReverse = true;

        this.space = 0;
        this.card1 = null;
        this.card2 = null;
    },

    applyLayout: function () {
        this.card1 = this.container.getChildByName("mcCard1");
        this.card2 = this.container.getChildByName("mcCard2");
    },

    initialize: function () {
        this.vtCardList = [];
        this.vtNewPos = [];
        this.vtOldPos = [];
        this.cardAcceptArr = [];
        this.selectedCards = [];
        this.currentSelectedCard = null;

        this.marginX = this.card1.x;
        this.marginY = this.card1.y;
        this.space = this.card2.x - this.card1.x;
        this.SCALE_X = this.card1.scaleX;
        this.SCALE_Y = this.card1.scaleY;

        this.container.removeChild(this.card1);
        this.container.removeChild(this.card2);

    },

    //////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////override////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////
    dealCards: function () {
        this.clearAllCards();
        var mySeat = this.tableVO.getSeatByUserId(this.tableVO.myId);
        if (!mySeat) return;
        this.playDealCards(mySeat.cards, true);
        this.cardAcceptArr = [];
    },

    placeCard: function (arrCards, vtPosPlayCards, seatId) {
        if (this.tableVO.mySeatId === seatId) {
            for (var i = 0; i < arrCards.length; i++) {
                this.removeCard(arrCards[i]);
            }
            this.sortAfterPlace();
        }
    },

    showCards: function (seatId, cards) {
        var mySeat = this.tableVO.getSeatByUserId(this.tableVO.myId);
        if (!mySeat || mySeat.id !== seatId) return;

        this.playDealCards(mySeat.cards, false);
    },

    finishGame: function (listResult) {
        //this.clearAllCards();
    },

    leaveGame:function () {
        this.clearAllCards();
    },

    meDrawCard: function (cardId) {
        var cardNode = new PhomCard.create(cardId, true);
        this.addCard(cardNode);
        this.playOneCardsAnimation();
        this.show();
    },

    // tu dong nhac bai len de ha
    turnDownCard: function () {
        var deckArray = LogicPhom.getDeckToAutoDownCard(this.vtCardList, this.tableVO);

        console.log('%c[TURN DOWN CARD]: ' + '', 'background: #222; color: #FF9900');
        console.log(this.vtCardList.concat());
        // cho het cac card xuong
        for (var i = 0; i < this.vtCardList.length; i++)
        {
            TweenLite.to(this.vtCardList[i], 0.2, {y: this.marginY});
            TweenLite.to(this.vtCardList[i], 0.2, {y: this.marginY});
        }

        this.cardAcceptArr = [];
        this.selectedCards = [];

        for (var i = 0; i < deckArray.length; i++)
        {
            for (var j = 0; j < deckArray[i].length; j++)
            {
                TweenLite.to(deckArray[i][j], 0.2, {
                    y: this.marginY + this.CARD_SELECTED_SPACE
                });

                this.cardAcceptArr.push(deckArray[i][j].id);
                this.selectedCards.push(deckArray[i][j]);
            }
        }

        this.checkReSeclectCards();
    },

    updateCurrentTurn: function (status) {
        if(status === SFSData.DOWN_CARD)
            this.turnDownCard();
    },

    discard: function (card,userId,nextTurn) {
        var seat = this.tableVO.getSeatByUserId(userId);
        if(seat === null || seat === undefined)
            return;
        if (this.seatId === seat.id) {
            this.removeCard(card);
            this.sortAfterPlace();
            this.show();
            return;
        }
    },

    stealCard: function (card,userId, moneyAR, moneyBR) {
        var seat = this.tableVO.getSeatByUserId(userId);
        if (this.seatId === seat.id) {
            var cardNode = new PhomCard.create(card, true);
            cardNode.setStealCard();
            this.addStealCard(cardNode);
            this.playStealCardAnimation();
            this.show();
        }
    },

    downCard: function (cards,userId,index) {
        var seat = this.tableVO.getSeatByUserId(userId);
        if(seat === null || seat === undefined)
            return;
        if (this.seatId === seat.id) {
            for (var i = 0; i < cards.length; i++)
            {
                this.removeCard(cards[i]);
                this.sortAfterPlace();
            }
            this.show();
        }

        if (this.tableVO.myId === userId )
        {
            var deckArray = LogicPhom.getDeckToAutoDownCard(this.vtCardList, this.tableVO);
            if(deckArray.length === 0)
                this.container.emit(GameEvent.LAYING_DONE);
        }
    },

    downCardFinish: function (userId) {

    },

    sendCard: function (cards,userId,index,playerDes) {
        var seat = this.tableVO.getSeatByUserId(userId);

        if(seat === null || seat === undefined)
            return;

        if (this.seatId === seat.id) {
            for (i = 0; i < cards.length; i++)
            {
                this.removeCard(cards[i]);
                this.sortAfterPlace();
            }
            this.show();
        }
    },

    sendCardFinish: function (userId) {

    },
    //////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////
    playDealCards: function (arrCards, isAnim) {
        this.clearAllCards();
        //Utility.sortArray(arrCards, "NUMERIC");

        for (var i = 0; i < arrCards.length; i++) {
            var cardId = arrCards[i];
            var cardNode = new PhomCard.create(cardId, true);
            this.addCard(cardNode);
        }
        this.playDealCardsAnimation(isAnim);
        this.show();
    },

    addCard: function (card) {
        if (card === null) return;
        card.setAnchorPoint(0, 1);
        card.on(cc.Node.EventType.TOUCH_START, this.onHanlerCardDown, this);
        card.zIndex = this.container.childrenCount;
        card.scaleX = this.SCALE_X;
        card.scaleY = this.SCALE_Y;
        this.container.addChild(card);
        this.vtCardList.push(card);
    },

    addStealCard: function (card) {
        if (card === null) return;
        card.setAnchorPoint(0, 1);
        card.on(cc.Node.EventType.TOUCH_START, this.onHanlerCardDown, this);
        card.zIndex = this.container.childrenCount;
        card.scaleX = this.SCALE_X;
        card.scaleY = this.SCALE_Y;
        this.container.addChild(card);
        this.vtCardList.push(card);
    },

    removeCard: function (cardId) {
        for (var i = 0; i < this.vtCardList.length; i++) {
            var card = this.vtCardList[i];
            if (card.id === cardId) {
                TweenLite.killTweensOf(card);
                this.container.removeChild(card);
                card.destroy();
                this.vtCardList.splice(i, 1);
                for (var j = i; j < this.vtCardList.length; j++) {
                    this.vtCardList[j].x -= this.space;
                }
                break;
            }
        }

        for (var i = 0; i < this.cardAcceptArr.length; i++) {
            var card = this.cardAcceptArr[i];
            if (card.id === cardId) {
                this.cardAcceptArr.splice(i, 1);
                this.selectedCards.splice(i, 1);
            }
        }

        for (i = 0; i < this.vtCardList.length; i++) {
            var card = this.vtCardList[i];
            card.zIndex = i;
        }
    },

    sortAfterPlace: function () {
        this.isMouseMove = false;
        this.isMouseDown = false;
        for (var i = 0; i < this.vtCardList.length; i++) {
            TweenLite.to(this.vtCardList[i], 0.2, {x: this.marginX + i * this.space, y: this.marginY});
            this.vtCardList[i].setSiblingIndex(i);
        }
        this.cardAcceptArr = [];
        this.selectedCards = [];
        this.updateZIndex();
        this.checkReSeclectCards();
    },

    onHanlerCardDown: function (evt) {
        if (!this.enabled) return;

        var touch = evt.touch;
        var card = evt.currentTarget;
        this.draggingCard = card;

        this.draggingDistanceX = this.draggingCard.parent.convertToNodeSpace(touch.getLocation()).x - this.draggingCard.x;
        this.draggingDistanceY = this.draggingCard.parent.convertToNodeSpace(touch.getLocation()).y - this.draggingCard.y;

        this.draggingCardTargetX = this.draggingCard.x;
        this.isMouseDown = true;
        this.isMouseMove = false;

        this.draggingCard.on(cc.Node.EventType.TOUCH_MOVE, this.onHanlerCardMove, this);
        this.draggingCard.on(cc.Node.EventType.TOUCH_END, this.onHanlerCardEnd, this);
        this.draggingCard.on(cc.Node.EventType.TOUCH_CANCEL, this.onHanlerCardCancel, this);

        this.changePos = false;
        this.vtOldPos = this.vtCardList.concat();
    },

    onHanlerCardCancel: function () {
        cc.log("onHanlerCardCancel");
    },

    onHanlerCardOver: function (evt) {
        cc.log("onHanlerCardOver");
    },

    onHanlerCardOut: function (evt) {
        cc.log("onHanlerCardOut");
    },

    onHanlerCardMove: function (evt) {
        if (this.onCheckOutsideView(evt)) return;
        if (this.isMouseDown === false) return;
        var touch = evt.touch;
        this.isMouseMove = true;
        var idxCard = this.vtCardList.indexOf(this.draggingCard);
        var idxTouch = Math.floor((this.draggingCard.parent.convertToNodeSpace(touch.getLocation()).x - this.marginX) / this.space);
        if (idxTouch < 0) idxTouch = 0;
        if (idxTouch >= this.vtCardList.length) idxTouch = this.vtCardList.length - 1;
        if (this.draggingCard.parent) {
            this.draggingCard.x = this.draggingCard.parent.convertToNodeSpace(touch.getLocation()).x - this.draggingDistanceX;
            this.draggingCard.y = this.draggingCard.parent.convertToNodeSpace(touch.getLocation()).y - this.draggingDistanceY;
        }

        if (idxTouch === idxCard)
            return;

        if (idxTouch > idxCard) {
            for (var i = idxCard; i < idxTouch; i++) {
                this.vtCardList[i] = this.vtCardList[i + 1];
                TweenLite.to(this.vtCardList[i], 0.2, {x: this.marginX + i * this.space});
                this.draggingCard.setSiblingIndex(i + 1);
            }
        } else {
            for (i = idxCard; i > idxTouch; i--) {
                this.vtCardList[i] = this.vtCardList[i - 1];
                TweenLite.to(this.vtCardList[i], 0.2, {x: this.marginX + i * this.space});
                this.draggingCard.setSiblingIndex(i - 1);
            }
        }
        if(!cc.sys.isNative){
            this.updateZIndex();
        }
        this.vtCardList[idxTouch] = this.draggingCard;
        this.draggingCardTargetX = this.marginX + idxTouch * this.space;
    },

    updateZIndex: function () {
        for (var i = 0; i < this.container.children.length; i++) {
            var card = this.container.children[i];
            card.setSiblingIndex(i);
            card.zIndex = i;
        }
    },

    onCheckOutsideView: function (evt) {
        var touch = evt.touch;
        var winSize = cc.director.getWinSize();
        var width = winSize.width;
        var height = winSize.height;
        var space = 5;

        var pos = touch.getLocation();
        if (pos.x <= space || pos.y <= space || pos.x >= width - space || pos.y >= height - space) {
            this.onHanlerCardEnd(evt);
            return true;
        } else {
            return false;
        }
    },

    onHanlerCardEnd: function (evt) {
        this.draggingCard.off(cc.Node.EventType.TOUCH_MOVE, this.onHanlerCardMove, this);
        this.draggingCard.off(cc.Node.EventType.TOUCH_END, this.onHanlerCardEnd, this);
        this.idxCard = this.vtCardList.indexOf(this.draggingCard);

        var i, j;
        // check xem card co thay doi vi tri hay ko
        this.vtNewPos = this.vtCardList.concat();
        for (j = 0; j < this.vtCardList.length; j++) {
            if (this.vtNewPos[j] !== this.vtOldPos[j]) {
                this.changePos = true;
                break;
            }
        }

        this.currentSelectedCard = null;
        var isClickOneCard = true;
        switch (this.tableVO.playingStatus)
        {
            case SFSData.DOWN_CARD:
                isClickOneCard = false;
            break;
            case SFSData.SEND_CARD:
                isClickOneCard = false;
            break;
        }
        if(isClickOneCard)
        {
            for (i = 0; i < this.vtCardList.length; i++)
            {
                TweenLite.to(this.vtCardList[i], 0.2, {y: this.marginY});
            }
        }

        this.isMouseMove = false;
        this.isMouseDown = false;
        // neu ko thay doi vi tri
        if (this.changePos === false)// add place card
        {
            for (i = 0; i < this.cardAcceptArr.length; i++) {
                // neu card vua click la card dang duoc chon roi
                if (this.draggingCard.id === this.cardAcceptArr[i]) {
                    TweenLite.to(this.draggingCard, 0.2, {x: this.draggingCardTargetX, y: this.marginY});
                    this.cardAcceptArr.splice(i, 1);
                    this.selectedCards.splice(i, 1);
                    this.checkReSeclectCards();
                    if(this.selectedCards.length === 1)
                        this.currentSelectedCard = this.selectedCards[0];
                    return;
                }
            }
            TweenLite.to(this.draggingCard, 0.2, {
                x: this.draggingCardTargetX,
                y: this.marginY + this.CARD_SELECTED_SPACE
            });
            if(isClickOneCard)
            {
                this.selectedCards = [];
                this.cardAcceptArr = [];
            }
            this.cardAcceptArr.push(this.draggingCard.id);
            this.selectedCards.push(this.draggingCard);
            this.currentSelectedCard = this.draggingCard;
            this.checkReSeclectCards();
            return;
        }
        // nếu thay đổi vị trí
        for (i = 0; i < this.cardAcceptArr.length; i++) {
            if (this.draggingCard.id === this.cardAcceptArr[i]) {
                TweenLite.to(this.draggingCard, 0.2, {
                    x: this.draggingCardTargetX,
                    y: this.marginY + this.CARD_SELECTED_SPACE
                });
                return;
            }
        }
        TweenLite.to(this.draggingCard, 0.2, {x: this.draggingCardTargetX, y: this.marginY});
    },

    checkReSeclectCards: function () {
        this.container.emit(GameEvent.SELECT_CARDS);
    },

    clearAllCards: function () {
        for (var i = 0; i < this.vtCardList.length; i++) {
            var card = this.vtCardList[i];
            this.container.removeChild(card);
            card.destroy();
        }

        this.vtCardList = [];
    },

    playDealCardsAnimation: function (isAnim) {
        for (var i = 0; i < this.vtCardList.length; i++) {
            var time = isAnim ? 0.2 : 0;
            var timeDelay = isAnim ? 0.05 : 0;
            var card = this.vtCardList[i];
            TweenLite.killTweensOf(card);
            card.opacity = 0;
            card.x = this.marginX + Math.max(0, i - 5) * this.space;
            TweenLite.to(card, time, {
                opacity: 255,
                x: this.marginX + i * this.space,
                y: this.marginY,
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
        card.x = this.marginX + Math.max(0, i - 5) * this.space;
        TweenLite.to(card, time, {
            opacity: 255,
            x: this.marginX + i * this.space,
            y: this.marginY,
            delay: timeDelay
        });
    },

    playStealCardAnimation: function () {
        var time = 0.5;
        var timeDelay = 0;
        var i = this.vtCardList.length - 1;
        var card = this.vtCardList[i];
        TweenLite.killTweensOf(card);
        card.opacity = 0;
        card.x = this.marginX + Math.max(0, i - 5) * this.space;
        TweenLite.to(card, time, {
            opacity: 255,
            x: this.marginX + i * this.space,
            y: this.marginY,
            delay: timeDelay
        });
    },

    onSortCards: function () {
        var i, j;
        // đưa các quân bài chuẩn bị đánh về vị trí cũ
        for (i = 0; i < this.vtCardList.length; i++) {
            for (j = 0; j < this.cardAcceptArr.length; j++) {
                if (this.vtCardList[i].id === this.cardAcceptArr[j]) {
                    TweenLite.to(this.vtCardList[i], .15, {y: this.marginY});
                    this.cardAcceptArr.splice(j, 1);
                    this.selectedCards.splice(j, 1);
                }
            }
        }

        // sort lai bai theo ID
        this.vtCardList = LogicPhom.arrangeUnleaveCard(this.vtCardList, this.tableVO);

        // now move all the cards to its new position
        this.enabled = false;
        for (i = 0; i < this.vtCardList.length; i++) {
            TweenLite.to(this.vtCardList[i], 0.4, {x: this.marginX + i * (/*CARD_WIDTH + */this.space)});
        }
        var card = null;
        if(cc.sys.isNative){
            for (i = 0; i < this.vtCardList.length; i++) {
                card = this.vtCardList[i];
                card.zIndex = i;
            }
        }else{
            for (i = 0; i < this.vtCardList.length; i++) {
                card = this.vtCardList[i];
                card.setSiblingIndex(i);
            }
            this.updateZIndex();
        }

        TweenLite.killDelayedCallsTo(this.reEnabled.bind(this));
        TweenLite.delayedCall(0.4, this.reEnabled.bind(this));
        this.checkReSeclectCards();
    },

    reEnabled: function () {
        this.enabled = true;
    },


    sortCardOneById: function (tempCard/*Vector.<PhomCard>*/, move/*Boolean*/, count, reverse/*Boolean*/) {
        var i, j;
        var cards = tempCard.concat();

        for (i = 0; i < cards.length - 1; i++) {
            for (j = i + 1; j < cards.length; j++) {
                if (cards[i].num > cards[j].num) {
                    var temp = cards[i];
                    cards[i] = cards[j];
                    cards[j] = temp;
                }
            }
        }
        if (move) {
            var b = 0;
            for (i = 0; i < cards.length; i++) {
                if (cards[i].id < count)
                    b++;
            }
            var c = cards.slice(b, cards.length).concat(cards.slice(0, b));
            cards = c;
        }
        if (reverse)
            cards.reverse();
        return cards;
    },

    onReSelectCards: function () {
        for (var i = 0; i < this.vtCardList.length; i++) {
            var card = this.vtCardList[i];
            TweenLite.to(card, 0.2, {y: this.marginY});
        }
        this.cardAcceptArr = [];
        this.selectedCards = [];
        this.checkReSeclectCards();
    },

    getAutoPlayCard: function () {
        var mySeat = this.tableVO.getSeatBySeatId(this.seatId);
        for(var i = this.vtCardList.length - 1; i >= 0; i--)
        {
            if(LogicPhom.checkPlayCard(this.vtCardList[i],this.vtCardList,this.tableVO))
                return [this.vtCardList[i].id];
        }
    },

    getCardAcceptArr: function () {
        return this.cardAcceptArr;
    },

    getDownCardArr: function () {
        var deckArray = LogicPhom.checkDownCard(this.selectedCards, this.tableVO);
        return deckArray;
    }
});

PlayerCardsPhom.create = function (componentId, container) {
    var component = new PlayerCardsPhom();
    component.initComponent(componentId, container);
    return component;
};

module.exports = PlayerCardsPhom;