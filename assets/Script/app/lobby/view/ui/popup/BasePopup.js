var BaseScene = require('BaseScene');

cc.Class({
    extends: BaseScene,

    properties: {},

    ctor: function () {

    },

    // use this for initialization
    onLoad: function () {
    },

    show:function () {
      if(this.curScale === undefined) this.curScale = (this.node.scale===0)?1:this.node.scale;
      if(this.node.active === true) return;
      BaseScene.prototype.show.call(this);
      if(this.node.popupScene) {
          this.node.popupScene.show();
      }

      this.getTweenNode().scaleX = this.getTweenNode().scaleY = this.curScale;
      this.getTweenNode().opacity = 255;
      // TweenLite.from(this.getTweenNode(), 0.3, {scaleX:0, scaleY:0, ease:Back.easeOut.config(1.2)});
      TweenLite.from(this.getTweenNode(), 0.3, {scaleX:0, scaleY:0});
      TweenLite.from(this.getTweenNode(), 0.3, {opacity: 0});
    },

    getTweenNode:function () {
        return this.node;
    },

    hide:function () {
        if(this.node === undefined) return;
        if(this.node.active === false) return;

        TweenLite.to(this.getTweenNode(), 0.3, {opacity: 0});
        TweenLite.to(this.getTweenNode(), 0.3, {scaleX:0, scaleY:0, onComplete:function () {
                BaseScene.prototype.hide.call(this);
                if(this.node.popupScene) {
                    this.node.popupScene.hide();
                }
            }.bind(this)});
    }

});
