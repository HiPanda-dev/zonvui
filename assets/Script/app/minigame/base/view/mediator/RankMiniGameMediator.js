var BaseMediator = require('BaseMediator');
var LobbyMessage = require('LobbyMessage');
var MiniGameMessage = require('MiniGameMessage');
var Constants = require('Constants');

class RankMiniGameMediator extends BaseMediator {
  static get NAME() {
    return 'RankMiniGameMediator';
  }

  static get getInstance() {
    if(this.instance === undefined){
        this.instance = new RankMiniGameMediator();
    }
    return this.instance;
  }

  onRegister() {
      puremvc.Mediator.call(this, this.constructor.NAME);
  }
  /** @override */
  listNotificationInterests() {
      return [
        MiniGameMessage.SHOW_RANK_MINIGAME,
        MiniGameMessage.UPDATE_RANK_MINIGAME
      ]
  }

  /** @override */
  handleNotification(notification) {
    BaseMediator.prototype.handleNotification.call(this);
    var data = notification.getBody();

    switch (notification.getName()) {
        case MiniGameMessage.SHOW_RANK_MINIGAME:
            this.view.show();
            this.sendNotification(MiniGameMessage.SEND_GET_RANK_MINIGAME, {curMiniGame:data});
            break;

        case MiniGameMessage.UPDATE_RANK_MINIGAME:
            this.view.updateRank(data.data);
            break;

        default:
            break;

    }
  }

  addHanlers() {
    BaseMediator.prototype.addHanlers.call(this);
    this.view.activeGetRankMiniGame = this.activeGetRankMiniGame.bind(this);
  }

  activeGetRankMiniGame(params) {
      this.sendNotification(MiniGameMessage.SEND_GET_RANK_MINIGAME, params);
  }

}

module.exports = RankMiniGameMediator;
