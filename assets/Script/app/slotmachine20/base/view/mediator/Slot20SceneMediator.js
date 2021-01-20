var BaseMediator = require('BaseMediator');
var Constants = require('Constants');
var SlotMessage = require('SlotMessage');
var CustomAction = require('CustomAction');
var Slot20Proxy = require('Slot20Proxy');
var LobbyMessage = require('LobbyMessage');
var UserProxy = require('UserProxy');

class Slot20SceneMediator extends BaseMediator {
  static get NAME() {
    return 'Slot20SceneMediator';
  }

  static get getInstance() {
    if(this.instance === undefined){
        this.instance = new Slot20SceneMediator();
    }
    return this.instance;
  }

  onRegister() {
      puremvc.Mediator.call(this, this.constructor.NAME);
  }
  /** @override */
  listNotificationInterests() {
      return [
        SlotMessage.SHOW_MINIGAME_LUCKY_CAFE,
        SlotMessage.HIDE_MINIGAME_LUCKY_CAFE,
        SlotMessage.ON_INIT_GAME_LUCKY_CAFE,
        SlotMessage.ON_SPIN_AND_RESULT_LUCKY_CAFE,
        SlotMessage.ON_SHOW_EFFECT_WIN_LUCKY_CAFE,
        SlotMessage.ON_HIDE_EFFECT_WIN_LUCKY_CAFE,
        SlotMessage.ON_SHOW_LINE_WIN_LUCKY_CAFE,
        SlotMessage.ON_SHOW_MESSAGE_LUCKY_CAFE,
        SlotMessage.ON_RESET_NEW_GAME_LUCKY_CAFE,
        SlotMessage.ON_HIDE_ALL_LINE_LUCKY_CAFE,
        SlotMessage.ON_SET_AUTO_SPIN_LUCKY_CAFE,
        SlotMessage.ON_UPDATE_JACKPOT_LUCKY_CAFE,
        SlotMessage.ON_SHOW_ITEM_WIN_LUCKY_CAFE,
        SlotMessage.ON_SHOW_EFFECT_ITEM_WIN_LUCKY_CAFE,
        SlotMessage.ON_HIDE_ALL_EFFECT_ITEM_WIN_LUCKY_CAFE,
        SlotMessage.ON_SET_NUM_AUTO_SPIN_LUCKY_CAFE,
        SlotMessage.ON_SHOW_MINIGAME,
        SlotMessage.ON_SHOW_EFFECT_FREE_SPIN_LUCKY_CAFE,
        SlotMessage.ON_PLAY_ANIM_BONUS_LUCKY_CAFE,
        SlotMessage.ON_PLAY_ANIM_SCATTER_LUCKY_CAFE,
        SlotMessage.ON_PLAY_ANIM_JACKPOT_LUCKY_CAFE,
        SlotMessage.ON_UPDATE_RANK_LUCKY_CAFE,
        SlotMessage.ON_UPDATE_MY_HISTORY_LUCKY_CAFE,
        LobbyMessage.ON_UPDATE_MY_INFO,

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
          case SlotMessage.ON_INIT_GAME_LUCKY_CAFE:
            this.view.buildUI(Slot20Proxy.proxy.gameVO);
            break;
          case SlotMessage.SHOW_MINIGAME_LUCKY_CAFE:
            this.view.show();
            break;
          case SlotMessage.ON_SPIN_AND_RESULT_LUCKY_CAFE:
            this.view.onSpinAndResult(data);
            break;
          case SlotMessage.ON_SHOW_EFFECT_WIN_LUCKY_CAFE:
            this.view.onShowEffectWin(data.gameVO);
            break;
          case SlotMessage.ON_HIDE_EFFECT_WIN_LUCKY_CAFE:
            this.view.onHideEffectWin();
            break;
          case SlotMessage.ON_SHOW_LINE_WIN_LUCKY_CAFE:
            this.view.onShowLineWin(data.wins);
            break;
          case SlotMessage.ON_SHOW_EFFECT_ITEM_WIN_LUCKY_CAFE:
            this.view.onShowEffectItemWin(data.wins);
            break;
          case SlotMessage.ON_HIDE_ALL_EFFECT_ITEM_WIN_LUCKY_CAFE:
            this.view.onHideAllEffectItemWin();
            break;
          case SlotMessage.ON_SHOW_MESSAGE_LUCKY_CAFE:
            this.view.onShowMessage(data.message);
            // this.sendNotification(Lob byMessage.SHOW_FLY_ALERT,{content:data.message});
            break;
          case SlotMessage.ON_RESET_GAME_LUCKY_CAFE:
            this.view.onResetGame();
            break;
          case SlotMessage.ON_SET_AUTO_SPIN_LUCKY_CAFE:
            this.view.onSetAutoSpin(data.autoSpin);
            break;
          case SlotMessage.ON_HIDE_ALL_LINE_LUCKY_CAFE:
            this.view.onHideAllLine();
            break;
          case SlotMessage.ON_UPDATE_JACKPOT_LUCKY_CAFE:
            this.view.onUpdateJackpot(data);
            break;
          case SlotMessage.ON_SET_NUM_AUTO_SPIN_LUCKY_CAFE:
            this.view.onSetNumAutoSpin(data);
            break;
          case SlotMessage.ON_SHOW_MINIGAME:
            this.view.onShowMinigame(data);
            break;
          case SlotMessage.ON_PLAY_ANIM_BONUS_LUCKY_CAFE:
            this.view.onPlayAnimBonus();
            break;
          case SlotMessage.ON_PLAY_ANIM_SCATTER_LUCKY_CAFE:
            this.view.onPlayAnimScatter();
            break;
          case SlotMessage.ON_PLAY_ANIM_JACKPOT_LUCKY_CAFE:
            this.view.onPlayAnimJackpot();
            break;
          case SlotMessage.ON_SHOW_EFFECT_FREE_SPIN_LUCKY_CAFE:
            this.view.onShowEffectFreeSpin(data);
            break;
          case SlotMessage.ON_UPDATE_RANK_LUCKY_CAFE:
            this.view.onUpdateRank(data);
            break;
          case SlotMessage.ON_UPDATE_MY_HISTORY_LUCKY_CAFE:
            this.view.onUpdateHistory(data);
            break;
      }
  }

  addHanlers() {
    BaseMediator.prototype.addHanlers.call(this);
    this.view.activeSendSpin = this.activeSendSpin.bind(this);
    this.view.activeRankShowPage = this.activeRankShowPage.bind(this);
    this.view.activeMyHistory = this.activeMyHistory.bind(this);
    this.view.activeGuide = this.activeGuide.bind(this);
    this.view.activeLeaveGame = this.activeLeaveGame.bind(this);
    this.view.activeShowCashInForm = this.activeShowCashInForm.bind(this);
  }

  activeSendSpin(params){
    this.sendNotification(SlotMessage.SEND_SPIN_LUCKY_CAFE , {data: params});
  }

  activeShowCashInForm(params){
    this.sendNotification(LobbyMessage.SHOW_TAB_IN_SHOP_SCENE, {tabIndex:0});
  }

  activeRankShowPage(page){
    this.sendNotification(SlotMessage.SEND_GET_RANK_LUCKY_CAFE, {page});
  }

  activeMyHistory(page){
    this.sendNotification(SlotMessage.SEND_GET_MY_HISTORY_LUCKY_CAFE, {page});
  }

  activeGuide(params){
    this.sendNotification(SlotMessage.SEND_SHOW_GUIDE_MINIGAME, Constants.MINIGAME_SLOT20);
  }

  activeLeaveGame(params){
    this.sendNotification(SlotMessage.SEND_LEAVE_ROOM_LUCKY_CAFE);
  }
}

module.exports = Slot20SceneMediator;
