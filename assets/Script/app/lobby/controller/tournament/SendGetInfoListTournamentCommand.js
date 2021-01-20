var BaseCommand = require('BaseCommand');
var LobbyMessage = require('LobbyMessage');
var i18n = require('i18n');

export default class SendGetInfoListTournamentCommand extends BaseCommand {
  execute(notification) {
    BaseCommand.prototype.execute.call(this, notification);
    var socket = this.facade.retrieveProxy('SCLobbyProxy');
    socket.sendGetInfoListTournament();
  }
}
