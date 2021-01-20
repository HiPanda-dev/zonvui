var BaseCommand = require('BaseCommand');
var LobbyMessage = require('LobbyMessage');

export default class SendGetTopTournamentCommand extends BaseCommand {
  execute(notification) {
    BaseCommand.prototype.execute.call(this, notification);
    var data = notification.getBody();
    var socket = this.facade.retrieveProxy('SCLobbyProxy');
    var sendData = data.tourId;
    socket.sendGetTopTournament(sendData);
  }
}
