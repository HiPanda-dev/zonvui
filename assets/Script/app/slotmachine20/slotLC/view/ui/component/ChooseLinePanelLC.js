var BasePopup = require('BasePopup');

cc.Class({
    extends: BasePopup,

    properties: {
        atlas: cc.SpriteAtlas,
        numLine: 20,
        container: cc.Node,
        txtLine:cc.Label
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
        var id = (i<10) ? '0' + i : i;
        var bgSprite = this.getSpriteAtlas('D' + id);
        var checkmarkSprite = this.getSpriteAtlas('D' + id);
        background.getComponent(cc.Sprite).spriteFrame =  bgSprite;
        checkmark.getComponent(cc.Sprite).spriteFrame =  checkmarkSprite;
        background.opacity = 100;
        var mx = (i % 4 === 0) ? 4 : i % 4;
        var my = Math.ceil(i / 4) - 1;

        toggle.x = posStart.x + (mx - 1) * spaceWidth;
        toggle.y = posStart.y + my * spaceHeight;
        this.container.addChild(toggle);
        this.listChooseLine[i] = toggle;
      }
    },

    onHandlerDongChan: function() {
      for(var i = 1; i <= this.numLine; i++){
        var toggle =  this.listChooseLine[i];
        if(i%2===0) toggle.getComponent(cc.Toggle).check();
        else toggle.getComponent(cc.Toggle).uncheck();
      }

      this.updateLineBetData();
    },

    onHandlerDongLe: function() {
      for(var i = 1; i <= this.numLine; i++){
        var toggle =  this.listChooseLine[i];
        if(i%2===1)  toggle.getComponent(cc.Toggle).check();
        else toggle.getComponent(cc.Toggle).uncheck();
      }
      this.updateLineBetData();
    },

    onHandlerTatCa: function() {
      for(var i = 1; i <= this.numLine; i++){
        var toggle =  this.listChooseLine[i];
        toggle.getComponent(cc.Toggle).check();
      }
      this.updateLineBetData();
    },

    onHandlerChonLai: function() {
      for(var i = 1; i <= this.numLine; i++){
        var toggle =  this.listChooseLine[i];
        toggle.getComponent(cc.Toggle).uncheck();
      }
      this.updateLineBetData();
    },

    onHandlerChooseLine: function() {
      this.updateLineBetData();
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
          var toggle =  this.listChooseLine[i].getComponent(cc.Toggle);
          result += (toggle.isChecked) ? 1 : 0;
      }
      this.gameVO.setLinesBet(result);
      this.txtLine.string = this.gameVO.getNumBetLine();
      this.node.emit('ACTIVE_UPDATE_COUNT_LINE');
    }
});
