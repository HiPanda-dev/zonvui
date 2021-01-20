var BasePopup = require('BasePopup');
var MiniPokerSceneMediator = require('MiniPokerSceneMediator');
var GamePanelMiniPoker = require('GamePanelMiniPoker');
var EffectPanelMiniPoker = require('EffectPanelMiniPoker');
var MesseageMiniPoker = require('MesseageMiniPoker');
var RankingPanelMiniPoker = require('RankingPanelMiniPoker');
var HistoryPanelMinipoker = require('HistoryPanelMinipoker');

cc.Class({
    extends: BasePopup,

    properties: {
      gamePanel: GamePanelMiniPoker,
      effectPanel: EffectPanelMiniPoker,
      messagePanel: MesseageMiniPoker,
      rankPanel:RankingPanelMiniPoker,
      historyPanel:HistoryPanelMinipoker,
    },

    onLoad: function () {
        MiniPokerSceneMediator.getInstance.init(this);
        this.gamePanel.node.on('ACTIVE_SEND_SPIN', this.onActiveSendSpin, this);
        this.gamePanel.node.on('ACTIVE_SHOW_MESSAGE', this.onActiveShowMesage, this);
        this.gamePanel.node.on('ACTIVE_RANK', this.onActiveRank, this);
        this.gamePanel.node.on('ACTIVE_HISTORY', this.onActiveMyHistory, this);
        this.gamePanel.node.on('ACTIVE_GUIDE', this.onActiveGuide, this);
        this.gamePanel.node.on('ACTIVE_LEAVE_GAME', this.onActiveLeaveGame, this);

        this.rankPanel.node.on('ACTIVE_RANKING_SHOW_PAGE', this.onActiveRankShowPage, this);
        this.historyPanel.node.on('ACTIVE_HISTORY_SHOW_PAGE', this.onActiveHistoryShowPage, this);

        this.rankPanel.node.active = false;
        this.historyPanel.node.active = false;
    },

    buildUI() {
      this.gamePanel.buildUI(this.gameVO);
    },

    show () {
      BasePopup.prototype.show.call(this);
      this.node.setSiblingIndex(this.node.parent.childrenCount - 1);
    },

    onActiveSendSpin(params) {
      var data = {
        bet: this.gameVO.getCurrentBet(),
      }
      this.activeSendSpin(data);
      this.effectPanel.hide();
    },

    onActiveRankShowPage(params) {
      this.activeRank({page:params.curPage});
    },

    onActiveHistoryShowPage(params) {
      this.activeMyHistory({page:params.curPage});
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

    onSpinAndResult(data) {
      this.gamePanel.onSpinAndResult(data);
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
