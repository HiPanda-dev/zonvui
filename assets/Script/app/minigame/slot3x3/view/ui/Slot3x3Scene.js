var BasePopup = require('BasePopup');
var Slot3x3SceneMediator = require('Slot3x3SceneMediator');
var GamePanelSlot3x3 = require('GamePanelSlot3x3');
var EffectPanelSlot3x3 = require('EffectPanelSlot3x3');
var ChooselinePanelSlot3x3 = require('ChooselinePanelSlot3x3');
var LinePanelSlot3x3 = require('LinePanelSlot3x3');
var MessagePanelSlot3x3 = require('MessagePanelSlot3x3');
var RankingPanelSlot3x3 = require('RankingPanelSlot3x3');
var HistoryPanelSlot3x3 = require('HistoryPanelSlot3x3');
cc.Class({
    extends: BasePopup,

    properties: {
      gamePanel: GamePanelSlot3x3,
      effectPanel: EffectPanelSlot3x3,
      chooselinePanel: ChooselinePanelSlot3x3,
      linePanel: LinePanelSlot3x3,
      messagePanel: MessagePanelSlot3x3,
      rankPanel:RankingPanelSlot3x3,
      historyPanel:HistoryPanelSlot3x3,
    },

    onLoad () {
      Slot3x3SceneMediator.getInstance.init(this);

      this.gamePanel.node.on('ACTIVE_SEND_SPIN', this.onActiveSendSpin, this);
      this.gamePanel.node.on('ACTIVE_SHOW_CHOOSE_LINE_PANEL', this.onActiveShowChoosePanel, this);
      this.gamePanel.node.on('ACTIVE_SHOW_MESSAGE', this.onActiveShowMesage, this);
      this.gamePanel.node.on('ACTIVE_RANK', this.onActiveRank, this);
      this.gamePanel.node.on('ACTIVE_HISTORY', this.onActiveMyHistory, this);
      this.gamePanel.node.on('ACTIVE_GUIDE', this.onActiveGuide, this);
      this.gamePanel.node.on('ACTIVE_LEAVE_GAME', this.onActiveLeaveGame, this);

      this.chooselinePanel.node.on('ACTIVE_UPDATE_COUNT_LINE', this.onUpdateCountLine, this);
      this.rankPanel.node.on('ACTIVE_RANKING_SHOW_PAGE', this.onActiveRankShowPage, this);
      this.historyPanel.node.on('ACTIVE_HISTORY_SHOW_PAGE', this.onActiveHistoryShowPage, this);
      this.curRankPage = 1;
    },

    show () {
      BasePopup.prototype.show.call(this);
      this.node.setSiblingIndex(this.node.parent.childrenCount - 1);
    },

    onActiveRankShowPage(params) {
      this.activeRank({page:params.curPage});
    },

    onActiveHistoryShowPage(params) {
      this.activeMyHistory({page:params.curPage});
    },

    buildUI() {
      this.gamePanel.buildUI(this.gameVO);
      this.chooselinePanel.buildUI(this.gameVO);
    },

    onActiveSendSpin(params) {
      var data = {
        bet: this.gamePanel.getRoomBet(),
        lines: this.gameVO.getLinesBet()
      }
      this.activeSendSpin(data);
      this.effectPanel.hide();
    },

    onActiveShowChoosePanel(params) {
      this.chooselinePanel.show();
    },

    onActiveRank(params) {
      this.rankPanel.show();
    },

    onActiveMyHistory(params) {
      this.historyPanel.show();
    },

    onActiveGuide(params) {
      this.activeGuide();
    },

    onUpdateCountLine(params) {
      this.gamePanel.onUpdateCountLine(params);
    },

    onSpinAndResult(data) {
      this.gamePanel.onSpinAndResult(data);
    },

    onShowEffectItemWin(wins) {
      var itemPos = this.linePanel.getItemPos(wins[0]);
      this.gamePanel.onShowEffectItemWin(itemPos);
    },

    onHideAllEffectItemWin() {
      this.gamePanel.onHideAllEffectItemWin();
    },

    onShowLineWin(data) {
      this.linePanel.onShowLineWin(data);
    },

    onShowEffectWin(data) {
      this.effectPanel.onShowEffectWin(data);
    },

    onHideEffectWin(data) {
      this.effectPanel.hide();
    },

    onShowMessage(message) {
      this.messagePanel.onShowMessage(message);
    },

    onHideAllLine() {
      this.effectPanel.hide();
      this.linePanel.resetLineWin();
    },

    onSetAutoSpin(autoSpin) {
      this.gamePanel.onSetAutoSpin(autoSpin);
    },

    onActiveShowMesage(params) {
      this.messagePanel.onShowMessage(params.message);
    },

    onUpdateJackpot(roomJackPot) {
      this.gamePanel.onUpdateJackpot(roomJackPot);
    },

    onActiveLeaveGame() {
      this.activeLeaveGame();
      this.hide();
    },

    onUpdateRank(data) {
      this.rankPanel.updateRank(data);
    },

    onUpdateHistory(data) {
      this.historyPanel.updateHistory(data);
    }
});
