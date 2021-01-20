var BaseScene = require('BaseScene');
var LocalStorage = require('LocalStorage');
var LoginSceneMediator = require('LoginSceneMediator');
var EditboxLocalized = require('EditboxLocalized');

cc.Class({
    extends: BaseScene,

    properties: {
        loginPanel1: cc.Node,
        loginPanel2: cc.Node,
        btnBack:cc.Node,
    },

    // use this for initialization
    onLoad: function () {
        LoginSceneMediator.getInstance.init(this);
        this.setInputControl();
        if(cc.sys.isBrowser && !cc.sys.isMobile){
            this.login = this.loginPanel1;
            this.loginPanel1.active = true;
            this.loginPanel2.active = false;
        }
        else {
            this.login = this.loginPanel2;
            this.loginPanel1.active = false;
            this.loginPanel2.active = true;
        }


        this.login.getChildByName("txtUserName").getChildByName("txtInput").getChildByName("PLACEHOLDER_LABEL").active = true;
        this.login.getChildByName("txtPassword").getChildByName("txtInput").getChildByName("PLACEHOLDER_LABEL").active = true;
    },


    hanlerEventLogin: function () {
        this.txtUserName = this.login.getChildByName("txtUserName");
        this.txtPassWord = this.login.getChildByName("txtPassword");
        var userName = this.txtUserName.getChildByName("txtInput").getComponent(EditboxLocalized).string;
        var password = this.txtPassWord.getChildByName("txtInput").getComponent(EditboxLocalized).string;

        this.activeLogin({userName: userName, password: password});
    },

    hanlerExitGame:function () {
        this.sendNotification(LobbyMessage.SHOW_ALERT_WITH_CONFIRM, {
            content: message,
            acceptLabel: i18n.t("C0054"),
            callback: function () {
                cc.game.end();
            }
        });
    },

    setUserName: function (username) {
        var txtUsername = this.login.getChildByName("txtUserName") .getChildByName("txtInput").getComponent(EditboxLocalized);
        txtUsername.string = username;
    },

    setPassword: function (password) {
        var txtPassWord = this.login.getChildByName("txtPassword").getChildByName("txtInput").getComponent(EditboxLocalized);
        txtPassWord.string = password;
    },

    updateData: function (userName, password) {
        this.setUserName(userName);
        this.setPassword(password);
    },


    setInputControl: function () {
        var self = this;
        // add keyboard event listener
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed: function (keyCode, event) {
                switch (keyCode) {
                    case cc.KEY.enter:
                        self.hanlerEventLogin();
                        break;
                }
            },
            onKeyReleased: function (keyCode, event) {
                switch (keyCode) {
                    default:
                        break;
                }
            }
        }, self.node);
    },


    hanlerEventChangeRememberPass: function () {

    },

    hanlerEventRegister: function () {
      this.activeShowRegister();
    },

    hanlerEventLoginFB: function () {
      this.activeLoginFB();
    },

    hanlerEventForGetPassWord: function () {
      this.activeForGetPassWord();
    },

    hanlerEventPlayNow: function () {

    },
});
