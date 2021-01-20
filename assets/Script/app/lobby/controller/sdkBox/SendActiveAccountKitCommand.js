var BaseCommand = require('BaseCommand');
var ScreenLog = require('ScreenLog');
var LobbyMessage = require('LobbyMessage');

export default class SendActiveAccountKitCommand extends BaseCommand {
  execute(notification) {
    BaseCommand.prototype.execute.call(this, notification);
    var accoutKitProxy = this.facade.retrieveProxy('AccountKitProxy');
    accoutKitProxy.sendSMS(this.onComplete.bind(this));
  }

  onComplete(data) {
    console.log("=====>>><<<<<====");
    console.log("data " + data);

    // var socket = this.facade.retrieveProxy('SCLobbyProxy');
    // var sendData = data.code;
    // socket.sendActivePhone(sendData);
  }
}
