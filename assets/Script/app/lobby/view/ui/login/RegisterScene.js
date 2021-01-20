var BaseScene = require('BaseScene');
var RegisterSceneMediator = require('RegisterSceneMediator');
var i18n = require('i18n');
var GameConfig = require('GameConfig');
var Captcha = require('Captcha');

cc.Class({
    extends: BaseScene,

    properties: {
        txtUserName: cc.EditBox,
        txtDisplayName: cc.EditBox,
        txtPassword: cc.EditBox,
        txtCaptcha: cc.EditBox,
        txtError: cc.Label,
        mcCaptcha: Captcha,
    },

    ctor: function() {
      RegisterSceneMediator.getInstance.init(this);
    },

    // use this for initialization
    onLoad: function () {
        this.curPosX = this.node.x;
        this.hide();
    },

    show: function () {
        BaseScene.prototype.show.call(this, BaseScene.FADE_IN_RIGHT);
        this.txtUserName.string = "";
        this.txtPassword.string = "";
        this.txtDisplayName.string = "";
        this.mcCaptcha.refeshCaptcha();

    },

    hide: function() {
      BaseScene.prototype.hide.call(this, BaseScene.FADE_OUT_RIGHT);
    },

    handlerLoginFacebook: function () {
        this.activeLoginFB();
    },

    handlerEventRegister: function () {
        var data = {
            userName: this.txtUserName.string,
            password: this.txtPassword.string,
            captcha: this.txtCaptcha.string,
            displayName: this.txtDisplayName.string
        };

        this.activeRegister(data);
        this.txtCaptcha.string = "";
        setTimeout(function(){
          this.mcCaptcha.refeshCaptcha();
        }.bind(this), 1000);
    },

    handlerEventShowLogin: function () {
        this.activeShowLoginScene();
    },

    onHandleSupportClick: function () {
        var url = GameConfig.POLICY;
        this.activeShowWebViewPopup(url);
    }

});
