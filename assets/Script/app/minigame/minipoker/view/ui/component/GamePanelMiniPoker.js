var MiniPokerIcon = require('MiniPokerIcon');
var Utility = require('Utility');
var i18n = require('i18n');

cc.Class({
    extends: cc.Component,

    properties: {
      offy: 180,
      totalRow: 1,
      totalColl: 5,
      numItem: 52,
      lbJackPot: cc.Label,
      toggleAutoSpin: cc.Toggle,
      selectToggle:cc.Node,
      wheels: [cc.Node],
      cardAtlas: cc.SpriteAtlas,
      leverSpinAnim: cc.Animation
    },
    onLoad () {
      this.totalItem = 30;
      this.matrixId = [];
      this.matrixItem = [];
      this.posX = 0;
      this.posY = 0;
      this.timeSpin = 1;
      this.posRow = 0;
      this.isAutoSpin = false;
      this.resultItems = [];
      this.onSpinComplete = null;
      this.initMatrix();
    },

    buildUI(gameVO) {
      this.gameVO = gameVO;
    },

    onHandlerSieuToc(target) {
      var toggle = target.getComponent(cc.Toggle);
      this.timeSpin = (toggle.isChecked === true) ? 0.5 : 1;
    },

    onHandlerAutoSpin(target) {
      this.gameVO.autoSpin = target.getComponent(cc.Toggle).isChecked;
      if(this.gameVO.autoSpin === true) {
        this.node.emit('ACTIVE_SEND_SPIN');
      }
    },

    onHandlerLeaveGame() {
      this.toggleAutoSpin.uncheck();
      this.node.emit('ACTIVE_LEAVE_GAME');
    },

    onHandlerSpin() {
      if(this.checkAutoSpin()) return;
      this.node.emit('ACTIVE_SEND_SPIN');

    },

    onHandlerRank() {
      this.node.emit('ACTIVE_RANK');
    },

    onHandlerHistory() {
      this.node.emit('ACTIVE_HISTORY');
    },

    onHandlerGuide() {
      this.node.emit('ACTIVE_GUIDE');
    },

    onHanderChooseBet(event, currentBetIndex) {
      if(event === this.selectToggle) return;
      if(this.checkAutoSpin()) {
        this.selectToggle.getComponent(cc.Toggle).check();
        return;
      }
      this.gameVO.updateCurrentBetIndex(parseInt(currentBetIndex));
      this.selectToggle = event;
      this.onUpdateJackpot(this.gameVO.getCurrentJackpot())
    },

    onSpinAndResult(data) {
      this.onSpinComplete = data.onComplete;
      // TweenMax.killAll(false, false, true);
      var items = data.items;
      var result = [];
      result.matrix = [];
      for(var i = 0; i < items.length; i+=this.totalColl) {
        var arr = [];
        for(var j = 0; j < this.totalColl; j++) {
          var itemId = parseInt(items[i + j]);
          arr.push(itemId);
        }
        result.matrix.unshift(arr);
      }
      this.setResult(result);
      this.runSpin();
      this.leverSpinAnim.play();
    },

    onSetAutoSpin(autoSpin) {
      if(autoSpin){
        this.toggleAutoSpin.check();
      }else{
        this.toggleAutoSpin.uncheck();
      }
    },

    onUpdateJackpot(roomJackPot) {
        Utility.tweenRunNumber(this.lbJackPot.node, roomJackPot, 1.5);
    },

    //////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////

    setResult(result){
      for(var i = 1; i < this.totalItem; i++){
          for(var j = 0; j < this.totalColl; j++){
              if(i >= this.totalItem - 1) {
                  this.matrixId[i][j] = result.matrix[i - this.totalItem + 1][j];
              } else {
                  var itemId = Utility.getRandomBetween(1, this.numItem);
                  this.matrixId[i][j] = itemId;
              }
          }
      }
      this.resultItems = [];
      for(var i = 1; i < this.totalItem; i++){
          for(j = 0; j < this.totalColl; j++){
              var itemId = this.matrixId[i][j];
              var item = this.matrixItem[(i - this.posRow + this.totalItem) % this.totalItem][j];
              item.sprite.spriteFrame = this.getCardTexture(itemId);
              item.itemId = itemId;
              if(i >= this.totalItem - 1) {
                this.resultItems.push(item);
              }
          }
      }
    },

    runSpin: function() {
      for(var j = 0; j < 5; j++){
          for(var i = 0; i < this.totalItem; i++){
              var item = this.matrixItem[i][j];
              var actionBy = cc.moveBy(1.6 * this.timeSpin, 0, -this.offy * (this.totalItem - 1));
              var data = {};
              data.item = item;
              data.i =  i;
              data.posRow = this.posRow;
              var callBack = function(sender, data){
                  data.item.y = this.posY + ((data.i + data.posRow + this.totalRow + this.totalItem) % this.totalItem) * this.offy - 20;
              }.bind(this);

              item.runAction(cc.sequence(cc.delayTime(0.2 * this.timeSpin * j), actionBy.easing(cc.easeIn(1.5))
          , cc.callFunc(callBack, this, data), cc.moveBy(0.3,cc.v2(0,20))));
          }
      }
      this.node.runAction(cc.sequence(cc.delayTime(2 * this.timeSpin), cc.callFunc(this.runSpinComplete, this)));
      this.posRow = (this.posRow + this.totalRow + this.totalItem) % this.totalItem;
    },

    runSpinComplete: function(){
      console.log('GamePanelMiniPoker ---- runSpinComplete' );

      this.isSpining = false;
      if(this.onSpinComplete !== null) {
        this.onSpinComplete.call();
        this.onSpinComplete = null;
      }
    },

    initMatrix() {
      var rect = this.getCardTexture(0)
      for(var i =0; i < this.totalItem; i++){
          this.matrixId.push([]);
          for(var j = 0; j < this.totalColl; j++){
              var random = Utility.getRandomBetween(0, this.numItem);
              this.matrixId[i].push(random);
          }
      }

      for(var i =0; i < this.totalItem; i++){
          this.matrixItem.push([]);
          for(var j = 0; j < this.totalColl; j++){
              var itemId =  this.matrixId[i][j];
              var node = MiniPokerIcon.create(itemId, this.getCardTexture(itemId));
              node.scale = 1;
              node.setAnchorPoint(0.5, 0);
              this.matrixItem[i].push(node);
              this.wheels[j].addChild(node);
              node.x = this.posX + this.wheels[j].width * 0.5;
              node.y = this.posY + i * this.offy;
          }
      }

      for(var j = 0; j < this.totalColl; j++){
        this.wheels[j].x += this.wheels[j].width * 0.5;
        this.wheels[j].y += rect.height * 0.5;
      }
    },

    checkAutoSpin() {
      if(this.gameVO.autoSpin) {
        this.node.emit('ACTIVE_SHOW_MESSAGE', {message: i18n.t("T0013")});
        return true;
      }
      return false;
    },

    getCardTexture: function(cardId) {
      var name = (cardId < 10) ? "cards_0" + cardId : "cards_" + cardId;
      var texture = this.cardAtlas.getSpriteFrame(name);
      return texture;
    },

});
