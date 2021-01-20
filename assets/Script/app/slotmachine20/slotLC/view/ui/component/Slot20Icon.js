var Slot20VO = require('Slot20VO');
var Slot20Icon = cc.Class({
    extends: cc.Node,
    ctor: function () {
    },

    initComponent: function (itemId, texture, itemPrefabs) {
        this.itemId = itemId;
        var node = cc.instantiate(itemPrefabs);
        var item  = node.getChildByName("item");
        var effect = node.getChildByName("effect");
        var animJackpot = node.getChildByName("animJackpot");
        var animBonus = node.getChildByName("animBonus");
        var animScatter = node.getChildByName("animScatter");
        effect.active = false;

        this.effect = effect.getComponent(cc.ParticleSystem);
        this.effect.stopSystem();

        this.sprite = item.getComponent(cc.Sprite);
        this.sprite.spriteFrame = texture;

        this.animJackpot = animJackpot;
        this.animJackpot.active = false;

        this.animBonus = animBonus;
        this.animBonus.active = false;

        this.animScatter = animScatter;
        this.animScatter.active = false;

        this.item = item;

        this.addChild(node);
    },

    playAnimJackpot(){
      if(this.animJackpot) {
          this.animJackpot.active = true;
          this.item.active = false;
      }
    },

    playAnimBonus(){
      if(this.animBonus) {
          this.animBonus.active = true;
          this.item.active = false;
      }
    },

    playAnimScatter(){
      if(this.animScatter) {
          this.animScatter.active = true;
          this.item.active = false;
      }
    },

    playAnimSpecialItem() {
      if(this.itemId === Slot20VO.ITEM_JACKPOT_ID) this.playAnimJackpot();
      else if(this.itemId === Slot20VO.ITEM_BONUS_ID) this.playAnimBonus();
      else if(this.itemId === Slot20VO.ITEM_SCATTER_ID) this.playAnimScatter();
    },

    stopAllAnim() {
      if(this.animJackpot) this.animJackpot.active = false;
      if(this.animBonus) this.animBonus.active = false;
      if(this.animScatter) this.animScatter.active = false;

      this.item.active = true;

    }

});

Slot20Icon.create = function(cardId, texture, itemPrefabs){
    var component = new Slot20Icon();
    component.initComponent(cardId, texture, itemPrefabs);
    return component;
};

module.exports = Slot20Icon;
