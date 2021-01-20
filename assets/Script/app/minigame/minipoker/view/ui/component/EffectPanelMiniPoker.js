var Utility = require('Utility');
var MiniPokerVO = require('MiniPokerVO');
var BasePopup = require('BasePopup');

cc.Class({
    extends: BasePopup,

    properties: {
      effBigWin: cc.Node,
      effJackpot: cc.Node,
      effWin: cc.Node,
      resultItem: [cc.SpriteFrame]
    },

    onLoad() {
      this.hide();
    },

    onShowEffectWin (gameVO) {
      switch (gameVO.typeResult){
           case MiniPokerVO.NORMAL_WIN:
               this.showNormalWin(gameVO.prize, gameVO.winType);
               break;
           case MiniPokerVO.BIG_WIN:
               this.showBigWin(gameVO.prize);
               break;
           case MiniPokerVO.JACKPOT_WIN:
               this.showNoHu(gameVO.jackpot);
               break;
           default:
               break;
       }
    },

    showNormalWin(prize, winType) {
      this.show();
      this.effBigWin.active = false;
      this.effJackpot.active = false;
      this.effWin.active = true;
      var resultType = this.effWin.getChildByName('resultType').getComponent(cc.Sprite);
      resultType.spriteFrame = this.resultItem[winType];
      var lbPrizeMoney = this.effWin.getChildByName('lbPrizeMoney').getComponent(cc.Label);
      lbPrizeMoney.string = "0";
      Utility.tweenRunNumber(lbPrizeMoney.node, prize, 1.5);
    },

    showBigWin(prize) {
      this.show();
      this.effWin.active = false;
      this.effJackpot.active = false;
      this.effBigWin.active = true;
      var lbPrizeMoney = this.effBigWin.getChildByName('lbPrizeMoney').getComponent(cc.Label);
      lbPrizeMoney.string = "0";
      Utility.tweenRunNumber(lbPrizeMoney.node, prize, 1.5);
    },

    showNoHu(prize) {
      this.show();
      this.effBigWin.active = false;
      this.effWin.active = false;
      this.effJackpot.active = true;
      var lbPrizeMoney = this.effJackpot.getChildByName('lbPrizeMoney').getComponent(cc.Label);
      lbPrizeMoney.string = "0";
      Utility.tweenRunNumber(lbPrizeMoney.node, prize, 1.5);
    },
});
