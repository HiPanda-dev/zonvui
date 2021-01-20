var AssetVO = require("AssetVO");
var CardVO = require("CardVO");

var TLMNCard = cc.Class({
    extends: cc.Node,

    statics: {
        FACE_UP:0,
        FACE_DOWN:1
    },

    initComponent: function (cardId, isMove) {
        this.id = -1;
        this.content = null;
        this.cardBack = null;
        this.isMove = true;
        this.num = 0;
        this.type = 0;

        this.range = 60;
        this.acceleration = 0.007000;
        this.friction = 0.700000;

        this.minX = 0;
        this.minY = 0;
        this.maxX = 0;
        this.maxY = 0;

        this.vx = 0;
        this.vy = 0;
        this.count = 0;
        this.isGrey = false;
        this.cardName = "";
        this.timer = null;

        this.buildUI(cardId, isMove);
    },

    buildUI: function (cardId, isMove) {
        var cardVO = new CardVO(cardId);
        this.num = cardVO.num;
        this.type = cardVO.type;
        this.isMove = isMove || false;
        this.cardName = cardVO.cardName;
        this.id = cardId;
        if(cardId === -1){
            this.name = "card_back";
        }else{
            this.name = (cardId < 10) ? "cards_0" + this.id : "cards_" + this.id;
        }

        this.content = AssetVO.getTextureGameAtlas(this.name);
        this.cardBack = AssetVO.getTextureGameAtlas('card_back');

        var cardSprite = this.addComponent(cc.Sprite);
        cardSprite.spriteFrame = this.content;

        //this.moveCenter();
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

    setCardState:function (cardSate) {
        this.state = cardSate;
        var cardSprite = this.getComponent(cc.Sprite);
        cardSprite.spriteFrame = (this.state === TLMNCard.FACE_UP)?this.content: this.cardBack;
    },

    animShowCard:function (delay, cardSate) {
        this.setCardState(cardSate);
        var width = this.width;
        if(this.state === TLMNCard.FACE_UP){
            TweenLite.to(this, 0.3, {width: 0, delay: delay});
            TweenLite.to(this, 0.3, {width: width, delay: delay + 0.3});
        }else{
            TweenLite.killTweensOf(this);
            this.width = width;
        }
    },

    onLoop: function () {
        if (gain.casino.tlmn.view.component.PlaceCardsPanel.isRollOverKhay) {
            if (this !== null && this.parent !== null) {

                var pointMouse = new createjs.Point(this.stage.mouseX, this.stage.mouseY);
                var distanceX = this.parent.globalToLocal(pointMouse.x, pointMouse.y).x - this.x;
                var distanceY = this.parent.globalToLocal(pointMouse.x, pointMouse.y).y - this.y;
                var distanceXY = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

                if (distanceXY < this.range) {
                    var space = distanceXY * this.range * this.acceleration;

                    if (space != 0) {
                        this.vx = this.vx - distanceX / space;
                        this.vy = this.vy - distanceY / space;
                    }
                }
                this.vx = this.vx * this.friction;
                this.vy = this.vy * this.friction;

                if (Math.abs(this.vx) > 0.25 && Math.abs(this.vy) > 0.25) {
                    this.x += this.vx;
                    this.y += this.vy;
                    this.count = 0;
                    this.removeEventListener("tick", this.onLoop.bind(this));
                    //this.rotation = this.rotation + space / 10 * direction;
                } else {
                    this.count++;
                    if (this.count >= 10) {
                        this.removeEventListener("tick", this.onLoop.bind(this));
                        this.count = 0;
                    }
                }

                if (this.x > this.maxX)
                    this.x = this.maxX;
                if (this.x < this.minX)
                    this.x = this.minX;
                if (this.y > this.maxY)
                    this.y = this.maxY;
                if (this.y < this.minY)
                    this.y = this.minY;
            } else {
                this.removeEventListener("tick", this.onLoop.bind(this));
            }
        }
    },

    changeCard:function (cardId, isMove) {
        var cardVO = new CardVO(cardId);
        this.num = cardVO.num;
        this.type = cardVO.type;
        this.isMove = isMove || false;
        this.id = cardId;
        this.name = (cardId < 10) ? "cards_0" + this.id : "cards_" + this.id;
        this.content = AssetVO.getTextureGameAtlas(this.name);

        var cardSprite = this.getComponent(cc.Sprite);
        cardSprite.spriteFrame = this.content;

        this.moveCenter();
    },

    setGreyCard: function (isGrey) {
        this.isGrey = isGrey;
        if (isGrey) this.color = new cc.Color(142, 142, 142, 255);
        else this.color = new cc.Color(255, 255, 255, 255);
    }
});

TLMNCard.create = function (cardId, isMove) {
    var component = new TLMNCard();
    component.initComponent(cardId, isMove);
    return component;
};

module.exports = TLMNCard;