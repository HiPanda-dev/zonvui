var BaseCommand = require('BaseCommand');
var LobbyMessage = require('LobbyMessage');

export default class SendJoinTournamentComamnd extends BaseCommand {
  execute(notification) {
    BaseCommand.prototype.execute.call(this, notification);
    var data = notification.getBody();
    var socket = this.facade.retrieveProxy('SCLobbyProxy');
    var tourProxy = this.facade.retrieveProxy('TournamentProxy');
    var sendData = data.tourId;
    tourProxy.setCurTourModuleId(data.moduleId)
    tourProxy.setCurTourId(data.moduleId, data.tourId);
    socket.sendJoinTournament(sendData);
  }
}
