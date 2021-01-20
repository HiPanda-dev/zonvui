var BaseMediator = require('BaseMediator');
var LobbyMessage = require('LobbyMessage');
var GameMessage = require('GameMessage');
var UserProxy = require('UserProxy');
var Constants = require('Constants');
var i18n = require('i18n');
var MiniGameMessage = require('MiniGameMessage');
var LocalStorage = require('LocalStorage');

class TopMenuSceneMediator extends BaseMediator {
  static get NAME() {
    return 'TopMenuSceneMediator';
  }

  static get getInstance() {
    if(this.instance === undefined){
        this.instance = new TopMenuSceneMediator();
    }
    return this.instance;
  }

  onRegister() {
      puremvc.Mediator.call(this, this.constructor.NAME);
      this.dataUser = this.facade.retrieveProxy(UserProxy.NAME);
      this.fbProxy = this.facade.retrieveProxy('FacebookProxy');
      this.event = this.facade.retrieveProxy('EventProxy');
  }
  /** @override */
  listNotificationInterests() {
      return [
        LobbyMessage.SHOW_TOP_MENU,
        LobbyMessage.HIDE_TOP_MENU,
        LobbyMessage.ON_UPDATE_MY_INFO,
        LobbyMessage.SHOW_CHANNEL_SCENE,
        LobbyMessage.ON_UPDATE_AVATAR
      ]
  }

  /** @override */
  handleNotification(notification) {
    BaseMediator.prototype.handleNotification.call(this);
    switch (notification.getName()) {
        case LobbyMessage.SHOW_TOP_MENU:
            this.view.show();
            this.view.onUpdateUserInfo(this.dataUser.mySelf);
            break;
        case LobbyMessage.HIDE_TOP_MENU:
            this.view.hide();
            break;
        case LobbyMessage.SHOW_CHANNEL_SCENE:
            this.view.show();
            break;
        case LobbyMessage.ON_UPDATE_MY_INFO:
            this.view.onUpdateUserInfo(this.dataUser.mySelf);
            break;
        case LobbyMessage.ON_UPDATE_AVATAR:
            this.view.onUpdateAvatar(this.dataUser.mySelf);
            break;
        default:
            break;
    }
  }

  addHanlers() {
    BaseMediator.prototype.addHanlers.call(this);
    this.view.activeShowEvent = this.activeShowEvent.bind(this);
    this.view.activeShowGift = this.activeShowGift.bind(this);
    this.view.activeShowGiftCode = this.activeShowGiftCode.bind(this);
    this.view.onHandlerShowCashOutForm = this.onHandlerShowCashOutForm.bind(this);
    this.view.onHandlerShowCashInForm = this.onHandlerShowCashInForm.bind(this);
    this.view.activeShowSetting = this.activeShowSetting.bind(this);
    this.view.activeShowMail = this.activeShowMail.bind(this);
    this.view.activeShowAgent = this.activeShowAgent.bind(this);
    this.view.activeShowUserProfile = this.activeShowUserProfile.bind(this);
    this.view.activeDailyEvent = this.activeDailyEvent.bind(this);
    this.view.activeShowSupportMail = this.activeShowSupportMail.bind(this);
    this.view.activeShowFanpage = this.activeShowFanpage.bind(this);
    this.view.activeShowGuide = this.activeShowGuide.bind(this);
    this.view.activeShowRules = this.activeShowRules.bind(this);
    this.view.activeVeGiai = this.activeVeGiai.bind(this);
    this.view.activeTop100 = this.activeTop100.bind(this);
    this.view.activeNhiemVu = this.activeNhiemVu.bind(this);
  }

  activeVeGiai() {
    this.sendNotification(LobbyMessage.SHOW_FLY_ALERT,{content:i18n.t("C0212")});
  }

  activeTop100() {
    this.sendNotification(LobbyMessage.SHOW_FLY_ALERT,{content:i18n.t("C0212")});
  }

  activeNhiemVu() {
    this.sendNotification(LobbyMessage.SHOW_FLY_ALERT,{content:i18n.t("C0212")});
  }

  activeShowEvent() {
      this.sendNotification(LobbyMessage.SHOW_EVENT_SCENE);
  }

  activeShowGift() {
      this.sendNotification(LobbyMessage.SHOW_GIFT_SCENE);
  }

  activeShowGiftCode() {
    if (!this.isLogin("C0052")) return;
    this.sendNotification(LobbyMessage.SHOW_GIFTCODE_SCENE);
  }

  onHandlerShowCashOutForm() {
    if (!this.isLogin("C0052")) return;
    this.sendNotification(LobbyMessage.SHOW_TAB_IN_SHOP_SCENE, {tabIndex:1});
  }

  onHandlerShowCashInForm() {
    if (!this.isLogin("C0052")) return;
    this.sendNotification(LobbyMessage.SHOW_TAB_IN_SHOP_SCENE, {tabIndex:0});
  }

  activeShowSetting() {
      this.sendNotification(LobbyMessage.SHOW_SETTING_SCENE);
  }

  activeShowMail() {
    if (!this.isLogin("C0052")) return;
    this.sendNotification(LobbyMessage.SHOW_MAIL_SCENE);
  }

  activeShowSupportMail() {
    if (!this.isLogin("C0052")) return;
    this.sendNotification(LobbyMessage.SHOW_SUPPORT_MAIL_SCENE);
  }

  activeShowFanpage() {
    if (!this.isLogin("C0052")) return;
  }

  activeShowGuide() {
    this.sendNotification(LobbyMessage.SHOW_GUIDE_SCENE);
  }

  activeShowUserProfile() {
    if (!this.isLogin("C0052")) return;
    this.sendNotification(LobbyMessage.SHOW_USER_PROFILE_SCENE);
  }

  activeShowAgent() {
    this.sendNotification(LobbyMessage.SHOW_AGENT_SCENE);
  }

  activeDailyEvent() {
    if (this.event.eventDailyList.length !== 0)
        this.sendNotification(LobbyMessage.SHOW_STARTGAME_POPUP_SCENE);
  }

  activeShowRules(){
    this.sendNotification(LobbyMessage.SHOW_RULES_SCENE);
  }

}

module.exports = TopMenuSceneMediator;
