var Avatar = require('Avatar');
var Utility = require('Utility');
var i18n = require('i18n');
var Constants = require('Constants');
cc.Class({
    extends: cc.Component,

    properties: {
      mcAvatarChange:cc.Node
    },

    onLoad: function () {
      if(this.mySelf) this.updateAvatar(this.mySelf);
    },

    show(){
      this.node.active = true;
    },

    hide(){
      this.node.active = false;
    },

    onHandlerUpdateAvatar: function(event) {
      var name = event.target.name;
      var id = name.replace('btnAvatar', '');
      this.selectAvatarId = parseInt(id);;
      this.mcAvatarChange.getComponent('Avatar').updateAvatarId(id);
    },

    onHandlerChangeAvatar: function() {
      Constants.CUR_AVATAR = this.selectAvatarId;
      this.node.emit('ACTIVE_CHANGE_AVATAR', {avatarId: this.selectAvatarId});
    },

    updateAvatar(mySelf) {
      this.mySelf = mySelf;
      if(this.mcAvatarChange) this.mcAvatarChange.getComponent('Avatar').updateAvatarId(mySelf.avatar);
    },

});
