var BaseCommand = require('BaseCommand');
var LobbyMessage = require('LobbyMessage');
var i18n = require('i18n');

export default class SendGetInfoTournamentCommand extends BaseCommand {
  execute(notification) {
    BaseCommand.prototype.execute.call(this, notification);
    var data = notification.getBody();
    var socket = this.facade.retrieveProxy('SCLobbyProxy');
    var sendData = data.tourId;
    socket.sendGetInfoTournament(sendData);
  }
}
