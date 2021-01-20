var BasePopup = require('BasePopup');
var SettingSceneMediator = require('SettingSceneMediator');
var GameConfig = require('GameConfig');
var LocalStorage = require('LocalStorage');

cc.Class({
    extends: BasePopup,

    properties: {
        btnLangEn:cc.Node,
        btnLangVi:cc.Node,
        btnMusic:cc.Node,
    },

    ctor: function () {
      SettingSceneMediator.getInstance.init(this);
    },

    // use this for initialization
    onLoad: function () {
        this.addEventListeners();
        this.hide();
        var lang = LocalStorage.getLanguage();
        if(lang === 'en') {
          this.btnLangVi.active = true;
          this.btnLangEn.active = false;
        }else{
          this.btnLangVi.active = false;
          this.btnLangEn.active = true;
        }

        this.labelOn = this.btnMusic.getChildByName('labelOn');
        this.labelOff = this.btnMusic.getChildByName('labelOff');
        this.isMusicOn = JSON.parse(LocalStorage.getMusic());
        this.labelOn.active = !this.isMusicOn;
        this.labelOff.active = this.isMusicOn;
    },

    addEventListeners: function () {

    },

    removeEventListeners: function () {

    },

    onHandleMusicClick: function () {
      this.isMusicOn = !this.isMusicOn;
      this.labelOn.active = !this.isMusicOn;
      this.labelOff.active = this.isMusicOn;
      LocalStorage.setMusic(this.isMusicOn);
      this.activePlayBackgroundSound(this.isMusicOn);
    },

    onHandlerShowUserProfile() {
      this.activeShowUserProfile();
      this.hide();
    },

    onHandlerShowHistoryTranfer() {
        this.activeShowHistoryTranfer();
        this.hide();
    },

    onHandlerShowCashOut() {
      this.activeShowCashOut();
      this.hide();
    },

    onHandlerShowTranferdes() {
      this.activeShowTranferdes();
      this.hide();
    },

    onHandlerLogout() {
      this.activeLogout();
      this.hide();
    },

    onHandlerShowMail() {
      this.activeShowMail();
      this.hide();
    },

    onHandlerGiftCode() {
      this.activeShowGiftCode();
      this.hide();
    },

    onHandlerChooseEnglishLanguage() {
      var lang = LocalStorage.getLanguage();
      LocalStorage.setLanguage('en');
      // TweenLite.killAll(false, false, true);
      window.location.reload(false);
    },

    onHandlerChooseVietNamLanguage() {
      var lang = LocalStorage.getLanguage();
      LocalStorage.setLanguage('vi');
      // TweenLite.killAll(false, false, true);
      window.location.reload(false);
    },

    onHandleBackClick: function () {
        // this.btn_back.active = false;
    },

    show:function () {
        BasePopup.prototype.show.call(this);

        // var soundOn = LocalStorage.getSound();
        // var musicOn = LocalStorage.getMusic();
        //
        // this.toggle_sound.isChecked = (soundOn === "false")?true:false;
        // this.toggle_music.isChecked = (musicOn === "false")?true:false;
    },
});
