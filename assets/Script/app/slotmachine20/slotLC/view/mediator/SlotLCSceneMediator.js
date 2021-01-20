var BaseMediator = require('BaseMediator');
var Constants = require('Constants');
var SlotMessage = require('SlotMessage');
var CustomAction = require('CustomAction');
var SlotLCProxy = require('SlotLCProxy');
var LobbyMessage = require('LobbyMessage');
var SoundGameMessage = require('SoundGameMessage');
var UserProxy = require('UserProxy');
var SoundGameMessage = require('SoundGameMessage');

class SlotLCSceneMediator extends BaseMediator {
  static get NAME() {
    return 'SlotLCSceneMediator';
  }

  static get getInstance() {
    if(this.instance === undefined){
        this.instance = new SlotLCSceneMediator();
    }
    return this.instance;
  }

  onRegister() {
      puremvc.Mediator.call(this, this.constructor.NAME);
  }

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
        SlotMessage.SHOW_INFO_TOURNAMENT_LUCKY_CAFE,
        SlotMessage.HIDE_INFO_TOURNAMENT_LUCKY_CAFE,
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
          case SlotMessage.ON_INIT_GAME_LUCKY_CAFE:
            this.view.buildUI(SlotLCProxy.proxy.gameVO);
            this.activePlayMusicdGame();
            break;
          case SlotMessage.SHOW_MINIGAME_LUCKY_CAFE:
            this.view.show();
            break;
          case SlotMessage.HIDE_MINIGAME_LUCKY_CAFE:
            this.view.hide();
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
          case SlotMessage.SHOW_INFO_TOURNAMENT_LUCKY_CAFE:
              this.view.onShowInfoTournament();
              break;
          case SlotMessage.HIDE_INFO_TOURNAMENT_LUCKY_CAFE:
              this.view.onHideInfoTournament();
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
    this.view.activeShowTournament = this.activeShowTournament.bind(this);
    this.view.activePlayMusicdGame = this.activePlayMusicdGame.bind(this);
    this.view.activeStopMusicdGame = this.activeStopMusicdGame.bind(this);
  }

  activeStopMusicdGame(params) {
    this.sendNotification(LobbyMessage.STOP_BACKGROUND_MUSIC);
  }

  activePlayMusicdGame(params) {
    this.sendNotification(LobbyMessage.PLAY_BACKGROUND_MUSIC, {soundName: SoundGameMessage.BG_LUCKY_CAFE_SOUND, volume: 0.2});
  }

  activePlaySoundEffect(params) {
    this.sendNotification(SlotMessage.SEND_SPIN_LUCKY_CAFE , {data: params});
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

  activeMyHistoryShowPage(page){
    this.sendNotification(SlotMessage.SEND_GET_MY_HISTORY_LUCKY_CAFE, {page});
  }

  activeGuide(params){
    this.sendNotification(SlotMessage.SEND_SHOW_GUIDE_MINIGAME, Constants.MINIGAME_SLOT20);
  }

  activeShowTournament(gameModule){
    this.sendNotification(LobbyMessage.SHOW_LIST_TOURNAMENT_SCENE, gameModule);
  }

  activeLeaveGame(params){
    this.sendNotification(LobbyMessage.SHOW_LOBBY);
    this.sendNotification(SlotMessage.SEND_LEAVE_ROOM_LUCKY_CAFE);
    this.sendNotification(LobbyMessage.PLAY_BACKGROUND_MUSIC, {soundName: SoundGameMessage.LOBBY_SOUND, volume: 1});
  }
}

module.exports = SlotLCSceneMediator;
