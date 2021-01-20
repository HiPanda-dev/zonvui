cc.Class({
    extends: cc.Component,

    properties: {
      lbMessage: cc.Label
    },
   onLoad () {
     this.curPos = new cc.Vec2(this.node.x, this.node.y);
   },

    onShowMessage(message) {
      this.node.stopAllActions();
      this.node.opacity = 255;
      this.node.scale = 1;
      this.node.y = this.curPos.y;
      this.lbMessage.string = message;

      var callFunc = cc.callFunc(function() {
          TweenLite.from(this.node, 0.5, {y: this.curPos.y-100, opacity:0});
      }.bind(this));

      this.node.runAction(cc.sequence(callFunc , cc.delayTime(4) , cc.fadeOut(0.5)));
    }
});
