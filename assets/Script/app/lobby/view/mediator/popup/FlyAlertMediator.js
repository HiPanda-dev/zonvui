var BaseMediator = require('BaseMediator');
var LobbyMessage = require('LobbyMessage');

class FlyAlertMediator extends BaseMediator {
  static get NAME() {
    return 'FlyAlertMediator';
  }

  static get getInstance() {
    if(this.instance === undefined){
        this.instance = new FlyAlertMediator();
    }
    return this.instance;
  }

  onRegister() {
      puremvc.Mediator.call(this, this.constructor.NAME);
  }
  /** @override */
  listNotificationInterests() {
      return [
        LobbyMessage.SHOW_FLY_ALERT,
        LobbyMessage.HIDE_FLY_ALERT
      ]
  }

  /** @override */
  handleNotification(notification) {
    BaseMediator.prototype.handleNotification.call(this);
    var data = notification.getBody();
    switch (notification.getName()) {
        case LobbyMessage.SHOW_FLY_ALERT:
            this.view.showAlert(data);
            this.sendNotification(LobbyMessage.HIDE_LOADING);
            break;
        case LobbyMessage.HIDE_FLY_ALERT:
            this.view.hide();
            break;
        default:
            break;
    }
  }

  addHanlers() {
    BaseMediator.prototype.addHanlers.call(this);
  }

}

module.exports = FlyAlertMediator;
