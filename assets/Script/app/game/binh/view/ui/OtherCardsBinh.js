var Component = require('Component');
var BinhCard = require('BinhCard');
var LogicBinh = require('LogicBinh');
var CardVO = require('CardVO');
var SeatVO = require('SeatVO');
var Utility = require('Utility');
var ResultStatusControl = require('ResultStatusControl');
var OtherCardsBinh = cc.Class({
    extends: Component,

    initComponent: function (componentId, container) {
        Component.prototype.initComponent.call(this, componentId, container);
        this.tableVO = null;
        this.seatId = -1;
        this.vtCardList = [];
    },

    applyLayout: function () {
        Component.prototype.applyLayout.call(this);
        this.ctnCards = this.container.getChildByName("ctnCards");
        this.card1 = this.ctnCards.getChildByName("mcCard1");
        this.card2 = this.ctnCards.getChildByName("mcCard2");
        this.card3 = this.ctnCards.getChildByName("mcCard3");
        this.card4 = this.ctnCards.getChildByName("mcCard4");

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

        this.posMoney_X = this.txtAddChi.node.x;
        this.posMoney_Y = this.txtAddChi.node.y;

        this.space = this.card4.x - this.card3.x;

        this.mcResultSatus.active = false;
        this.txtAddChi.node.active = false;
        this.txtSubChi.node.active = false;

        this.ctnCards.removeChild(this.card1);
        this.ctnCards.removeChild(this.card2);
        this.ctnCards.removeChild(this.card3);
        this.ctnCards.removeChild(this.card4);

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
        this.clearAllCards();
        this.mcResultSatus.active = false;
        this.txtAddChi.node.active = false;
        this.txtSubChi.node.active = false;
        this.isMauBinh = false;
    },

    sitdown: function (seatId, user) {
        if (this.seatId !== seatId) return;
        var seat = this.tableVO.getSeatBySeatId(this.seatId);
        if (!seat) return;
        if(!seat.isSort && this.tableVO.isPlaying){
            TweenLite.delayedCall(1, function () {
                this.fakeSwapOtherPlayerCards();
            }.bind(this));
        }
    },

    dealCards: function () {
        var seat = this.tableVO.getSeatBySeatId(this.seatId);
        if (!seat || !seat.cards || seat.cards.length === 0 || seat.status !== SeatVO.PLAY) return;
        this.playDealCards(seat.cards);
    },

    soChi: function (seatId, indexChi) {
        if (this.seatId !== seatId) return;
        var seat = this.tableVO.getSeatBySeatId(this.seatId);
        if (!seat || !seat.cards || seat.cards.length === 0) return;
        if (seat.isMauBinh && indexChi !== LogicBinh.INDEX_CHI_AT) return;

        this.onShowSoChi(indexChi);
        this.onShowTypeCards(indexChi);
        this.show();
    },

    binhLung: function (seatId, isLung) {
        if (this.seatId !== seatId) return;
        var seat = this.tableVO.getSeatBySeatId(this.seatId);
        if (!seat || !seat.cards || seat.cards.length === 0) return;
        if (seat.isMauBinh) return;
        if (isLung) {
            this.resultControl.showSpecialCards(ResultStatusControl.IDX_BINH_LUNG);
            this.setPosResultStatus();
            this.mcResultSatus.active = true;
            this.setupCard(seat.cards, BinhCard.FACE_UP);

        }else{
            this.mcResultSatus.active = false;
            //this.setupCard(seat.cards, BinhCard.FACE_DOWN);
        }
        this.updateScoreChi(seat.scoreLung);
        this.show();
        this.brightAllCards();
    },

    mauBinh:function (seatId) {
        var seat = this.tableVO.getSeatBySeatId(this.seatId);
        if (!seat || !seat.cards || seat.cards.length === 0) return;
        if (this.seatId !== seatId) return;
        //this.isMauBinh = true;
        this.resultControl.showTypeCards(seat.winType);
        this.setPosResultStatus();
        this.mcResultSatus.active = true;
        this.setupCard(seat.cards, BinhCard.FACE_UP);
        if(seat.scoreMauBinh !== 0) this.updateScoreChi(seat.scoreMauBinh);
        this.show();
        this.brightAllCards();
    },

    sapHam: function () {
        this.mcResultSatus.active = false;
        var seat = this.tableVO.getSeatBySeatId(this.seatId);
        if (!seat || (seat.batSapHam.length === 0 && seat.sapHam.length === 0)) return;
        if (seat.isMauBinh) return;
        if (seat.scoreSapHam < 0) {
            this.resultControl.showSpecialCards(ResultStatusControl.IDX_BI_SAP_HAM); //IDX SAP HAM
        } else if(seat.scoreSapHam > 0) {
            this.resultControl.showSpecialCards(ResultStatusControl.IDX_BAT_SAP_HAM);//IDX BAT SAP HAM
        }
        this.setPosResultStatus();
        this.mcResultSatus.active = true;
        this.updateScoreChi(seat.scoreSapHam);
        this.brightAllCards();
    },

    sapLang: function (seatId) {
        if (this.seatId !== seatId) return;
        var seat = this.tableVO.getSeatBySeatId(this.seatId);
        if (!seat) return;
        if (seat.isMauBinh) return;
        if (seat.biSapLang) {
            this.resultControl.showSpecialCards(ResultStatusControl.IDX_BI_SAP_LANG);
            this.setPosResultStatus();
            this.mcResultSatus.active = true;
        } else {
            this.mcResultSatus.active = false;
        }
        this.updateScoreChi(seat.scoreSapLang);
        this.brightAllCards();
    },

    batSapLang: function (seatId) {
        if (this.seatId !== seatId) return;
        var seat = this.tableVO.getSeatBySeatId(this.seatId);
        if (!seat) return;
        if (seat.isMauBinh) return;
        if (seat.batSapLang) {
            this.resultControl.showSpecialCards(ResultStatusControl.IDX_BAT_SAP_LANG);
            this.setPosResultStatus();
            this.mcResultSatus.active = true;
        } else {
            this.mcResultSatus.active = false;
        }
        this.updateScoreChi(seat.scoreBatSapLang);
        this.brightAllCards();
    },

    showAllCardsBinh: function (seatId, isFaceUp) {
        if (this.seatId !== seatId) return;
        var seat = this.tableVO.getSeatBySeatId(this.seatId);
        if (!seat || !seat.cards || seat.cards.length === 0) return;
        if (isFaceUp) {
            this.setupCard(seat.cards, BinhCard.FACE_UP);
        } else {
            this.setupCard(seat.cards, BinhCard.FACE_DOWN);
        }

        this.show();
    },

    hideResultBinh: function () {
        this.txtAddChi.node.active = false;
        this.txtSubChi.node.active = false;
        this.brightAllCards();
    },

    finishGame: function (listResult) {
        this.clearAllCards();
        this.hide();
    },

    showCards: function (seatId, arrCards) {
        if (this.seatId !== seatId) return;
        var seat = this.tableVO.getSeatBySeatId(this.seatId);
        if (!seat || seat.status !== SeatVO.PLAY) return;
        var cards = [];
        for (var i = 0; i < arrCards.length; i++) {
            var idx = Math.floor(i / 5);
            if (!cards[idx]) cards[idx] = [];
            cards[idx].push(arrCards[i]);
        }
        this.setupCard(cards, BinhCard.FACE_DOWN);
        this.show();

    },

    leaveGame: function () {
        this.clearAllCards();
        this.hide();
    },

    updateMoney:function (seatId, addMoney) {
        if (seatId !== this.seatId) return;
        var seat = this.tableVO.getSeatBySeatId(this.seatId);
        if(seat){
            this.showEarnMoney(addMoney);
        }
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

        this.txtAddChi.node.y = this.txtSubChi.node.y = this.posMoney_Y;
        this.txtAddChi.node.opacity = this.txtSubChi.node.opacity = 255;

        TweenLite.from(this.txtSubChi.node, 0.3, {y: this.txtSubChi.node.y - 10, opacity:0, alpha: 0});
        TweenLite.to(this.txtSubChi.node, 0.5, {y: this.txtSubChi.node.y + 50,opacity:0, delay:2, alpha: 0});

        TweenLite.from(this.txtAddChi.node, 0.3, {y: this.txtAddChi.node.y - 10, alpha: 0});
        TweenLite.to(this.txtAddChi.node, 0.5, {y: this.txtAddChi.node.y + 50,opacity:0, delay:2, alpha: 0});
    },

    //////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////
    onShowSoChi: function (chiIndex) {
        for (var i = 0; i < this.vtCardList.length; i++) {
            for (var j = 0; j < this.vtCardList[i].length; j++) {
                var cardVO = this.vtCardList[i][j];
                if (chiIndex !== LogicBinh.INDEX_CHI_AT) {
                    if (i !== chiIndex) {
                        cardVO.setGreyCard(true);
                    } else {
                        cardVO.animShowCard(0.07 * i, BinhCard.FACE_UP);
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
        var seat = this.tableVO.getSeatBySeatId(this.seatId);
        if (!seat) return;

        if (chiIndex !== LogicBinh.INDEX_CHI_AT) {
            var type = seat.getRankChi(chiIndex);
            this.mcResultSatus.active = true;
            this.setPosResultStatus(chiIndex);
            this.resultControl.showTypeCards(type);
        } else {
            this.mcResultSatus.active = false;
        }


        var score = seat.getScoreChi(chiIndex);
        this.updateScoreChi(score);
    },

    setPosResultStatus: function (resultType) {
        switch (resultType){
            case LogicBinh.INDEX_CHI1:
                this.mcResultSatus.scale = 0.8;
                this.mcResultSatus.x = 25;
                this.mcResultSatus.y = -15;
                break;
            case LogicBinh.INDEX_CHI2:
                this.mcResultSatus.scale = 0.8;
                this.mcResultSatus.x = 25;
                this.mcResultSatus.y = 55;
                break;
            case LogicBinh.INDEX_CHI3:
                this.mcResultSatus.scale = 0.8;
                this.mcResultSatus.x = -10;
                this.mcResultSatus.y = 110;
                break;
            default:
                this.mcResultSatus.scale = 1;
                this.mcResultSatus.x = 25;
                this.mcResultSatus.y = 60;
                break;
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
        this.txtAddChi.node.scaleX = this.txtAddChi.node.scaleY = 1;
        this.txtSubChi.node.scaleX = this.txtSubChi.node.scaleY = 1;

        this.txtAddChi.node.y = this.txtSubChi.node.y = this.posMoney_Y;
        this.txtAddChi.node.opacity = this.txtSubChi.node.opacity = 255;

        TweenLite.from(this.txtSubChi.node, 0.5, {ease: Back.easeOut.config(2), scaleX: 0, scaleY: 0});
        TweenLite.from(this.txtAddChi.node, 0.5, {ease: Back.easeOut.config(2), scaleX: 0, scaleY: 0});
    },

    hideTextChi:function(){
        this.txtSubChi.node.active = false;
        this.txtAddChi.node.active = false;
    },

    playDealCards: function (arrCards) {
        this.clearAllCards();
        var cards = [];
        for (var i = 0; i < arrCards.length; i++) {
            var idx = Math.floor(i / 5);
            if (!cards[idx]) cards[idx] = [];
            cards[idx].push(arrCards[i]);
        }
        this.setupCard(cards, BinhCard.FACE_DOWN);
        this.playDealCardsAnimation(true);
        TweenLite.delayedCall(2, function () {
            this.fakeSwapOtherPlayerCards();
        }.bind(this));
        this.show();
    },

    fakeSwapOtherPlayerCards: function () {
        var rd = Math.floor(Math.random() * 2 + 2);
        this.tween = TweenLite.delayedCall(rd, function () {
            this.fakeSwapOtherPlayerCards();
            this.swapCards();
        }.bind(this));
    },

    swapCards: function () {
        var rd1 = Math.floor(Math.random() * 2);
        var rd2, rd4;
        do{
            rd2 = Math.floor(Math.random() * 3);
        }while(rd2 === rd1);                            //random 2 chi khac nhau

        var rd3 = Math.floor(Math.random() * 5);
        if(rd2 === 2)
            rd4 = Math.floor(Math.random() * 3);
        else
            rd4 = Math.floor(Math.random() * 5);        //random cards trong Chi

        var card = this.vtCardList[rd1][rd3];
        this.vtCardList[rd1][rd3] = this.vtCardList[rd2][rd4];
        this.vtCardList[rd2][rd4] = card;

        this.moveCards(this.vtCardList[rd1][rd3],this.vtCardList[rd2][rd4]);
    },

    moveCards: function (card1 , card2) {
        var cardPos = card2;

        TweenLite.to(card2, 0.5, {x: card1.x, y: card1.y});
        TweenLite.to(card1, 0.5, {x: cardPos.x, y: cardPos.y});

        var order = card2.zIndex;
        card2.zIndex = card1.zIndex;
        card1.zIndex = order;
    },

    sortFinishBinh: function (seatID) {
        if(seatID !== this.seatId) return;
        if(this.tween !== undefined )
            this.tween.kill();
    },

    clearAllCards: function () {
        this.ctnCards.removeAllChildren();
        this.vtCardList = [];
        if(this.tween !== undefined)
            this.tween.kill();
    },
    /**
     *
     * @param cards: [[chi1],[chi2],[chi3]]
     */
    setupCard: function (cards/*Matrix*/, faceCards) {
        this.clearAllCards();
        this.sortArrCards(cards);

        for (var i = cards.length - 1; i >= 0; i--) {
            var cardChi = [];
            for (var j = 0; j < cards[i].length; j++) {
                var cardId = cards[i][j];
                var card = new BinhCard.create(cardId, true);
                var cardPos = this.getCardPos(i, j);
                card.scaleX = this.SCALE_X;
                card.scaleY = this.SCALE_Y;
                card.x = cardPos.x;
                card.y = cardPos.y;
                card.cardPos = cardPos;
                card.cardType = i + "_" + j;
                card.setCardState(faceCards);

                var order = 0;
                if(i===0)
                    order = 8+j;
                else
                    order = (2-i)*3 + j;
                card.zIndex = order;
                cardChi.push(card);
                this.ctnCards.addChild(card);
            }
            this.vtCardList.unshift(cardChi);
        }
    },

    sortArrCards: function (arrCards) {
        var typeChi = LogicBinh.check_chi(arrCards);
        if (typeChi !== null) {
            this.updateCardsChi(typeChi, arrCards);
        } else {
            for (var i = 0; i < arrCards.length; i++) {
                Utility.sortArray(arrCards[i], "NUMERIC");
                LogicBinh.moveCard2ToTop(arrCards[i]);
            }
        }
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
            }
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

    getCardPos: function (type, index) {
        var cardPos = null;
        if (type === 0) cardPos = new cc.Vec2(this.posChi1.x, this.posChi1.y);
        if (type === 1) cardPos = new cc.Vec2(this.posChi2.x, this.posChi2.y);
        if (type === 2) cardPos = new cc.Vec2(this.posChi3.x, this.posChi3.y);

        cardPos.x += index * this.space;

        return cardPos;
    },

    playDealCardsAnimation: function (isAnim) {
        for (var i = 0; i < this.vtCardList.length; i++) {
            for (var j = 0; j < this.vtCardList[i].length; j++) {
                var card = this.vtCardList[i][j];
                var time = (isAnim) ? 0.3 : 0;
                var pos = this.ctnCards.convertToNodeSpace(new cc.Vec2(cc.winSize.width / 2, cc.winSize.height/2 + 80));
                var posTemp = new cc.Vec2(card.x, card.y);
                card.alpha = 0;
                card.x = pos.x;
                card.y = pos.y;
                TweenLite.to(card, time, {x: posTemp.x, y: posTemp.y, alpha: 1, delay: i * j * 0.2});
            }
        }
    },


    fakeCards: function () {
        this.show();
        this.playDealCards([1, 2, 3, 4, 5, 67, 8, 9, 13, 16, 17, 19, 20], true);
        this.soChi();
    }
});

OtherCardsBinh.create = function (componentId, container) {
    var component = new OtherCardsBinh();
    component.initComponent(componentId, container);
    return component;
};

module.exports = OtherCardsBinh;
