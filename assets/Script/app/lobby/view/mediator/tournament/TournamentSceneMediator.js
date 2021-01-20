var BaseMediator = require('BaseMediator');
var LobbyMessage = require('LobbyMessage');
var GameConfig = require('GameConfig');
var Constants = require('Constants');

class TournamentSceneMediator extends BaseMediator {
  static get NAME() {
    return 'TournamentSceneMediator';
  }

  static get getInstance() {
    if(this.instance === undefined){
        this.instance = new TournamentSceneMediator();
    }
    return this.instance;
  }

  onRegister() {
      puremvc.Mediator.call(this, this.constructor.NAME);
  }
  /** @override */
  listNotificationInterests() {
      return [
        LobbyMessage.SHOW_TOURNAMENT_SCENE,
        LobbyMessage.HIDE_TOURNAMENT_SCENE,
        LobbyMessage.ON_UPDATE_INFO_TOURNAMENT,
        LobbyMessage.ON_UPDATE_TOP_TOURNAMENT,
      ]
  }

  /** @override */
  handleNotification(notification) {
    BaseMediator.prototype.handleNotification.call(this);
    var params = notification.getBody();
    switch (notification.getName()) {
        case LobbyMessage.SHOW_TOURNAMENT_SCENE:
            this.view.show();
            break;
        case LobbyMessage.HIDE_TOURNAMENT_SCENE:
            this.view.hide();
            break;
        case LobbyMessage.ON_UPDATE_INFO_TOURNAMENT:
            this.view.setData(params);
            break;
        case LobbyMessage.ON_UPDATE_TOP_TOURNAMENT:
            this.view.updateTopPlayer(params);
            break;
        default:
            break;
      }
  }

  addHanlers() {
    BaseMediator.prototype.addHanlers.call(this);
    this.view.activeJoinTounament = this.activeJoinTounament.bind(this);
    this.view.activeJoinGame = this.activeJoinGame.bind(this);
  }

  activeJoinTounament(moduleId, tourId) {
    this.sendNotification(LobbyMessage.SEND_JOIN_TOURNAMENT, {tourId:tourId, moduleId: moduleId})
  }

  activeJoinGame(moduleId, tourId) {

  }
}

module.exports = TournamentSceneMediator;
