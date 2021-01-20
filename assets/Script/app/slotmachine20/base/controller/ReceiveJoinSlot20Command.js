var BaseCommand = require('BaseCommand');
var BaseGameCommand = require('BaseGameCommand');
var SlotMessage = require("SlotMessage");
var LobbyMessage = require('LobbyMessage');
var Constants = require('Constants');

export default class ReceiveJoinSlot20Command extends BaseGameCommand {
  execute(notification) {
      BaseGameCommand.prototype.execute.call(this, notification);
      var params = notification.getBody();
      var gameProxy = null, gameMediator = null, mesSetup = null, mesInit = null;
      var listTour = this.facade.retrieveProxy("TournamentProxy").curTournament;
      switch (params.curGame){
        case Constants.SLOT20_KEO_NGOT:
          gameProxy = this.facade.retrieveProxy("SlotKNProxy");
          gameMediator = require('SlotKNSceneMediator').getInstance;
          mesSetup = LobbyMessage.SETUP_SLOT_KEO_NGOT;
          mesInit = SlotMessage.INIT_SLOT_KEO_NGOT;
          break;
        case Constants.SLOT20_LUCKY_CAFE:
          gameProxy = this.facade.retrieveProxy("SlotLCProxy");
          gameMediator = require('SlotLCSceneMediator').getInstance;
          mesSetup = LobbyMessage.SETUP_SLOT_LUCKY_CAFE;
          mesInit = SlotMessage.INIT_SLOT_LUCKY_CAFE;
        break;
      }
      if(gameProxy !== null && gameMediator !== null) {
        this.sendNotification(mesSetup, {gameProxy:gameProxy, gameMediator: gameMediator});
        this.sendNotification(mesInit, params);
        this.sendNotification(LobbyMessage.HIDE_LOBBY);
        this.sendNotification(LobbyMessage.ON_UPDATE_MY_INFO);
        var dataTour = listTour[params.curGame];
        if(dataTour && dataTour.countDown === 0){
            this.sendNotification(LobbyMessage.SEND_GET_INFO_TOURNAMENT, dataTour);
        }
      }
  }
}
