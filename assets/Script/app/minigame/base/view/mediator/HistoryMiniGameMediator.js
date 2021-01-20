var BaseMediator = require('BaseMediator');
var LobbyMessage = require('LobbyMessage');
var MiniGameMessage = require('MiniGameMessage');
var Constants = require('Constants');

class HistoryMiniGameMediator extends BaseMediator {
  static get NAME() {
    return 'HistoryMiniGameMediator';
  }

  static get getInstance() {
    if(this.instance === undefined){
        this.instance = new HistoryMiniGameMediator();
    }
    return this.instance;
  }

  onRegister() {
      puremvc.Mediator.call(this, this.constructor.NAME);
  }
  /** @override */
  listNotificationInterests() {
      return [
        MiniGameMessage.SHOW_HISTORY_MINIGAME,
        MiniGameMessage.UPDATE_HISTORY_MINIGAME
      ]
  }

  /** @override */
  handleNotification(notification) {
    BaseMediator.prototype.handleNotification.call(this);
    var data = notification.getBody();

    switch (notification.getName()) {

        case MiniGameMessage.SHOW_HISTORY_MINIGAME:
            this.view.show();
            this.sendNotification(MiniGameMessage.SEND_GET_HISTORY_MINIGAME, {curMiniGame:data});
            break;

        case MiniGameMessage.UPDATE_HISTORY_MINIGAME:
            this.view.updateHistory(data.data);
            break;
        default:
            break;
    }
  }

  addHanlers() {
    BaseMediator.prototype.addHanlers.call(this);
    this.view.activeGetHistoryMiniGame = this.activeGetHistoryMiniGame.bind(this);
  }

  activeGetHistoryMiniGame(params) {
      this.sendNotification(MiniGameMessage.SEND_GET_HISTORY_MINIGAME, params);
  }

}

module.exports = HistoryMiniGameMediator;
