var BasePopup = require('BasePopup');
var Utility = require('Utility');
var DetailPanel = require('DetailPanel');

cc.Class({
    extends: BasePopup,

    properties: {
      lbCurPage: cc.Label,
      btnGroup:cc.Node,
      detailPanel: DetailPanel,
    },

    onLoad () {
      this.content = this.node.getChildByName("content");
      this.itemTemp = this.content.getChildByName("item");
      this.curPage = 1;
      this.totalPages = 20;
    },

    show: function () {
      this.curPage = 1;
      BasePopup.prototype.show.call(this);
      this.content.removeAllChildren();
      this.node.emit('ACTIVE_RANKING_SHOW_PAGE', {curPage: this.curPage});
    },

    updateRank: function (data) {
      this.lbCurPage.string = "" + this.curPage + " / " + this.totalPages;
      this.btnGroup.active = true;
      this.content.removeAllChildren();
      for(var i=0 ; i<data.length ; i++){
        var item = cc.instantiate(this.itemTemp);
        item.data = data[i];
        item.getChildByName("bgLine").active = (i % 2 !== 0);
        item.getChildByName("lbThoiGian").getComponent(cc.Label).string = Utility.js_mm_dd_hh_mm_ss(data[i].date);
        item.getChildByName("lbNickName").getComponent(cc.Label).string = data[i].nickName;
        item.getChildByName("lbMucCuoc").getComponent(cc.Label).string = Utility.formatCurrency(data[i].bet);
        item.getChildByName("lbPrize").getComponent(cc.Label).string = Utility.formatCurrency(data[i].prize);
        var btn = item.getChildByName("lbChiTiet");
        btn.on(cc.Node.EventType.TOUCH_END, this.onShowChiTietSlot3x3.bind(this), item);
        this.content.addChild(item);
      }
    },

    onHandlerNextPage: function() {
      this.curPage = (this.curPage < this.totalPages) ? this.curPage + 1: this.totalPages;
      this.node.emit('ACTIVE_RANKING_SHOW_PAGE', {curPage: this.curPage});
    },

    onHandlerPrevPage: function() {
      this.curPage = (this.curPage > 1) ? this.curPage - 1: 1;
      this.node.emit('ACTIVE_RANKING_SHOW_PAGE', {curPage: this.curPage});
    },

    onShowChiTietSlot3x3: function(event){
      var data = event.target.parent.data;
      this.detailPanel.show();
      this.detailPanel.updateData(data);
    },
});
