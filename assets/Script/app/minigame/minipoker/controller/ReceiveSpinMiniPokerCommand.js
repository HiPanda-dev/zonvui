var BaseCommand = require('BaseCommand');
var MiniGameMessage = require('MiniGameMessage');
var LobbyMessage = require('LobbyMessage');
var MiniPokerProxy = require('MiniPokerProxy');
var MiniPokerVO = require('MiniPokerVO');
var i18n = require('i18n');

export default class ReceiveSpinMiniPokerCommand extends BaseCommand {
  execute(notification) {
    BaseCommand.prototype.execute.call(this, notification);
    var gameVO = notification.getBody().data;
    if(gameVO.typeResult === MiniPokerVO.ERROR) {
      gameVO.isSpining = false;
      gameVO.autoSpin = false;
      console.log('ReceiveSpinMiniPokerCommand [MiniPokerVO.ERROR]: ' + gameVO.isSpining);
      this.sendNotification(MiniGameMessage.ON_SHOW_MESSAGE_MINI_POKER, {message: gameVO.errorMessage});
      this.sendNotification(MiniGameMessage.ON_SET_AUTO_SPIN_MINI_POKER, {autoSpin: false});
    }else{
      this.sendNotification(MiniGameMessage.ON_SPIN_AND_RESULT_MINI_POKER, {items:gameVO.items, onComplete: this.onSpinComplete.bind(this)});
    }
  }

  onSpinComplete() {
    TweenLite.delayedCall(1, function(){
      var gameVO = this.facade.retrieveProxy('MiniPokerProxy').gameVO;
      gameVO.isSpining = false;
      this.updateMyMoney(gameVO.money);
      var timeResultDelay = 1;
      if(gameVO.prize > 0) {
        this.sendNotification(MiniGameMessage.ON_SHOW_EFFECT_WIN_MINI_POKER, {gameVO: gameVO});
        timeResultDelay = 3;
      }
      TweenLite.delayedCall(timeResultDelay, function(){
        this.sendNotification(MiniGameMessage.ON_HIDE_EFFECT_WIN_MINI_POKER);
        if(gameVO.autoSpin) {
          this.sendNotification(MiniGameMessage.SEND_SPIN_MINI_POKER , {data: {bet: gameVO.getCurrentBet()}});
        }
      }.bind(this));
    }.bind(this));
  }

  updateMyMoney(money) {
    var mySelf = this.facade.retrieveProxy('UserProxy').mySelf;
    mySelf.money = money;
    this.sendNotification(LobbyMessage.ON_UPDATE_MY_INFO);
  }
}
