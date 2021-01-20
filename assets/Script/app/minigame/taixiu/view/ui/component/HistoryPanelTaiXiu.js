var BasePopup = require('BasePopup');
var Utility = require('Utility');
var TaiXiuVO = require('TaiXiuVO');
var i18n = require('i18n');

cc.Class({
    extends: BasePopup,

    properties: {
      lbCurPage: cc.Label,
      btnGroup:cc.Node,
    },

    onLoad () {
      this.content = this.node.getChildByName("content");
      this.itemTemp = this.content.getChildByName("item");
      this.curPage = 1;
      this.totalPages = 20;
      this.hide();
    },

    show: function () {
      this.curPage = 1;
      BasePopup.prototype.show.call(this);
      this.content.removeAllChildren();
      this.node.emit('ACTIVE_HISTORY_SHOW_PAGE', {curPage: this.curPage});
    },

    updateHistory: function (history) {
      this.lbCurPage.string = "" + this.curPage + " / " + this.totalPages;
      this.btnGroup.active = true;
      this.content.removeAllChildren();
      for(var i=0 ; i<history.length ; i++){
        var item = cc.instantiate(this.itemTemp);
        item.data = history[i];
        item.getChildByName("bgLine").active = (i % 2 !== 0);
        item.getChildByName("lbPhien").getComponent(cc.Label).string = history[i].session;
        item.getChildByName("lbTime").getComponent(cc.Label).string = history[i].dateTime;
        if(history[i].typeBet === TaiXiuVO.BET_TAI)
            item.getChildByName("lbGate").getComponent(cc.Label).string = i18n.t("C0168");
        else
            item.getChildByName("lbGate").getComponent(cc.Label).string = i18n.t("C0169");
        var result = JSON.parse("[" + history[i].result + "]");
        var score = parseInt(result[0]) + parseInt(result[1]) + parseInt(result[2]);
        if (score < 11) {
            item.getChildByName("lbResult").getComponent(cc.Label).string = i18n.t("C0169") + " - " + history[i].result;
        }
        else {
            item.getChildByName("lbResult").getComponent(cc.Label).string = i18n.t("C0168") + " - " + history[i].result;
        }
        item.getChildByName("lbBetValue").getComponent(cc.Label).string = Utility.formatCurrency(history[i].bet);
        item.getChildByName("lbRepay").getComponent(cc.Label).string = Utility.formatCurrency(history[i].repay);
        item.getChildByName("lbWin").getComponent(cc.Label).string = Utility.formatCurrency(history[i].prize);
        this.content.addChild(item);
      }
    },

    onHandlerNextPage: function() {
      this.curPage = (this.curPage < this.totalPages) ? this.curPage + 1: this.totalPages;
      this.node.emit('ACTIVE_HISTORY_SHOW_PAGE', {curPage: this.curPage});
    },

    onHandlerPrevPage: function() {
      this.curPage = (this.curPage > 1) ? this.curPage - 1: 1;
      this.node.emit('ACTIVE_HISTORY_SHOW_PAGE', {curPage: this.curPage});
    },
});
