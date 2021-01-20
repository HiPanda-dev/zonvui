var CpnUserInfo = require('CpnUserInfo');
var CpnChangeAvatar = require('CpnChangeAvatar');
cc.Class({
    extends: cc.Component,

    properties: {
      cpnUserInfo:CpnUserInfo,
      cpnChangeAvatar:CpnChangeAvatar,
    },

    // use this for initialization
    onLoad: function () {
      this.cpnUserInfo.node.on('SHOW_CHANGE_AVATAR', this.onShowChangeAvatar, this);
      this.cpnChangeAvatar.node.on('ACTIVE_CHANGE_AVATAR', this.onActiveChangeAvatar, this);
    },

    show: function(){
      this.cpnUserInfo.show();
      this.cpnChangeAvatar.hide();
    },

    onShowChangeAvatar: function() {
      this.cpnUserInfo.hide();
      this.cpnChangeAvatar.show();
    },

    onActivePhoneAcounttKit: function() {
      if (cc.sys.isBrowser) {
          ga('send', 'event', 'Click xác thực SĐT');
      }
      this.node.emit('ACTIVE_PHONE_ACCOUNT_KIT');
    },

    onActiveChangeAvatar: function(params) {
      this.node.emit('ACTIVE_CHANGE_AVATAR', params);
      this.cpnUserInfo.show();
      this.cpnChangeAvatar.hide();
    },

    updateSecurity(mySelf) {
        this.cpnUserInfo.updateSecurity(mySelf);
    },


    onUpdateUserInfoDetail: function(mySelf) {
      this.cpnUserInfo.onUpdateUserInfoDetail(mySelf);
    },

    updateAvatar: function(mySelf) {
      this.cpnUserInfo.updateAvatar(mySelf);
      this.cpnChangeAvatar.updateAvatar(mySelf);
    },
});
