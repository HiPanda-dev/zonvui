var BaseMediator = require('BaseMediator');
var LobbyMessage = require('LobbyMessage');
var UserProxy = require('UserProxy');

class UserProfileSceneMediator extends BaseMediator {
  static get NAME() {
    return 'UserProfileSceneMediator';
  }

  static get getInstance() {
    if(this.instance === undefined){
        this.instance = new UserProfileSceneMediator();
    }
    return this.instance;
  }

  onRegister() {
      puremvc.Mediator.call(this, this.constructor.NAME);
      this.userProxy = this.facade.retrieveProxy('UserProxy');
  }
  /** @override */
  listNotificationInterests() {
      return [
        LobbyMessage.SHOW_USER_PROFILE_SCENE,
        LobbyMessage.HIDE_USER_PROFILE_SCENE,
        LobbyMessage.ON_UPDATE_USER_INFO_DETAIL,
        LobbyMessage.ON_UPDATE_AVATAR,
        LobbyMessage.SHOW_FORM_OTP_USER_INFO,
      ]
  }

  /** @override */
  handleNotification(notification) {
    BaseMediator.prototype.handleNotification.call(this);
    switch (notification.getName()) {
        case LobbyMessage.SHOW_USER_PROFILE_SCENE:
            this.view.dataUser = this.facade.retrieveProxy(UserProxy.NAME);
            this.view.onUpdateUserInfoDetail(this.userProxy.mySelf);
            this.view.show();
            break;
        case LobbyMessage.HIDE_USER_PROFILE_SCENE:
            this.view.hide();
            break;
        case LobbyMessage.ON_UPDATE_USER_INFO_DETAIL:
            this.view.onUpdateUserInfoDetail(this.userProxy.mySelf);
            break;
        case LobbyMessage.ON_UPDATE_AVATAR:
            this.view.onUpdateAvatar(this.userProxy.mySelf);
            break;
        case LobbyMessage.SHOW_FORM_OTP_USER_INFO:
            this.view.showFormOTPUserInfo();
            break;
        default:
            break;
      }
  }

  addHanlers() {
    BaseMediator.prototype.addHanlers.call(this);
    this.view.activeChangePass = this.activeChangePass.bind(this);
    this.view.activeChangeAvatar = this.activeChangeAvatar.bind(this);
    this.view.activePhoneAccountKit = this.activePhoneAccountKit.bind(this);

  }

  activeChangeAvatar(params) {
    this.sendNotification(LobbyMessage.SEND_CHANGE_AVATAR, params);
  }

  activeChangePass(params) {
    this.sendNotification(LobbyMessage.SEND_CHANGE_PASS, params);
  }

  activePhoneAccountKit(params) {
    this.sendNotification(LobbyMessage.SEND_ACTIVE_ACCOUNT_KIT, params);
  }
}

module.exports = UserProfileSceneMediator;
