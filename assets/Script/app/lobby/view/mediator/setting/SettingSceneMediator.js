var BaseMediator = require('BaseMediator');
var LobbyMessage = require('LobbyMessage');
var SoundGameMessage = require('SoundGameMessage');
var MiniGameMessage = require('MiniGameMessage');
var LocalStorage = require('LocalStorage');
var Constants = require('Constants');
var UserProxy = require('UserProxy');
var SlotMessage = require('SlotMessage');
var i18n = require('i18n');

class SettingSceneMediator extends BaseMediator {
  static get NAME() {
    return 'SettingSceneMediator';
  }

  static get getInstance() {
    if(this.instance === undefined){
        this.instance = new SettingSceneMediator();
    }
    return this.instance;
  }

  onRegister() {
      puremvc.Mediator.call(this, this.constructor.NAME);
      this.dataUser = this.facade.retrieveProxy(UserProxy.NAME);
      this.fbProxy = this.facade.retrieveProxy('FacebookProxy');
      this.event = this.facade.retrieveProxy('EventProxy');
      this.socket = this.facade.retrieveProxy('SCLobbyProxy');
  }
  /** @override */
  listNotificationInterests() {
      return [
        LobbyMessage.SHOW_SETTING_SCENE,
        LobbyMessage.HIDE_SETTING_SCENE,
        LobbyMessage.LOG_OUT,
      ]
  }

  /** @override */
  handleNotification(notification) {
    BaseMediator.prototype.handleNotification.call(this);
    switch (notification.getName()) {
        case LobbyMessage.SHOW_SETTING_SCENE:
            this.view.show();
            break;
        case LobbyMessage.HIDE_SETTING_SCENE:
            this.view.hide();
            break;
        case LobbyMessage.LOG_OUT:
            this.logout();
            break;
        default:
            break;
    }
  }

  addHanlers() {
    BaseMediator.prototype.addHanlers.call(this);
    this.view.activePlayBackgroundSound = this.activePlayBackgroundSound.bind(this);
    this.view.activeLogout = this.activeLogout.bind(this);
    this.view.activeShowCashOut = this.activeShowCashOut.bind(this);
    this.view.activeShowUserProfile = this.activeShowUserProfile.bind(this);
    this.view.activeShowTranferdes = this.activeShowTranferdes.bind(this);
    this.view.activeShowHistoryTranfer = this.activeShowHistoryTranfer.bind(this);
    this.view.activeShowMail = this.activeShowMail.bind(this);
    this.view.activeShowGiftCode = this.activeShowGiftCode.bind(this);
  }

  activePlayBackgroundSound(isMusicOn) {
    if(isMusicOn)
      this.sendNotification(LobbyMessage.PLAY_BACKGROUND_MUSIC, {soundName: SoundGameMessage.LOBBY_SOUND, volume: 1});
    else
      this.sendNotification(LobbyMessage.STOP_BACKGROUND_MUSIC);
  }

  activeShowCashOut() {
      this.sendNotification(LobbyMessage.SHOW_TAB_IN_SHOP_SCENE, {tabIndex:1});
  }

  activeShowUserProfile() {
      this.sendNotification(LobbyMessage.SHOW_USER_PROFILE_SCENE);
  }

  activeShowTranferdes() {
      this.sendNotification(LobbyMessage.SHOW_TAB_IN_SHOP_SCENE, {tabIndex:2});
  }

  activeShowMail() {
      this.sendNotification(LobbyMessage.SHOW_MAIL_SCENE);
  }

  activeShowGiftCode() {
      this.sendNotification(LobbyMessage.SHOW_GIFTCODE_SCENE);
  }

  activeShowHistoryTranfer() {
      this.sendNotification(LobbyMessage.SHOW_HISTORY_TRANFER_SCENE);
  }

  activeLogout() {
    this.sendNotification(LobbyMessage.SHOW_ALERT_WITH_CONFIRM, {
        content: i18n.t("C0054"),
        acceptLabel: i18n.t("C0123"),
        callback: function () {
            this.logout();
        }.bind(this)
    });
  }

  logout() {
    switch (Constants.CURRENT_SCENE) {
        case Constants.GAME_SELECT:
            this.sendNotification(LobbyMessage.SHOW_LOGIN_SCENE);
            this.sendNotification(LobbyMessage.SHOW_SELECT_GAME_SCENE);
            this.sendNotification(LobbyMessage.SHOW_EVENT_BANNER_SCENE);
            this.sendNotification(LobbyMessage.HIDE_TOP_MENU);
            this.sendNotification(LobbyMessage.HIDE_BOTTOM_MENU);
            this.sendNotification(LobbyMessage.ON_RESET_MYSELF);
            this.sendNotification(LobbyMessage.UPDATE_LOGIN_SCENE, {userName: "", password: ""});
            this.sendNotification(MiniGameMessage.DISCONNECT_ALL_MINIGAME);
            this.sendNotification(SlotMessage.SEND_LEAVE_ROOM_LUCKY_CAFE);
            LocalStorage.setIsSocial(-1);
            LocalStorage.setToken('');
            this.socket.logout();
            break;
        case Constants.GAME_CHANNEL:
            // this.sendNotification(LobbyMessage.SHOW_SELECT_GAME_SCENE);
            // this.sendNotification(LobbyMessage.SHOW_EVENT_BANNER_SCENE);
            // this.sendNotification(LobbyMessage.HIDE_CHANNEL_SCENE);
            // this.sendNotification(LobbyMessage.HIDE_CHAT_SCENE);
            // this.sendNotification(LobbyMessage.SEND_LEAVE_CHANNEL);
            // this.sendNotification(GameMessage.DESTROY_GAME);
            break;
    }
  }

}

module.exports = SettingSceneMediator;
