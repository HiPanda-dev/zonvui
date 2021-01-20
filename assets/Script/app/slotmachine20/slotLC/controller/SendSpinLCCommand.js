var BaseCommand = require('BaseCommand');
var SlotLCProxy = require('SlotLCProxy');
var SlotMessage = require('SlotMessage');
var i18n = require('i18n');

export default class SendSpinLCCommand extends BaseCommand {
  execute(notification) {
    BaseCommand.prototype.execute.call(this, notification);
    var params = notification.getBody();
    var gameVO = SlotLCProxy.proxy.gameVO;
    if(gameVO.isSpining === true) return this.sendNotification(SlotMessage.ON_SHOW_MESSAGE_LUCKY_CAFE, {message: i18n.t("T0012")});

    gameVO.isSpining = true;
    gameVO.prevDataSpin = params.data;
    if(gameVO.autoSpin && gameVO.curNumAutoSpin === 0) {
      gameVO.autoSpin = false;
      this.sendNotification(SlotMessage.ON_SET_AUTO_SPIN_LUCKY_CAFE, {isAuto: false});
    }
    this.sendNotification(SlotMessage.ON_HIDE_ALL_LINE_LUCKY_CAFE);

    if(gameVO.isChoiThu === false) {
      this.gameProxy = SlotLCProxy.proxy;
      // for(var i = 0; i < 100; i++) {
      //   this.gameProxy.sendSpin(params.data);
      // }
      this.gameProxy.sendSpin(params.data);

    }else{
      gameVO.updateChoiThuData();
      this.sendNotification(SlotMessage.RECEIVE_SPIN_LUCKY_CAFE, {data: gameVO} );
    }

  }
}
