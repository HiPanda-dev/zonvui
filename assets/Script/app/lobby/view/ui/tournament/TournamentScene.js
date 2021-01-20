var BasePopup = require('BasePopup');
var TournamentSceneMediator = require('TournamentSceneMediator');
var RichTextLocalized = require('RichTextLocalized');
var Utility = require('Utility');
var i18n = require('i18n');

cc.Class({
    extends: BasePopup,

    properties: {
      txtNumPlayer:cc.Label,
      txtLePhi:RichTextLocalized,
      txtLevelMin:RichTextLocalized,
      mcTopPlayer:[cc.Node],
      topPlayerContent: cc.Node,
      listRewardContent: cc.Node,
      iconTop: [cc.SpriteFrame]
    },

    ctor: function() {
      TournamentSceneMediator.getInstance.init(this);
      this.data = null;
    },

    // use this for initialization
    onLoad: function () {
        this.itemTemp = this.listRewardContent.getChildByName("item");
        this.itemTop = this.topPlayerContent.getChildByName("item");
    },

    setData: function(data) {
      this.data = data;
      // data.prizes = [5000,3000,2000,1000];
      this.txtNumPlayer.string = data.numPlayer + '/' + data.maxPlayer;
      this.txtLePhi.string = Utility.setText(i18n.t("C0234"), [data.tax]);
      this.txtLevelMin.string = 'Level min : ' + data.myPos;

      this.listRewardContent.removeAllChildren();
      var item;
      for(var i=0 ; i<data.prizes.length ; i++){
          item = cc.instantiate(this.itemTemp);
          if (i < 3) {
              item.getChildByName("stt").active = false;
              item.getChildByName("iconTop").getComponent(cc.Sprite).spriteFrame = this.iconTop[i];
          }
          else{
              item.getChildByName("iconTop").active = false;
              item.getChildByName("stt").getComponent(cc.Label).string = i+1;
          }
          item.getChildByName("txtMoney").getComponent(cc.Label).string = Utility.formatCurrency(data.prizes[i]);
          this.listRewardContent.addChild(item);
      }
    },

    updateTopPlayer: function (data) {
        if(!this.itemTop) return;
        this.topPlayerContent.removeAllChildren();
        var item;
        for(var i=0 ; i<data.l.length ; i++){
            item = cc.instantiate(this.itemTop);
            item.getChildByName("txtName").getComponent(cc.Label).string = data.l[i].a;
            item.getChildByName("txtMoney").getComponent(cc.Label).string = Utility.formatCurrency(data.l[i].p);
            this.topPlayerContent.addChild(item);
        }
    },

    onHandlerJoinTournament: function() {
      this.activeJoinTounament(this.data.moduleId, this.data.tourId);
    },

    onHandlerCloseTounament: function() {
      this.activeJoinGame(this.data.moduleId, this.data.tourId);
    }

});
