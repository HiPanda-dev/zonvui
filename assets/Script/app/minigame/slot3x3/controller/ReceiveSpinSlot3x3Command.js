var BaseCommand = require('BaseCommand');
var MiniGameMessage = require('MiniGameMessage');
var LobbyMessage = require('LobbyMessage');
var Slot3x3VO = require('Slot3x3VO');
var i18n = require('i18n');

export default class ReceiveSpinSlot3x3Command extends BaseCommand {
  execute(notification) {
    console.log('----------ReceiveSpinSlot3x3Command---------');
    BaseCommand.prototype.execute.call(this, notification);
    var gameVO = notification.getBody().data;
    gameVO.session++;
    if(gameVO.typeResult === Slot3x3VO.ERROR) {
      gameVO.isSpining = false;
      gameVO.autoSpin = false;
      this.sendNotification(MiniGameMessage.ON_SHOW_MESSAGE_SLOT3X3, {message: gameVO.errorMessage});
      this.sendNotification(MiniGameMessage.ON_SET_AUTO_SPIN_SLOT3X3, {autoSpin: false});
    }else{
      this.sendNotification(MiniGameMessage.ON_SPIN_AND_RESULT_SLOT3X3, {items:gameVO.items, onComplete: this.onComplete.bind(this)});
    }
  }

  onComplete() {
    TweenLite.delayedCall(1, function(){
      var gameVO = this.facade.retrieveProxy('Slot3x3Proxy').gameVO;
      gameVO.isSpining = false;
      this.updateMyMoney(gameVO.money);
      if(gameVO.wins.length > 0){
        var wins = gameVO.wins;
        this.sendNotification(MiniGameMessage.ON_SHOW_LINE_WIN_SLOT3X3, {wins: wins});
        this.sendNotification(MiniGameMessage.ON_SHOW_EFFECT_WIN_SLOT3X3, {gameVO: gameVO});
        TweenLite.delayedCall(3, function(session){
          if(gameVO.session !== session) return;
          var timeDeay = 1;
          this.sendNotification(MiniGameMessage.ON_HIDE_EFFECT_WIN_SLOT3X3);
          if(gameVO.autoSpin) {
            this.checkAutoSpin();
          }else {
            this.displayOneLine(wins, timeDeay, session);
            TweenLite.delayedCall(wins.length * timeDeay, function() {
              this.sendNotification(MiniGameMessage.ON_HIDE_ALL_LINE_SLOT3X3);
              this.sendNotification(MiniGameMessage.ON_HIDE_ALL_EFFECT_ITEM_WIN_SLOT3X3);
            }.bind(this));
          }
        }.bind(this),[gameVO.session]);
      }else{
        TweenLite.delayedCall(1, function(){
          this.checkAutoSpin();
        }.bind(this));
      }
    }.bind(this))
  }

  checkAutoSpin() {
    var gameVO = this.facade.retrieveProxy('Slot3x3Proxy').gameVO;
    if(gameVO.autoSpin) {
      this.sendNotification(MiniGameMessage.SEND_SPIN_SLOT3X3 , {data: gameVO.prevDataSpin});
      this.sendNotification(MiniGameMessage.ON_HIDE_ALL_LINE_SLOT3X3);
    }
  }

  displayOneLine(wins, timeDeay, session) {
    for (var i = 0; i < wins.length; i ++) {
      var delay = i*timeDeay;
      TweenLite.delayedCall(delay, function(data, session){
          var gameVO = this.facade.retrieveProxy('Slot3x3Proxy').gameVO;
          if(gameVO.session !== session) return;
          this.sendNotification(MiniGameMessage.ON_HIDE_ALL_EFFECT_ITEM_WIN_SLOT3X3);
          this.sendNotification(MiniGameMessage.ON_SHOW_LINE_WIN_SLOT3X3, {wins: [data]});
          this.sendNotification(MiniGameMessage.ON_SHOW_EFFECT_ITEM_WIN_SLOT3X3, {wins: [data]});
      }.bind(this),[wins[i], session]);
    }
  }



  updateMyMoney(money) {
    var mySelf = this.facade.retrieveProxy('UserProxy').mySelf;
    mySelf.money = money;
    this.sendNotification(LobbyMessage.ON_UPDATE_MY_INFO);
  }

}
