var BaseScene = require('BaseScene');
var ChooseLinePanelLC = require('ChooseLinePanelLC');
var EffectPanelLC = require('EffectPanelLC');
var GamePanelLC = require('GamePanelLC');
var HelpPanelLC = require('HelpPanelLC');
var LinePanelLC = require('LinePanelLC');
var MessagePanelLC = require('MessagePanelLC');
var MinigamePanelLC = require('MinigamePanelLC');
var RankPanelLC = require('RankPanelLC');
var TopPanelLC = require('TopPanelLC');
var Constants = require('Constants');
var SlotLCSceneMediator = require('SlotLCSceneMediator');

cc.Class({
    extends: BaseScene,

    properties: {
      chooseLinePanel: ChooseLinePanelLC,
      effectPanel: EffectPanelLC,
      gamePanel: GamePanelLC,
      helpPanel: HelpPanelLC,
      linePanel: LinePanelLC,
      topPanel: TopPanelLC,
      rankPanel: RankPanelLC,
      minigamePanel: MinigamePanelLC,
      messagePanel: MessagePanelLC,
    },

    onLoad () {
      SlotLCSceneMediator.getInstance.init(this);
      this.isShowFirtRank = true;
      this.gamePanel.node.on('ACTIVE_SEND_SPIN', this.onActiveSendSpin, this);
      this.gamePanel.node.on('ACTIVE_SHOW_CHOOSE_LINE_PANEL', this.onActiveShowChoosePanel, this);
      this.gamePanel.node.on('ACTIVE_SHOW_MESSAGE', this.onActiveShowMesage, this);
      this.gamePanel.node.on('ACTIVE_RANK', this.onActiveRank, this);
      this.gamePanel.node.on('ACTIVE_HISTORY', this.onActiveMyHistory, this);
      this.gamePanel.node.on('ACTIVE_GUIDE', this.onActiveGuide, this);
      this.gamePanel.node.on('ACTIVE_SHOW_SELECT_ROOM_PANEL', this.onActiveShowSelectRoom, this);
      this.gamePanel.node.on('ACTIVE_SELECT_ROOM', this.onActiveSelectRoom, this);
      this.gamePanel.node.on('ACTIVE_SHOW_TOURNAMENT', this.onActiveShowTournament, this);

      this.chooseLinePanel.node.on('ACTIVE_UPDATE_COUNT_LINE', this.onUpdateCountLine, this);
      this.topPanel.node.on('ACTIVE_SHOW_HELP_PANEL', this.onShowHelpPanel, this);
      this.topPanel.node.on('ACTIVE_LEAVE_GAME', this.onActiveLeaveGame, this);
      this.topPanel.node.on('ACTIVE_SHOW_CASH_IN_FORM', this.onActiveShowCashInForm, this);
      this.topPanel.node.on('ACTIVE_RANK_PANEL', this.onShowRankPanel, this);
      this.topPanel.node.on('ACTIVE_PLAY_BACKGROUND_MUSIC_GAME', this.onPlayMusicdGame, this);
      this.topPanel.node.on('ACTIVE_STOP_BACKGROUND_MUSIC_GAME', this.onStopMusicdGame, this);
      this.topPanel.node.on('ACTIVE_PLAY_SOUND_EFFECT', this.onPlaySoundEffect, this);
    },

    buildUI(gameVO) {
      this.gameVO = gameVO;
      this.gamePanel.buildUI(gameVO);
      this.topPanel.buildUI(gameVO);
      this.chooseLinePanel.buildUI(gameVO);

      this.rankPanel.buildUI(this);
    },

    onStopMusicdGame() {
      this.activeStopMusicdGame();
    },

    onPlayMusicdGame() {
      this.activePlayMusicdGame();
    },


    onActiveShowSelectRoom() {
      this.gamePanel.hide();
    },

    onActiveSelectRoom(roomId) {
      this.gameVO.updateSelectRoomId(parseInt(roomId));
      this.topPanel.onUpdateJackpot(this.gameVO.getCurrentJackpot());
      this.gamePanel.show();
    },

    onActiveShowCashInForm() {
      this.activeShowCashInForm();
    },

    onActiveSendSpin(params) {
      var data = {
        bet: this.gameVO.bet,
        lines: this.gameVO.getLinesBet()
      }
      this.activeSendSpin(data);
      this.effectPanel.hide();
    },

    onActiveShowChoosePanel(params) {
      this.chooseLinePanel.show();
    },

    onActiveRank(params) {
      this.activeRank();
    },

    onActiveMyHistory(params) {
      this.activeMyHistory();
    },

    onActiveGuide(params) {
      this.activeGuide();
    },

    onShowRankPanel() {
      if(this.isShowFirtRank) {
        this.isShowFirtRank = false;
        this.rankPanel.setPageRank(1);
        this.rankPanel.setPageHistoy(1);
      }
      this.rankPanel.show();
    },

    onUpdateCountLine() {
      this.gamePanel.onUpdateCountLine();
    },

    onSpinAndResult(data) {
      this.gamePanel.onSpinAndResult(data);
    },

    onShowLineWin(wins) {
      this.linePanel.onShowLineWin(wins);
    },

    onPlayAnimBonus() {
      this.gamePanel.playAnimBonus();
    },

    onPlayAnimScatter() {
      this.gamePanel.playAnimScatter();
    },

    onPlayAnimJackpot() {
      this.gamePanel.playAnimJackpot();
    },

    onShowEffectItemWin(wins) {
      var itemPos = this.linePanel.getItemPos(wins[0]);
      this.gamePanel.onShowEffectItemWin(itemPos, wins[0].itemId);
    },

    onHideAllEffectItemWin() {
      this.gamePanel.onHideAllEffectItemWin();
    },

    onShowEffectWin(data) {
      this.effectPanel.onShowEffectWin(data);
      this.gamePanel.onShowWinMoney(data);
    },

    onShowEffectFreeSpin(data) {
      this.effectPanel.onShowEffectFreeSpin(data);
    },

    onUpdateRank(data) {
      this.rankPanel.updateRank(data);
    },

    onUpdateHistory(data) {
      this.rankPanel.updateHistory(data);
    },

    onShowMinigame(data) {
      this.effectPanel.onShowMinigame(data.gameVO);
      TweenLite.delayedCall(2, function(){
        this.minigamePanel.onStartGame(data.gameVO.minigame, data.playComplete);
        this.effectPanel.hide();
      }.bind(this))
    },

    onActiveShowTournament() {
        this.activeShowTournament(Constants.SLOT20_LUCKY_CAFE);
    },

    onHideEffectWin(data) {
      this.effectPanel.hide();
    },

    onShowMessage(message) {
      this.messagePanel.onShowMessage(message);
    },

    onHideAllLine() {
      // this.effectPanel.hide();
      this.linePanel.resetLineWin();
    },

    onSetAutoSpin(autoSpin) {
      this.gamePanel.onSetAutoSpin(autoSpin);
    },

    onActiveShowMesage(params) {
      this.messagePanel.onShowMessage(params.message);
    },

    onUpdateJackpot(data) {
      this.topPanel.onUpdateJackpot(data.roomJackPot);
    },

    onUpdateUserInfo(mySelf) {
      this.topPanel.onUpdateMyMoney(mySelf.money);
      this.topPanel.onUpdateMyAvatar(mySelf.avatar);
    },

    onSetNumAutoSpin(data) {
      this.gamePanel.onSetNumAutoSpin(data.num);
    },

    onShowHelpPanel() {
      this.helpPanel.show();
    },

    onShowInfoTournament() {
      this.gamePanel.showInfoTournament();
    },

    onHideInfoTournament() {
        this.gamePanel.hideInfoTournament();
    },

    onUpdateTopTournament(data) {
        this.gamePanel.updateInfoTournament(data);
    },

    onActiveLeaveGame() {
      this.activeLeaveGame();
    }
});
