var TaiXiuVO = require('TaiXiuVO');
var Utility = require('Utility');
var i18n = require('i18n');
cc.Class({
    extends: cc.Component,

    properties: {
        editBoxTai: cc.EditBox,
        editBoxXiu: cc.EditBox,
        btnBetWeb: cc.Button,
        toggleNan: cc.Toggle,
        btnCau: cc.Node,
        iconDice: [cc.SpriteFrame],
        iconCau: [cc.SpriteFrame],
    },

    onLoad () {
      this.gameState = null;

      this.bettingPanel = this.node.getChildByName("BettingPanel");
      this.taiPanel = this.node.getChildByName("TaiPanel").getComponent(cc.Button);
      this.xiuPanel = this.node.getChildByName("XiuPanel").getComponent(cc.Button);
      this.imgTai = this.node.getChildByName("img_tai");
      this.imgXiu = this.node.getChildByName("img_xiu");

      this.fixedBetPanel = this.bettingPanel.getChildByName("FixedBetPanel");
      this.unfixedBetPanel = this.bettingPanel.getChildByName("UnfixedBetPanel");

      this.resultPanel = this.node.getChildByName("ResultPanel");
      this.showScorePanel = this.resultPanel.getChildByName("showScore");
      this.diceAnim = this.resultPanel.getChildByName("diceAnim");
      this.imgDice1 = this.showScorePanel.getChildByName("dice1").getComponent(cc.Sprite);
      this.imgDice2 = this.showScorePanel.getChildByName("dice2").getComponent(cc.Sprite);
      this.imgDice3 = this.showScorePanel.getChildByName("dice3").getComponent(cc.Sprite);

      this.imgScore = this.showScorePanel.getChildByName("imgScore");
      this.lbScore = this.imgScore.getChildByName("lbScore").getComponent(cc.Label);
      this.bowl = this.node.getChildByName("bowl");

      this.lbSession = this.node.getChildByName("lbSession").getComponent(cc.Label);

      this.lbNumTai = this.node.getChildByName("lbNumBetTai").getComponent(cc.Label);
      this.lbTotalTai = this.taiPanel.node.getChildByName("lbTotalBetTai").getComponent(cc.Label);
      this.lbBetValueTai = this.taiPanel.node.getChildByName("lbBetValueTai").getComponent(cc.Label);
      this.lbPlayerBetTai = this.taiPanel.node.getChildByName("lbPlayerBetTai").getComponent(cc.Label);

      this.lbNumXiu = this.node.getChildByName("lbNumBetXiu").getComponent(cc.Label);
      this.lbTotalXiu = this.xiuPanel.node.getChildByName("lbTotalBetXiu").getComponent(cc.Label);
      this.lbBetValueXiu = this.xiuPanel.node.getChildByName("lbBetValueXiu").getComponent(cc.Label);
      this.lbPlayerBetXiu = this.xiuPanel.node.getChildByName("lbPlayerBetXiu").getComponent(cc.Label);

      this.lbTime = this.node.getChildByName("lbTime").getComponent(cc.Label);
      this.countdownWaiting = this.node.getChildByName("countdownbox");
      this.lbTimeLeft = this.countdownWaiting.getChildByName("lbTimeLeft").getComponent(cc.Label);
      this.messagePanel = this.node.getChildByName("messagePanel");
      this.lbMessage = this.messagePanel.getChildByName("lbMessage").getComponent(cc.Label);
      this.soiCauPanel = this.node.getChildByName("SoiCauPanel");
      this.chatPanel = this.node.getChildByName("ChatPanel");
      this.btnChat = this.node.getChildByName("btnChat");
      this.bettingPanel.active = false;

      Utility.loadUrlAtlas(this.diceAnim, "texture/atlas/diceAtlas" , 30 , 1.5);
      if(cc.sys.isMobile){
        this.node.scale = 1;
        //this.node.x = -60;

        this.editBoxTai.node.active = false;
        this.editBoxXiu.node.active = false;
        this.lbBetValueTai.node.active = true;
        this.lbBetValueXiu.node.active = true;
        this.taiPanel.node.on(cc.Node.EventType.TOUCH_END, this.selectGate, this);
        this.xiuPanel.node.on(cc.Node.EventType.TOUCH_END, this.selectGate, this);
      }
    },

    buildUI(txVO, root) {
      this.txVO = txVO;
      this.root = root;
    },

    onUpdateTimer: function(time) {
      this.lbTimeLeft.string = (time < 10) ? "00:0" + time : "00:" + time;
      this.lbTime.string = (time < 10) ? "00:0" + time : "00:" + time;
      // this.lbScore.string =  time;
    },

    selectGate: function (event) {
        if(event.target._name === "TaiPanel") {
            if(this.totalBet > 0 && this.gateSelected === TaiXiuVO.BET_TAI) {
                this.showMessage(i18n.t("T0004"));
                return;
            }
            this.lbBetValueTai.string = "";
            this.lbBetValueXiu.string = "0";
            this.gateSelected = TaiXiuVO.BET_TAI;
        }
        else{
            if(this.totalBet > 0 && this.gateSelected === TaiXiuVO.BET_XIU) {
                this.showMessage(i18n.t("T0004"));
                return;
            }
            this.lbBetValueTai.string = "0";
            this.lbBetValueXiu.string = "";
            this.gateSelected = TaiXiuVO.BET_XIU;
        }

        this.bettingPanel.active = true;
        this.betValue = 0;
    },

    onUpdateGameState: function(txVO) {
      this.lbSession.string = "#" + txVO.session;

      switch (txVO.gameState) {
        case TaiXiuVO.STATE.BETTING:
          if(this.gameState !== TaiXiuVO.STATE.BETTING) {
            this.resetGame();
            this.enableBetting(true);
            this.onShowMessage(i18n.t("T0009"));
          }
          break;
        case TaiXiuVO.STATE.REPAY:
          this.enableBetting(false);
          this.onShowMessage(i18n.t("T0010"));
          this.lbTime.node.color = cc.Color.RED;
          break;
        case TaiXiuVO.STATE.RESULT:
          this.enableBetting(false);
          this.resultPanel.active = true;
          this.lbScore.node.active = true;
          this.imgScore.active = true;
          this.lbTime.node.active = false;
          this.countdownWaiting.active = false;
          this.isNan = this.toggleNan.isChecked;
          break;
        default:
      }

      this.gameState = txVO.gameState;
    },

    onUpdateHistory: function(data) {
      var history = data.history;
      this.soiCauPanel.removeAllChildren();
      history = this.getNumToEndArray(history, 20);
      for(var i = 0; i< history.length; i++){
          var type = history[i].type;
          var spriteFrame = (type === TaiXiuVO.BET_TAI) ? this.iconCau[1] : this.iconCau[0];
          var btnCau = cc.instantiate(this.btnCau);
          btnCau.on(cc.Node.EventType.MOUSE_ENTER, this.onHanlerMouseEnter, this);
          btnCau.on(cc.Node.EventType.MOUSE_LEAVE, this.onHanlerMouseLeave, this);
          btnCau.on(cc.Node.EventType.TOUCH_END, this.onHanlerTouchEnd, this);
          btnCau.itag = i;
          btnCau.history = history[i];
          btnCau.getComponent(cc.Sprite).spriteFrame = spriteFrame;
          this.soiCauPanel.addChild(btnCau);
          if(i === history.length - 1){
            btnCau.getComponent(cc.Animation).play();

          }else{
            btnCau.getComponent(cc.Animation).stop();
          }
        }
    },

    onBetTaiXiu: function (totalBet, typeBet) {
        if (typeBet === TaiXiuVO.BET_TAI) {
            this.lbPlayerBetTai.string = Utility.formatCurrency(totalBet);
            if(!cc.sys.isMobile){
                this.editBoxXiu.node.active = false;
            }
        }
        else {
            this.lbPlayerBetXiu.string = Utility.formatCurrency(totalBet);
            if(!cc.sys.isMobile){
                this.editBoxTai.node.active = false;
            }
        }
    },

    onShowMessage: function (message) {
        this.messagePanel.stopAllActions();
        this.messagePanel.opacity = 255;
        this.messagePanel.scale = 1;
        this.lbMessage.string = message;

        var callFunc = cc.callFunc(function() {
            TweenLite.from(this.messagePanel, 0.2, {scaleX: 0, scaleY: 0});
        }.bind(this));

        this.messagePanel.runAction(cc.sequence(callFunc , cc.delayTime(4) , cc.fadeOut(0.5)));
    },

    onShowResultDice: function(dices) {
      this.diceAnim.active = true;
      this.diceAnim.runAction(cc.sequence(cc.callFunc(this.showDiceAnim , this), cc.delayTime(1.5),
            cc.callFunc(function () {
                this.diceAnim.active = false;
                this.showResult(dices);

            },this)));
    },

    onUpdateBoardBet: function (totalTai, totalXiu, numTai, numXiu) {
        this.lbNumTai.string = numTai;
        this.lbNumXiu.string = numXiu;
        this.lbTotalTai.string = Utility.formatCurrency(totalTai);
        this.lbTotalXiu.string = Utility.formatCurrency(totalXiu);

        this.effectUpdateBoardBet(this.lbTotalTai.node);
        this.effectUpdateBoardBet(this.lbTotalXiu.node);
    },

    ////////////////////////////////////////////////////////////////////////////
    onHandlerTouchSoKhac: function() {
      this.fixedBetPanel.active = !this.fixedBetPanel.active;
      this.unfixedBetPanel.active = !this.unfixedBetPanel.active;
      this.betValue = 0;
      if(this.fixedBetPanel.active === true) {
          if(this.gateSelected === TaiXiuVO.BET_TAI)
              this.lbBetValueTai.string = '0';
          else
              this.lbBetValueXiu.string = '0';
      }
      else {
          if(this.gateSelected === TaiXiuVO.BET_TAI)
              this.lbBetValueTai.string = '';
          else
              this.lbBetValueXiu.string = '';
      }
    },

    onHandlerTouchBetOk: function() {
      this.bettingPanel.active = false;
      if(this.betValue !== 0) {
          var params = {};
          params.bet = this.betValue;
          params.typeBet = this.gateSelected;
          this.node.emit('ACTIVE_SEND_BET', params);
      }
      this.lbBetValueTai.string = "0";
      this.lbBetValueXiu.string = "0";
      this.editBoxTai.string = "";
      this.editBoxXiu.string = "";
      this.betValue = 0;
    },
    onHandlerTouchBetCancel: function() {
      this.bettingPanel.active = false;
      this.lbBetValueTai.string = '0';
      this.lbBetValueXiu.string = '0';
    },

    onHandlerBettingEvent: function(event) {
      var number = event.target._name;
      if (this.fixedBetPanel.active) {
         this.betValue = this.betValue + parseInt(number);
      }
      else {
         if(this.lbBetValueTai.string === '' && (number === "0" || number === "000" || number === "btnRemove"))
             return;
         if(number === "000")
             this.betValue = this.betValue * 1000 +  parseInt(number);
         else if(number === "btnRemove")
             this.betValue = Math.floor(this.betValue/10);
         else
             this.betValue = this.betValue * 10 +  parseInt(number);
      }
      if(this.betValue > 100000000)
         this.betValue = 100000000;

      if(cc.sys.isMobile) {
         if (this.gateSelected === TaiXiuVO.BET_TAI) {
             this.lbBetValueTai.string = Utility.formatCurrency(this.betValue);
         }
         else {
             this.lbBetValueXiu.string = Utility.formatCurrency(this.betValue);
         }
      }
      else{
         if (this.gateSelected === TaiXiuVO.BET_TAI) {
             this.editBoxTai.string = Utility.formatCurrency(this.betValue);
         }
         else {
             this.editBoxXiu.string = Utility.formatCurrency(this.betValue);
         }
      }
    },

    onHanlerEditBoxBegan: function(sender) {
      if(sender.node.name === "editboxTai") {
          this.editBoxXiu.string = "";
          this.gateSelected = TaiXiuVO.BET_TAI;
      }
      else {
          this.editBoxTai.string = "";
          this.gateSelected = TaiXiuVO.BET_XIU;
      }
      this.bettingPanel.active = true;
      this.betValue = 0;
    },

    onHanlerEditBoxChange: function(event,sender) {
      event = Utility.formatStringEditBox(event);
      if(sender.node.name === "editboxTai")
          this.editBoxTai.string = event;
      else
          this.editBoxXiu.string = event;
      this.betValue = parseInt(event.replace(/\D/g, ''));
    },

    onHanlerEditBoxEnded: function() {

    },

    onHanlerEditBoxReturn: function() {
      cc.log("edit return " + this.betValue);
      if(this.betValue !== 0) {
        var params = {};
        params.bet = this.betValue;
        params.typeBet = this.gateSelected;


        this.root.activeSendBetTaiXiu(params);

      }
      this.betValue = 0;
      this.editBoxTai.string = "";
      this.editBoxXiu.string = "";
      this.bettingPanel.active = false;
    },

    onHanlerMouseEnter: function (event) {
        var history = this.txVO.history;
        var btnCau = event.target;
        var cauDetail = btnCau.getChildByName("cauDetail");
        var lbCau = cauDetail.getChildByName("lbCau").getComponent(cc.Label);
        lbCau.string = btnCau.history.result;
        cauDetail.active = true;

        var scale = cc.scaleTo(0.2,1.3);
        event.target.runAction(scale);
    },

    onHanlerMouseLeave: function (event) {
        var cauDetail = event.target.getChildByName("cauDetail");
        cauDetail.active = false;
        var scale = cc.scaleTo(0.2,1);
        event.target.runAction(scale);
    },

    onHanlerTouchEnd: function (event) {
        var params = {};
        params.session = this.txVO.session - (20-event.target.itag);
        params.page = 1;
        this.root.onActiveDetailSession(params);
    },

    onHandlerRankBtn: function() {
      this.node.emit('ACTIVE_RANK');
    },

    onHandlerMyHistoryBtn: function() {
      this.node.emit('ACTIVE_HISTORY');
    },

    onHandlerGuideBtn: function() {
      this.node.emit('ACTIVE_GUIDE');
    },

    onHandlerEventBtn: function() {
        var params = {};
        // params.date = new Date();
        // params.isWin = 1;
        this.root.onActiveEvent();
    },

    ////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////
    showResult: function (dices) {
        var score = dices[0] + dices[1] + dices[2];

        this.showScorePanel.active = true;
        this.countdownWaiting.active = true;
        this.lbScore.string = score;

        this.imgDice1.spriteFrame = this.iconDice[dices[0]-1];
        this.imgDice2.spriteFrame = this.iconDice[dices[1]-1];
        this.imgDice3.spriteFrame = this.iconDice[dices[2]-1];

        if(this.isNan) {
            this.bowl.active = true;
        }
        else {
            this.showEffectResult(score);
            this.imgScore.active = true;
        }
    },

    showEffectResult: function (score) {
        this.imgTai.stopAllActions();
        this.imgXiu.stopAllActions();
        if(score > 10) {
            this.runEffect(this.imgTai);
        }
        else {
            this.runEffect(this.imgXiu);
        }
    },

    runEffect: function (node) {
        var fadeIn = cc.fadeIn(0.15);
        var fadeOut = cc.fadeOut(0.15);
        node.runAction(cc.sequence(fadeIn, fadeOut).repeatForever());
    },

    effectUpdateBoardBet: function (node) {
       var callFunc1 = cc.callFunc(function() {
           TweenLite.to(node, 0.2, {scaleX: 1.2, scaleY: 1.2});
       }.bind(this));

       var callFunc2 = cc.callFunc(function() {
           TweenLite.to(node, 0.2, {scaleX: 1, scaleY: 1});
       }.bind(this));
       node.runAction(cc.sequence(callFunc1, cc.delayTime(0.2), callFunc2));
    },

    showDiceAnim: function () {
        this.diceAnim.getComponent(cc.Animation).play('run');
    },

    resetGame: function () {
      this.countdownWaiting.active = false;
      this.lbTime.node.color = new cc.Color(67, 22, 162);//cc.Color.BLUE;
      this.lbTime.node.active = true;
      this.lbScore.node.active = false;
      this.imgScore.active = false;
      this.resultPanel.active = false;
      this.imgTai.stopAllActions();
      this.imgXiu.stopAllActions();
      this.imgTai.opacity = 255;
      this.imgXiu.opacity = 255;
      this.lbBetValueTai.string = '0';
      this.lbBetValueXiu.string = '0';

      this.lbPlayerBetTai.string = '0';
      this.lbPlayerBetXiu.string = '0';
      this.lbTotalTai.node.stopAllActions();
      this.lbTotalXiu.node.stopAllActions();
      this.lbPlayerBetTai.node.stopAllActions();
      this.lbPlayerBetXiu.node.stopAllActions();
    },

    enableBetting(value) {
      if(value === false){
        this.btnBetWeb.node.active = false;
        this.bettingPanel.active = false;
      }

      if(!cc.sys.isMobile){
          this.editBoxTai.node.active = value;
          this.editBoxXiu.node.active = value;
      }

      this.taiPanel.enabled = value;
      this.xiuPanel.enabled = value;
    },

    getNumToEndArray(arr, num) {
      if(arr.length < num) return arr;
      var result = arr.slice(arr.length - num, arr.length);
      return result;
    },
    // update (dt) {},
});
