var BaseCommand = require('BaseCommand');
var LobbyMessage = require('LobbyMessage');
var SlotMessage = require('SlotMessage');
var GameConfig = require('GameConfig');
var Constants = require('Constants');
var i18n = require('i18n');

export default class ReceiveGetInfoTournamentCommand extends BaseCommand {
  execute(notification) {
    BaseCommand.prototype.execute.call(this, notification);
    var data = notification.getBody();
    var tourProxy =  this.facade.retrieveProxy('TournamentProxy');
    if (data.myPos !== 0) {
      tourProxy.setCurTourModuleId(data.moduleId);
      tourProxy.setCurTourId(data.moduleId, data.tourId);
      switch (data.moduleId) {
        case Constants.SLOT20_LUCKY_CAFE:
          this.sendNotification(SlotMessage.SHOW_INFO_TOURNAMENT_LUCKY_CAFE);
          break;
        case Constants.SLOT20_KEO_NGOT:
          this.sendNotification(SlotMessage.SHOW_INFO_TOURNAMENT_KEO_NGOT);
          break;
      }
    } else {
      this.sendNotification(LobbyMessage.SHOW_TOURNAMENT_SCENE);
      this.sendNotification(LobbyMessage.ON_UPDATE_INFO_TOURNAMENT, data);
    }
    this.sendNotification(LobbyMessage.SEND_GET_TOP_TOURNAMENT, data);
  }
}
