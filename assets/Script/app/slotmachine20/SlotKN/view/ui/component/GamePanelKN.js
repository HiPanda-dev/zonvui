var BaseScene = require('BaseScene');
var Slot20IconKN = require('Slot20IconKN');
var Utility = require('Utility');
var SlotKNVO = require('SlotKNVO');
var i18n = require('i18n');


cc.Class({
    extends: BaseScene,

    properties: {
      offy: 180,
      totalRow: 3,
      totalColl: 5,
      numItem: 6,
      lbLineButton: cc.Label,
      btnSpin:cc.Node,
      btnStartAutoSpin:cc.Node,
      btnStopAutoSpin:cc.Node,
      btnChooseNumAuto: cc.Node,
      numAutoSpin:cc.Node,
      btnBet:cc.Node,
      txtWinMoney: cc.Label,
      txtTotalBet: cc.Label,
      txtFreeSpin: cc.Label,
      mcFreeSpin: cc.Node,
      wheels: [cc.Node],
      icons: [cc.SpriteFrame],
      itemPrefabs: cc.Prefab,
      rectTopGroup:cc.Node,
      tournament: cc.Node,
      rectBottomGroup:cc.Node,
      mcLevel:cc.Node
    },
    onLoad () {
      this.totalItem = 3;
      this.matrixId = [];
      this.matrixItem = [];
      this.posX = 0;
      this.posY = 100;
      this.timeSpin = 1;
      this.posRow = 0;
      this.isAutoSpin = false;
      this.resultItems = [];
      this.onSpinComplete = null;
      this.mcFreeSpin.active = false;
      this.tournament.active = false;
      this.initMatrix();
      this.setDynamicTypeAllItemInMatrix();
      this.resetAllLevel();
      this.setXLevelFreeSpin(false);
      this.txtNumAutoSpin = this.numAutoSpin.getChildByName('Label').getComponent(cc.Label);

    },

    buildUI(root, gameVO) {
      this.gameVO = gameVO;
      this.root = root;
      this.checkFreeSpin();
      Utility.tweenRunNumber(this.txtTotalBet.node, this.gameVO.getTotalBet(), 1.5);
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
              var texture = this.icons[itemId];
              var node = Slot20IconKN.create(itemId, texture, this.itemPrefabs);
              this.matrixItem[i].push(node);
              node.y = this.posY + (i * this.offy);
              node.itemId = itemId;
              this.wheels[j].addChild(node);
          }
      }

      //
      // for(var j = 0; j < this.totalColl; j++){
      //   this.wheels[j].x += this.wheels[j].width * 0.5;
      //   this.wheels[j].y += rect.height * 0.5;
      // }
    },

    removeAllItemOnOutBound() {
      for(var i = 0; i < this.wheels.length;i++) {
        for(var j = 3; j < this.wheels[i].children.length; j++) {
          this.wheels[i].children[j].removeFromParent();
          j--;
        }
      }
      console.log('aaaa');
    },

    onHandlerSpin() {
      if(this.checkAutoSpin()) return;
      this.root.onActiveSendSpin();
    },

    onHandlerSpin2() {
      if(this.gameVO.isSpining) return;
      this.root.onActiveSendSpin();
    },


    onSpinAndResult(data) {
      this.txtWinMoney.string = '0';
      this.onSpinComplete = data.onComplete;
      this.resetAllLevel();
      this.removeAllItemOnOutBound();

      var result = [];
      result.matrix = data.items;
      this.checkFreeSpin();
      this.onHideAllEffectItemWin();
      this.setDynamicTypeAllItemInMatrix();
      this.createResult(result);
      this.hideRectPhysic(this.rectBottomGroup);
      setTimeout(function(){
        this.setDynamicTypeAllItemInMatrix();
      }.bind(this), 800);
    },

    setDynamicTypeAllItemInMatrix() {
      for(var i = 0;i< this.wheels.length; i++) {
        for(var j = 0;j< this.wheels[i].children.length; j++) {
          var item = this.wheels[i].children[j];
          setTimeout(function(item){
            // console.log(i + " __ " + j + " __ " + item.itemd);
            item.setDynamicType();
          }.bind(this), j * 50, item);

        }
      }
    },

    createResult(result){
      this.showRectPhysicTop(this.rectTopGroup);
      for(var i = 0;i< result.matrix.length; i++) {
        var cols = result.matrix[i];
        var idx = 0;
        for(var j = cols.length - 1; j >=0; j--) {
          var itemId =  cols[j] - 1;
          // if(itemId === 0) continue;
          var texture = this.icons[itemId];
          var node = Slot20IconKN.create(itemId, texture, this.itemPrefabs);
          node.y = this.posY + (idx * this.offy) + 500;
          node.setX(0);
          // node.sacle =0.3;
          node.itemId = itemId;
          this.wheels[i].addChild(node);
          idx++;
        }
      }

      setTimeout(function(){
        this.showRectPhysic(this.rectBottomGroup);
        this.hideRectPhysic(this.rectTopGroup);
      }.bind(this), 1000);

      setTimeout(function(){
        this.onSpinComplete.call();
      }.bind(this), 3000);
    },

    showRectPhysicTop(rect) {
      for(var i = 0;i< rect.children.length;i ++) {
        var o = rect.children[i];
        o.active = true;
      }
    },

    showRectPhysic(rect) {
      for(var i = 0;i< rect.children.length;i ++) {
        var o = rect.children[i];
        setTimeout(function(o){
          o.active = true;
        }.bind(this), i * 100, o);

      }
    },

    hideRectPhysic(rect) {
      for(var i = 0;i< rect.children.length;i ++) {
        var o = rect.children[i];
        setTimeout(function(o){
          o.active = false;
        }.bind(this), i * 100, o);
      }
    },

    onUpdateLevel(data) {
      var curLevel = null;
      if(data.level === 1) curLevel = this.mcLevel.getChildByName('lv2');
      if(data.level === 2) curLevel = this.mcLevel.getChildByName('lv3');
      if(data.level === 3) curLevel = this.mcLevel.getChildByName('lv4');

      if(curLevel) {
        curLevel.active = true;
        TweenLite.from(curLevel, 0.3, {y:416});
      }
    },

    resetAllLevel() {
      this.mcLevel.getChildByName('lv1').active = true;
      this.mcLevel.getChildByName('lv2').active = false;
      this.mcLevel.getChildByName('lv3').active = false;
      this.mcLevel.getChildByName('lv4').active = false;

      this.mcLevel.getChildByName('lv2').getChildByName('eff').active = false;
      this.mcLevel.getChildByName('lv3').getChildByName('eff').active = false;
      this.mcLevel.getChildByName('lv4').getChildByName('eff').active = false;
    },

    setXLevelFreeSpin(isFreeSpin){
      this.mcLevel.getChildByName('lv1').getChildByName('X1').active = !isFreeSpin;
      this.mcLevel.getChildByName('lv1').getChildByName('X3').active = isFreeSpin;

      this.mcLevel.getChildByName('lv2').getChildByName('X2').active = !isFreeSpin;
      this.mcLevel.getChildByName('lv2').getChildByName('X6').active = isFreeSpin;

      this.mcLevel.getChildByName('lv3').getChildByName('X3').active = !isFreeSpin;
      this.mcLevel.getChildByName('lv3').getChildByName('X9').active = isFreeSpin;

      this.mcLevel.getChildByName('lv4').getChildByName('X5').active = !isFreeSpin;
      this.mcLevel.getChildByName('lv4').getChildByName('X15').active = isFreeSpin;

      this.mcLevel.getChildByName('ds2').getChildByName('X2').active = !isFreeSpin;
      this.mcLevel.getChildByName('ds2').getChildByName('X6').active = isFreeSpin;

      this.mcLevel.getChildByName('ds3').getChildByName('X3').active = !isFreeSpin;
      this.mcLevel.getChildByName('ds3').getChildByName('X9').active = isFreeSpin;

      this.mcLevel.getChildByName('ds4').getChildByName('X5').active = !isFreeSpin;
      this.mcLevel.getChildByName('ds4').getChildByName('X15').active = isFreeSpin;
    },

    onUpdateCountLine(){
      // this.lbLineButton.string = this.gameVO.getNumBetLine();
      // Utility.tweenRunNumber(this.txtTotalBet.node, this.gameVO.getTotalBet(), 1.5);
    },

    onHandlerShowChooseLinePanel() {
      // if(this.checkAutoSpin()) return;
      // if(this.gameVO.isFreeSpin) return;
      // this.node.emit('ACTIVE_SHOW_CHOOSE_LINE_PANEL');
    },

    onHandlerSieuToc(target) {
      // var toggle = target.getComponent(cc.Toggle);
      // this.timeSpin = (toggle.isChecked === true) ? 0.5 : 1;
    },

    onHandlerShowChooseNumAutoSpin() {
      this.btnChooseNumAuto.active = true;
      this.btnChooseNumAuto.opacity = 0;
      TweenLite.to(this.btnChooseNumAuto, 0.5, {opacity:256});

      if(this.timeChooseNumAuto !== undefined) {
        clearTimeout(this.timeChooseNumAuto);
        this.timeChooseNumAuto = undefined;
      }
      this.timeChooseNumAuto = setTimeout(this.hideChooseNumAutoSpin.bind(this), 5000);
    },

    hideChooseNumAutoSpin(onComplete) {
      TweenLite.to(this.btnChooseNumAuto, 0.5, {opacity:0, onComplete: function(){
        this.btnChooseNumAuto.active = false;
        this.btnChooseNumAuto.opacity = 256;
        if(onComplete) onComplete.call();
      }.bind(this)});
    },

    onHandlerStartAutoSpin(evt, numAutoSpin) {
      this.hideChooseNumAutoSpin(function() {
        this.gameVO.numAutoSpin = numAutoSpin;
        this.gameVO.curNumAutoSpin = this.gameVO.numAutoSpin;
        this.gameVO.autoSpin = true;
        this.numAutoSpin.active = true;
        this.txtNumAutoSpin.string = numAutoSpin;
        this.btnStopAutoSpin.active = true;
        this.btnStartAutoSpin.active = false;
        this.btnSpin.active = false;

        this.onHandlerAutoSpin();
        this.playAnimStartAutoSpin();
        this.onSetNumAutoSpin();
      }.bind(this));
    },

    onHandlerStopAutoSpin() {
      this.gameVO.autoSpin = false;
      this.btnStopAutoSpin.active = false;
      this.btnSpin.active = true;
      this.btnStartAutoSpin.active = true;
      this.numAutoSpin.active = false;
    },

    onSetNumAutoSpin() {
      this.txtNumAutoSpin.string = this.gameVO.curNumAutoSpin;
    },

    playAnimStartAutoSpin() {
    },

    onHandlerAutoSpin() {
      if(this.gameVO.autoSpin === false) return;
      this.node.emit('ACTIVE_SEND_SPIN');
    },

    onHandlerLeaveGame() {
      this.gameVO.autoSpin = false
      this.node.emit('ACTIVE_LEAVE_GAME');
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
      this.node.emit('ACTIVE_SELECT_ROOM', this.gameVO.bet);
    },

    onHandlerToggleChoiThu(){
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

    getItemInPosWithItemId(itemPos, itemId) {
      var result = [];
      for(var i = 0; i < itemPos.length;i++) {
        var index = 0;
        if(itemPos[i] <= 5) index = 0;
        else if(itemPos[i] <= 10) index = 1;
        else index = 2;
        var slotItem = this.wheels[i].children[index];
        if(slotItem.itemId !== itemId - 1 && slotItem.itemId !== SlotKNVO.ITEM_JACKPOT_ID) break;
        result.push(slotItem);
      }
      return result;
    },

    dropAllItem(result) {
      for(var i = 0; i < result.length;i++) {
        var slotItem = result[i];
        slotItem.effect.on('finished', function(event) {
          if(event) {
            event.removeFromParent();
          }
        }.bind(this, slotItem));
        slotItem.playAnim();
      }
    },


   getAllWildItem() {
     var result = [];
     for(var i = 0; i< this.wheels.length; i++) {
       for(var j =0; j< 3; j++) {
         var item = this.wheels[i].children[j];
         if(item.itemId === SlotKNVO.ITEM_JACKPOT_ID){
           result.push(item);
         }
       }
     }
     return result;
   },

   getAllScatterItem() {
     var result = [];
     for(var i = 0; i< this.wheels.length; i++) {
       for(var j =0; j< 3; j++) {
         var item = this.wheels[i].children[j];
         if(item.itemId === SlotKNVO.ITEM_SCATTER_ID){
           result.push(item);
         }
       }
     }
     return result;
   },


    onHideAllEffectItemWin() {
      // for(var i = 0; i < this.resultItems.length;i++) {
      //   var slotItem = this.resultItems[i];
      //   slotItem.item.scale = 1;
      //   slotItem.effect.node.active = false;
      //   // slotItem.effect.stop();
      //     slotItem.effect.stopSystem();
      //     slotItem.stopAllAnim();
      // }
    },

    onHandlerBackToSelectRoom() {
      this.node.emit('ACTIVE_SHOW_SELECT_ROOM_PANEL');
    },

    getRoomBet() {
      return this.gameVO.selectRoomId;
    },


    checkFreeSpin() {
      if(this.gameVO.freeSpin !== 0) {
        this.mcFreeSpin.active = true;
        this.txtFreeSpin.string = this.gameVO.freeSpin;
      }else{
        this.mcFreeSpin.active = false;
        this.txtTotalBet.node.active = true;
      }
    },

    showFreeSpin() {
      this.mcFreeSpin.active = true;
      this.txtFreeSpin.string = this.gameVO.freeSpin;
      TweenLite.from(this.mcFreeSpin, 0.3, {scaleY:0});
    },

    onSetAutoSpin(autoSpin) {
      if(autoSpin){
        this.btnStopAutoSpin.active = true;
        this.btnStartAutoSpin.active = false;
        this.numAutoSpin.active = true;
        this.btnSpin.active = false;
      }else{
        this.btnStopAutoSpin.active = false;
        this.btnStartAutoSpin.active = true;
        this.btnSpin.active = true;
        this.numAutoSpin.active = false;
      }
    },

    onShowWinMoney(prize) {
      Utility.tweenRunNumber(this.txtWinMoney.node, prize, 1.5);
    },

    playAnimBonus() {
      // for(var i=0;i<this.resultItems.length;i++) {
      //   if(this.resultItems[i].itemId === SlotKNVO.ITEM_BONUS_ID)
      //     this.resultItems[i].playAnimBonus();
      // }
    },

    playAnimScatter() {
      // for(var i=0;i<this.resultItems.length;i++) {
      //   if(this.resultItems[i].itemId === SlotKNVO.ITEM_SCATTER_ID)
      //     this.resultItems[i].playAnimScatter();
      // }
    },

    playAnimJackpot() {
      for(var i = 0; i< this.wheels.length; i++) {
        for(var j =0; j< 3; j++) {
          var item = this.wheels[i].children[j];
          if(item.itemId === SlotKNVO.ITEM_JACKPOT_ID){
            item.playAnimJackpot();
          }
        }
      }
    },
    //////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////



    runSpin: function() {
      // for(var j = 0; j < this.totalColl; j++){
      //     for(var i = 0; i < this.totalItem; i++){
      //         var item = this.matrixItem[i][j];
      //         var actionBy = cc.moveBy(1.6 * this.timeSpin, 0, -this.offy * (this.totalItem - 3));
      //         var data = {};
      //         data.item = item;
      //         data.i =  i;
      //         data.posRow = this.posRow;
      //         var callBack = function(sender, data){
      //             data.item.y = this.posY + ((data.i + data.posRow + this.totalRow + this.totalItem) % this.totalItem) * this.offy - 20;
      //         }.bind(this);
      //
      //         item.runAction(cc.sequence(cc.delayTime(0.2 * this.timeSpin * j), actionBy.easing(cc.easeIn(1.5))
      //     , cc.callFunc(callBack, this, data), cc.moveBy(0.3,cc.v2(0,20))));
      //     }
      // }
      // this.node.runAction(cc.sequence(cc.delayTime(3 * this.timeSpin), cc.callFunc(this.runSpinComplete, this)));
      // this.posRow = (this.posRow + this.totalRow + this.totalItem) % this.totalItem;
    },

    runSpinComplete: function(){
      // console.log("xxxx " + 'runSpinComplete');
      // this.isSpining = false;
      // // this.animSpin.active = false;
      // if(this.onSpinComplete !== null) {
      //   this.onSpinComplete.call();
      //   this.onSpinComplete = null;
      // }
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
