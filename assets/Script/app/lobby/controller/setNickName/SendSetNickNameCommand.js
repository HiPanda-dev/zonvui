var i18n = require('i18n');
var BaseCommand = require('BaseCommand');
var LobbyMessage = require('LobbyMessage');

export default class SendSetNickNameCommand extends BaseCommand {
    execute(notification) {
        BaseCommand.prototype.execute.call(this, notification);
        var params = notification.getBody();
        var nickName = params.nickName;
        if(nickName === ""){
            this.sendNotification(LobbyMessage.SHOW_FLY_ALERT,{content:i18n.t("C0005")});
            return;
        }

        var socket = this.facade.retrieveProxy('SCLobbyProxy');

        var sendData = nickName;
        socket.sendUpdateAlias(sendData);
    }
}
