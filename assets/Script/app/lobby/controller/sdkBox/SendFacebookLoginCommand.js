var BaseCommand = require('BaseCommand');
var ScreenLog = require('ScreenLog');
var LobbyMessage = require('LobbyMessage');

export default class SendFacebookLoginCommand extends BaseCommand {
  execute(notification) {
    BaseCommand.prototype.execute.call(this, notification);
    var fbProxy = this.facade.retrieveProxy('FacebookProxy');
    fbProxy.login(this.loginFBComplete.bind(this));
  }

  loginFBComplete (token) {
      cc.log("token facebook send: " + token);

      var socket = this.facade.retrieveProxy('SCLobbyProxy');
      var config = this.facade.retrieveProxy('ConfigProxy').config;

      var sendData = {
          tk:token,
          des:config.deviceId
      };

      socket.loginViaFaceBook(sendData);
  }
}
