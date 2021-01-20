var BasePopup = require('BasePopup');
var Utility = require('Utility');

cc.Class({
    extends: BasePopup,

    properties: {
      lbCurPage: cc.Label,
      btnGroup:cc.Node,
      icon_top: [cc.SpriteFrame]
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
      this.node.emit('ACTIVE_RANKING_SHOW_PAGE', {curPage: this.curPage});
    },

    updateRank: function (data) {
      this.lbCurPage.string = "" + this.curPage + " / " + this.totalPages;
      // this.btnGroup.active = true;
      this.content.removeAllChildren();
      for(var i=0 ; i<data.length ; i++){
        var item = cc.instantiate(this.itemTemp);
        item.data = data[i];
        item.getChildByName("bgLine").active = (i % 2 !== 0);
        if(i <= 2){
            item.getChildByName("lbSTT").active = false;
            item.getChildByName("iconTop").getComponent(cc.Sprite).spriteFrame = this.icon_top[i];
        }
        else{
            item.getChildByName("lbSTT").getComponent(cc.Label).string = "" + data[i].rank;
        }
        item.getChildByName("lbName").getComponent(cc.Label).string = data[i].nickName;
        item.getChildByName("lbWin").getComponent(cc.Label).string = Utility.formatCurrency(data[i].money);

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
