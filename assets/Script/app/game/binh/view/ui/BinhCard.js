var AssetVO = require("AssetVO");
var CardVO = require("CardVO");

var BinhCard = cc.Class({
    extends: cc.Node,

    statics: {
        FACE_UP:0,
        FACE_DOWN:1
    },

    initComponent: function (cardId, isMove) {
        this.id = -1;
        this.content = null;
        this.num = 0;
        this.type = 0;
        this.state = this.FACE_UP;
        this.cardPos = null;
        this.cardName = "";
        this.cardType = 0;

        this.buildUI(cardId, isMove);
    },

    buildUI: function (cardId, isMove) {
        var cardVO = new CardVO(cardId);
        this.num = cardVO.num;
        this.type = cardVO.type;
        this.isMove = isMove || false;
        this.cardName = cardVO.cardName;
        this.id = cardId;
        this.name = (cardId < 10) ? "cards_0" + this.id : "cards_" + this.id;

        this.content = AssetVO.getTextureGameAtlas(this.name);
        this.cardBack = AssetVO.getTextureGameAtlas('card_back');

        var cardSprite = this.addComponent(cc.Sprite);
        cardSprite.spriteFrame = this.content;

        this.setCardState(BinhCard.FACE_UP);
    },

    changeCard:function (cardId, isMove) {
        var cardVO = new CardVO(cardId);
        this.num = cardVO.num;
        this.type = cardVO.type;
        this.isMove = isMove || false;
        this.id = cardId;
        this.name = (cardId < 10) ? "cards_0" + cardId : "cards_" + cardId;
        this.content = AssetVO.getTextureGameAtlas(this.name);

        var cardSprite = this.getComponent(cc.Sprite);
        cardSprite.spriteFrame = this.content;

        this.moveCenter();
    },

    moveCenter: function () {
        if (this.isMove) {
            this.content.x += this.content.width / 2;
            this.content.y += this.content.height / 2;
            this.direction = this.randomRange(-1, 1);

            var boundWidth = 300;
            var boundHeight = 300;
            this.minX = this.content.width;
            this.maxX = boundWidth - this.content.width;
            this.minY = this.content.height;
            this.maxY = boundHeight - this.content.height;
        } else {
            this.content.x = 0;
            this.content.y = 0;
        }
    },


    randomRange: function () {
        return Math.floor(Math.random() * (this.max - this.min + 1)) + this.min;
    },
    
    animShowCard:function (delay, cardSate) {
        this.setCardState(cardSate);
        var width = this.width;
        if(this.state === BinhCard.FACE_UP){
            TweenLite.to(this, 0.3, {width: 0, delay: delay});
            TweenLite.to(this, 0.3, {width: width, delay: delay + 0.3});
        }else{
            TweenLite.killTweensOf(this);
            this.width = width;
        }
    },

    setCardState:function (cardSate) {
        this.state = cardSate;
        var cardSprite = this.getComponent(cc.Sprite);
        cardSprite.spriteFrame = (this.state === BinhCard.FACE_UP)?this.content: this.cardBack;
    },
    
    setGreyCard: function (isGrey) {
        this.isGrey = isGrey;
        if (isGrey) this.color = new cc.Color(168, 168, 168, 255);
        else this.color = new cc.Color(255, 255, 255, 255);
    },
    
    showBorderCard: function () {
        
    }
    
});

BinhCard.create = function (cardId, isMove) {
    var component = new BinhCard();
    component.initComponent(cardId, isMove);
    return component;
};

module.exports = BinhCard;