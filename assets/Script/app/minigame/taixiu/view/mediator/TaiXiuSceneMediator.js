var BaseMediator = require('BaseMediator');
var Constants = require('Constants');
var LobbyMessage = require('LobbyMessage');
var MiniGameMessage = require('MiniGameMessage');
var ConfigProxy = require('ConfigProxy');
var CustomAction = require('CustomAction');

class TaiXiuSceneMediator extends BaseMediator {
  static get NAME() {
    return 'TaiXiuSceneMediator';
  }

  static get getInstance() {
    if(this.instance === undefined){
        this.instance = new TaiXiuSceneMediator();
    }
    return this.instance;
  }

  onRegister() {
      puremvc.Mediator.call(this, this.constructor.NAME);

  }
  /** @override */
  listNotificationInterests() {
      return [
        MiniGameMessage.SHOW_MINIGAME_TAI_XIU,
        MiniGameMessage.HIDE_MINIGAME_TAI_XIU,
        MiniGameMessage.ON_INIT_GAME_TAI_XIU,
        MiniGameMessage.ON_SHOW_RESULT_DICE_TAI_XIU,
        MiniGameMessage.ON_UPDATE_GAME_STATE_TAI_XIU,
        MiniGameMessage.ON_UPDATE_BOARD_BET_TAI_XIU,
        MiniGameMessage.ON_UPDATE_HISTORY_TAI_XIU,
        MiniGameMessage.ON_UPDATE_TIMER_TAI_XIU,
        MiniGameMessage.ON_SHOW_MESSAGE_TAI_XIU,
        MiniGameMessage.ON_BET_TAI_XIU,
        MiniGameMessage.ON_UPDATE_CHAT_TAI_XIU,
        MiniGameMessage.ON_UPDATE_RANK_MINIGAME_TAI_XIU,
        MiniGameMessage.ON_UPDATE_HISTORY_MINIGAME_TAI_XIU,
        MiniGameMessage.ON_UPDATE_MY_HISTORY_TAI_XIU,
        MiniGameMessage.ON_UPDATE_MY_DETAIL_SESSION_TAI_XIU,
        MiniGameMessage.ON_UPDATE_EVENT_TAI_XIU
      ]
  }

  /** @override */
  handleNotification(notification) {
      BaseMediator.prototype.handleNotification.call(this);

      var data = notification.getBody();
      if(!this.view) return;

      switch (notification.getName()) {
          case MiniGameMessage.ON_INIT_GAME_TAI_XIU:
              this.userProxy = this.facade.retrieveProxy('UserProxy');
            this.view.txVO = this.facade.retrieveProxy('TaiXiuProxy').txVO;
            this.view.buildUI(this.userProxy.mySelf);
            break;
          case MiniGameMessage.SHOW_MINIGAME_TAI_XIU:
            this.view.show();
            break;
          case MiniGameMessage.HIDE_MINIGAME_TAI_XIU:
            this.view.hide();
            break;
          case MiniGameMessage.ON_UPDATE_TIMER_TAI_XIU:
            this.view.onUpdateTimer(data.time);
            break;
          case MiniGameMessage.ON_UPDATE_HISTORY_TAI_XIU:
            this.view.onUpdateHistory(data.history);
            break;
          case MiniGameMessage.ON_BET_TAI_XIU:
            this.view.onBetTaiXiu(data.totalBet, data.typeBet);
            break;
          case MiniGameMessage.ON_SHOW_MESSAGE_TAI_XIU:
            this.view.onShowMessage(data.message);
            break;
          case MiniGameMessage.ON_SHOW_RESULT_DICE_TAI_XIU:
            this.view.onShowResultDice(data.dices);
            break;
          case MiniGameMessage.ON_UPDATE_BOARD_BET_TAI_XIU:
            this.view.onUpdateBoardBet(data.totalTai, data.totalXiu, data.numTai, data.numXiu);
            break;
          case MiniGameMessage.ON_UPDATE_GAME_STATE_TAI_XIU:
            this.view.onUpdateGameState(data.txVO);
            break;
          case MiniGameMessage.ON_UPDATE_CHAT_TAI_XIU:
            this.view.onUpdateChat(data);
            break;
          case MiniGameMessage.ON_UPDATE_RANK_MINIGAME_TAI_XIU:
            this.view.onUpdateRank(data);
            break;
          case MiniGameMessage.ON_UPDATE_HISTORY_MINIGAME_TAI_XIU:
            this.view.onUpdateHistory(data);
            break;
          case MiniGameMessage.ON_UPDATE_MY_HISTORY_TAI_XIU:
            this.view.onUpdateMyHistory(data);
            break;
          case MiniGameMessage.ON_UPDATE_MY_DETAIL_SESSION_TAI_XIU:
              this.view.onUpdateDetailSession(data);
              break;
          case MiniGameMessage.ON_UPDATE_EVENT_TAI_XIU:
              this.view.onUpdateTopEvent(data);
              break;
          default:
              break;
      }
  }

  addHanlers() {
    BaseMediator.prototype.addHanlers.call(this);
    this.view.activeSendBetTaiXiu = this.activeSendBetTaiXiu.bind(this);
    this.view.activeSendChangeMoneyType = this.activeSendChangeMoneyType.bind(this);

    this.view.activeDetailSession = this.activeDetailSession.bind(this);
    this.view.activeEventTaiXiu = this.activeEventTaiXiu.bind(this);
    this.view.activeDisconnect = this.activeDisconnect.bind(this);

    this.view.activeRank = this.activeRank.bind(this);
    this.view.activeHistory = this.activeHistory.bind(this);
    this.view.activeGuide = this.activeGuide.bind(this);
    this.view.activeSendChat = this.activeSendChat.bind(this);
  }

  activeSendBetTaiXiu(params) {
      this.sendNotification(MiniGameMessage.SEND_BET_TAI_XIU , {data: params});
  }

  activeSendChangeMoneyType(params) {
      this.sendNotification(MiniGameMessage.SEND_CHANGE_MONEY_TYPE_TAI_XIU, params);
  }

  activeRank(params) {
     this.sendNotification(MiniGameMessage.SEND_GET_RANK_TAI_XIU, params);
  }

  activeHistory(params) {
      this.sendNotification(MiniGameMessage.SEND_GET_HISTORY_TAI_XIU, params);
  }

  activeGuide() {
      this.sendNotification(LobbyMessage.SHOW_GUIDE_SCENE, Constants.MINIGAME_TAI_XIU);
  }

  activeDetailSession(params) {
      this.sendNotification(MiniGameMessage.SEND_GET_DETAIL_SESSION_TAI_XIU, params);
  }

  activeEventTaiXiu(params) {
      this.sendNotification(MiniGameMessage.SENT_GET_EVENT_TAI_XIU, params);
  }

  activeDisconnect() {
      this.sendNotification(MiniGameMessage.SEND_DISCONNECT_MINIGAME, Constants.MINIGAME_TAI_XIU);
  }

  activeSendChat(params) {
      this.sendNotification(MiniGameMessage.SEND_CHAT_TAI_XIU, params);
  }
}

module.exports = TaiXiuSceneMediator;
