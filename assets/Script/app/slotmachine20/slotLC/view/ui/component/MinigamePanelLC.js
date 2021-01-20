var Utility = require('Utility');
cc.Class({
    extends: cc.Component,

    properties: {
      txtTotalBet: cc.Label,
      txtPrize: cc.Label,
      txtWinMoney: cc.Label,
      txtTime: cc.Label,
      mcTotalWin: cc.Node,
      mcTurn1: cc.Node,
      mcTurn2: cc.Node,
      mcTurn3: cc.Node,
      mcTurn4: cc.Node,
      winTemp: cc.Node,
      mcSocolaGroup: cc.Node
    },

    onLoad () {
      this.isLoad = true;
      this.totalCountTime = 15;
      this.mcX1 = this.winTemp.getChildByName('mcX1');
      this.mcX2 = this.winTemp.getChildByName('mcX2');
      this.mcX3 = this.winTemp.getChildByName('mcX3');
      this.mcX5 = this.winTemp.getChildByName('mcX5');
      this.mcMoc = this.winTemp.getChildByName('mcMoc');
      this.timerCount = this.totalCountTime;
      this.isPlaying = false;
      this.isAuto = false;
      this.listResultNode = [];
      this.curPos = new cc.Vec2(this.node.x, this.node.y);
      this.node.active = false;
      this.reset();
    },

    onStartGame(data, onComplete) {
      this.show()
      setTimeout(function(){
        this.reset();
        this.show();
        this.onComplete = onComplete;
        this.isPlaying = true;
        this.dataResult = data;
        this.totalPrize = 0;
        this.timerCount = this.totalCountTime;
        this.arrResult = this.dataResult.s.split('x');
        this.arrResult.shift();
        this.txtTotalBet.string = this.dataResult.vb;
        if(this.timer) clearInterval(this.timer);
        this.timer = setInterval(this.updateTimer.bind(this), 1000);
      }.bind(this), 1000);
    },

    show() {
      // if(this.curPos) {
      //   this.node.x = this.curPos.x;
      //   this.node.y = this.curPos.y;
      // }
      this.node.active = true;
      TweenLite.to(this.node, 0.5, { y: this.curPos.y });
    },

    hide() {
      TweenLite.to(this.node, 0.5, { y: -800 });
    },

    onHandlerAutoChoose() {
      if(this.isAuto) return;
      this.isAuto = true;
      clearInterval(this.timer);
      for(var i = 0; i < 12; i++) {
        TweenLite.delayedCall(i * 1, function (data) {
          if(!this.isPlaying) return;
          var btChocolate = this.getRandomChocolate();
          this.onChooseSocola(btChocolate);
        }.bind(this));
      }
    },

    updateTimer() {
      if(!this.isPlaying) return;
      this.timerCount--;
      this.txtTime.string = this.timerCount;
      if(this.timerCount === 0) {
        var btChocolate = this.getRandomChocolate();
        this.onChooseSocola(btChocolate);
        this.timerCount = this.totalCountTime;
      }
    },

    getRandomChocolate() {
      var num = Utility.randomNumber(0, 24);
      for(var i = num; i < 25; i++) {
        var bt = this.mcSocolaGroup.children[i];
        if(bt && bt.active === true) return bt;
        if(i === 24) i = 0;
      }
    },

    onChooseSocola(mcTarget) {
      if(!this.isPlaying) return;
      mcTarget.active = false;
      var mcResult = null;
      if(this.arrResult[this.curResult] === "0") mcResult = cc.instantiate(this.mcMoc);
      if(this.arrResult[this.curResult] === "1") mcResult = cc.instantiate(this.mcX1);
      if(this.arrResult[this.curResult] === "2") mcResult = cc.instantiate(this.mcX2);
      if(this.arrResult[this.curResult] === "3") mcResult = cc.instantiate(this.mcX3);
      if(this.arrResult[this.curResult] === "5") mcResult = cc.instantiate(this.mcX5);

      mcResult.x = mcTarget.x;
      mcResult.y = mcTarget.y;
      this.timerCount = this.totalCountTime;
      this.mcSocolaGroup.addChild(mcResult);
      this.listResultNode.push(mcResult);
      this.totalPrize += parseInt(this.arrResult[this.curResult]) * this.dataResult.vb;
      Utility.tweenRunNumber(this.txtPrize.node, this.totalPrize, 1.5);
      TweenLite.from(mcResult, 0.3, {scale:0});
      if(this.curResult === 3) this.activeTurn(this.mcTurn2, true);
      if(this.curResult === 6) this.activeTurn(this.mcTurn3, true);
      if(this.curResult === 9) this.activeTurn(this.mcTurn4, true);

      if(this.arrResult[this.curResult] === "0") {
        this.isPlaying = false;
        TweenLite.delayedCall(2, function () {
          this.mcTotalWin.active = true;
          this.txtWinMoney.string = 0;
          TweenLite.from(this.mcTotalWin, 0.3, {scale:0});
          Utility.tweenRunNumber(this.txtWinMoney.node, this.dataResult.v, 1.5);
          Utility.tweenRunNumber(this.txtPrize.node, this.dataResult.v, 1.5);
          setTimeout(function(session){
            this.onHandlerCloseGame();
          }.bind(this), 5000);
        }.bind(this))
      }

      this.curResult++;
    },

    onHandlerCloseGame() {
      this.hide();
      TweenLite.delayedCall(1, function(){
        if(this.onComplete) this.onComplete.call();
        this.onComplete = null;
        this.reset();
      }.bind(this));
    },

    handlerChooseSocola(event) {
      var mcTarget = event.currentTarget;
      this.onChooseSocola(mcTarget);
    },

    reset() {
      this.txtTime.string = this.totalCountTime;
      this.curResult = 0;
      this.mcTotalWin.active = false;
      this.isAuto = false;
      this.onComplete = null;
      this.activeTurn(this.mcTurn1, true);
      this.activeTurn(this.mcTurn2, false);
      this.activeTurn(this.mcTurn3, false);
      this.activeTurn(this.mcTurn4, false);
      this.txtTotalBet.string = "0";
      this.txtPrize.string = "0";
      if(this.listResultNode) {
        for(var i=0;i<this.listResultNode.length; i++) {
          this.listResultNode[i].removeFromParent();
        }
      }

      for(var i=0;i<this.mcSocolaGroup.children.length; i++) {
        if(this.mcSocolaGroup.children[i])
          this.mcSocolaGroup.children[i].active = true;
      }

    },

    activeTurn(mcTurn, isActive) {
      var mcOn = mcTurn.getChildByName('LuotChon');
      var mcOff = mcTurn.getChildByName('LuotChonD');

      mcOn.active = isActive;
      mcOff.active = !isActive;
    }
});
