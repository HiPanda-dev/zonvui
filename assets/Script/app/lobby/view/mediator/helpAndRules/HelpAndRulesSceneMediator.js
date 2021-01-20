var BaseMediator = require('BaseMediator');
var LobbyMessage = require('LobbyMessage');

class HelpAndRulesSceneMediator extends BaseMediator {
  static get NAME() {
    return 'HelpAndRulesSceneMediator';
  }

  static get getInstance() {
    if(this.instance === undefined){
        this.instance = new HelpAndRulesSceneMediator();
    }
    return this.instance;
  }

  onRegister() {
      puremvc.Mediator.call(this, this.constructor.NAME);
  }
  /** @override */
  listNotificationInterests() {
      return [
        LobbyMessage.SHOW_GUIDE_SCENE,
        LobbyMessage.HIDE_GUIDE_SCENE,
        LobbyMessage.SHOW_RULES_SCENE,
        LobbyMessage.HIDE_RULES_SCENE
      ]
  }

  /** @override */
  handleNotification(notification) {
    BaseMediator.prototype.handleNotification.call(this);
    var data = notification.getBody();
    switch (notification.getName()) {
        case LobbyMessage.SHOW_GUIDE_SCENE:
            this.view.showGuide(data);
            break;
        case LobbyMessage.SHOW_RULES_SCENE:
            this.view.showRules(data);
            break;
        case LobbyMessage.HIDE_GUIDE_SCENE:
        case LobbyMessage.HIDE_RULES_SCENE:
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

module.exports = HelpAndRulesSceneMediator;
