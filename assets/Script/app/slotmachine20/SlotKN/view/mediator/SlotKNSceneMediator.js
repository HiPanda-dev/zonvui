var BaseMediator = require('BaseMediator');
var Constants = require('Constants');
var SlotMessage = require('SlotMessage');
var CustomAction = require('CustomAction');
var SlotKNProxy = require('SlotKNProxy');
var LobbyMessage = require('LobbyMessage');
var UserProxy = require('UserProxy');

class SlotKNSceneMediator extends BaseMediator {
  static get NAME() {
    return 'SlotKNSceneMediator';
  }

  static get getInstance() {
    if(this.instance === undefined){
        this.instance = new SlotKNSceneMediator();
    }
    return this.instance;
  }

  onRegister() {
      puremvc.Mediator.call(this, this.constructor.NAME);
  }

  listNotificationInterests() {
      return [
        SlotMessage.SHOW_MINIGAME_KEO_NGOT,
        SlotMessage.HIDE_MINIGAME_KEO_NGOT,
        SlotMessage.ON_INIT_GAME_KEO_NGOT,
        SlotMessage.ON_SPIN_AND_RESULT_KEO_NGOT,
        SlotMessage.ON_SHOW_EFFECT_JACKPOT_KEO_NGOT,
        SlotMessage.ON_HIDE_EFFECT_WIN_KEO_NGOT,
        SlotMessage.ON_SHOW_LINE_WIN_KEO_NGOT,
        SlotMessage.ON_SHOW_MESSAGE_KEO_NGOT,
        SlotMessage.ON_RESET_NEW_GAME_KEO_NGOT,
        SlotMessage.ON_HIDE_ALL_LINE_KEO_NGOT,
        SlotMessage.ON_SET_AUTO_SPIN_KEO_NGOT,
        SlotMessage.ON_UPDATE_JACKPOT_KEO_NGOT,
        SlotMessage.ON_SHOW_ITEM_WIN_KEO_NGOT,
        SlotMessage.ON_SHOW_EFFECT_ITEM_WIN_KEO_NGOT,
        SlotMessage.ON_HIDE_ALL_EFFECT_ITEM_WIN_KEO_NGOT,
        SlotMessage.ON_SET_NUM_AUTO_SPIN_KEO_NGOT,
        SlotMessage.ON_SHOW_MINIGAME,
        SlotMessage.ON_SHOW_EFFECT_FREE_SPIN_KEO_NGOT,
        SlotMessage.ON_PLAY_ANIM_BONUS_KEO_NGOT,
        SlotMessage.ON_PLAY_ANIM_SCATTER_KEO_NGOT,
        SlotMessage.ON_PLAY_ANIM_JACKPOT_KEO_NGOT,
        SlotMessage.ON_UPDATE_RANK_KEO_NGOT,
        SlotMessage.ON_UPDATE_MY_HISTORY_KEO_NGOT,
        SlotMessage.ON_UPDATE_LEVEL_KEO_NGOT,
        SlotMessage.SHOW_INFO_TOURNAMENT_KEO_NGOT,
        LobbyMessage.ON_UPDATE_MY_INFO,
        LobbyMessage.ON_UPDATE_TOP_TOURNAMENT

      ]
  }

  /** @override */
  handleNotification(notification) {
      BaseMediator.prototype.handleNotification.call(this);
      this.dataUser = this.facade.retrieveProxy(UserProxy.NAME);
      var data = notification.getBody();
      switch (notification.getName()) {
          case LobbyMessage.ON_UPDATE_MY_INFO:
            this.view.onUpdateUserInfo(this.dataUser.mySelf);
            break;
          case SlotMessage.ON_INIT_GAME_KEO_NGOT:
            this.view.buildUI(SlotKNProxy.proxy.gameVO);
            break;
          case SlotMessage.SHOW_MINIGAME_KEO_NGOT:
            this.view.show();
            break;
          case SlotMessage.HIDE_MINIGAME_KEO_NGOT:
            this.view.hide();
            break;
          case SlotMessage.ON_SPIN_AND_RESULT_KEO_NGOT:
            this.view.onSpinAndResult(data);
            break;
          case SlotMessage.ON_SHOW_EFFECT_JACKPOT_KEO_NGOT:
            this.view.onShowEffectJackpotWin(data.win);
            break;
          case SlotMessage.ON_HIDE_EFFECT_WIN_KEO_NGOT:
            this.view.onHideEffectWin();
            break;
          case SlotMessage.ON_SHOW_LINE_WIN_KEO_NGOT:
            this.view.onShowLineWin(data.ls);
            break;
          case SlotMessage.ON_SHOW_EFFECT_ITEM_WIN_KEO_NGOT:
            this.view.onShowEffectItemWin(data.ls);
            break;
          case SlotMessage.ON_HIDE_ALL_EFFECT_ITEM_WIN_KEO_NGOT:
            this.view.onHideAllEffectItemWin();
            break;
          case SlotMessage.ON_SHOW_MESSAGE_KEO_NGOT:
            this.view.onShowMessage(data.message);
            // this.sendNotification(Lob byMessage.SHOW_FLY_ALERT,{content:data.message});
            break;
          case SlotMessage.ON_RESET_GAME_KEO_NGOT:
            this.view.onResetGame();
            break;
          case SlotMessage.ON_SET_AUTO_SPIN_KEO_NGOT:
            this.view.onSetAutoSpin(data.autoSpin);
            break;
          case SlotMessage.ON_HIDE_ALL_LINE_KEO_NGOT:
            this.view.onHideAllLine();
            break;
          case SlotMessage.ON_UPDATE_JACKPOT_KEO_NGOT:
            this.view.onUpdateJackpot(data);
            break;
          case SlotMessage.ON_SET_NUM_AUTO_SPIN_KEO_NGOT:
            this.view.onSetNumAutoSpin(data);
            break;
          case SlotMessage.ON_SHOW_MINIGAME:
            this.view.onShowMinigame(data);
            break;
          case SlotMessage.ON_PLAY_ANIM_BONUS_KEO_NGOT:
            this.view.onPlayAnimBonus();
            break;
          case SlotMessage.ON_PLAY_ANIM_SCATTER_KEO_NGOT:
            this.view.onPlayAnimScatter();
            break;
          case SlotMessage.ON_PLAY_ANIM_JACKPOT_KEO_NGOT:
            this.view.onPlayAnimJackpot();
            break;
          case SlotMessage.ON_SHOW_EFFECT_FREE_SPIN_KEO_NGOT:
            this.view.onShowEffectFreeSpin(data.win);
            break;
          case SlotMessage.ON_UPDATE_RANK_KEO_NGOT:
            this.view.onUpdateRank(data);
            break;
          case SlotMessage.ON_UPDATE_MY_HISTORY_KEO_NGOT:
            this.view.onUpdateHistory(data);
            break;
          case SlotMessage.ON_UPDATE_LEVEL_KEO_NGOT:
            this.view.onUpdateLevel(data);
            break;
          case SlotMessage.SHOW_INFO_TOURNAMENT_KEO_NGOT:
              this.view.onShowInfoTournament();
              break;
          case LobbyMessage.ON_UPDATE_TOP_TOURNAMENT:
              this.view.onUpdateTopTournament(data);
              break;
      }
  }

  addHanlers() {
    BaseMediator.prototype.addHanlers.call(this);
    this.view.activeSendSpin = this.activeSendSpin.bind(this);
    this.view.activeRankShowPage = this.activeRankShowPage.bind(this);
    this.view.activeMyHistoryShowPage = this.activeMyHistoryShowPage.bind(this);
    this.view.activeGuide = this.activeGuide.bind(this);
    this.view.activeLeaveGame = this.activeLeaveGame.bind(this);
    this.view.activeShowCashInForm = this.activeShowCashInForm.bind(this);
    this.view.activeAddMoneyToUserInfo = this.activeAddMoneyToUserInfo.bind(this);
  }

  activeAddMoneyToUserInfo(money){
    this.dataUser.mySelf.money += money;
    this.sendNotification(LobbyMessage.ON_UPDATE_MY_INFO);
  }

  activeSendSpin(params){
    this.sendNotification(SlotMessage.SEND_SPIN_KEO_NGOT , {data: params});
  }

  activeShowCashInForm(params){
    this.sendNotification(LobbyMessage.SHOW_TAB_IN_SHOP_SCENE, {tabIndex:0});
  }

  activeRankShowPage(page){
    this.sendNotification(SlotMessage.SEND_GET_RANK_KEO_NGOT, {page});
  }

  activeMyHistoryShowPage(page){
    this.sendNotification(SlotMessage.SEND_GET_MY_HISTORY_KEO_NGOT, {page});
  }

  activeGuide(params){
    this.sendNotification(SlotMessage.SEND_SHOW_GUIDE_MINIGAME, Constants.MINIGAME_SLOT20);
  }

  activeLeaveGame(params){
    this.sendNotification(LobbyMessage.SHOW_LOBBY);
    this.sendNotification(SlotMessage.SEND_LEAVE_ROOM_KEO_NGOT);
  }
}

module.exports = SlotKNSceneMediator;
