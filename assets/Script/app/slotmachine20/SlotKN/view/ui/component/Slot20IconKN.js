var Slot20VO = require('Slot20VO');
var Slot20IconKN = cc.Class({
    extends: cc.Node,
    ctor: function () {
    },

    initComponent: function (itemId, texture, itemPrefabs) {
        this.itemId = itemId;
        var node = cc.instantiate(itemPrefabs);
        var item  = node.getChildByName("item");
        var effect = node.getChildByName("effect");
        var animJackpot = node.getChildByName("animJackpot");
        var animScatter = node.getChildByName("animScatter");
        this.rigidBody = node.getComponent(cc.RigidBody);
        this.bg = node.getChildByName("bg");
        this.rootPos = new cc.Vec2();
        effect.active = false;
        this.effect = effect.getComponent(cc.Animation);
        this.sprite = item.getComponent(cc.Sprite);
        this.sprite.spriteFrame = texture;

        this.animJackpot = animJackpot;
        this.animJackpot.active = false;

        this.animScatter = animScatter;
        this.animScatter.active = false;

        if(this.itemId === Slot20VO.ITEM_JACKPOT_ID) animJackpot.removeFromParent();
        if(this.itemId === Slot20VO.ITEM_SCATTER_ID) animScatter.removeFromParent();

        this.node = node;
        this.item = item;
        this.addChild(node);
    },

    setDynamicType() {
      if(this.rigidBody) {
        this.rigidBody.type = cc.RigidBodyType.Dynamic;
      }
    },

    setY(value) {
      this.node.y = value;
      this.rootPos.y = value;

    },

    setX(value) {
      this.node.x = value;
      this.rootPos.x = value;
      // this.timer = setInterval(function() {
      //   // this.node.x = this.rootPos.x;
      // }.bind(this), 10);
    },

    destroyAll() {
      clearInterval(this.timer);
      this.destroy();
    },

    playAnimJackpot(){
      if(this.animJackpot) {
          this.animJackpot.active = true;
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
      else if(this.itemId === Slot20VO.ITEM_SCATTER_ID) this.playAnimScatter();
    },

    playAnim() {
      this.stopAllAnim();
      this.effect.node.active = true;
      this.bg.active = false;
      this.effect.play();

      setTimeout(function(){
        this.sprite.node.active = false;
      }.bind(this), 650);
    },

    stopAllAnim() {
      if(this.animJackpot) this.animJackpot.active = false;
      // if(this.animBonus) this.animBonus.active = false;
      if(this.animScatter) this.animScatter.active = false;
      //
      this.item.active = true;

    },

    // update (dt) {
    //   this.node.x = this.rootPos.x;
    //   console.log("this.itemId " + this.itemId + " x:" + this.node.x);
    // }

});

Slot20IconKN.create = function(cardId, texture, itemPrefabs){
    var component = new Slot20IconKN();
    component.initComponent(cardId, texture, itemPrefabs);
    return component;
};

module.exports = Slot20IconKN;
