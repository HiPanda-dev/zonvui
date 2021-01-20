var BasePopup = require('BasePopup');
var EditboxLocalized = require('EditboxLocalized');
var GiftCodeSceneMediator = require('GiftCodeSceneMediator');

cc.Class({
    extends: BasePopup,

    properties: {
        mcGiftCode: cc.Node,
        mcComplete: cc.Node,
    },

    ctor: function () {
      GiftCodeSceneMediator.getInstance.init(this);
    },

    // use this for initialization
    onLoad: function () {
      this.hide();
      this.captcha = this.mcGiftCode.getChildByName('captcha').getComponent('Captcha');
      this.txtGiftCode = this.mcGiftCode.getChildByName('txtGiftCode').getChildByName('txtInput').getComponent(EditboxLocalized);
      this.txtCaptcha = this.mcGiftCode.getChildByName('txtCaptcha').getChildByName('txtInput').getComponent(EditboxLocalized);

      this.txtGiftMoney = this.mcComplete.getChildByName('txtGiftMoney').getComponent(cc.Label);
    },

    show: function () {
      BasePopup.prototype.show.call(this);
      this.mcGiftCode.active = true;
      this.mcComplete.active = false;
      this.resetFormGiftCode();
    },

    onHandlerUseGiftCode: function () {
      this.activeUseGiftCode({giftCode: this.txtGiftCode.string, captcha: this.txtCaptcha.string});
      this.resetFormGiftCode();
    },

    onShowGiftCodeComplete: function(money) {
      this.mcGiftCode.active = false;
      this.mcComplete.active = true;
      this.txtGiftMoney.string = money;
    },

    resetFormGiftCode: function() {
      this.txtGiftCode.string = "";
      this.txtCaptcha.string = "";
      this.captcha.refeshCaptcha();
    }
});
