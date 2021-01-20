var BasePopup = require('BasePopup');
var TabUserInfo = require('TabUserInfo');
var TabChangePass = require('TabChangePass');
var UserProfileSceneMediator = require('UserProfileSceneMediator');

cc.Class({
    extends: BasePopup,

    properties: {
      pageUserInfo: TabUserInfo,
      pageChangePass: TabChangePass
    },

    ctor: function () {
      UserProfileSceneMediator.getInstance.init(this);
    },

    // use this for initialization
    onLoad: function () {
      this.hide();
      this.pageChangePass.node.on('ACTIVE_CHANGE_PASS', this.onActiveChangePass, this);
      this.pageUserInfo.node.on('ACTIVE_CHANGE_AVATAR', this.onActiveChangeAvatar, this);
      this.pageUserInfo.node.on('ACTIVE_PHONE_ACCOUNT_KIT', this.onActivePhoneAcounttKit, this);
    },

    show: function() {
      BasePopup.prototype.show.call(this);
      this.pageUserInfo.show();
    },

    onActiveChangeAvatar: function(params) {
      this.activeChangeAvatar(params);
    },

    onActivePhoneAcounttKit: function(params) {
      this.activePhoneAccountKit(params);
    },

    onUpdateUserInfoDetail: function (mySelf) {
      this.pageUserInfo.onUpdateUserInfoDetail(mySelf);
      this.pageUserInfo.updateSecurity(mySelf);
    },

    onActiveChangePass: function(params) {
      this.activeChangePass(params);
    },

    onUpdateAvatar: function(mySelf){
      this.pageUserInfo.updateAvatar(mySelf);
    },

});
