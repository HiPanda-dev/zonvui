var BaseCommand = require('BaseCommand');
var LobbyMessage = require('LobbyMessage');

export default class ReceiveGetTopTournamentCommand extends BaseCommand {
  execute(notification) {
    BaseCommand.prototype.execute.call(this, notification);
    var data = notification.getBody();
    this.sendNotification(LobbyMessage.ON_UPDATE_TOP_TOURNAMENT, data);
  }
}
