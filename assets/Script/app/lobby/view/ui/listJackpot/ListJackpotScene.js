var BaseScene = require('BaseScene');
var ListJackpotSceneMediator = require('ListJackpotSceneMediator');
var Utility = require('Utility');
var Runnin2gLabel = require('Runnin2gLabel');
var CustomAction = require('CustomAction');
var Constants = require('Constants');

cc.Class({
    extends: BaseScene,

    ctor: function () {
      ListJackpotSceneMediator.getInstance.init(this);
      this.mucCuoc = 100;
      this.data = null;
    },

    properties: {
        scrollview:cc.Node,
        lbJackpotMiniPoker: cc.Label,
        lbJackpotThienHa:cc.Label,
        lbJackpotLuckyCafe:cc.Label,
        mcIcon:cc.Node,
        mcJackpot:cc.Node,

    },

    onLoad: function () {
      //CHU Y: listLabelJackpot tuong ung voi listModuleId
      this.listLabelJackpot = [this.lbJackpotMiniPoker, this.lbJackpotThienHa, this.lbJackpotLuckyCafe];
      this.listModuleId = [102,103,200]

      this.curPosScrollView = new cc.Vec2(this.scrollview.x,this.scrollview.y);
      this.showJackpot();
      setTimeout(function(){
        this.showIcon();
      }.bind(this), 3000);
    },

    showHide: function () {
        if (this.node.active) this.hide();
        else this.show();
    },

    showIcon: function() {
      this.mcIcon.active = true;
      TweenLite.to(this.mcJackpot,0.3, {scaleY: 0});
    },

    showJackpot: function() {
      this.mcIcon.active = false;
      TweenLite.to(this.mcJackpot,0.3, {scaleY: 1});
    },

    updateListJackpot: function (data) {
      this.data = data;
      for(var i=0; i<data.length; i++) {
        var goalValue = 0;
        var listJackpot = data[i].v.split(',')
        if (this.mucCuoc === 100) goalValue = listJackpot[0];
        else if (this.mucCuoc === 1000) goalValue = listJackpot[1];
        else if (this.mucCuoc === 10000) goalValue = listJackpot[2];
        for (var j = 0; j < this.listModuleId.length; j++) {
          if(this.listModuleId[j] === data[i].i) {
            Utility.tweenRunNumber(this.listLabelJackpot[j].node, goalValue, 1.5);
            this.listLabelJackpot[j].goalValue = parseInt(goalValue);
          }
        }
      }

      this.sortItemJackpot();
    },

    sortItemJackpot: function () {
      var arr = this.listLabelJackpot.concat();
      arr.sort(function(a, b){
          if(a.goalValue > b.goalValue) return -1;
          if(a.goalValue < b.goalValue) return 1;
          return 0;
      });

      for(var i=0;i< arr.length;i++) {
        var mc = arr[i];
        mc.node.parent.setSiblingIndex(i);
        mc.node.parent.zIndex = i;
      }

      arr[0].node.parent.parent.sortAllChildren();
    },

    handlerSelectRoom1: function () {
        this.mucCuoc = 100;
        this.scrollview.x = this.curPosScrollView.x;
        this.scrollview.opacity = 256;
        TweenLite.from(this.scrollview, 0.3, {x: this.curPosScrollView.x + 150, opacity: 0})
        if(this.data !== null) this.updateListJackpot(this.data);
    },

    handlerSelectRoom2: function () {
        this.mucCuoc = 1000;
        this.scrollview.x = this.curPosScrollView.x;
        this.scrollview.opacity = 256;
        TweenLite.from(this.scrollview, 0.3, {x: this.curPosScrollView.x + 150, opacity: 0})
        if(this.data !== null) this.updateListJackpot(this.data);
    },

    handlerSelectRoom3: function () {
        this.mucCuoc = 10000;
        this.scrollview.x = this.curPosScrollView.x;
        this.scrollview.opacity = 256;
        TweenLite.from(this.scrollview, 0.3, {x: this.curPosScrollView.x + 150, opacity: 0})
        if(this.data !== null) this.updateListJackpot(this.data);
    },

    hanlerEventSelectGameMiniPoker: function () {
        this.activeJoinMiniGame(Constants.MINIGAME_MINI_POKER);
    },

    hanlerEventSelectGameThienHa: function () {
        this.activeJoinMiniGame(Constants.MINIGAME_SLOT3X3);
    },

    hanlerEventSelectGameLuckyCafe: function () {
        this.activeJoinSlot20(Constants.SLOT20_LUCKY_CAFE);
    },

    onHandlerHideListJackpot: function() {
      this.hide();
      this.activeShowJackpotButton();
    }
});
