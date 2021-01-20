var AssetVO = require("AssetVO");
var CardVO = require("CardVO");
var Utility = require("Utility");

var PhomCard = cc.Class({
    extends: cc.Node,

    initComponent: function (cardId, isMove) {
        this.id = -1;
        this.yunId = 0;
        this.content = null;
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
        this.sendObject = {};

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
        this.yunId = Utility.convertClientToServerCardsBinh([cardId])[0] + 1;
        if(cardId === -1){
            this.name = "card_back";
        }else{
            this.name = (cardId < 10) ? "cards_0" + this.id : "cards_" + this.id;
        }

        this.border = AssetVO.getTextureGameAtlas("card_border");
        this.borderNode = new cc.Node();
        this.cardBorder = this.borderNode.addComponent(cc.Sprite);
        this.cardBorder.spriteFrame = this.border;
        this.borderNode.setAnchorPoint(cc.v2(0, 1));
        this.addChild(this.borderNode);
        this.borderNode.active = false;

        this.content = AssetVO.getTextureGameAtlas(this.name);
        var cardSprite = this.addComponent(cc.Sprite);
        cardSprite.spriteFrame = this.content;

        this.moveCenter();
    },

    setStealCard: function () {
        this.borderNode.active = true;
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
        this.yunId = Utility.convertClientToServerCardsBinh([cardId])[0] + 1;
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

PhomCard.create = function (cardId, isMove) {
    var component = new PhomCard();
    component.initComponent(cardId, isMove);
    return component;
};

module.exports = PhomCard;