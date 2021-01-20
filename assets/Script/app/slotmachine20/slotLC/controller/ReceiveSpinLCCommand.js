var BaseCommand = require('BaseCommand');
var SlotMessage = require('SlotMessage');
var LobbyMessage = require('LobbyMessage');
var SoundGameMessage = require('SoundGameMessage');
var Slot20VO = require('Slot20VO');
var SlotLCProxy = require('SlotLCProxy');
var UserProxy = require('UserProxy');
var LocalStorage = require('LocalStorage');
var i18n = require('i18n');

export default class ReceiveSpinLCCommand extends BaseCommand {
  execute(notification) {
    BaseCommand.prototype.execute.call(this, notification);
    this.gameVO = notification.getBody().data;
    this.gameVO.session++;
    if(this.gameVO.typeResult === Slot20VO.ERROR) {
      this.gameVO.isSpining = false;
      this.gameVO.autoSpin = false;
      this.sendNotification(SlotMessage.ON_SHOW_MESSAGE_LUCKY_CAFE, {message: this.gameVO.errorMessage});
      this.sendNotification(SlotMessage.ON_SET_AUTO_SPIN_LUCKY_CAFE, {autoSpin: false});
    }else{
      this.dataUser = this.facade.retrieveProxy(UserProxy.NAME);
      if(this.gameVO.isChoiThu === false) {
        this.dataUser.mySelf.money -= this.gameVO.getTotalBet();
        this.sendNotification(LobbyMessage.ON_UPDATE_MY_INFO);
      }
      this.sendNotification(SlotMessage.ON_SPIN_AND_RESULT_LUCKY_CAFE, {items:this.gameVO.items, onComplete: this.onComplete.bind(this)});
      if( LocalStorage.getSound() === "true") {
        this.sendNotification(LobbyMessage.PLAY_SOUND_EFFECT, SoundGameMessage.SPIN_LUCKY_CAFE_SOUND);
      }
    }

    setTimeout(function(session){
      if(this.gameVO.session !== session) return;
      this.gameVO.isSpining = false;
    }.bind(this), 5000,this.gameVO.session);
  }

  onComplete() {
    this.dataUser.mySelf.money = this.gameVO.money;
    this.sendNotification(LobbyMessage.ON_UPDATE_MY_INFO);

    this.checkHasMinigame(function(){
      this.checkHasFreeSpin(function(){
        this.checkHasJackpot(function(){
          this.checkHasbigWin(function(){
            this.checkHasNomalWin(function(){
              this.checkHasAutoSpin(function(){
                this.displayOneLine();
              }.bind(this));
            }.bind(this));
          }.bind(this));
        }.bind(this));
      }.bind(this));
    }.bind(this));
  }

  displayOneLine() {
    var timeDeay = 1.5;
    var wins = this.gameVO.wins;
    var session = this.gameVO.session;
    if(this.gameVO.typeResult !== Slot20VO.JACKPOT_WIN) this.sendNotification(SlotMessage.ON_HIDE_EFFECT_WIN_LUCKY_CAFE);
    for (var i = 0; i < wins.length; i ++) {
      var delay = i*timeDeay;
      TweenLite.delayedCall(delay, function(data, session){
          if(this.gameVO.session !== session) return;
          this.sendNotification(SlotMessage.ON_HIDE_ALL_EFFECT_ITEM_WIN_LUCKY_CAFE);
          this.sendNotification(SlotMessage.ON_SHOW_LINE_WIN_LUCKY_CAFE, {wins: [data]});
          this.sendNotification(SlotMessage.ON_SHOW_EFFECT_ITEM_WIN_LUCKY_CAFE, {wins: [data]});
      }.bind(this),[wins[i], session]);
    }

    TweenLite.delayedCall(wins.length * timeDeay, function() {
      this.sendNotification(SlotMessage.ON_HIDE_ALL_LINE_LUCKY_CAFE);
      this.sendNotification(SlotMessage.ON_HIDE_ALL_EFFECT_ITEM_WIN_LUCKY_CAFE);
    }.bind(this));
  }

  checkHasAutoSpin(callBack) {
    if(this.gameVO.autoSpin || this.gameVO.freeSpin > 0) {
      if(this.gameVO.autoSpin) {
        this.gameVO.curNumAutoSpin--;
        this.sendNotification(SlotMessage.ON_SET_NUM_AUTO_SPIN_LUCKY_CAFE, {num: this.gameVO.curNumAutoSpin});
      }
      this.sendNotification(SlotMessage.ON_HIDE_ALL_LINE_LUCKY_CAFE);
      this.sendNotification(SlotMessage.ON_HIDE_EFFECT_WIN_LUCKY_CAFE);
      this.sendNotification(SlotMessage.SEND_SPIN_LUCKY_CAFE , {data: this.gameVO.prevDataSpin});
    }else{
      callBack.call();
    }
  }

  checkHasNomalWin(callBack) {
    this.sendNotification(SlotMessage.ON_HIDE_ALL_EFFECT_ITEM_WIN_LUCKY_CAFE);
    this.gameVO.isSpining = false;
    if(this.gameVO.typeResult === Slot20VO.NORMAL_WIN) {
      this.sendNotification(SlotMessage.ON_SHOW_LINE_WIN_LUCKY_CAFE, {wins: this.gameVO.wins});
      this.sendNotification(SlotMessage.ON_SHOW_EFFECT_WIN_LUCKY_CAFE, {gameVO: this.gameVO});
      if(this.gameVO.wins.length > 0) {
        setTimeout(function(session){
          if(this.gameVO.session !== session) return;
          callBack.call();
        }.bind(this), 2000,this.gameVO.session);
      }else{
        callBack.call();
      }
    }else{
      callBack.call();
    }
  }

  checkHasbigWin(callBack) {
    this.sendNotification(SlotMessage.ON_HIDE_ALL_EFFECT_ITEM_WIN_LUCKY_CAFE);
    if(this.gameVO.typeResult === Slot20VO.BIG_WIN) {
      this.sendNotification(SlotMessage.ON_SHOW_LINE_WIN_LUCKY_CAFE, {wins: this.gameVO.wins});
      this.sendNotification(SlotMessage.ON_SHOW_EFFECT_WIN_LUCKY_CAFE, {gameVO: this.gameVO});
      setTimeout(function(){
        callBack.call();
      }, 3000);
    }else{
      callBack.call();
    }
  }

  checkHasJackpot(callBack) {
    this.sendNotification(SlotMessage.ON_HIDE_ALL_EFFECT_ITEM_WIN_LUCKY_CAFE);
    if(this.gameVO.typeResult === Slot20VO.JACKPOT_WIN) {
      this.sendNotification(SlotMessage.ON_PLAY_ANIM_JACKPOT_LUCKY_CAFE);
      setTimeout(function(){
        this.sendNotification(SlotMessage.ON_SHOW_LINE_WIN_LUCKY_CAFE, {wins: this.gameVO.wins});
        this.sendNotification(SlotMessage.ON_SHOW_EFFECT_WIN_LUCKY_CAFE, {gameVO: this.gameVO});
        setTimeout(function(){
          callBack.call();
        }, 5000);
      }.bind(this), 2000);
    }else{
      callBack.call();
    }
  }

  checkHasMinigame(callBack) {
    if(this.gameVO.isMinigame) {
      this.sendNotification(SlotMessage.ON_HIDE_ALL_EFFECT_ITEM_WIN_LUCKY_CAFE);
      this.sendNotification(SlotMessage.ON_PLAY_ANIM_BONUS_LUCKY_CAFE);
      setTimeout(function(){
        this.sendNotification(SlotMessage.ON_SHOW_MINIGAME, {gameVO: this.gameVO, playComplete:function(){
          setTimeout(function(){
            callBack.call();
          }, 500);
        }});
      }.bind(this), 1500);
    }else{
      callBack.call();
    }
  }

  checkHasFreeSpin(callBack) {
    if(this.gameVO.isFreeSpin) {
      this.sendNotification(SlotMessage.ON_HIDE_ALL_EFFECT_ITEM_WIN_LUCKY_CAFE);
      this.sendNotification(SlotMessage.ON_PLAY_ANIM_SCATTER_LUCKY_CAFE);
      setTimeout(function(){
        this.sendNotification(SlotMessage.ON_SHOW_EFFECT_FREE_SPIN_LUCKY_CAFE, {gameVO: this.gameVO});
        setTimeout(function(){
          this.sendNotification(SlotMessage.ON_HIDE_EFFECT_WIN_LUCKY_CAFE);
          setTimeout(function(){
            callBack.call();
          }, 1000);
        }.bind(this), 3000);
      }.bind(this),1500);

    }else {
      callBack.call();
    }
  }
}
