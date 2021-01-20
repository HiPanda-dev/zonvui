cc.Class({
    extends: cc.Component,

    properties: {
      lbMessage: cc.Label
    },
    // onLoad () {},

    onShowMessage(message) {
      this.node.stopAllActions();
      this.node.opacity = 255;
      this.node.scale = 1;
      this.lbMessage.string = message;

      var callFunc = cc.callFunc(function() {
          TweenLite.from(this.node, 0.2, {scaleX: 0, scaleY: 0});
      }.bind(this));

      this.node.runAction(cc.sequence(callFunc , cc.delayTime(4) , cc.fadeOut(0.5)));
    }
});
