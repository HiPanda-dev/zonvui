var BaseScene = require('BaseScene');
var LocalStorage = require('LocalStorage');
var ForgetPasswordMediator = require('ForgetPasswordMediator');

cc.Class({
    extends: BaseScene,

    properties: {
      txtUserName:cc.Label,
      txtOTP:cc.Label,
      txtPassWord:cc.Label,
      txtCaptcha:cc.Label,
    },

    // use this for initialization
    ctor: function() {
      ForgetPasswordMediator.getInstance.init(this);
    },
    onLoad: function () {
        this.hide();
    },

    show: function () {
      BaseScene.prototype.show.call(this, BaseScene.FADE_IN_RIGHT);
    },

    hide: function() {
      BaseScene.prototype.hide.call(this, BaseScene.FADE_OUT_RIGHT);
    },
});
