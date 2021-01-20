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
      this.gamePanel.node.on('ACTIVE_SEND_SPIN', this.onActiveSendSpin, this);
      this.gamePanel.node.on('ACTIVE_SHOW_CHOOSE_LINE_PANEL', this.onActiveShowChoosePanel, this);
      this.gamePanel.node.on('ACTIVE_SHOW_MESSAGE', this.onActiveShowMesage, this);
      this.gamePanel.node.on('ACTIVE_RANK', this.onActiveRank, this);
      this.gamePanel.node.on('ACTIVE_HISTORY', this.onActiveMyHistory, this);
      this.gamePanel.node.on('ACTIVE_GUIDE', this.onActiveGuide, this);
      this.gamePanel.node.on('ACTIVE_SHOW_SELECT_ROOM_PANEL', this.onActiveShowSelectRoom, this);
      this.gamePanel.node.on('ACTIVE_SELECT_ROOM', this.onActiveSelectRoom, this);

      this.chooseLinePanel.node.on('ACTIVE_UPDATE_COUNT_LINE', this.onUpdateCountLine, this);
      this.topPanel.node.on('ACTIVE_SHOW_HELP_PANEL', this.onShowHelpPanel, this);
      this.topPanel.node.on('ACTIVE_LEAVE_GAME', this.onActiveLeaveGame, this);
      this.topPanel.node.on('ACTIVE_SHOW_CASH_IN_FORM', this.onActiveShowCashInForm, this);
      this.topPanel.node.on('ACTIVE_RANK_PANEL', this.onShowRankPanel, this);

      this.rankPanel.node.on('ACTIVE_RANKING_SHOW_PAGE', this.onActiveRankShowPage, this);

    },

    buildUI(gameVO) {
      this.gameVO = gameVO;
      this.gamePanel.buildUI(gameVO);
      this.topPanel.buildUI(gameVO);
      this.chooseLinePanel.buildUI(gameVO);
    },

    onActiveShowSelectRoom() {
      this.gamePanel.hide();
    },

    onActiveRankShowPage(page) {
      this.activeRankShowPage(page);
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
      this.rankPanel.updateDataJackpot(data);
    },

    onUpdateRankBigWin(data) {
      this.rankPanel.updateDataBigWin(data);
    },

    onUpdateMyHistory(data) {
      this.rankPanel.updateDataHistory(data);
    },

    onShowMinigame(data) {
      this.effectPanel.onShowMinigame(data.gameVO);
      TweenLite.delayedCall(2, function(){
        this.minigamePanel.onStartGame(data.gameVO.minigame, data.playComplete);
        this.effectPanel.hide();
      }.bind(this))
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

    onActiveLeaveGame() {
      this.activeLeaveGame();
      this.hide();
    }
});
