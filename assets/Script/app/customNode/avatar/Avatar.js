var GameConfig = require("GameConfig");
var Base64 = require("Base64");
var Utility = require("Utility");
cc.Class({
    extends: cc.Component,

    properties: {
        mcImage:cc.Sprite,
        listAvatar: [cc.SpriteFrame]
    },

    // use this for initialization
    onLoad: function () {

    },

    updateImg:function (path) {
        // Utility.loadUrlImage(path, function (mcImage, texture) {
        //     mcImage.spriteFrame = new cc.SpriteFrame(texture);
        // },[this.mcImage]);
    },

    updateAvatarId: function(id) {
       this.mcImage.spriteFrame = this.listAvatar[id-1];
    }
});
