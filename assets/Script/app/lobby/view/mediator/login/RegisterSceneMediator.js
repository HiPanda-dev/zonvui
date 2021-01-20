var BaseMediator = require('BaseMediator');
var LobbyMessage = require('LobbyMessage');
var i18n = require('i18n');

class RegisterSceneMediator extends BaseMediator {
  static get NAME() {
    return 'RegisterSceneMediator';
  }

  static get getInstance() {
    if(this.instance === undefined){
        this.instance = new RegisterSceneMediator();
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
        LobbyMessage.SHOW_REGISTER_SCENE,
        LobbyMessage.HIDE_REGISTER_SCENE
      ]
  }

  /** @override */
  handleNotification(notification) {
    var data = notification.getBody();
    switch (notification.getName()) {
        case LobbyMessage.SHOW_REGISTER_SCENE:
            this.view.show();
            break;
        case LobbyMessage.HIDE_REGISTER_SCENE:
            this.view.hide();
            break;
    }
  }

  addHanlers() {
    BaseMediator.prototype.addHanlers.call(this);

    this.view.activeShowLoginScene = this.activeShowLoginScene.bind(this);
    this.view.activeRegister = this.activeRegister.bind(this);
    this.view.activeLoginFB = this.activeLoginFB.bind(this);
    this.view.activeShowWebViewPopup = this.activeShowWebViewPopup.bind(this);
  }

  activeLoginFB (params) {
      this.activeShowLoginScene();
      this.sendNotification(LobbyMessage.SEND_FACEBOOK_LOGIN, params);
  }

  activeRegister (params) {
      this.sendNotification(LobbyMessage.SEND_REGISTER, params);
  }

  activeShowLoginScene(){
      this.sendNotification(LobbyMessage.HIDE_REGISTER_SCENE);
      this.sendNotification(LobbyMessage.SHOW_LOGIN_SCENE);
      this.sendNotification(LobbyMessage.SHOW_SELECT_GAME_SCENE);
      this.sendNotification(LobbyMessage.SHOW_EVENT_BANNER_SCENE);
  }

  activeShowWebViewPopup (url) {
      this.sendNotification(LobbyMessage.SHOW_WEB_VIEW_POPUP, {url: url, title:i18n.t("C0053")});
  }
}

module.exports = RegisterSceneMediator;
