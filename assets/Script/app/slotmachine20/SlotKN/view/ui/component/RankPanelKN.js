var BasePopup = require('BasePopup');
var TabRankKN = require('TabRankKN');
var TabHistoryKN = require('TabHistoryKN');
var TabMain = require('TabMain');

cc.Class({
    extends: BasePopup,

    properties: {
      tabRank: TabRankKN,
      tabHistory: TabHistoryKN,
      tabMain:TabMain
    },

    // use this for initialization
    onLoad: function () {
    },

    buildUI(root) {
      this.root = root;
      this.tabRank.buildUI(root);
      this.tabHistory.buildUI(root);
    },

    show() {
      BasePopup.prototype.show.call(this);
    },

    onHandlerChangeTab(evt) {
      // console.log('dkmmmm');
    },

    setPageRank(page) {
      this.tabRank.setPage(page);
    },

    setPageHistoy(page) {
      this.tabHistory.setPage(page);
    },

    updateRank(data) {
      this.tabRank.updateData(data);
    },

    updateHistory(data) {
      this.tabHistory.updateData(data);
    },

    getCurrentTab() {
      return this.tabMain.curPanelIdx;
    }
});
