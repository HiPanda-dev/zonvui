var Utility = require('Utility');
cc.Class({
    extends: cc.Component,

    properties: {
      lbCurPage: cc.Label,
      btnGroup:cc.Node,
      content:cc.Node
    },

    // use this for initialization
    onLoad: function () {
      this.itemTemp = this.content.getChildByName("item");
      this.curPage = 1;
      this.totalPages = 20;
      this.isLoad = true;
    },

    buildUI(root) {
      this.root = root;
    },

    updateData: function(data) {
      if(this.isLoad !== true) this.onLoad();
      this.lbCurPage.string = "" + this.curPage + " / " + this.totalPages;
      this.btnGroup.active = true;
      this.content.removeAllChildren();
      for(var i=0 ; i<data.length ; i++){
        var item = cc.instantiate(this.itemTemp);
        item.data = data[i];
        // item.getChildByName("bgLine").active = (i % 2 === 0);
        item.getChildByName("txtTime").getComponent(cc.Label).string = data[i].date;
        item.getChildByName("txtBetLine").getComponent(cc.Label).string =  Utility.formatCurrency(data[i].bet);
        item.getChildByName("txtLineWin").getComponent(cc.Label).string = data[i].lineWin;
        item.getChildByName("txtJackpot").getComponent(cc.Label).string = Utility.formatCurrency(data[i].jackpot);
        item.getChildByName("txtPrize").getComponent(cc.Label).string = Utility.formatCurrency(data[i].prize);
        this.content.addChild(item);
      }
    },

    setPage(page) {
      this.curPage = page;
      this.root.activeMyHistoryShowPage(this.curPage);
    },

    onHandlerNextPage: function() {
      this.curPage = (this.curPage < this.totalPages) ? this.curPage + 1: this.totalPages;
      this.root.activeMyHistoryShowPage(this.curPage);
    },

    onHandlerPrevPage: function() {
      this.curPage = (this.curPage > 1) ? this.curPage - 1: 1;
      this.root.activeMyHistoryShowPage(this.curPage);
    },
});
