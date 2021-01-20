var BaseCommand = require('BaseCommand');
var LobbyMessage = require('LobbyMessage');
var SlotMessage = require('SlotMessage');
var Constants = require('Constants');
var i18n = require('i18n');

export default class ReceiveJoinTournamentComamnd extends BaseCommand {
  execute(notification) {
    BaseCommand.prototype.execute.call(this, notification);
    var data = notification.getBody();
    var mySelf =  this.facade.retrieveProxy('UserProxy').mySelf;
    var tourProxy =  this.facade.retrieveProxy('TournamentProxy');

    switch (tourProxy.curTourModuleId) {
      case Constants.SLOT20_LUCKY_CAFE:
        this.sendNotification(SlotMessage.SHOW_INFO_TOURNAMENT_LUCKY_CAFE);
        break;
      case Constants.SLOT20_KEO_NGOT:
        this.sendNotification(SlotMessage.SHOW_INFO_TOURNAMENT_KEO_NGOT);
        break;
      default:
    }
    mySelf.money = data.d;
    this.sendNotification(LobbyMessage.ON_UPDATE_MY_INFO);
    this.sendNotification(LobbyMessage.SHOW_ALERT, {content: 'Tham gia giải đấu thành công'});
    // this.sendNotification(LobbyMessage.SEND_GET_TOP_TOURNAMENT, {tourId: tourProxy});
    this.sendNotification(LobbyMessage.HIDE_TOURNAMENT_SCENE);
  }
}
