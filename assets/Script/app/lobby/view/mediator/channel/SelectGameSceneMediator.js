var BaseMediator = require('BaseMediator');
var LobbyMessage = require('LobbyMessage');
var MiniGameMessage = require('MiniGameMessage');
var SlotMessage = require('SlotMessage');
var Constants = require('Constants');

class SelectGameSceneMediator extends BaseMediator {
  static get NAME() {
    return 'SelectGameSceneMediator';
  }

  static get getInstance() {
    if(this.instance === undefined){
        this.instance = new SelectGameSceneMediator();
    }
    return this.instance;
  }

  onRegister() {
      puremvc.Mediator.call(this, this.constructor.NAME);
      this.onGetNotifies();
  }
  /** @override */
  listNotificationInterests() {
      return [
        LobbyMessage.SHOW_SELECT_GAME_SCENE,
        LobbyMessage.HIDE_SELECT_GAME_SCENE,
        LobbyMessage.ON_UPDATE_LIST_JACKPOT,
        LobbyMessage.SHOW_JACKPOT_BUTTON,
        LobbyMessage.ON_UPDATE_TIMER_COUNTDOWN_TOURNAMENT,
        LobbyMessage.ON_HIDE_ALL_TIMER_COUNTDOWN_TOURNAMENT,
      ]
  }

  /** @override */
  handleNotification(notification) {
    var data = notification.getBody();
    switch (notification.getName()) {
        case LobbyMessage.SHOW_SELECT_GAME_SCENE:
            Constants.CURRENT_SCENE = Constants.GAME_SELECT;
            this.view.show();
            break;
        case LobbyMessage.HIDE_SELECT_GAME_SCENE:
            this.view.hide();
            TweenLite.killDelayedCallsTo(this.onGetNotifies.bind(this));
            break;
        case LobbyMessage.ON_UPDATE_LIST_JACKPOT:
            this.view.updateListJackpot(data.data);
            break;
        case LobbyMessage.SHOW_JACKPOT_BUTTON:
            this.view.showJackpotButton();
            break;
        case LobbyMessage.ON_UPDATE_TIMER_COUNTDOWN_TOURNAMENT:
            this.view.onUpdateTimerCountDownTour(data);
            break;
        case LobbyMessage.ON_HIDE_ALL_TIMER_COUNTDOWN_TOURNAMENT:
            this.view.hideAllTextTourCoundown();
            break;
    }
  }

  addHanlers () {
      BaseMediator.prototype.addHanlers.call(this);
      this.view.onJoinGameChannel     = this.onJoinGameChannel.bind(this);
      this.view.activeListJackpot     = this.activeListJackpot.bind(this);
      this.view.onSendGetListJackpot  = this.onSendGetListJackpot.bind(this);
      this.view.onJoinMiniGame        = this.onJoinMiniGame.bind(this);
      this.view.onJoinSlot     = this.onJoinSlot.bind(this);
  }

  onJoinGameChannel(channelId){
      Constants.CURRENT_GAME = channelId;
      this.sendNotification(LobbyMessage.SEND_GET_CHANNEL_INFO, {channelId:channelId});
  }

  activeListJackpot(){
      this.sendNotification(LobbyMessage.SEND_SHOW_HIDE_JACKPOT);
  }

  onSendGetListJackpot() {
      this.sendNotification(LobbyMessage.SEND_GET_LIST_JACKPOT);
  }

  onJoinMiniGame(params){
      this.sendNotification(MiniGameMessage.SEND_JOIN_MINIGAME, params);
  }

  onJoinSlot(gameModule) {
      this.sendNotification(LobbyMessage.SEND_JOIN_SLOT20,gameModule);
  }

  onGetNotifies () {
      this.sendNotification(LobbyMessage.SEND_GET_NOTIFIES);
      TweenLite.killDelayedCallsTo(this.onGetNotifies.bind(this));
      TweenLite.delayedCall(180, this.onGetNotifies.bind(this));
  }
}

module.exports = SelectGameSceneMediator;
