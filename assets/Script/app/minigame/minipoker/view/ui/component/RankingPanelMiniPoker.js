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
        item.getChildByName("lbDate").getComponent(cc.Label).string = "" + data[i].dateTime;
        item.getChildByName("lbNickName").getComponent(cc.Label).string = data[i].nickName;
        item.getChildByName("lbBetValue").getComponent(cc.Label).string = Utility.formatCurrency(data[i].bet);
        item.getChildByName("lbPrize").getComponent(cc.Label).string = Utility.formatCurrency(data[i].prize);
        if(data[i].result === 3) {
          item.getChildByName("lbResult").getComponent(cc.Label).string = "Nổ hũ";
        }
        else if(data[i].result === 2){
          item.getChildByName("lbResult").getComponent(cc.Label).string = "Thắng lớn";
        }else{
          item.getChildByName("lbResult").getComponent(cc.Label).string = "Thắng";
        }

        for(var j=0 ; j<5 ; j++){
            var cardName = (data[i].cards[j] < 10) ? "cards_0" + data[i].cards[j] : "cards_" + data[i].cards[j];
            var card = item.getChildByName("card" + j);
            card.getComponent(cc.Sprite).spriteFrame = AssetVO.getTextureGameAtlas(cardName);
        }
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
});
