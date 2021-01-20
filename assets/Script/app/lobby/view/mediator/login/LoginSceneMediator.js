var BaseMediator = require('BaseMediator');
var LobbyMessage = require('LobbyMessage');


class LoginSceneMediator extends BaseMediator {
  static get NAME() {
    return 'LoginSceneMediator';
  }

  static get getInstance() {
    if(this.instance === undefined){
        this.instance = new LoginSceneMediator();
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
        LobbyMessage.SHOW_LOGIN_SCENE,
        LobbyMessage.HIDE_LOGIN_SCENE,
        LobbyMessage.UPDATE_LOGIN_SCENE,
        LobbyMessage.ON_RESET_MYSELF
      ]
  }

  /** @override */
  handleNotification(notification) {
    var data = notification.getBody();
    switch (notification.getName()) {
        case LobbyMessage.SHOW_LOGIN_SCENE:
            this.view.show();
            this.sendNotification(LobbyMessage.HIDE_REGISTER_SCENE);
            this.sendNotification(LobbyMessage.HIDE_TOP_MENU);
            this.sendNotification(LobbyMessage.HIDE_BOTTOM_MENU);
            this.sendNotification(LobbyMessage.HIDE_SELECT_GAME_SCENE);
            this.sendNotification(LobbyMessage.HIDE_EVENT_BANNER_SCENE);
            this.sendNotification(LobbyMessage.HIDE_CHANNEL_SCENE);
            break;
        case LobbyMessage.HIDE_LOGIN_SCENE:
            this.view.hide();
            break;
        case LobbyMessage.UPDATE_LOGIN_SCENE:
            this.view.updateData(data.userName, data.password);
            break;
        case LobbyMessage.ON_RESET_MYSELF:
            this.userProxy.resetMyself();
            break;
    }
  }

  addHanlers() {
    BaseMediator.prototype.addHanlers.call(this);
    this.view.activeShowRegister = this.activeShowRegister.bind(this);
    this.view.activeLogin = this.activeLogin.bind(this);
    this.view.activeLoginFB = this.activeLoginFB.bind(this);
    this.view.activeExitGame = this.activeExitGame.bind(this);
    this.view.activeForGetPassWord = this.activeForGetPassWord.bind(this);
  }

  activeShowRegister(){
      this.sendNotification(LobbyMessage.SHOW_REGISTER_SCENE);
      this.sendNotification(LobbyMessage.HIDE_LOGIN_SCENE);
  }

  activeLoginFB () {
      this.sendNotification(LobbyMessage.SEND_FACEBOOK_LOGIN);
  }

  activeLogin(params){
      this.sendNotification(LobbyMessage.SEND_LOGIN, params);
  }

  activeForGetPassWord(params){
      this.sendNotification(LobbyMessage.SHOW_FORGET_PASSWORD_SCENE, params);
  }

  activeExitGame () {
      cc.game.end();
  }
}

module.exports = LoginSceneMediator;
