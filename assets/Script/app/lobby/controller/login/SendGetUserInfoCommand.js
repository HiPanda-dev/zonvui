var BaseCommand = require('BaseCommand');
var LobbyMessage = require('LobbyMessage');
var BaseGameCommand = require('BaseGameCommand');

export default class SendGetUserInfoCommand extends BaseCommand {
  execute(notification) {
    BaseGameCommand.prototype.execute.call(this, notification);
    var data = notification.getBody();

    var http = this.facade.retrieveProxy('HttpRequestProxy');
    var mySelf = this.facade.retrieveProxy('UserProxy').mySelf;

    var sendData = {
        displayName: data.displayName,
        token: mySelf.token
    };

    http.getUserinfo(LobbyMessage.RECEIVE_GET_USER_INFO, sendData);
  }
}
