var Component = require('Component');
var TLMNCard = require('TLMNCard');
var Utility = require('Utility');
var PlaceCardsTLMN = cc.Class({
    extends: Component,

    initComponent: function (componentId, container) {
        Component.prototype.initComponent.call(this, componentId, container);
        this.tableVO = null;

        this.SCALE = 0.8;
        this.CARD_WIDTH = 50;

        this.widthPanel = 0;
        this.vtCardList = [];
        this.vtExistCard = [];
        this.posDisplay = 100;
        this.oldPos = null;
    },

    applyLayout: function () {
        this.bgPlace = this.container.getChildByName("bgPlace");
        this.statusPlace = this.container.getChildByName("mcStatusPlace");
    },

    initialize: function () {
        this.widthPanel = this.bgPlace.width * this.bgPlace.scaleX;
        this.container.removeChild(this.bgPlace);
    },

    addEventListeners: function () {

    },

    //////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////override//////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////

    startGame: function () {
        this.clearVtCard();
        this.clearExistCard();
    },

    placeCard: function (playCards, startPlayCards, seatId) {
        this.show();
        this.greyVtCard();
        this.clearVtCard();
        for (var j = 0; j < playCards.length; j++) {
            var cardNode = new TLMNCard.create(playCards[j], true);
            cardNode.pos = (startPlayCards[j]) ? startPlayCards[j].pos : new cc.Vec2(0, 0);
            cardNode.xScale = (startPlayCards[j]) ? startPlayCards[j].scale : new cc.Vec2(0, 0);
            this.addCard(cardNode);
        }
        this.sortCardList();
    },

    dealCards: function () {
        this.clearVtCard();
        this.clearExistCard();
    },

    endRound: function () {
        this.clearVtCard();
        this.clearExistCard();
    },

    showCardsPlace: function (cards) {
        this.show();
        this.clearVtCard();
        for (var j = 0; j < cards.length; j++) {
            var cardNode = new TLMNCard.create(cards[j], true);
            this.addCard(cardNode);
        }

        this.sortCardList();
    },

    finishGame: function (listResult) {
        TweenLite.delayedCall(this.tableVO.TIME_SHOW_RESULT, function () {
            this.clearVtCard();
            this.clearExistCard();
        }.bind(this))
    },

    leaveGame: function () {
        this.clearVtCard();
        this.clearExistCard();
    },

    //////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////
    greyVtCard:function () {
        for(var i=0;i<this.vtCardList.length;i++){
            var card = this.vtCardList[i];
            card.setGreyCard(true);
        }
    },

    addCard: function (card/*TLMNCard*/) {
        if (!card) return;
        this.setPosCard(card);
        card.angle = Utility.deg2rad(Math.random() * 60 - 30);
        card.scaleX = this.SCALE;
        card.scaleY = this.SCALE;
        card.zIndex = this.container.childrenCount;
        this.container.addChild(card);

        this.vtCardList.push(card);
        this.vtExistCard.push(card);
    },

    setPosCard:function (card) {
        card.x = Math.floor((Math.random() * 100) + 1) - 100;
        card.y = Math.floor((Math.random() * 100) + 1) - 100;
        var move = 20;

        if(this.oldPos){
            if(card.x > this.oldPos.x && card.x - this.oldPos.x <= move){
                card.x += move;
            }
            if(card.x < this.oldPos.x && this.oldPos.x - card.x <= move){
                card.x -= move;
            }

            if(card.y > this.oldPos.y && card.y - this.oldPos.y <= move){
                card.x += move;
            }
            if(card.y < this.oldPos.y && this.oldPos.y - card.y <= move){
                card.y -= move;
            }
        }


        this.oldPos = new cc.Vec2(card.x,card.y);
    },

    clearVtCard: function () {
        this.vtCardList = [];
    },

    clearExistCard: function () {
        this.vtExistCard = [];
        this.container.removeAllChildren();
    },

    sortCardList: function () {
        if (this.vtCardList.length <= 0)
            return;

        if (this.vtCardList.length < 2) {
            this.displayCard();
        } else {
            if (this.vtCardList.length < 5)
                this.sortVt(this.vtCardList, 40, -60, -10, -10, 40, -5, 5);
            else if (this.vtCardList.length < 9)
                this.sortVt(this.vtCardList, 40, -60, -10, -20, 30, -4, 5);
            else
                this.sortVt(this.vtCardList, 40, -60, -20, -20, 25, -3, 5);

            this.displayCardList();
        }
    },

    displayCard: function () {
        var card = this.vtCardList[0];
        card.setAnchorPoint(0,0.5);
        card.y += this.posDisplay;
        if(card.pos){
            //TweenLite.from(card, 0.15, {alpha: 0, scaleX: this.SCALE * 2, scaleY: this.SCALE * 2});
            TweenLite.from(card, 0.3, {
                x: card.pos.x,
                y: card.pos.y,
                scaleX: card.xScale.scaleX,
                scaleY: card.xScale.scaleY
            });
        }
    },

    displayCardList: function () {
        for (var i = 0; i < this.vtCardList.length; i++) {
            var card = this.vtCardList[i];
            card.setAnchorPoint(0,0.5);
            card.y += this.posDisplay;
            if(card.pos){
                TweenLite.from(card, 0.3, {
                    x: card.pos.x,
                    y: card.pos.y,
                    scaleX: card.xScale.scaleX,
                    scaleY: card.xScale.scaleY
                });
            }
        }
    },

    sortVt: function (vtList, rangeY, startY, rangeRotation, startRotation, offsetX, offsetY, offsetRotation) {
        if(vtList.length === 0) return;
        //this.newX = -(vtList.length * offsetX + this.CARD_WIDTH) / 2;
        //this.newY = Math.random() * rangeY + startY;
        this.newX = vtList[0].x - Math.floor((Math.random() * 100) + 1) - 50;
        this.newY = vtList[0].y + Math.floor((Math.random() * 30) + 1);

        this.newRotation = (Math.random() * rangeRotation) + startRotation;
        for (var i = 0; i < vtList.length; i++) {
            vtList[i].x = this.newX + offsetX;
            vtList[i].y = this.newY + offsetY;
            vtList[i].angle = Utility.deg2rad(this.newRotation + offsetRotation);
            this.newX = vtList[i].x;
            this.newY = vtList[i].y;
            this.newRotation = Utility.rad2deg(vtList[i].rotation);
        }
    }

    //////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////

});

PlaceCardsTLMN.create = function (componentId, container) {
    var component = new PlaceCardsTLMN();
    component.initComponent(componentId, container);
    return component;
};

module.exports = PlaceCardsTLMN;
