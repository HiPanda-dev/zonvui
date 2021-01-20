var MiniPokerIcon = cc.Class({
    extends: cc.Node,
    ctor: function () {
    },

    initComponent: function (itemId, texture) {
      this.itemId = itemId;
      this.sprite = this.addComponent(cc.Sprite);
      this.sprite.spriteFrame = texture;
    },

});

MiniPokerIcon.create = function(cardId, texture){
    var component = new MiniPokerIcon();
    component.initComponent(cardId, texture);
    return component;
};

module.exports = MiniPokerIcon;
