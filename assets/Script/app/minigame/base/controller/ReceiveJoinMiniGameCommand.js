var BaseCommand = require('BaseCommand');
var BaseGameCommand = require('BaseGameCommand');
var MiniGameMessage = require("MiniGameMessage");
var LobbyMessage = require('LobbyMessage');
var SFSMessage = require('SFSMessage');
var Constants = require('Constants');

export default class ReceiveJoinMiniGameCommand extends BaseGameCommand {
  execute(notification) {
      BaseGameCommand.prototype.execute.call(this, notification);
      var params = notification.getBody();
      switch (params.curMiniGame){
          case Constants.MINIGAME_BAU_CUA:
              this.sendNotification(MiniGameMessage.INIT_BAU_CUA, params);
              break;
          case Constants.MINIGAME_MINI_POKER:
              this.sendNotification(MiniGameMessage.INIT_MINI_POKER, params);
              break;
          case Constants.MINIGAME_SLOT3X3:
              this.sendNotification(MiniGameMessage.INIT_SLOT3X3, params);
              break;
          case Constants.MINIGAME_TAI_XIU:
              this.sendNotification(MiniGameMessage.INIT_TAI_XIU, params);
              break;
          case Constants.MINIGAME_TO_NHO:
              this.sendNotification(MiniGameMessage.INIT_TO_NHO, params);
              break;
          case Constants.MINIGAME_VONG_QUAY:
              this.sendNotification(MiniGameMessage.INIT_VONG_QUAY, params);
              break;
      }
  }
}
