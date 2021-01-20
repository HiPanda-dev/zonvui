var BaseScene = require('BaseScene');
var Slot20Icon = require('Slot20Icon');
var Utility = require('Utility');
var i18n = require('i18n');
var Slot20VO = require('Slot20VO');

cc.Class({
    extends: BaseScene,

    properties: {
      offy: 180,
      totalRow: 3,
      totalColl: 5,
      numItem: 6,
      lbLineButton: cc.Label,
      btnSpin:cc.Node,
      btnStartAutoSpin: cc.Node,
      btnStopAutoSpin: cc.Node,
      btnBet:cc.Node,
      txtWinMoney: cc.Label,
      txtTotalBet: cc.Label,
      txtFreeSpin: cc.Label,
      wheels: [cc.Node],
      icons: [cc.SpriteFrame],
      iconsBlur: [cc.SpriteFrame],
      itemPrefabs: cc.Prefab,
      animSpin:cc.Node,
      blur1:cc.Node,
      blur2:cc.Node,
      blur3:cc.Node,
      tournament: cc.Node,
      topTourContent: cc.Node,
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
      this.isChoiThu = false;
      this.animSpin.active = false;
      this.initMatrix();

      this.btnStartAutoSpin.active = true;
      this.btnStopAutoSpin.active = false;
      this.btnSpin.active = true;
      this.mcNapAm = this.btnStopAutoSpin.getChildByName('mcNapAm');
      this.txtNumAutoSpin = this.btnStopAutoSpin.getChildByName('txtNumAutoSpin');
      this.btnChooseNumAuto = this.btnStartAutoSpin.getChildByName('btnChooseNumAuto');
      this.curPosNapAm = new cc.Vec2(this.mcNapAm.x, this.mcNapAm.y);
      this.btnChooseNumAuto.active = false;
      this.txtFreeSpin.active = false;
      this.txtTotalBet.active = true;

      this.blur1.active = false;
      this.blur2.active = false;
      this.blur3.active = false;
      this.tournament.active = false;
      this.itemTop = this.topTourContent.getChildByName("item");
      this.topTourContent.removeAllChildren();
      this.listTop = [];

    },

    buildUI(gameVO) {
      this.gameVO = gameVO;
      this.checkFreeSpin();
      Utility.tweenRunNumber(this.txtTotalBet.node, this.gameVO.getTotalBet(), 1.5);
    },

    onUpdateCountLine(){
      this.lbLineButton.string = this.gameVO.getNumBetLine();
      Utility.tweenRunNumber(this.txtTotalBet.node, this.gameVO.getTotalBet(), 1.5);
    },

    onHandlerShowChooseLinePanel() {
      if(this.checkAutoSpin()) return;
      if(this.gameVO.isFreeSpin) return;
      this.node.emit('ACTIVE_SHOW_CHOOSE_LINE_PANEL');
    },

    onHandlerSieuToc(target) {
      var toggle = target.getComponent(cc.Toggle);
      this.timeSpin = (toggle.isChecked === true) ? 0.5 : 1;
    },

    onHandlerShowChooseNumAutoSpin() {
      var mcNapAm = this.btnStartAutoSpin.getChildByName('mcNapAm');
      this.btnChooseNumAuto.active = true;
      this.btnChooseNumAuto.opacity = 0;
      TweenLite.to(this.btnChooseNumAuto, 0.5, {opacity:256});
      TweenLite.to(mcNapAm, 0.3, {y:400});

      if(this.timeChooseNumAuto !== undefined) {
        clearTimeout(this.timeChooseNumAuto);
        this.timeChooseNumAuto = undefined;
      }
      this.timeChooseNumAuto = setTimeout(this.hideChooseNumAutoSpin.bind(this), 5000);
    },

    hideChooseNumAutoSpin(onComplete) {
      var mcNapAm = this.btnStartAutoSpin.getChildByName('mcNapAm');
      TweenLite.to(this.btnChooseNumAuto, 0.5, {opacity:0, onComplete: function(){
        this.btnChooseNumAuto.active = false;
        this.btnChooseNumAuto.opacity = 256;
        if(onComplete) onComplete.call();
      }.bind(this)});
      TweenLite.to(mcNapAm, 0.3, {y:77.5});
    },

    onHandlerStartAutoSpin(evt, numAutoSpin) {
      this.hideChooseNumAutoSpin(function() {
        this.gameVO.numAutoSpin = numAutoSpin;
        this.gameVO.curNumAutoSpin = this.gameVO.numAutoSpin;
        this.gameVO.autoSpin = true;
        this.btnStartAutoSpin.active = false;
        this.btnStopAutoSpin.active = true;
        this.btnSpin.active = false;

        this.onHandlerAutoSpin();
        this.playAnimStartAutoSpin();
        this.onSetNumAutoSpin();
      }.bind(this));
    },

    onHandlerStopAutoSpin() {
      this.gameVO.autoSpin = false;
      this.btnStartAutoSpin.active = true;
      this.btnStopAutoSpin.active = false;
      this.btnSpin.active = true;
    },

    onSetNumAutoSpin() {
      this.txtNumAutoSpin.getComponent(cc.Label).string = this.gameVO.curNumAutoSpin;
    },

    playAnimStartAutoSpin() {
      this.mcNapAm.y = this.curPosNapAm.y;
      TweenLite.from(this.mcNapAm, 0.2, {y:this.curPosNapAm.y - 19});
    },

    onHandlerAutoSpin() {
      if(this.gameVO.autoSpin === false) return;
      this.node.emit('ACTIVE_SEND_SPIN');
    },

    onHandlerLeaveGame() {
      this.gameVO.autoSpin = false
      this.node.emit('ACTIVE_LEAVE_GAME');
    },

    onHandlerSpin() {
      this.activeSpin();
    },

    onHandlerSpin2() {
      if(this.gameVO.isSpining) return;
      this.activeSpin();
    },

    activeSpin() {
      if(this.checkAutoSpin()) return;
      this.node.emit('ACTIVE_SEND_SPIN');
    },

    onHandlerRank() {
      this.node.emit('ACTIVE_RANK');
    },

    onHandlerNextBet() {
      if(this.checkAutoSpin()) return;
      if(this.gameVO.isFreeSpin) return;
      this.gameVO.setNextBet();
      var bet = this.gameVO.getCurBet();
      this.btnBet.getChildByName('txtBet').getComponent(cc.Label).string = Utility.formatCurrency(bet);
      Utility.tweenRunNumber(this.txtTotalBet.node, this.gameVO.getTotalBet(), 1.5);
      switch (this.gameVO.bet) {
        case 1:
          this.btnBet.getChildByName('btnBet2').active = false;
          this.btnBet.getChildByName('btnBet3').active = false;
          break;
        case 2:
          this.btnBet.getChildByName('btnBet2').active = true;
          this.btnBet.getChildByName('btnBet3').active = false;
          break;
        case 3:
          this.btnBet.getChildByName('btnBet2').active = true;
          this.btnBet.getChildByName('btnBet3').active = true;
          break;
        default:
      }

      this.node.emit('ACTIVE_SELECT_ROOM', this.gameVO.bet);
    },

    onHandlerToggleChoiThu(){
      this.isChoiThu = !this.isChoiThu;
    },

    onHandlerHistory() {
      this.node.emit('ACTIVE_HISTORY');
    },

    onHandlerGuide() {
      this.node.emit('ACTIVE_GUIDE');
    },

    onHandlerShowTounament() {
        this.node.emit('ACTIVE_SHOW_TOURNAMENT');
    },

    onSllectRoom(roomId) {
      if(event === this.selectToggle) return;

      if(this.checkAutoSpin()) {
        this.selectToggle.getComponent(cc.Toggle).check();
        return;
      }
      this.gameVO.updateSelectRoomId(parseInt(roomId));
      this.selectToggle = event;
      this.onUpdateJackpot(this.gameVO.getCurrentJackpot())
    },

    onShowEffectItemWin(itemPos, itemId) {
        var result = [];
        var isShowEffect = true;
        for(var i = 0; i < itemPos.length;i++) {
          var slotItem = this.resultItems[itemPos[i] - 1];
          if(slotItem.itemId !== itemId && slotItem.itemId !== Slot20VO.ITEM_JACKPOT_ID) break;
          if(slotItem.itemId === Slot20VO.ITEM_JACKPOT_ID || itemId ===  Slot20VO.ITEM_JACKPOT_ID) {
            slotItem.playAnimJackpot();
          }else if(itemId === Slot20VO.ITEM_BONUS_ID) {
            slotItem.playAnimBonus();
          }else if(itemId === Slot20VO.ITEM_SCATTER_ID) {
            slotItem.playAnimScatter();
          }else{
            TweenLite.to(slotItem.item, 0.3, {scale:1.1, onComplete: function(slotItem){
              slotItem.effect.node.active = true;
              slotItem.effect.resetSystem();
            }.bind(this), onCompleteParams:[slotItem]});
          }
        }
    },

    onHideAllEffectItemWin() {
      for(var i = 0; i < this.resultItems.length;i++) {
        var slotItem = this.resultItems[i];
        slotItem.item.scale = 1;
        slotItem.effect.node.active = false;
        // slotItem.effect.stop();
          slotItem.effect.stopSystem();
          slotItem.stopAllAnim();
      }
    },

    onHandlerBackToSelectRoom() {
      this.node.emit('ACTIVE_SHOW_SELECT_ROOM_PANEL');
    },

    getRoomBet() {
      return this.gameVO.selectRoomId;
    },

    onSpinAndResult(data) {
      this.txtWinMoney.string = '0';
      this.onSpinComplete = data.onComplete;
      // TweenMax.killAll(false, false, true);
      //
      var items = data.items;
      var result = [];
      result.matrix = [];
      // thu tu tren->xuong, trai->phai
      for(var i = 0; i < this.totalRow; i++) {
        var arr = [];
        for(var j = 0; j < this.totalColl; j++) {
          var itemId = parseInt(items[i + (this.totalRow * j)]);
          arr.push(itemId);
        }
        result.matrix.unshift(arr);
      }
      this.onHideAllEffectItemWin();
      this.setResult(result);
      this.checkFreeSpin();
      this.runSpin();
      this.animSpin.active = true;
    },

    checkFreeSpin() {
      if(this.gameVO.freeSpin !== 0) {
        this.txtFreeSpin.node.active = true;
        this.txtTotalBet.node.active = false;
        this.txtFreeSpin.string = this.gameVO.freeSpin;
      }else{
        this.txtFreeSpin.node.active = false;
        this.txtTotalBet.node.active = true;
      }
    },

    onSetAutoSpin(autoSpin) {
      if(autoSpin){
        this.btnStartAutoSpin.active = false;
        this.btnStopAutoSpin.active = true;
        this.btnSpin.active = false;
      }else{
        this.btnStartAutoSpin.active = true;
        this.btnStopAutoSpin.active = false;
        this.btnSpin.active = true;
      }
    },

    onShowWinMoney(data) {
      Utility.tweenRunNumber(this.txtWinMoney.node, this.gameVO.prize, 1.5);
    },


    playAnimBonus() {
      for(var i=0;i<this.resultItems.length;i++) {
        if(this.resultItems[i].itemId === Slot20VO.ITEM_BONUS_ID)
          this.resultItems[i].playAnimBonus();
      }
    },

    playAnimScatter() {
      for(var i=0;i<this.resultItems.length;i++) {
        if(this.resultItems[i].itemId === Slot20VO.ITEM_SCATTER_ID)
          this.resultItems[i].playAnimScatter();
      }
    },

    playAnimJackpot() {
      for(var i=0;i<this.resultItems.length;i++) {
        if(this.resultItems[i].itemId === Slot20VO.ITEM_JACKPOT_ID)
          this.resultItems[i].playAnimJackpot();
      }
    },
    //////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////

    setResult(result){
      for(var i = 3; i < this.totalItem; i++){
          for(var j = 0; j < this.totalColl; j++){
              if(i >= this.totalItem - 3) {
                  this.matrixId[i][j] = result.matrix[i - this.totalItem + 3][j];
              } else {
                  var itemId = Utility.getRandomBetween(1, this.numItem);
                  this.matrixId[i][j] = itemId;
              }
          }
      }
      this.resultItems = [];
      for(var i = 3; i < this.totalItem; i++){
          for(j = 0; j < this.totalColl; j++){
              var itemId = this.matrixId[i][j];
              var item = this.matrixItem[(i - this.posRow + this.totalItem) % this.totalItem][j];
              var texture = (i > 2 && i < this.totalItem - 3) ? this.iconsBlur[itemId - 1] : this.icons[itemId - 1];
              // var texture = this.iconsBlur[itemId - 1];
              item.sprite.spriteFrame = texture;//this.icons[itemId-1];
              item.itemId = itemId;
              if(i >= this.totalItem - 3) {
                this.resultItems.push(item);
                // item.playAnimSpecialItem();
              }
          }
      }
    },

    runSpin: function() {
      for(var j = 0; j < this.totalColl; j++){
          for(var i = 0; i < this.totalItem; i++){
              var item = this.matrixItem[i][j];
              var actionBy = cc.moveBy(1.6 * this.timeSpin, 0, -this.offy * (this.totalItem - 3));
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
      this.node.runAction(cc.sequence(cc.delayTime(3 * this.timeSpin), cc.callFunc(this.runSpinComplete, this)));
      this.posRow = (this.posRow + this.totalRow + this.totalItem) % this.totalItem;
    },

    runSpinComplete: function(){
      console.log("xxxx " + 'runSpinComplete');
      this.isSpining = false;
      this.animSpin.active = false;
      if(this.onSpinComplete !== null) {
        this.onSpinComplete.call();
        this.onSpinComplete = null;
      }
    },

    initMatrix() {
      var rect = this.icons[0].getRect();
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
              // var texture = (j > 3 && j < this.totalColl - 3) ? this.iconsBlur[itemId] : this.icons[itemId];
              var texture = this.icons[itemId];
              var node = Slot20Icon.create(itemId, texture, this.itemPrefabs);
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

    showInfoTournament() {
        this.tournament.active = true;
    },

    hideInfoTournament() {
        this.tournament.active = false;
    },

    updateInfoTournament(data) {
        if(!this.itemTop) return;
        // var item;
        if(this.listTop.length === 0) {
            for (let i = 0; i < data.l.length; i++) {
                this.listTop[i] = cc.instantiate(this.itemTop);
                this.listTop[i].id = data.l[i].id;
                this.listTop[i].getChildByName("txtMoney").getComponent(cc.Label).string = Utility.formatCurrency(data.l[i].p);
                this.listTop[i].getChildByName("txtName").getComponent(cc.Label).string = data.l[i].a;
                this.listTop[i].getChildByName("txtRank").getComponent(cc.Label).string = i + 1;
                this.listTop[i].y = -50 - 100*i;
                this.topTourContent.addChild(this.listTop[i]);
            }
        }
        else {
            for (let i = 0; i < data.l.length; i++) {
                for (let j = 0; j < this.listTop.length; j++){
                    let swap = null;
                    if (data.l[i].id === this.listTop[j].id) {
                        this.listTop[j].getChildByName("txtMoney").getComponent(cc.Label).string = Utility.formatCurrency(data.l[i].p);
                        this.listTop[j].getChildByName("txtName").getComponent(cc.Label).string = data.l[i].a;
                        this.listTop[j].getChildByName("txtRank").getComponent(cc.Label).string = i + 1;
                        if (i !== j) {
                            // this.listTop[j].y = -50 - 100 * i;
                            swap = this.listTop[j];
                            this.listTop[j] = this.listTop[i];
                            this.listTop[i] = swap;
                            TweenLite.to(this.listTop[i], 0.5, {y:-50 - 100 * i});
                            TweenLite.to(this.listTop[j], 0.5, {y:-50 - 100 * j});

                        }
                    }
                }
            }

            for (let i = 0; i < data.l.length; i++) {
                let flag = true;
                for (let j = 0; j < this.listTop.length; j++){
                    if (data.l[i].id === this.listTop[j].id) {
                        flag = false;
                    }
                }
                if (flag){
                    this.listTop[i] = cc.instantiate(this.itemTop);
                    this.listTop[i].id = data.l[i].id;
                    this.listTop[i].getChildByName("txtMoney").getComponent(cc.Label).string = Utility.formatCurrency(data.l[i].p);
                    this.listTop[i].getChildByName("txtName").getComponent(cc.Label).string = data.l[i].a;
                    this.listTop[i].getChildByName("txtRank").getComponent(cc.Label).string = i + 1;
                    this.listTop[i].y = -50 - 100*i;
                    this.topTourContent.addChild(this.listTop[i]);
                }
            }
        }
    }
});
