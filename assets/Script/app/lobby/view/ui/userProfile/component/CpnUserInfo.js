var Avatar = require('Avatar');
var Utility = require('Utility');
var i18n = require('i18n');
var Constants = require('Constants');
var LabelLocalized = require('LabelLocalized');
cc.Class({
    extends: cc.Component,

    properties: {
      txt_displayName:cc.Label,
      txt_level:cc.Label,
      txt_id:cc.Label,
      txt_vip:cc.Label,
      txtKichHoat:cc.Node,
      txtKichHoatNote:cc.Node,
      btnKichHoat:cc.Node,
      contentAchievements: cc.Node,
      contentInfo:cc.Node,
    },

    onLoad: function () {
      this.txt_displayName.string = '';
      this.txt_level.string = '';
      this.txt_id.string = '';
      this.txt_vip.string = '';
      this.selectAvatarId = 1;
      this.itemAchievements = this.contentAchievements.children[0];
      this.mcAvatarInfo = this.node.getChildByName('mcAvatar');
      if(this.mySelf) {
        this.updateAvatar(this.mySelf);
        this.onUpdateUserInfoDetail(this.mySelf);
        this.updateSecurity(this.mySelf);
      }
    },

    onUpdateUserInfoDetail: function(mySelf) {
      this.txt_displayName.string = mySelf.displayName;
      this.txt_level.string = 'Lv: ' + mySelf.vip;
      this.txt_id.string = 'ID: ' + mySelf.id;
      this.txt_vip.string = Utility.setText(i18n.t("C0089"), [mySelf.vip]) ;
      //this.updateAchievements(mySelf.listAchievements);
    },

    updateAchievements: function(listAchievements){
      if(!this.itemAchievements) {
          this.onLoad();
      }
      this.contentAchievements.removeAllChildren();
      var txtName, txtLevel, txtWin, txtLose, item;
      for (var i = 0; i < listAchievements.length; i++) {
        if (this.itemAchievements === undefined) continue;
        item = cc.instantiate(this.itemAchievements);
        txtName = item.getChildByName("txt_name").getComponent(cc.Label);
        txtLevel = item.getChildByName("txt_level").getComponent(cc.Label);
        txtWin = item.getChildByName("txt_win").getComponent(cc.Label);
        txtLose = item.getChildByName("txt_lose").getComponent(cc.Label);

        txtName.string = listAchievements[i].name;
        txtLevel.string = listAchievements[i].level;
        txtWin.string = listAchievements[i].win;
        txtLose.string = listAchievements[i].lose;

        this.contentAchievements.addChild(item);
      }
    },

    show(){
      this.node.active = true;
    },

    hide(){
      this.node.active = false;
    },

    updateSecurity(mySelf) {
      this.txtKichHoat.active = mySelf.security;
      this.txtKichHoatNote.active = !mySelf.security;
      this.btnKichHoat.active = !mySelf.security;
    },

    updateAvatar(mySelf) {
      this.mySelf = mySelf;
      if(this.mcAvatarInfo) this.mcAvatarInfo.getComponent('Avatar').updateAvatarId(mySelf.avatar);
    },

    onHandlerShowChangeAvatar(){
      this.node.emit('SHOW_CHANGE_AVATAR');
    },

    onHandlerShowSecurityForm(){
      this.node.emit('SHOW_SECURITY_FORM');
    }
});
