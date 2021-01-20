var BaseScene = require('BaseScene');
var Constants = require('Constants');
var Utility = require('Utility');
var GameConfig = require('GameConfig');
var UserVO = require('UserVO');
var i18n = require('i18n');
var SelectGameSceneMediator = require('SelectGameSceneMediator');


var SelectGameScene = cc.Class({
  extends: BaseScene,

  properties: {
    slotList:[cc.Node],
    minigameList:[cc.Node],

    mcJackpotLuckyCafe:cc.Node,
    mcJackpotKeoNgot:cc.Node,

    txtTimerTourLuckyCafe: cc.Label,
    txtTimerTourKeoNgot: cc.Label,
    txtTimerTourTaiXiu: cc.Label,
    txtTimerTourThienHa: cc.Label,
    txtTimerTourMinipoker: cc.Label,
    txtTimerTourBanCa: cc.Label,
    txtTimerTourBauCua: cc.Label,
  },
  ctor: function() {
    SelectGameSceneMediator.getInstance.init(this)
    this.user = new UserVO();
  },

  onLoad: function() {
    this.hideAllTextTourCoundown();
  },

  onHandlerShowAll: function() {
    this.setActiveListGame(this.slotList, true);
    this.setActiveListGame(this.minigameList, true);
  },

  onHandlerShowSlot: function() {
    this.setActiveListGame(this.slotList, true);
    this.setActiveListGame(this.minigameList, false);
  },

  onHandlerShowMinigame: function() {
    this.setActiveListGame(this.slotList, false);
    this.setActiveListGame(this.minigameList, true);
  },

  onHandlerShowTournament: function() {

  },

  setActiveListGame:function(gameList, isActive) {
    var o;
    for(var i = 0; i< gameList.length; i++) {
      o = gameList[i];
      if(o) o.active = isActive;
    }
  },

  hanlerEventSelectGameTaiXiu: function() {
    if (cc.sys.isBrowser)
      ga('send', 'event', 'click game', 'tai xiu', this.user.displayName);
    this.onJoinMiniGame(Constants.MINIGAME_TAI_XIU);
  },

  hanlerEventSelectGameSlot3x3: function() {
    if (cc.sys.isBrowser)
      ga('send', 'event', 'click game', 'thien ha');
    this.onJoinMiniGame(Constants.MINIGAME_SLOT3X3);
  },

  hanlerEventSelectGameMiniPoker: function() {
    if (cc.sys.isBrowser)
      ga('send', 'event', 'click game', 'mini poker');
    this.onJoinMiniGame(Constants.MINIGAME_MINI_POKER);
  },

  hanlerEventSelectSlot20LuckyCafe: function() {
    if (cc.sys.isBrowser)
      ga('send', 'event', 'click game', 'lucky cafe');
    this.onJoinSlot(Constants.SLOT20_LUCKY_CAFE);
  },

  hanlerEventSelectSlot20KeoNgot: function() {
    if (cc.sys.isBrowser)
      ga('send', 'event', 'click game', 'keo ngot');
    this.onJoinSlot(Constants.SLOT20_KEO_NGOT);
  },

  updateTournament: function(data) {

  },

  hideAllTextTourCoundown() {
    this.txtTimerTourLuckyCafe.node.parent.active = false;
    this.txtTimerTourKeoNgot.node.parent.active = false;
    this.txtTimerTourTaiXiu.node.parent.active = false;
    this.txtTimerTourThienHa.node.parent.active = false;
    this.txtTimerTourMinipoker.node.parent.active = false;
    this.txtTimerTourBanCa.node.parent.active = false;
    this.txtTimerTourBauCua.node.parent.active = false;
  },

  onUpdateTimerCountDownTour:function(data) {
    this.hideAllTextTourCoundown();
    for(var moduleId in data) {
      switch (parseInt(moduleId)) {
        case Constants.SLOT20_LUCKY_CAFE:
          this.setCountTextTimer(this.txtTimerTourLuckyCafe, data[moduleId]);
          break;
        case Constants.SLOT20_KEO_NGOT:
          this.setCountTextTimer(this.txtTimerTourKeoNgot, data[moduleId]);
          break;
        case Constants.MINIGAME_TAI_XIU:
          this.setCountTextTimer(this.txtTimerTourTaiXiu, data[moduleId]);
          break;
        case Constants.MINIGAME_SLOT3X3:
          this.setCountTextTimer(this.txtTimerTourThienHa, data[moduleId]);
          break;
        case Constants.MINIGAME_MINI_POKER:
          this.setCountTextTimer(this.txtTimerTourMinipoker, data[moduleId]);
        break;
        default:
      }
    }
  },

  setCountTextTimer: function(txt, time) {
    if (time >= 0) txt.node.parent.active = true;
    if (time > 0) txt.string = Utility.hh_mm_ss(time);
    if (time === 0) txt.string = i18n.t("C0245")
  },

  updateListJackpot: function(data) {
    for (var i = 0; i < data.length; i++) {
      var listJackpot = data[i].v.split(',');
      var mcJackpot = null;

      if (data[i].i === Constants.SLOT20_LUCKY_CAFE) mcJackpot = this.mcJackpotLuckyCafe;
      if (data[i].i === Constants.SLOT20_KEO_NGOT) mcJackpot = this.mcJackpotKeoNgot;

      if (mcJackpot !== null) {
        Utility.tweenRunNumber(mcJackpot.getChildByName('txtJackpot1'), listJackpot[0], 1.5);
        Utility.tweenRunNumber(mcJackpot.getChildByName('txtJackpot2'), listJackpot[1], 1.5);
        Utility.tweenRunNumber(mcJackpot.getChildByName('txtJackpot3'), listJackpot[2], 1.5);
      }

    }
  }

});
