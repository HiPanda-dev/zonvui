var BaseScene = require('BaseScene');
var TopMenuSceneMediator = require('TopMenuSceneMediator');
var GameConfig = require('GameConfig');
var Avatar = require('Avatar');
var Utility = require('Utility');
var i18n = require('i18n');

cc.Class({
    extends: BaseScene,

    properties: {
        groupTop1:cc.Node,
        groupTop2:cc.Node,
        groupBottom1:cc.Node,
        groupBottom2:cc.Node,
    },

    show:function () {
        this.groupTop.active = true;
        this.node.x = (this._rootPos)?this._rootPos.x:this.node.x;
        this.node.opacity = 256;
        this.groupTop.y = this.curPosTop.y;
        TweenLite.from(this.groupTop, 0.3, {y:this.curPosTop.y + 200});
    },

    hide:function () {
        this.groupTop.active = false;
    },

    // use this for initialization
    onLoad: function () {
        TopMenuSceneMediator.getInstance.init(this);
        if(cc.sys.isBrowser && !cc.sys.isMobile){
            this.groupTop = this.groupTop1;
            this.groupBottom1.active = true;
            this.groupBottom2.active = false;
            this.groupTop1.active = true;
            this.groupTop2.active = false;
        }
        else {
            this.groupTop = this.groupTop2;
            this.groupBottom1.active = false;
            this.groupBottom2.active = true;
            this.groupTop1.active = false;
            this.groupTop2.active = true;
        }
        // this.txtHotLine.string = GameConfig.HOT_LINE;
        this.curPosTop = new cc.Vec2(this.groupTop.x, this.groupTop.y);
        this.txtUserName = this.groupTop.getChildByName('mcInfo').getChildByName('txtName').getComponent(cc.Label);
        this.txtMoney = this.groupTop.getChildByName('mcInfo').getChildByName('txtMoney').getComponent(cc.Label);
        this.txtLevel = this.groupTop.getChildByName('mcInfo').getChildByName('txtLevel').getComponent(cc.RichText);
        this.mcAvatar = this.groupTop.getChildByName('mcInfo').getChildByName('mcAvatar');
        this.avatar = this.groupTop.getChildByName('mcInfo').getChildByName('mcAvatar').getComponent('Avatar');
        this.processBarVip = this.groupTop.getChildByName('mcInfo').getChildByName('progressBarVip').getComponent(cc.ProgressBar)
        this.hide();
    },

    onHanlerBackClick: function () {
        this.activeBack();
    },

    onUpdateUserInfo: function (mySelf) {
        this.txtUserName.string = mySelf.alias;
        // this.txtMoney.string =  Utility.formatCurrency(mySelf.money);
        Utility.tweenRunNumber(this.txtMoney.node, mySelf.money, 1);
        this.txtLevel.string = "Lv:" + mySelf.vip;
        this.avatar.updateImg(mySelf.avatar);
        this.processBarVip.progress = mySelf.getPercentVip();
    },

    onUpdateAvatar:function (mySelf) {
        this.avatar.updateAvatarId(mySelf.avatar);
    },

    onHandlerShowGiftForm: function () {
        this.activeShowGift();
    },

    onHandlerShowGiftCodeForm: function () {
        this.activeShowGiftCode();
    },

    onHandlerShowCashOutForm: function () {
        this.onHandlerShowCashOutForm();
    },

    onHandlerShowSupportMailForm: function () {
        this.activeShowSupportMail();
    },

    onHandlerShowCashInForm: function () {
        this.onHandlerShowCashInForm();
    },

    onHandlerShowSettingForm: function () {

        this.activeShowSetting();
    },

    onHandlerShowMailForm: function () {
        this.activeShowMail();
    },

    onHandlerShowUserProfileForm: function () {
        this.activeShowUserProfile();
    },

    onHandlerShowGuideForm: function () {
        this.activeShowGuide();
    },

    onHandlerShowEventForm: function () {
        this.activeShowEvent();
    },

    onHandlerShowAgentForm: function () {
        this.activeShowAgent();
    },

    onHandlerDailyEvent: function () {
        this.activeDailyEvent();
    },

    onHandlerFanpage: function () {
        this.activeShowFanpage();
    },

    onHandlerShowRules: function() {
      this.activeShowRules();
    },

    onHandlerVeGiai: function() {
      this.activeVeGiai();
    },

    onHandlerTop100: function() {
      this.activeTop100();
    },

    onHandlerNhiemVu: function() {
      this.activeNhiemVu();
    },

    onHandlerHotLine: function () {
    },

    onHandlerEvent: function () {
    },

});
