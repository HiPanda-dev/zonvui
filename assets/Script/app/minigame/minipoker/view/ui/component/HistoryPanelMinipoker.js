var BasePopup = require('BasePopup');
var Utility = require('Utility');
var AssetVO = require('AssetVO');

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
    },

    show: function () {
      this.curPage = 1;
      BasePopup.prototype.show.call(this);
      this.content.removeAllChildren();
      this.node.emit('ACTIVE_HISTORY_SHOW_PAGE', {curPage: this.curPage});
    },

    updateHistory: function (data) {
      this.lbCurPage.string = "" + this.curPage + " / " + this.totalPages;
      this.btnGroup.active = true;
      this.content.removeAllChildren();
      for(var i=0 ; i<data.length ; i++){
        var item = cc.instantiate(this.itemTemp);
        item.data = data[i];
        var arrayCards = data[i].cards;
        item.getChildByName("bgLine").active = (i % 2 !== 0);
        item.getChildByName("lbPhien").getComponent(cc.Label).string = data[i].id;
        item.getChildByName("lbTime").getComponent(cc.Label).string = data[i].dateTime;
        item.getChildByName("lbBetValue").getComponent(cc.Label).string = Utility.formatCurrency(data[i].bet);
        item.getChildByName("lbWin").getComponent(cc.Label).string = Utility.formatCurrency(data[i].prize);
        for(var j=0 ; j<5 ; j++){
            var cardName = (arrayCards[j] < 10) ? "cards_0" + arrayCards[j] : "cards_" + arrayCards[j];
            var card = item.getChildByName("card" + j);
            card.getComponent(cc.Sprite).spriteFrame = AssetVO.getTextureGameAtlas(cardName);
        }
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
