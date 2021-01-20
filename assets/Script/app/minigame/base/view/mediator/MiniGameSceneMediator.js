var BaseMediator = require('BaseMediator');
var MiniGameMessage = require('MiniGameMessage');
var LobbyMessage = require('LobbyMessage');

class MiniGameSceneMediator extends BaseMediator {
  static get NAME() {
    return 'MiniGameSceneMediator';
  }

  static get getInstance() {
    if(this.instance === undefined){
        this.instance = new MiniGameSceneMediator();
    }
    return this.instance;
  }

  onRegister() {
      puremvc.Mediator.call(this, this.constructor.NAME);
  }
  /** @override */
  listNotificationInterests() {
      return [
        MiniGameMessage.ON_LOAD_MINIGAME,
        LobbyMessage.ON_UPDATE_COUNDOWN_TAIXIU
      ]
  }

  /** @override */
  handleNotification(notification) {
    BaseMediator.prototype.handleNotification.call(this);
    var data = notification.getBody();
    switch (notification.getName()) {
        case MiniGameMessage.ON_LOAD_MINIGAME:
            this.view.onLoadMiniGame(data.name, data.onComplete);
            break;
        case LobbyMessage.ON_UPDATE_COUNDOWN_TAIXIU:
            this.view.onUpdateCountDownTx(data.data);
            break;
        default:
            break;
    }
  }

  addHanlers() {
    BaseMediator.prototype.addHanlers.call(this);
    this.view.activeJoinMinigame = this.activeJoinMinigame.bind(this);
  }

  activeJoinMinigame(params) {
      this.sendNotification(MiniGameMessage.SEND_JOIN_MINIGAME, params);
  }

}

module.exports = MiniGameSceneMediator;
