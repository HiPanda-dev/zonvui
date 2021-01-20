var AssetVO = cc.Class({
    extends: cc.Component,

    properties: {
        gameAtlas:cc.SpriteAtlas
    },

    // use this for initialization
    onLoad: function () {
        AssetVO.GAME_ATLAS = this.gameAtlas;
    },

    statics:{
        GAME_ATLAS:null,
        getTextureGameAtlas:function (name) {
            var spriteFrame = AssetVO.GAME_ATLAS.getSpriteFrame(name);
            return spriteFrame;
        }
    }
});

module.exports = AssetVO;
