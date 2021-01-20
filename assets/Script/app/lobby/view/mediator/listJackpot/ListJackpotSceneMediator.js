var BaseMediator = require('BaseMediator');
var LobbyMessage = require('LobbyMessage');
var MiniGameMessage = require('MiniGameMessage');

class ListJackpotSceneMediator extends BaseMediator {
  static get NAME() {
    return 'ListJackpotSceneMediator';
  }

  static get getInstance() {
    if(this.instance === undefined){
        this.instance = new ListJackpotSceneMediator();
    }
    return this.instance;
  }

  onRegister() {
      puremvc.Mediator.call(this, this.constructor.NAME);
  }
  /** @override */
  listNotificationInterests() {
      return [
        LobbyMessage.SHOW_JACKPOT_SCENE,
        LobbyMessage.HIDE_JACKPOT_SCENE,
        LobbyMessage.SEND_SHOW_HIDE_JACKPOT,
        LobbyMessage.ON_UPDATE_LIST_JACKPOT
      ]
  }

  /** @override */
  handleNotification(notification) {
    var data = notification.getBody();
    switch (notification.getName()) {
      case LobbyMessage.SHOW_JACKPOT_SCENE:
        this.view.show();
        break;
      case LobbyMessage.HIDE_JACKPOT_SCENE:
        this.view.hide();
        break;
      case LobbyMessage.SEND_SHOW_HIDE_JACKPOT:
        this.view.showHide();
        break;
      case LobbyMessage.ON_UPDATE_LIST_JACKPOT:
        if(this.view === undefined) break;
        this.view.updateListJackpot(data.data);
        break;
      default:
          break;
    }
  }

  addHanlers() {
    BaseMediator.prototype.addHanlers.call(this);
    this.view.activeShowJackpotButton  = this.activeShowJackpotButton.bind(this);
    this.view.activeJoinMiniGame = this.activeJoinMiniGame.bind(this);
    this.view.activeJoinSlot20 = this.activeJoinSlot20.bind(this);
  }

  activeJoinMiniGame(params){
    this.sendNotification(MiniGameMessage.SEND_JOIN_MINIGAME, params);
  }

  activeJoinSlot20(params){
    this.sendNotification(LobbyMessage.SEND_JOIN_SLOT20, params);
  }

  activeShowJackpotButton() {
    this.sendNotification(LobbyMessage.SHOW_JACKPOT_BUTTON);
  }
}

module.exports = ListJackpotSceneMediator;
