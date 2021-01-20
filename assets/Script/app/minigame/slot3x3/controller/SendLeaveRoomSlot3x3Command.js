var BaseCommand = require('BaseCommand');
export default class SendLeaveRoomSlot3x3Command extends BaseCommand {
  execute(notification) {
    BaseCommand.prototype.execute.call(this, notification);

    this.gameProxy = this.facade.retrieveProxy("Slot3x3Proxy");
    this.gameProxy.leaveRoom();
  }
}
