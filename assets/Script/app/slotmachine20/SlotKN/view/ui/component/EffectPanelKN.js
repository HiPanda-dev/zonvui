var Utility = require('Utility');
var Slot20VO = require('Slot20VO');

cc.Class({
    extends: cc.Component,

    properties: {
      lbPrizeMoney: cc.Label,
      mcJackpot:cc.Node,
      mcBigWin:cc.Node,
      mcFreeSpin:cc.Node,
    },

    onLoad() {
      this.hide();
    },

    show() {
      this.node.active = true;
    },

    hide() {
      this.node.active = false;
      this.mcJackpot.active = false;
      this.mcBigWin.active = false;
      this.mcFreeSpin.active = false;
    },

    onShowEffectWin (win) {
      if(win.jp > 0) {
         this.showNoHu(win.jp);
      }
    },

    onShowEffectFreeSpin(win) {
      if(win.fs > 0) {
        this.hide();
        this.show();
        var lbFreeSpin = this.mcFreeSpin.getChildByName('lbFreeSpin').getComponent(cc.Label);
        this.mcFreeSpin.active = true;
        lbFreeSpin.string = "0";
        Utility.tweenRunNumber(lbFreeSpin.node, win.fs, 0.5);
        TweenLite.from(this.mcFreeSpin, 0.3,{scaleX:0, scaleY:0});
      }
    },


    showNormalWin(prize) {
      this.hide();
      this.show();
      this.lbPrizeMoney.string = "0";
      Utility.tweenRunNumber(this.lbPrizeMoney.node, prize, 1.5);
    },

    showBigWin(prize) {
      this.hide();
      this.show();
      var lbBigWin = this.mcBigWin.getChildByName('lbBigWin').getComponent(cc.Label);
      var partical = this.mcBigWin.getChildByName('partical').getComponent(cc.ParticleSystem);
      partical.resetSystem();
      this.mcBigWin.active = true;
      this.lbPrizeMoney.string = "0";
      lbBigWin.string = "0";
      Utility.tweenRunNumber(this.lbPrizeMoney.node, prize, 1.5);
      Utility.tweenRunNumber(lbBigWin.node, prize, 1.5);
      TweenLite.from(this.mcBigWin, 0.3,{scaleX:0, scaleY:0});
    },

    showNoHu(prize) {
      this.hide();
      this.show();
      var lbJackpot = this.mcJackpot.getChildByName('lbJackpot').getComponent(cc.Label);
      var partical = this.mcJackpot.getChildByName('partical').getComponent(cc.ParticleSystem);
      partical.resetSystem();
      this.mcJackpot.active = true;
      this.lbPrizeMoney.string = "0";
      Utility.tweenRunNumber(this.lbPrizeMoney.node, prize, 1.5);
      Utility.tweenRunNumber(lbJackpot.node, prize, 1.5);
      // TweenLite.from(this.mcJackpot, 0.3,{scaleX:0, scaleY:0});
    },
});
