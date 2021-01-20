var BaseScene = require('BaseScene');
var Utility = require('Utility');
var i18n = require('i18n');

cc.Class({
    extends: BaseScene,

    properties: {
      txtSession:cc.Label,
      txtUserName: cc.Label,
      txtBet: cc.Label,
      txtPrize: cc.Label,
      txtLine:cc.Label,
      listWinContent:cc.Node,
      listItem:cc.Node,
    },

    onLoad () {
      this.itemWin = this.listItem.getChildByName('item');
      this.listItem.removeAllChildren();
    },

    show: function () {
      this.node.active = true;
    },

    hide: function() {
      this.node.active = false;
    },

    updateData: function(data) {
      var arrData = data.detail.split('|');
      var arrLine = arrData[0].split('');
      var arrItems = JSON.parse(arrData[1]);
      var arrWin = JSON.parse(arrData[2]);
      var arrChooseLine = [];
      for(var i = 0; i < arrLine.length;i++) {
        if(arrLine[i] === "1") {
          arrChooseLine.push(i+1);
        }
      }

      this.txtSession.string = Utility.setText(i18n.t("C0115"), [data.id]);
      this.txtUserName.string = Utility.setText(i18n.t("C0114"), [data.nickName]);
      this.txtBet.string = Utility.setText(i18n.t("C0113"), [Utility.formatCurrency(data.bet)]);
      this.txtPrize.string = Utility.setText(i18n.t("C0112"), [Utility.formatCurrency(data.prize)]);
      this.txtLine.string = Utility.setText(i18n.t("C0111"), [arrChooseLine.length, arrChooseLine.toString()]);

      this.listItem.removeAllChildren();
      // for(var i = 0; i < arrWin.length;i++) {
      //   var o = JSON.parse(arrWin[i]);
      //   var item = cc.instantiate(this.itemWin);
      //   item.getChildByName('lbLine').getComponent(cc.Label).string = o.Lines
      //   this.listItem.addChild(item);
      // }
    }
});
