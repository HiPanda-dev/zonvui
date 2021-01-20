var BaseCommand = require('BaseCommand');
var LobbyMessage = require('LobbyMessage');
var UserProxy = require('UserProxy');
var Constants = require('Constants');

export default class ReceiveChangeAvatarCommand extends BaseCommand {
  execute(notification) {
    BaseCommand.prototype.execute.call(this, notification);
    var params = notification.getBody();

    var userProxy = this.facade.retrieveProxy('UserProxy');
    userProxy.mySelf.avatar = Constants.CUR_AVATAR;

    this.sendNotification(LobbyMessage.SHOW_FLY_ALERT,{content:params.data});
    this.sendNotification(LobbyMessage.ON_UPDATE_AVATAR);
  }
}
