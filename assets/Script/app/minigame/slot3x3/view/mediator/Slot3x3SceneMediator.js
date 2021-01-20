var BaseMediator = require('BaseMediator');
var Constants = require('Constants');
var MiniGameMessage = require('MiniGameMessage');
var CustomAction = require('CustomAction');
var LobbyMessage = require('LobbyMessage');

class Slot3x3SceneMediator extends BaseMediator {
  static get NAME() {
    return 'Slot3x3SceneMediator';
  }

  static get getInstance() {
    if(this.instance === undefined){
        this.instance = new Slot3x3SceneMediator();
    }
    return this.instance;
  }

  onRegister() {
      puremvc.Mediator.call(this, this.constructor.NAME);
  }
  /** @override */
  listNotificationInterests() {
      return [
        MiniGameMessage.SHOW_MINIGAME_SLOT3X3,
        MiniGameMessage.HIDE_MINIGAME_SLOT3X3,
        MiniGameMessage.ON_INIT_GAME_SLOT3X3,
        MiniGameMessage.ON_SPIN_AND_RESULT_SLOT3X3,
        MiniGameMessage.ON_SHOW_EFFECT_WIN_SLOT3X3,
        MiniGameMessage.ON_HIDE_EFFECT_WIN_SLOT3X3,
        MiniGameMessage.ON_SHOW_LINE_WIN_SLOT3X3,
        MiniGameMessage.ON_SHOW_MESSAGE_SLOT3X3,
        MiniGameMessage.ON_RESET_NEW_GAME_SLOT3X3,
        MiniGameMessage.ON_HIDE_ALL_LINE_SLOT3X3,
        MiniGameMessage.ON_SET_AUTO_SPIN_SLOT3X3,
        MiniGameMessage.ON_UPDATE_JACKPOT_SLOT3X3,
        MiniGameMessage.ON_SHOW_EFFECT_ITEM_WIN_SLOT3X3,
        MiniGameMessage.ON_HIDE_ALL_EFFECT_ITEM_WIN_SLOT3X3,
        MiniGameMessage.ON_UPDATE_RANK_MINIGAME_SLOT3X3,
        MiniGameMessage.ON_UPDATE_HISTORY_MINIGAME_SLOT3X3
      ]
  }

  /** @override */
  handleNotification(notification) {
      BaseMediator.prototype.handleNotification.call(this);
      var data = notification.getBody();
      switch (notification.getName()) {
          case MiniGameMessage.ON_INIT_GAME_SLOT3X3:
            this.view.gameVO = this.facade.retrieveProxy('Slot3x3Proxy').gameVO;
            this.view.buildUI();
            break;
          case MiniGameMessage.SHOW_MINIGAME_SLOT3X3:
            this.view.show();
            break;
          case MiniGameMessage.ON_SPIN_AND_RESULT_SLOT3X3:
            this.view.onSpinAndResult(data);
            break;
          case MiniGameMessage.ON_SHOW_EFFECT_WIN_SLOT3X3:
            this.view.onShowEffectWin(data.gameVO);
            break;
          case MiniGameMessage.ON_HIDE_EFFECT_WIN_SLOT3X3:
            this.view.onHideEffectWin();
            break;
          case MiniGameMessage.ON_SHOW_EFFECT_ITEM_WIN_SLOT3X3:
            this.view.onShowEffectItemWin(data.wins);
            break;
          case MiniGameMessage.ON_HIDE_ALL_EFFECT_ITEM_WIN_SLOT3X3:
              this.view.onHideAllEffectItemWin();
              break;
          case MiniGameMessage.ON_SHOW_LINE_WIN_SLOT3X3:
            this.view.onShowLineWin(data.wins);
            break;
          case MiniGameMessage.ON_SHOW_MESSAGE_SLOT3X3:
            this.view.onShowMessage(data.message);
            break;
          case MiniGameMessage.ON_RESET_GAME_SLOT3X3:
            this.view.onResetGame();
            break;
          case MiniGameMessage.ON_SET_AUTO_SPIN_SLOT3X3:
            this.view.onSetAutoSpin(data.autoSpin);
            break;
          case MiniGameMessage.ON_HIDE_ALL_LINE_SLOT3X3:
            this.view.onHideAllLine();
            break;
          case MiniGameMessage.ON_UPDATE_JACKPOT_SLOT3X3:
            this.view.onUpdateJackpot(data.roomJackPot);
            break;
          case MiniGameMessage.ON_UPDATE_RANK_MINIGAME_SLOT3X3:
            this.view.onUpdateRank(data);
              break;
          case MiniGameMessage.ON_UPDATE_HISTORY_MINIGAME_SLOT3X3:
            this.view.onUpdateHistory(data);
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

  activeSendSpin(params){
    this.sendNotification(MiniGameMessage.SEND_SPIN_SLOT3X3 , {data: params});
  }

  activeRank(params){
    this.sendNotification(MiniGameMessage.SEND_GET_RANK_SLOT3X3, params);
  }

  activeMyHistory(params){
    this.sendNotification(MiniGameMessage.SEND_GET_HISTORY_SLOT3X3, params);
  }

  activeGuide(params){
    this.sendNotification(LobbyMessage.SHOW_GUIDE_SCENE, Constants.MINIGAME_SLOT3X3);
  }

  activeLeaveGame(params){
    this.sendNotification(MiniGameMessage.SEND_LEAVE_ROOM_SLOT3X3);
  }
}

module.exports = Slot3x3SceneMediator;
