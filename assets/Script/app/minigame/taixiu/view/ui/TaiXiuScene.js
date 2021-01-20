var BasePopup = require('BasePopup');
var TaiXiuVO = require('TaiXiuVO');
var SoiCauDetailPanel = require('SoiCauDetailPanel');
var GamePanelTaiXiu = require('GamePanelTaiXiu');
var ChatPanelTaiXiu = require('ChatPanelTaiXiu');
var RankingPanelTaiXiu = require('RankingPanelTaiXiu');
var HistoryPanelTaiXiu = require('HistoryPanelTaiXiu');
var DetailSessionTaiXiu = require('DetailSessionTaiXiu');
var EventTaiXiu = require('EventTaiXiu');
var TaiXiuSceneMediator = require('TaiXiuSceneMediator');
var Utility = require('Utility');
var i18n = require('i18n');

cc.Class({
    extends: BasePopup,

    properties: {
        soiCauDetailPanel: SoiCauDetailPanel,
        gamePanel: GamePanelTaiXiu,
        chatPanel: ChatPanelTaiXiu,
        rankPanel: RankingPanelTaiXiu,
        historyPanel: HistoryPanelTaiXiu,
        detailSession: DetailSessionTaiXiu,
        eventPanel: EventTaiXiu
    },

    // use this for initialization
    onLoad: function () {
        TaiXiuSceneMediator.getInstance.init(this);
        this.txVO = null;
        cc.log('123');
        this.addEventListeners();
    },

    buildUI(mySelf) {
      this.gamePanel.buildUI(this.txVO, this);
      this.chatPanel.buildUI(mySelf);

    },

    addEventListeners() {
      this.gamePanel.node.on('ACTIVE_SEND_BET', this.onActiveSendBet, this);
      this.gamePanel.node.on('ACTIVE_DETAIL_SESSION', this.onActiveDetailSession, this);
      this.gamePanel.node.on('ACTIVE_RANK', this.onActiveRank, this);
      this.gamePanel.node.on('ACTIVE_HISTORY', this.onActiveHistory, this);
      this.gamePanel.node.on('ACTIVE_GUIDE', this.onActiveGuide, this);

      this.chatPanel.node.on('ACTIVE_SEND_CHAT', this.onActiveSendChat, this);
      this.rankPanel.node.on('ACTIVE_RANKING_SHOW_PAGE', this.onActiveRankShowPage, this);
      this.historyPanel.node.on('ACTIVE_HISTORY_SHOW_PAGE', this.onActiveHistoryShowPage, this);
      this.detailSession.node.on('ACTIVE_DETAIL_SESSION_UPDATE', this.onActiveDetailSessionUpdate, this);
      this.eventPanel.node.on('ACTIVE_EVENT_UPDATE', this.onActiveEventUpdate, this);
    },

    show() {
      BasePopup.prototype.show.call(this);
      this.node.setSiblingIndex(this.node.parent.childrenCount - 1);
    },

    onActiveRankShowPage(params) {
      this.activeRank({page:params.curPage});
    },

    onActiveHistoryShowPage(params) {
      this.activeHistory({page:params.curPage});
    },

    onActiveDetailSession(params) {
        this.detailSession.show();
        this.activeDetailSession(params);
    },

    onActiveEvent(params) {
        this.eventPanel.show();
        this.activeEventTaiXiu(params);
    },

    onActiveEventUpdate(params) {
        // this.eventPanel.show();
        this.activeEventTaiXiu(params);
    },

    onActiveDetailSessionUpdate(params) {
        this.activeDetailSession(params);
    },

    onActiveSendBet(params){
      this.activeSendBetTaiXiu(params);
    },

    onActiveSendChat(params){
      this.activeSendChat(params);
    },

    onActiveRank(params){
        this.rankPanel.show();
    },

    onActiveHistory(params){
        this.historyPanel.show();
    },

    onActiveGuide(params){
      this.activeGuide(params);
    },

    onUpdateTimer: function(time) {
      this.gamePanel.onUpdateTimer(time);
    },

    onUpdateGameState: function(txVO) {
      this.gamePanel.onUpdateGameState(txVO);
    },

    onUpdateMyHistory: function(history) {
      this.gamePanel.onUpdateHistory(history);
      this.soiCauDetailPanel.onUpdateHistory(history);
    },

    onBetTaiXiu: function (totalBet, typeBet) {
      this.gamePanel.onBetTaiXiu(totalBet, typeBet);
    },

    onShowMessage: function (message) {
      this.gamePanel.onShowMessage(message);
    },

    onShowResultDice: function(dices) {
      this.gamePanel.onShowResultDice(dices);
    },

    onUpdateBoardBet: function (totalTai, totalXiu, numTai, numXiu) {
      this.gamePanel.onUpdateBoardBet(totalTai, totalXiu, numTai, numXiu);
    },

    onUpdateChat: function (params) {
      this.chatPanel.onUpdateChat(params);
    },

    onUpdateRank: function(data) {
      this.rankPanel.updateRank(data);
    },

    onUpdateHistory: function(data) {
      this.historyPanel.updateHistory(data);
    },

    onUpdateDetailSession: function(data) {
        this.detailSession.updateDetailSession(data);
    },

    onUpdateTopEvent: function (data) {
        this.eventPanel.updateEventTaiXiu(data);
    }

});
