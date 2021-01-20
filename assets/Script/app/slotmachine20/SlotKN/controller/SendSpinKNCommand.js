var BaseCommand = require('BaseCommand');
var SlotKNProxy = require('SlotKNProxy');
var SlotMessage = require('SlotMessage');
var i18n = require('i18n');

export default class SendSpinKNCommand extends BaseCommand {
  execute(notification) {
    BaseCommand.prototype.execute.call(this, notification);
    var params = notification.getBody();
    var gameVO = SlotKNProxy.proxy.gameVO;
    if(gameVO.isSpining === true) return this.sendNotification(SlotMessage.ON_SHOW_MESSAGE_KEO_NGOT, {message: i18n.t("T0012")});

    gameVO.isSpining = true;
    gameVO.prevDataSpin = params.data;
    if(gameVO.autoSpin && gameVO.curNumAutoSpin === 0) {
      gameVO.autoSpin = false;
      this.sendNotification(SlotMessage.ON_SET_AUTO_SPIN_KEO_NGOT, {isAuto: false});
    }
    if(gameVO.freeSpin > 0) gameVO.freeSpin--;
    if(gameVO.freeSpin === 0) gameVO.isFreeSpin = false;
    this.sendNotification(SlotMessage.ON_HIDE_ALL_LINE_KEO_NGOT);
    if(gameVO.isChoiThu === false) {
      this.gameProxy = SlotKNProxy.proxy;
      this.gameProxy.sendSpin(params.data);
    }else{
      gameVO.updateChoiThuData();
      this.sendNotification(SlotMessage.RECEIVE_SPIN_KEO_NGOT, {data: gameVO} );
    }
  }
}
