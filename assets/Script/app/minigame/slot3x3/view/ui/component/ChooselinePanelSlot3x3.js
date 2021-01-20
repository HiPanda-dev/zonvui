var BaseScene = require('BaseScene');
var Utility = require('Utility');

cc.Class({
    extends: BaseScene,

    properties: {
        atlas: cc.SpriteAtlas,
        numLine: 20,
        container: cc.Node,
        txtNumLine: cc.Label,
        txtTotalBet:cc.Label
    },

    onLoad () {
      this.createAllLine();
    },

    buildUI: function(gameVO) {
      this.gameVO = gameVO;
    },

    createAllLine: function() {
      var toggle1 = this.container.getChildByName('toggle1');
      var toggle2 = this.container.getChildByName('toggle2');
      var toggle3 = this.container.getChildByName('toggle3');


      var posStart = new cc.Vec2(toggle1.x, toggle1.y);
      var spaceWidth = toggle2.x - toggle1.x;
      var spaceHeight = toggle3.y - toggle1.y;

      this.container.removeAllChildren();
      this.listChooseLine = [];

      for(var i = 1; i <= this.numLine; i++){
        var toggle = cc.instantiate(toggle1);
        var background = toggle.getChildByName('Background');
        var checkmark = toggle.getChildByName('checkmark');
        var bgSprite = this.getSpriteAtlas(i.toString());
        var checkmarkSprite = this.getSpriteAtlas(i + "_active");
        background.getComponent(cc.Sprite).spriteFrame =  bgSprite;
        checkmark.getComponent(cc.Sprite).spriteFrame =  checkmarkSprite;
        var mx = (i % 5 === 0) ? 5 : i % 5;
        var my = Math.ceil(i / 5) - 1;
        toggle.getComponent(cc.Toggle).check();
        toggle.x = posStart.x + (mx - 1) * spaceWidth;
        toggle.y = posStart.y + my * spaceHeight;
        this.container.addChild(toggle);
        this.listChooseLine[i] = toggle;
      }
      this.updateLineBetData();
    },

    onHanderCheckerEvent: function() {
      this.updateLineBetData();
    },

    onHandlerDongChan: function() {
      for(var i = 1; i <= this.numLine; i++){
        var toggle =  this.listChooseLine[i];
        if(i%2===0) toggle.getComponent(cc.Toggle).check();
        else toggle.getComponent(cc.Toggle).uncheck();
      }
    },

    onHandlerDongLe: function() {
      for(var i = 1; i <= this.numLine; i++){
        var toggle =  this.listChooseLine[i];
        if(i%2===1)  toggle.getComponent(cc.Toggle).check();
        else toggle.getComponent(cc.Toggle).uncheck();
      }
    },

    onHandlerTatCa: function() {
      for(var i = 1; i <= this.numLine; i++){
        var toggle =  this.listChooseLine[i];
        toggle.getComponent(cc.Toggle).check();
      }
    },

    onHandlerChonLai: function() {
      for(var i = 1; i <= this.numLine; i++){
        var toggle =  this.listChooseLine[i];
        toggle.getComponent(cc.Toggle).uncheck();
      }
    },

    onHandlerClose: function() {
      this.node.active = false;
    },

    getSpriteAtlas: function(name) {
      return this.atlas.getSpriteFrame(name);;
    },


    updateLineBetData: function(){
      var result = '';
      for(var i = 1; i <= this.numLine; i++){
          if(!this.listChooseLine[i]) continue;
          var toggle =  this.listChooseLine[i].getComponent(cc.Toggle);
          result += (toggle.isChecked) ? 1 : 0;
      }
      this.gameVO.setLinesBet(result);
      this.txtNumLine.string = this.gameVO.getCountBet();
      this.txtTotalBet.string = Utility.formatCurrency2(this.gameVO.getTotalBet());
      this.node.emit('ACTIVE_UPDATE_COUNT_LINE', this.gameVO.getCountBet());
    }
});
