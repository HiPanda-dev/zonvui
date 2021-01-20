var BaseCommand = require('BaseCommand');
var LobbyMessage = require('LobbyMessage');
var i18n = require('i18n');

export default class ReceiveGetInfoListTournamentCommand extends BaseCommand {
  execute(notification) {
    BaseCommand.prototype.execute.call(this, notification);
    // var listTournament = this.facade.retrieveProxy('TournamentProxy').getCurTournament();

    // this.sendNotification(LobbyMessage.ON_HIDE_ALL_TIMER_COUNTDOWN_TOURNAMENT);
    // for(var i = 0;i< listTournament.length;i++) {
    //   var o = listTournament[i];
    //   this.sendNotification(LobbyMessage.ON_UPDATE_TIMER_COUNTDOWN_TOURNAMENT, o);
    // }
  }
}
