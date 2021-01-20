var Component = require('Component');
var BinhCard = require('BinhCard');
var SeatVO = require('SeatVO');
var LogicBinh = require('LogicBinh');
var TableBinhVO = require('TableBinhVO');
var CardVO = require('CardVO');
var GameEvent = require('GameEvent');
var Utility = require('Utility');
var ResultStatusControl = require('ResultStatusControl');
var PlayerCardsBinh = cc.Class({
    extends: Component,

    initComponent: function (componentId, container) {
        Component.prototype.initComponent.call(this, componentId, container);
    },

    applyLayout: function () {
        Component.prototype.applyLayout.call(this);
        this.ctnCards = this.container.getChildByName("ctnCards");

        this.bgCards = this.ctnCards.getChildByName("bg_card");
        this.card1 = this.ctnCards.getChildByName("mcCard1");
        this.card2 = this.ctnCards.getChildByName("mcCard2");
        this.card3 = this.ctnCards.getChildByName("mcCard3");
        this.card4 = this.ctnCards.getChildByName("mcCard4");
        //this.mcCardType = this.ctnCards.getChildByName("mcCardType");

        this.txtAddChi = this.container.getChildByName("txtAddChi").getComponent(cc.Label);
        this.txtSubChi = this.container.getChildByName("txtSubChi").getComponent(cc.Label);

        this.mcResultSatus = this.container.getChildByName("mcResultStatus");
        this.resultControl = this.mcResultSatus.getComponent("ResultStatusControl");
    },

    initialize: function () {
        Component.prototype.initialize.call(this);
        this.vtCardList = [];
        this.draggingCard = null;
        this.draggingIndex = -1;
        this.draggingSiblingIndex = -1;
        this.isBlock = false;
        //this.isMauBinh = false;

        this.SCALE_X = this.card1.scaleX;
        this.SCALE_Y = this.card1.scaleY;

        this.posChi1 = new cc.Vec2(this.card1.x, this.card1.y);
        this.posChi2 = new cc.Vec2(this.card2.x, this.card2.y);
        this.posChi3 = new cc.Vec2(this.card3.x, this.card3.y);

        this.space = this.card4.x - this.card3.x;

        this.mcResultSatus.active = false;
        this.txtAddChi.node.active = false;
        this.txtSubChi.node.active = false;

        this.ctnCards.removeChild(this.card1);
        this.ctnCards.removeChild(this.card2);
        this.ctnCards.removeChild(this.card3);
        this.ctnCards.removeChild(this.card4);

        cc.director.getCollisionManager().enabled = true;
        // cc.director.getCollisionManager().enabledDebugDraw = true;

        //this.fakeCards();
    },

    //////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////override////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////

    sitdown: function (seatId, user) {
        if (this.seatId !== seatId) return;
        var seat = this.tableVO.getSeatBySeatId(this.seatId);
        if (!seat) return;

        this.clearAllCards();
    },

    startGame: function () {
        this.clearAllCards();
        this.mcResultSatus.active = false;
        this.txtAddChi.node.active = false;
        this.txtSubChi.node.active = false;
        //this.isMauBinh = false;
    },

    dealCards: function () {
        var mySeat = this.tableVO.getSeatByUserId(this.tableVO.myId);
        if (!mySeat || !mySeat.cards || mySeat.cards.length === 0) return;
        this.playDealCards(mySeat.cards, true);
    },

    soChi: function (seatId, indexChi) {
        var mySeat = this.tableVO.getSeatByUserId(this.tableVO.myId);
        if (!mySeat || mySeat.id !== seatId) return;
        if (mySeat.isMauBinh && indexChi !== LogicBinh.INDEX_CHI_AT) return;

        this.onShowSoChi(indexChi);
        this.onShowTypeCards(indexChi);
        this.show();
    },

    binhLung: function (seatId, isLung) {
        var mySeat = this.tableVO.getSeatByUserId(this.tableVO.myId);
        if (mySeat.id !== seatId) return;
        //if (this.isMauBinh) return;
        if (mySeat.isMauBinh) return;
        if (isLung) {
            this.resultControl.showSpecialCards(ResultStatusControl.IDX_BINH_LUNG); //IDX LUNG
            this.setPosResultStatus();
            this.mcResultSatus.active = true;
        }else{
             this.mcResultSatus.active = false;
        }
        this.updateScoreChi(mySeat.scoreLung);
        this.show();
    },

    mauBinh: function (seatId) {
        var mySeat = this.tableVO.getSeatByUserId(this.tableVO.myId);
        if (!mySeat || !mySeat.cards || mySeat.cards.length === 0 && mySeat.PLAY !== SeatVO.PLAY) return;
        if (mySeat.id !== seatId) return;
        //this.isMauBinh = true;
        this.resultControl.showTypeCards(mySeat.winType);
        this.setPosResultStatus();
        this.mcResultSatus.active = true;
        this.setupCard(mySeat.cards, BinhCard.FACE_UP);
        if(mySeat.scoreMauBinh !== 0)  this.updateScoreChi(mySeat.scoreMauBinh);
        this.show();
        this.brightAllCards();
    },

    sapHam: function () {
        this.mcResultSatus.active = false;
        var mySeat = this.tableVO.getSeatByUserId(this.tableVO.myId);
        if (!mySeat || (mySeat.batSapHam.length === 0 && mySeat.sapHam.length === 0)) return;
        if (mySeat.isMauBinh) return;
        if (mySeat.scoreSapHam < 0) {
            this.resultControl.showSpecialCards(ResultStatusControl.IDX_BI_SAP_HAM); //IDX SAP HAM
        } else if(mySeat.scoreSapHam > 0) {
            this.resultControl.showSpecialCards(ResultStatusControl.IDX_BAT_SAP_HAM);//IDX BAT SAP HAM
        }
        this.mcResultSatus.active = true;
        this.setPosResultStatus();
        this.updateScoreChi(mySeat.scoreSapHam);
        this.brightAllCards();
    },

    sapLang: function (seatId) {
        var mySeat = this.tableVO.getSeatByUserId(this.tableVO.myId);
        if (mySeat.id !== seatId) return;
        if (!mySeat) return;
        if (mySeat.isMauBinh) return;

        if (mySeat.biSapLang) {
            this.resultControl.showSpecialCards(ResultStatusControl.IDX_BI_SAP_LANG);
            this.mcResultSatus.active = true;
        } else {
            this.mcResultSatus.active = false;
        }
        this.setPosResultStatus();
        this.updateScoreChi(mySeat.scoreSapLang);
        this.brightAllCards();
    },

    batSapLang: function (seatId) {
        var mySeat = this.tableVO.getSeatByUserId(this.tableVO.myId);
        if (mySeat.id !== seatId) return;
        if (!mySeat) return;
        if (mySeat.isMauBinh) return;

        if (mySeat.batSapLang) {
            this.resultControl.showSpecialCards(ResultStatusControl.IDX_BAT_SAP_LANG);
            this.mcResultSatus.active = true;
        } else {
            this.mcResultSatus.active = false;
        }
        this.setPosResultStatus();
        this.updateScoreChi(mySeat.scoreBatSapLang);
        this.brightAllCards();
    },

    hideResultBinh: function () {
        this.txtAddChi.node.active = false;
        this.txtSubChi.node.active = false;;
        this.brightAllCards();
    },

    sortFinishBinh: function (seatId, isSort) {
        var mySeat = this.tableVO.getSeatByUserId(this.tableVO.myId);
        if (mySeat.id !== seatId) return;
        if (isSort === true) return;
        this.container.emit(GameEvent.CHANGE_SORTED_CARDS_EVENT);
    },

    finishGame: function () {
        this.txtAddChi.node.y = -184;
        this.txtSubChi.node.y = -184;
        cc.log("finish game: " + this.txtAddChi.node.y);

        this.mcResultSatus.active = false;
        this.txtAddChi.node.active = false;
        this.txtSubChi.node.active = false;

        this.clearAllCards();
        this.hide();
    },

    showCards: function (seatId, cards) {
        var mySeat = this.tableVO.getSeatByUserId(this.tableVO.myId);
        if (!mySeat || mySeat.id !== seatId || !mySeat.cards || mySeat.cards.length === 0) return;
        var cards = [];
        for (var i = 0; i < mySeat.cards.length; i++) {
            var idx = Math.floor(i / 5);
            if (!cards[idx]) cards[idx] = [];
            cards[idx].push(mySeat.cards[i]);
        }
        this.setupCard(cards, BinhCard.FACE_UP);
        this.container.emit(GameEvent.CHANGE_SORTED_CARDS_EVENT);
    },

    onLeaveGame: function () {
        this.clearAllCards();
        this.hide();
    },

    updateMoney:function (seatId, addMoney) {
        var mySeat = this.tableVO.getSeatByUserId(this.tableVO.myId);
        if (!mySeat || seatId !== mySeat.id) return;
        this.showEarnMoney(addMoney);
    },

    showEarnMoney: function (money) {
        if (money >= 0) {
            this.txtAddChi.string = "+" + Utility.formatCurrency(money);
            this.txtAddChi.node.active = true;
            this.txtSubChi.node.active = false;
        } else {
            this.txtSubChi.string = Utility.formatCurrency(money);
            this.txtSubChi.node.active = true;
            this.txtAddChi.node.active = false;
        }

        this.txtAddChi.node.y = this.txtSubChi.node.y = -184;
        this.txtAddChi.node.opacity = this.txtSubChi.node.opacity = 255;

        cc.log("pos: " + this.txtAddChi.node.y);
        TweenLite.from(this.txtSubChi.node, 0.3, {y: this.txtSubChi.node.y - 10, opacity:0, alpha: 0});
        TweenLite.to(this.txtSubChi.node, 0.5, {y: this.txtSubChi.node.y + 50, opacity:0, delay:2, alpha: 0});

        TweenLite.from(this.txtAddChi.node, 0.3, {y: this.txtAddChi.node.y - 10, opacity:0, alpha: 0});
        TweenLite.to(this.txtAddChi.node, 0.5, {y: this.txtAddChi.node.y + 50, opacity:0, delay:2, alpha: 0});

        // TweenLite.delayedCall(2, function () {
        //     this.txtSubChi.node.active = false;
        //     this.txtAddChi.node.active = false;
        // }.bind(this))
    },

    hideTextChi:function(){
        this.txtSubChi.node.active = false;
        this.txtAddChi.node.active = false;
    },

    //////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////
    playDealCards: function (arrCards, isAnim) {
        this.clearAllCards();
        var cards = [];
        for (var i = 0; i < arrCards.length; i++) {
            var idx = Math.floor(i / 5);
            if (!cards[idx]) cards[idx] = [];
            cards[idx].push(arrCards[i]);
        }
        this.setupCard(cards, BinhCard.FACE_DOWN);
        this.playDealCardsAnimation(true);
        this.show();

        TweenLite.delayedCall(2, function () {
            this.container.emit(GameEvent.CHANGE_SORTED_CARDS_EVENT);
        }.bind(this));
    },

    clearAllCards: function () {
        this.ctnCards.removeAllChildren();
        this.vtCardList = [];
    },
    /**
     *
     * @param cards: [[chi1],[chi2],[chi3]]
     */
    setupCard: function (cards/*Matrix*/, faceCards) {
        this.clearAllCards();
        for (var i = 0; i < cards.length; i++) {
            var arrChi = [];
            for (var j = 0; j < cards[i].length; j++) {
                var cardId = cards[i][j];
                var card = new BinhCard.create(cardId, true);
                var cardPos = this.getCardPos(i, j);
                card.setAnchorPoint(0.5, 0.5);
                card.scaleX = this.SCALE_X;
                card.scaleY = this.SCALE_Y;
                card.x = cardPos.x;
                card.y = cardPos.y;
                card.cardPos = cardPos;
                card.cardType = i + "_" + j;
                card.setCardState(faceCards);
                card.addComponent(cc.BoxCollider);
                var boxCollider = card.getComponent(cc.BoxCollider);
                boxCollider.size = new cc.Size(card.width, card.height);
                arrChi.push(card);
                this.ctnCards.addChild(card);
            }
            this.vtCardList.push(arrChi);
        }
    },

    getCardPos: function (type, index) {
        var cardPos = null;
        if (type === 0) cardPos = new cc.Vec2(this.posChi1.x, this.posChi1.y);
        if (type === 1) cardPos = new cc.Vec2(this.posChi2.x, this.posChi2.y);
        if (type === 2) cardPos = new cc.Vec2(this.posChi3.x, this.posChi3.y);

        cardPos.x += index * this.space;

        return cardPos;
    },

    // getPosDealCards: function (type, index) {
    //     var cardPos = null;
    //     if (type === 0) cardPos = new cc.Vec2(this.posChi1.x, this.posChi1.y);
    //     if (type === 1) cardPos = new cc.Vec2(this.posChi2.x, this.posChi2.y);
    //     if (type === 2) cardPos = new cc.Vec2(this.posChi3.x, this.posChi3.y);
    //
    //     cardPos.x += index * this.space;
    //
    //     return cardPos;
    // },

    onHanlerCardDown: function (evt) {
        if (this.draggingCard || this.isBlock) return;
        var seat = this.tableVO.getSeatByUserId(this.tableVO.myId);
        if (seat && seat.isSort) return;

        var touch = evt.touch;
        this.draggingCard = evt.currentTarget;

        this.draggingDistanceX = this.draggingCard.parent.convertToNodeSpace(touch.getLocation()).x - this.draggingCard.x;
        this.draggingDistanceY = this.draggingCard.parent.convertToNodeSpace(touch.getLocation()).y - this.draggingCard.y;

        this.draggingCard.on(cc.Node.EventType.TOUCH_MOVE, this.onHanlerCardMove, this);
        this.draggingCard.on(cc.Node.EventType.TOUCH_END, this.onHanlerCardEnd, this);
        this.draggingCard.on(cc.Node.EventType.TOUCH_CANCEL, this.onHanlerCardCancel, this);

        this.draggingIndex = this.draggingCard.zIndex;
        this.draggingSiblingIndex  = this.draggingCard.getSiblingIndex();

        this.draggingCard.zIndex = this.ctnCards.childrenCount;
        this.draggingCard.setSiblingIndex(this.ctnCards.childrenCount);
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
        var touch = evt.touch;
        if (this.draggingCard && this.draggingCard.parent) {
            this.draggingCard.x = this.draggingCard.parent.convertToNodeSpace(touch.getLocation()).x - this.draggingDistanceX;
            this.draggingCard.y = this.draggingCard.parent.convertToNodeSpace(touch.getLocation()).y - this.draggingDistanceY;
        }

        for (var i = 0; i < this.vtCardList.length; i++) {
            for (var j = 0; j < this.vtCardList[i].length; j++) {
                var card = this.vtCardList[i][j];
                if (card === this.draggingCard) continue;
                var boxCollider = card.getComponent(cc.BoxCollider);
                // if (cc.Intersection.pointInPolygon(touch.getLocation(), boxCollider.world.points) && card !== this.draggingCard) {
                //     card.setGreyCard(true);
                // } else {
                //     card.setGreyCard(false);
                // }
            }
        }
    },

    onHanlerCardEnd: function (evt) {
        var touch = evt.touch;

        if (!this.draggingCard || !this.draggingCard.parent) return;
        this.draggingCard.off(cc.Node.EventType.TOUCH_MOVE, this.onHanlerCardMove, this);
        this.draggingCard.off(cc.Node.EventType.TOUCH_END, this.onHanlerCardEnd, this);

        var isSwap = false;
        this.draggingCard.zIndex = this.draggingIndex;
        this.draggingCard.setSiblingIndex(this.draggingSiblingIndex);

        for (var i = 0; i < this.vtCardList.length; i++) {
            for (var j = 0; j < this.vtCardList[i].length; j++) {
                var card = this.vtCardList[i][j];
                if (card === this.draggingCard) continue;
                var boxCollider = card.getComponent(cc.BoxCollider);
                if (cc.Intersection.pointInPolygon(touch.getLocation(), boxCollider.world.points)) {
                    // card.setGreyCard(false);
                    this.onSwapCard(this.draggingCard, card);
                    isSwap = true;
                    break;
                }
            }
            if (isSwap) break;
        }
        if (!isSwap) TweenLite.to(this.draggingCard, 0.2, {
            x: this.draggingCard.cardPos.x,
            y: this.draggingCard.cardPos.y
        });
        TweenLite.delayedCall(0.2, function () {
            this.draggingCard = null;
        }.bind(this));
    },

    onSwapCard: function (card1, card2) {
        var pos = card1.cardPos;
        var type = card1.cardType;
        card1.cardPos = card2.cardPos;
        card1.cardType = card2.cardType;

        card2.cardPos = pos;
        card2.cardType = type;

        var siblingIndex = card1.getSiblingIndex();
        var zIndex = card1.zIndex;

        card1.zIndex = card2.zIndex;
        card1.setSiblingIndex(card2.getSiblingIndex());

        card2.zIndex = zIndex;
        card2.setSiblingIndex(siblingIndex);


        for (var i = 0; i < this.vtCardList.length; i++) {
            for (var j = 0; j < this.vtCardList[i].length; j++) {
                var card = this.vtCardList[i][j];
                if (card === card1) this.vtCardList[i][j] = card2;
                if (card === card2) this.vtCardList[i][j] = card1;
            }
        }

        TweenLite.to(card1, 0.2, {x: card1.cardPos.x, y: card1.cardPos.y});
        TweenLite.to(card2, 0.2, {x: card2.cardPos.x, y: card2.cardPos.y});

        this.container.emit(GameEvent.CHANGE_SORTED_CARDS_EVENT);
    },

    getVtCardListId: function () {
        var arrCards = [];
        for (var i = 0; i < this.vtCardList.length; i++) {
            for (var j = 0; j < this.vtCardList[i].length; j++) {
                var card = this.vtCardList[i][j];
                var arr = card.cardType.split("_");
                if (!arrCards[arr[0]]) arrCards[arr[0]] = [];
                arrCards[arr[0]][arr[1]] = card.id;
            }

        }
        return arrCards;
    },

    updateCardsChi: function (typeChi, arrCards) {
        for (var i = 0; i < arrCards.length; i++) {
            Utility.sortArray(arrCards[i], "NUMERIC");
            LogicBinh.moveCard2ToTop(arrCards[i]);
            for (var j = 0; j < typeChi[i].cards.length; j++) {
                if (typeChi[i].type === LogicBinh.IDX_MAU_THAU) continue;
                var cardId = typeChi[i].cards[j];
                var idx = arrCards[i].indexOf(cardId);
                if (idx < 0) continue;
                arrCards[i].splice(idx, 1);
                arrCards[i].unshift(cardId);

                if (typeChi[i].type === LogicBinh.IDX_CU_LU) {
                    arrCards[i] = LogicBinh.check_CuLu(arrCards[i]);
                }
            }
        }

        this.sortVtCardList(arrCards);
    },

    sortVtCardList: function (arrCards) {
        for (var i = 0; i < arrCards.length; i++) {
            for (var j = 0; j < arrCards[i].length; j++) {
                var cardId = arrCards[i][j];
                var card = this.getCardByCardId(cardId);
                if (!card) continue;
                var cardPos = this.getCardPos(i, j);
                card.cardPos = cardPos;
                card.cardType = i + "_" + j;
                TweenLite.to(card, 0.3, {x: cardPos.x, y: cardPos.y});
            }
        }

        this.updateVtCardList(arrCards);
    },

    updateVtCardList:function (arrCards) {
        var result = [];
        for (var i = 0; i < arrCards.length; i++) {
            result[i] = [];
            for (var j = 0; j < arrCards[i].length; j++) {
                var card = this.getCardByCardId(arrCards[i][j]);
                result[i].push(card);
            }
        }

        this.vtCardList = result;
    },

    getCardByCardId: function (cardId) {
        for (var i = 0; i < this.vtCardList.length; i++) {
            for (var j = 0; j < this.vtCardList[i].length; j++) {
                var card = this.vtCardList[i][j];
                if (card.id === cardId) {
                    return card;
                }
            }
        }
        return null;
    },

    getListCardsId: function () {
        var arrCards = [], i;
        for (i = 0; i < this.vtCardList.length; i++) {
            for (var j = 0; j < this.vtCardList[i].length; j++) {
                var card = this.vtCardList[i][j];
                var arr = card.cardType.split("_");
                if (!arrCards[arr[0]]) arrCards[arr[0]] = [];
                arrCards[arr[0]][arr[1]] = card.id;
            }
        }

        var result = [];
        for (i = 0; i < arrCards.length; i++) {
            result = result.concat(arrCards[i]);
        }

        return result;
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

    onShowSoChi: function (chiIndex) {
        for (var i = 0; i < this.vtCardList.length; i++) {
            for (var j = 0; j < this.vtCardList[i].length; j++) {
                var cardVO = this.vtCardList[i][j];
                if (chiIndex !== LogicBinh.INDEX_CHI_AT) {
                    if (i !== chiIndex) {
                        cardVO.setGreyCard(true);
                    } else {
                        cardVO.setGreyCard(false);
                    }
                } else {
                    if (cardVO.num === CardVO.CARD_1) {
                        cardVO.setGreyCard(false);
                    } else {
                        cardVO.setGreyCard(true);
                    }
                }
            }
        }
    },

    onShowTypeCards: function (chiIndex) {
        var seat = this.tableVO.getSeatByUserId(this.tableVO.myId);
        if (!seat || seat.status !== SeatVO.PLAY) return;

        if (chiIndex !== LogicBinh.INDEX_CHI_AT) {
            var rsControl = this.mcResultSatus.getComponent("ResultStatusControl");
            var type = seat.getRankChi(chiIndex);
            this.mcResultSatus.active = true;
            this.setPosResultStatus(chiIndex);
            rsControl.showTypeCards(type);
        } else {
            this.mcResultSatus.active = false;
        }

        var score = seat.getScoreChi(chiIndex);
        this.updateScoreChi(score);
    },

    setPosResultStatus: function (resultType) {
        switch (resultType){
            case LogicBinh.INDEX_CHI1:
                this.mcResultSatus.x = 55;
                this.mcResultSatus.y = -315;
                break;
            case LogicBinh.INDEX_CHI3:
                this.mcResultSatus.x = -20;
                this.mcResultSatus.y = -95;
                break;
            default:
                this.mcResultSatus.x = 55;
                this.mcResultSatus.y = -205;
                break;
        }
    },

    brightAllCards: function () {
        for (var i = 0; i < this.vtCardList.length; i++) {
            for (var j = 0; j < this.vtCardList[i].length; j++) {
                var cardVO = this.vtCardList[i][j];
                cardVO.setGreyCard(false);
            }
        }
    },

    updateScoreChi: function (score) {
        if (score >= 0) {
            this.txtAddChi.string = "+" + score + " Chi";
            this.txtAddChi.node.active = true;
            this.txtSubChi.node.active = false;
        } else {
            this.txtSubChi.string = score + " Chi";
            this.txtSubChi.node.active = true;
            this.txtAddChi.node.active = false;
        }
        this.txtAddChi.node.scale = 1;
        this.txtSubChi.node.scale = 1;

        this.txtAddChi.node.y = this.txtSubChi.node.y = -184;
        this.txtAddChi.node.opacity = this.txtSubChi.node.opacity = 255;

        TweenLite.from(this.txtSubChi.node, 0.5, {ease: Back.easeOut.config(2), scaleX: 0, scaleY: 0});
        TweenLite.from(this.txtAddChi.node, 0.5, {ease: Back.easeOut.config(2), scaleX: 0, scaleY: 0});
    },

    playDealCardsAnimation: function (isAnim) {
        for (var i = 0; i < this.vtCardList.length; i++) {
            for (var j = 0; j < this.vtCardList[i].length; j++) {
                var card = this.vtCardList[i][j];
                var time = (isAnim) ? 0.5 : 0;
                var pos = this.ctnCards.convertToNodeSpace(new cc.Vec2(cc.winSize.width / 2, cc.winSize.height / 2 + 80));
                var posTemp = new cc.Vec2(card.x, card.y);
                card.alpha = 0;
                card.x = pos.x;
                card.y = pos.y;
                TweenLite.to(card, time, {
                    x: posTemp.x, y: posTemp.y, alpha: 1, delay: i * j * 0.2, onComplete: function (mcCard) {
                        mcCard.animShowCard(0, BinhCard.FACE_UP);
                    }.bind(this), onCompleteParams: [card]
                });
            }
        }
    },

    zoomOutCards: function () {
        for (var i = 0; i < this.vtCardList.length; i++) {
            for (var j = 0; j < this.vtCardList[i].length; j++) {
                var card = this.vtCardList[i][j];
                card.on(cc.Node.EventType.TOUCH_START, this.onHanlerCardDown, this);
            }
        }
        TweenLite.to(this.ctnCards, 0.3, {scaleX: 1.6, scaleY: 1.6});

    },

    zoomInCards: function () {
        for (var i = 0; i < this.vtCardList.length; i++) {
            for (var j = 0; j < this.vtCardList[i].length; j++) {
                var card = this.vtCardList[i][j];
                card.off(cc.Node.EventType.TOUCH_START, this.onHanlerCardDown, this);
            }
        }
        TweenLite.to(this.ctnCards, 0.1, {scaleX: 1, scaleY: 1});
    },

    greyBiggestCards: function () {
        var arrCards = this.getVtCardListId();
        var arrGreyCards = [];
        for(var i=0; i<arrCards.length; i++){
            if(LogicBinh.getBiggestCards(arrCards[i]) !== null)
                arrGreyCards = arrGreyCards.concat(LogicBinh.getBiggestCards(arrCards[i]));
        }

        this.brightAllCards();
        for (var i = 0; i < this.vtCardList.length; i++) {
            for (var j = 0; j < this.vtCardList[i].length; j++) {
                var card = this.vtCardList[i][j];
                for(var k=0; k<arrGreyCards.length; k++){
                    if(card.id === arrGreyCards[k])
                        card.setGreyCard(true);
                }
            }
        }
    },

    fakeCards: function () {
        var cards = [[26, 21, 37, 42, 20], [46, 47, 48, 24, 43], [25, 19, 36]];
        this.setupCard(cards);
        //this.soChi();

        this.container.emit(GameEvent.CHANGE_SORTED_CARDS_EVENT);
    }
});

PlayerCardsBinh.create = function (componentId, container) {
    var component = new PlayerCardsBinh();
    component.initComponent(componentId, container);
    return component;
};

module.exports = PlayerCardsBinh;
