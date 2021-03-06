cc.Class({
    extends: cc.Component,

    properties: {
        compareList: [cc.SpriteFrame],
        cardTypeList: [cc.SpriteFrame]
    },

    statics: {
        IDX_SO_CHI_1: 0,
        IDX_SO_CHI_2: 1,
        IDX_SO_CHI_3: 2,
        IDX_SO_CHI_AT: 3,
        IDX_SAP_HAM: 4,
        IDX_SAP_LANG: 5,
        IDX_BAT_SAP_LANG: 6,

        IDX_BINH_LUNG: 0,
        IDX_MAU_BINH: 1
    },

    // use this for initialization
    onLoad: function () {

    },

    setEmptyState: function () {
        var sprite = this.node.getComponent(cc.Sprite);
        sprite.spriteFrame = new cc.SpriteFrame();
    },

    setCardTypeList: function (index, status) {

        console.log("setCardTypeList : " + index + status);

        // if (status === 1) {
        //     this.node.x = 0;
        //     this.node.y = 150;
        // }
        // else {
            this.node.x = 45;
            this.node.y = 20;
        // }
        var spriteFrame = this.cardTypeList[index];
        this.updateSpriteFrame(spriteFrame);
        TweenLite.from(this.node, 0.3, { scaleX: 0, scaleY: 0 });
    },

    setCompareState: function (index) {
        // if (index !== 0 || index !== 1) {
            this.node.x = 0;
            this.node.y = 85;
        // }
        this.node.scale = 1;
        var spriteFrame = this.compareList[index];
        this.updateSpriteFrame(spriteFrame);
    },

    updateSpriteFrame: function (spriteFrame) {
        if (!spriteFrame) {
            cc.warn("[CompareStatusControl] has not spriteFame ");
            return;
        }
        var sprite = this.node.getComponent(cc.Sprite);
        sprite.spriteFrame = spriteFrame;
    },

    showMauBinh: function () {
        this.node.x = 0;
        this.node.y = 150;
        var spriteFrame = this.cardTypeList[1];
        this.updateSpriteFrame(spriteFrame);
        TweenLite.from(this.node, 0.3, { scaleX: 0, scaleY: 0 });
    }
});
