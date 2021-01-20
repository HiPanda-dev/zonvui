var Component = require("Component");
var TLMNCard = require('TLMNCard');
var Utility = require('Utility');
module.exports = cc.Class({
    extends: Component,

    initComponent: function (componentId, container) {
        Component.prototype.initComponent.call(this, componentId, container);
    },
    applyLayout: function () {
        this.vtCardList = [];
        this.vtPlayerCardList = [];
    },

    //////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////override////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////


    //////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////
    getPlayerCards:function () {
        var arrCards = [];
        this.onRandom();
        for(var i=0;i<this.vtPlayerCardList.length;i++){
            arrCards[i] = [];
            for (var j=0;j<this.vtPlayerCardList[i].length;j++){
                var card = this.vtPlayerCardList[i][j];
                if(card.active === true){
                    arrCards[i].push(card.id);
                }
            }
        }
        return arrCards;
    },

    onRandom: function () {
        var arr = [];
        for (var i = 0; i < this.vtCardList.length; i++) {
            var c = this.vtCardList[i];
            if(c.active === true){
                arr.push(c.id);
            }
        }
        Utility.shuffle(arr);
        for (var i = 0; i < arr.length; i++) {
            for (var t = 0; t < this.vtPlayerCardList.length; t++) {
                var isAdd = false;
                for (var k = 0; k < this.vtPlayerCardList[t].length; k++) {
                    var cardPlayer = this.vtPlayerCardList[t][k];
                    if(cardPlayer.active === false){
                        cardPlayer.changeCard(arr[i], true);
                        cardPlayer.active = true;
                        isAdd = true;
                        this.showCardInVtCardList(cardPlayer.id, false);
                        break;
                    }
                }
                if(isAdd) break;
            }
        }
    },

    showCardInVtCardList:function (cardId, isShow) {
        for (var i = 0; i < this.vtCardList.length; i++) {
            var cardNode = this.vtCardList[i];
            if (cardNode.id === cardId) {
                cardNode.active = isShow;
                break;
            }
        }
    },

    onCancel: function () {
        this.hide();
    },

    onClearAll: function (evt) {
        for (var i = 0; i < this.vtPlayerCardList.length; i++) {
            for (var j = 0; j < this.vtPlayerCardList[i].length; j++) {
                var card = this.vtPlayerCardList[i][j];
                if (card.active) {
                    this.removeCard(card);
                }
            }
        }
    },

    setupPlayerCards: function (player, index) {
        if(this.vtPlayerCardList[index] !== undefined) return;
        player.removeChild(player.getChildByName("mcCard1"));
        player.removeChild(player.getChildByName("mcCard2"));

        var btnClear = player.getChildByName("btnClear");
        btnClear.on(cc.Node.EventType.TOUCH_START, this.onClearAtPlayer, this);

        this.vtPlayerCardList[index] = [];
        for (var i = 0; i < this.getMaxCardPlayer(); i++) {
            var cardNode = this.getSpriteCard(0);
            cardNode.on(cc.Node.EventType.TOUCH_START, this.hanlerRemoveCard, this);
            cardNode.scaleX = cardNode.scaleY = this.scale;
            cardNode.x = this.playerPosCardsX + i * this.playerSpaceCard;
            cardNode.y = this.playerPosCardsY;
            cardNode.active = false;
            player.addChild(cardNode);

            this.vtPlayerCardList[index].push(cardNode);
        }
    },

    getSpriteCard:function (id) {
        return new TLMNCard.create(id, true);
    },

    getMaxCardPlayer:function () {
        return 13;
    },

    onClearAtPlayer: function (evt) {
        var btnClear = evt.currentTarget;
        var index = this.getIndexByPlayer(btnClear.parent);
        if(!this.vtPlayerCardList[index]) return;
        for (var i = 0; i < this.vtPlayerCardList[index].length; i++) {
            var card = this.vtPlayerCardList[index][i];
            if (card.active) {
                this.removeCard(card);
            }
        }
    },

    setupAllCards: function () {
        if(this.vtCardList.length > 0) return;
        var num = 18;
        for (var i = 0; i < 52; i++) {
            var cardNode = this.getSpriteCard(i);//new TLMNCard.create(i, true);
            cardNode.on(cc.Node.EventType.TOUCH_START, this.hanlerSelectCards, this);
            cardNode.scaleX = cardNode.scaleY = this.scale;
            cardNode.x = this.posX + (i % num) * this.spaceW;
            cardNode.y = this.posY + Math.floor(i / num) * this.spaceH;
            this.mcAllCards.addChild(cardNode);
            this.vtCardList.push(cardNode);
        }
    },

    hanlerSelectCards: function (evt) {
        var cardShow = null;
        var index = this.getChooseIndexToggle();
        for (var i = 0; i < this.vtPlayerCardList[index].length; i++) {
            var cardNode = this.vtPlayerCardList[index][i];
            if (cardNode.active === false) {
                cardShow = cardNode;
                break;
            }
        }

        if (!cardShow) return;

        var card = evt.currentTarget;
        card.active = false;
        cardShow.changeCard(card.id, true);
        cardShow.active = true;
    },

    hanlerRemoveCard: function (evt) {
        var card = evt.currentTarget;
        this.removeCard(card);
    },

    removeCard: function (card) {
        for (var i = 0; i < this.vtCardList.length; i++) {
            var cardNode = this.vtCardList[i];
            if (cardNode.id === card.id) {
                cardNode.active = true;
                break;
            }
        }
        card.active = false;
    },


    getChooseIndexToggle: function () {
        for (var i = 1; i <= this.toggleGroup.childrenCount; i++) {
            var toggle = this.toggleGroup.getChildByName("toggle" + i).getComponent(cc.Toggle);
            if (toggle.isChecked) return i - 1;
        }
        return 0;
    },

    getPlayerIndex: function (index) {

    },

    getIndexByPlayer: function (player) {

    }

});
