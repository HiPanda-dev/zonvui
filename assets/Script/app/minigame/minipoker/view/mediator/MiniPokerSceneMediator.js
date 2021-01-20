var BaseMediator = require('BaseMediator');
var LobbyMessage = require('LobbyMessage');
var MiniGameMessage = require('MiniGameMessage');
var MiniPokerProxy = require('MiniPokerProxy');
var Constants = require('Constants');
var CustomAction = require('CustomAction');

class MiniPokerSceneMediator extends BaseMediator {
  static get NAME() {
    return 'MiniPokerSceneMediator';
  }

  static get getInstance() {
    if(this.instance === undefined){
        this.instance = new MiniPokerSceneMediator();
    }
    return this.instance;
  }

  onRegister() {
      puremvc.Mediator.call(this, this.constructor.NAME);
  }
  /** @override */
  listNotificationInterests() {
      return [
        MiniGameMessage.SHOW_MINIGAME_MINI_POKER,
        MiniGameMessage.HIDE_MINIGAME_MINI_POKER,
        MiniGameMessage.ON_INIT_GAME_MINI_POKER,
        MiniGameMessage.ON_UPDATE_JACKPOT_MINI_POKER,
        MiniGameMessage.ON_SPIN_AND_RESULT_MINI_POKER,
        MiniGameMessage.ON_SHOW_EFFECT_WIN_MINI_POKER,
        MiniGameMessage.ON_HIDE_EFFECT_WIN_MINI_POKER,
        MiniGameMessage.ON_SHOW_MESSAGE_MINI_POKER,
        MiniGameMessage.ON_RESET_NEW_GAME_MINI_POKER,
        MiniGameMessage.ON_SET_AUTO_SPIN_MINI_POKER,
        MiniGameMessage.ON_DISCONNECT_MINI_POKER,
        MiniGameMessage.ON_UPDATE_RANK_MINIGAME_MINI_POKER,
        MiniGameMessage.ON_UPDATE_HISTORY_MINIGAME_MINI_POKER,
      ]
  }

  /** @override */
  handleNotification(notification) {
      BaseMediator.prototype.handleNotification.call(this);
      var data = notification.getBody();
      switch (notification.getName()) {
          case MiniGameMessage.ON_INIT_GAME_MINI_POKER:
            this.view.gameVO = this.facade.retrieveProxy('MiniPokerProxy').gameVO;
            this.view.buildUI();
            break;
          case MiniGameMessage.SHOW_MINIGAME_MINI_POKER:
            this.view.show();
            break;
          case MiniGameMessage.HIDE_MINIGAME_MINI_POKER:
            this.view.hide();
            break;
          case MiniGameMessage.ON_UPDATE_JACKPOT_MINI_POKER:
            this.view.onUpdateJackpot(data.roomJackPot);
            break;
          case MiniGameMessage.ON_SPIN_AND_RESULT_MINI_POKER:
            this.view.onSpinAndResult(data);
            break;
          case MiniGameMessage.ON_SHOW_EFFECT_WIN_MINI_POKER:
            this.view.onShowEffectWin(data.gameVO);
            break;
          case MiniGameMessage.ON_HIDE_EFFECT_WIN_MINI_POKER:
            this.view.onHideEffectWin();
            break;
          case MiniGameMessage.ON_SHOW_MESSAGE_MINI_POKER:
            this.view.onShowMessage(data.message);
            break;
          case MiniGameMessage.ON_RESET_NEW_GAME_MINI_POKER:
            this.view.onResetGame();
            break;
          case MiniGameMessage.ON_SET_AUTO_SPIN_MINI_POKER:
            this.view.onSetAutoSpin(data.autoSpin);
            break;
          case MiniGameMessage.ON_DISCONNECT_MINI_POKER:
            break;
          case MiniGameMessage.ON_UPDATE_RANK_MINIGAME_MINI_POKER:
            this.view.onUpdateRank(data);
              break;
          case MiniGameMessage.ON_UPDATE_HISTORY_MINIGAME_MINI_POKER:
            this.view.onUpdateHistory(data);
              break;
          default:
            break;
      }
  }

  addHanlers() {
    BaseMediator.prototype.addHanlers.call(this);
    this.view.activeSendSpin = this.activeSendSpin.bind(this);
    this.view.activeRank = this.activeRank.bind(this);
    this.view.activeMyHistory = this.activeMyHistory.bind(this);
    this.view.activeGuide = this.activeGuide.bind(this);
    this.view.activeLeaveGame = this.activeLeaveGame.bind(this);
  }

  activeSendSpin(params) {
    this.sendNotification(MiniGameMessage.SEND_SPIN_MINI_POKER, {data: params});
  }

  activeRank(params) {
    this.sendNotification(MiniGameMessage.SEND_GET_RANK_MINI_POKER, params);
  }

  activeMyHistory(params) {
    this.sendNotification(MiniGameMessage.SEND_GET_HISTORY_MINI_POKER, params);
  }

  activeGuide(params) {
    this.sendNotification(LobbyMessage.SHOW_GUIDE_SCENE, Constants.MINIGAME_MINI_POKER);
  }

  activeLeaveGame(params) {
    this.sendNotification(MiniGameMessage.SEND_DISCONNECT_MINIGAME, Constants.MINIGAME_MINI_POKER);
  }
}

module.exports = MiniPokerSceneMediator;
