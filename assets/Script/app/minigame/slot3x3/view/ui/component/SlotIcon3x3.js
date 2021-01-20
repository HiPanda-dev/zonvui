var FlickerObject = require('FlickerObject');
var SlotIcon3x3 = cc.Class({
    extends: cc.Node,
    ctor: function () {
    },

    initComponent: function (itemId, texture, itemPrefabs) {
      this.itemId = itemId;
      var node = cc.instantiate(itemPrefabs);
      var item  = node.getChildByName("item");
      var effect = node.getChildByName("effect");
      effect.active = false;

      this.sprite = item.getComponent(cc.Sprite);
      this.sprite.spriteFrame = texture;

      this.item = item;
      this.effect = effect;
      this.effect.addComponent(FlickerObject);
      this.addChild(node);
    },

    showEffect(){
      this.effect.active = true;
      this.effect.getComponent('FlickerObject').onStart();
    },

    hideEffect(){
      this.effect.active = false;
      this.effect.getComponent('FlickerObject').onStop();
    }

});

SlotIcon3x3.create = function(cardId, texture, itemPrefabs){
    var component = new SlotIcon3x3();
    component.initComponent(cardId, texture, itemPrefabs);
    return component;
};

module.exports = SlotIcon3x3;
