var BaseScene = require('BaseScene');
var EffectPanelKN = require('EffectPanelKN');
var GamePanelKN = require('GamePanelKN');
var HelpPanelKN = require('HelpPanelKN');
var LinePanelKN = require('LinePanelKN');
var MessagePanelKN = require('MessagePanelKN');
var RankPanelKN = require('RankPanelKN');
var TopPanelKN = require('TopPanelKN');
var SlotKNSceneMediator = require('SlotKNSceneMediator');

cc.Class({
    extends: BaseScene,

    properties: {
      effectPanel: EffectPanelKN,
      gamePanel: GamePanelKN,
      helpPanel: HelpPanelKN,
      linePanel: LinePanelKN,
      topPanel: TopPanelKN,
      rankPanel: RankPanelKN,
      messagePanel: MessagePanelKN,
    },

    onLoad () {
      SlotKNSceneMediator.getInstance.init(this);
      cc.director.getPhysicsManager().enabled = true;
      cc.director.getCollisionManager().enabled = true;
      this.isShowFirtRank = true;
      this.gamePanel.node.on('ACTIVE_SEND_SPIN', this.onActiveSendSpin, this);
      this.gamePanel.node.on('ACTIVE_SHOW_MESSAGE', this.onActiveShowMesage, this);
      this.gamePanel.node.on('ACTIVE_RANK', this.onActiveRank, this);
      this.gamePanel.node.on('ACTIVE_HISTORY', this.onActiveMyHistory, this);
      this.gamePanel.node.on('ACTIVE_GUIDE', this.onActiveGuide, this);
      this.gamePanel.node.on('ACTIVE_SHOW_SELECT_ROOM_PANEL', this.onActiveShowSelectRoom, this);
      this.gamePanel.node.on('ACTIVE_SELECT_ROOM', this.onActiveSelectRoom, this);
      this.gamePanel.node.on('ACTIVE_SHOW_TOURNAMENT', this.onActiveShowTournament, this);

      this.topPanel.node.on('ACTIVE_SHOW_HELP_PANEL', this.onShowHelpPanel, this);
      this.topPanel.node.on('ACTIVE_LEAVE_GAME', this.onActiveLeaveGame, this);
      this.topPanel.node.on('ACTIVE_SHOW_CASH_IN_FORM', this.onActiveShowCashInForm, this);
      this.topPanel.node.on('ACTIVE_RANK_PANEL', this.onShowRankPanel, this);
    },

    buildUI(gameVO) {
      this.gameVO = gameVO;
      this.gamePanel.buildUI(this, gameVO);
      this.topPanel.buildUI(this, gameVO);
      this.rankPanel.buildUI(this);
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

    onShowLineWin(ls) {
      this.linePanel.onShowLineWin(ls);
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

    onShowEffectItemWin(ls) {
      var resultWildItem = this.gamePanel.getAllWildItem();
      var resultScaterItem = this.gamePanel.getAllScatterItem();
      var result = [];
      var money = 0;
      for(var i =0;i< ls.length; i++) {
        var itemPos = this.linePanel.getItemPos(ls[i].id);
        this.gameVO.prize += ls[i].v;
        money += ls[i].v;
        result = result.concat(this.gamePanel.getItemInPosWithItemId(itemPos, ls[i].i));
      }

      if(resultWildItem.length > 2) result = result.concat(resultWildItem);
      if(resultScaterItem.length > 2) result = result.concat(resultScaterItem);
      this.gamePanel.dropAllItem(result);
      this.gamePanel.onShowWinMoney(this.gameVO.prize);
      this.activeAddMoneyToUserInfo(money);
    },

    onUpdateLevel(data) {
      this.gamePanel.onUpdateLevel(data);
    },

    onHideAllEffectItemWin() {
      this.gamePanel.onHideAllEffectItemWin();
    },

    onShowEffectJackpotWin(win) {
      this.gameVO.prize += win.jp;
      this.effectPanel.showNoHu(win.jp);
      this.gamePanel.onShowWinMoney(this.gameVO.prize);
    },

    onShowEffectFreeSpin(data) {
      this.effectPanel.onShowEffectFreeSpin(data);
      this.gamePanel.showFreeSpin(this.gameVO.freeSpin);
    },

    onUpdateRank(data) {
      this.rankPanel.updateRank(data);
    },

    onUpdateHistory(data) {
      this.rankPanel.updateHistory(data);
    },

    onShowMinigame(data) {
    },


    onActiveShowTournament() {
        this.activeShowTournament(Constants.SLOT20_KEO_NGOT);
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

    onUpdateTopTournament(data) {
        this.gamePanel.updateInfoTournament(data);
    },

    onActiveLeaveGame() {
      this.activeLeaveGame();
    }
});
