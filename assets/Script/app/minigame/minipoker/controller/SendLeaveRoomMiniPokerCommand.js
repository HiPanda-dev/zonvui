var BaseCommand = require('BaseCommand');
export default class SendLeaveRoomMiniPokerCommand extends BaseCommand {
  execute(notification) {
    BaseCommand.prototype.execute.call(this, notification);

    this.gameProxy = this.facade.retrieveProxy("MiniPokerProxy");
    this.gameProxy.leaveRoom();
  }
}
