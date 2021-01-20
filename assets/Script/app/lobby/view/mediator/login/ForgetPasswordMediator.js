var BaseMediator = require('BaseMediator');
var LobbyMessage = require('LobbyMessage');


class ForgetPasswordMediator extends BaseMediator {
  static get NAME() {
    return 'ForgetPasswordMediator';
  }

  static get getInstance() {
    if(this.instance === undefined){
        this.instance = new ForgetPasswordMediator();
    }
    return this.instance;
  }

  onRegister() {
      puremvc.Mediator.call(this, this.constructor.NAME);
  }
  /** @override */
  listNotificationInterests() {
      return [
        LobbyMessage.SHOW_FORGET_PASSWORD_SCENE,
        LobbyMessage.HIDE_FORGET_PASSWORD_SCENE,
        LobbyMessage.UPDATE_LOGIN_SCENE,
        LobbyMessage.ON_RESET_MYSELF
      ]
  }

  /** @override */
  handleNotification(notification) {
    var data = notification.getBody();
    switch (notification.getName()) {
        case LobbyMessage.SHOW_FORGET_PASSWORD_SCENE:
            this.view.show();
            break;
        case LobbyMessage.HIDE_FORGET_PASSWORD_SCENE:
            this.view.hide();
            break;
    }
  }

  addHanlers() {

  }
}

module.exports = ForgetPasswordMediator;
