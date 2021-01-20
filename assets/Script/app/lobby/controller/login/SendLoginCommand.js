var i18n = require('i18n');
var BaseCommand = require('BaseCommand');
var LobbyMessage = require('LobbyMessage');

export default class SendLoginCommand extends BaseCommand {
  execute(notification) {
    BaseCommand.prototype.execute.call(this, notification);
    var params = notification.getBody();
    var userName = params.userName;
    var password = params.password;
    if(userName === "" || password === ""){
        this.sendNotification(LobbyMessage.SHOW_FLY_ALERT,{content:i18n.t("C0005")});
        return;
    }

    var socket = this.facade.retrieveProxy('SCLobbyProxy');
    var config = this.facade.retrieveProxy('ConfigProxy').config;
    var sendData = {
        name:userName,
        pass:password,
        des:config.deviceId
    };
    socket.login(sendData);
  }
}
