var BaseCommand = require('BaseCommand');
var LobbyMessage = require('LobbyMessage');
var Utility = require('Utility');
var MiniGameMessage = require('MiniGameMessage');

export default class ReceiveUpdateBoardBetTaiXiuCommand extends BaseCommand {
  execute(notification) {
    BaseCommand.prototype.execute.call(this, notification);
    var txVO = notification.getBody().data;
    this.sendNotification(MiniGameMessage.ON_UPDATE_BOARD_BET_TAI_XIU, {
        numTai: txVO.numTai,
        numXiu: txVO.numXiu,
        totalTai: txVO.totalTai,
        totalXiu: txVO.totalXiu

    });
  }
}
