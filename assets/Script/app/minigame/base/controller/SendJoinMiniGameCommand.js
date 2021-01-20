var BaseGameCommand = require('BaseGameCommand');
var MiniGameMessage = require('MiniGameMessage');
var MiniGameConfig = require('MiniGameConfig');
var i18n = require('i18n');
var Constants = require('Constants');

export default class SendJoinMiniGameCommand extends BaseGameCommand {
  execute(notification) {
      BaseGameCommand.prototype.execute.call(this, notification);
      if(!this.isLogin(i18n.t("C0047"))) return;
      this.gameProxy = null;
      switch (notification.getBody()){
          case Constants.MINIGAME_TAI_XIU:
            this.gameProxy = this.facade.retrieveProxy("TaiXiuProxy");
            this.loadMiniGame("TaiXiuScene");
            break;
          case Constants.MINIGAME_SLOT3X3:
            this.gameProxy = this.facade.retrieveProxy("Slot3x3Proxy");
            this.loadMiniGame("Slot3x3Scene");
            break;
          case Constants.MINIGAME_BAU_CUA:
            this.gameProxy = this.facade.retrieveProxy("BauCuaProxy");
            this.loadMiniGame("BauCuaScene");
            break;
          case Constants.MINIGAME_MINI_POKER:
            this.gameProxy = this.facade.retrieveProxy("MiniPokerProxy");
            this.loadMiniGame("MiniPokerScene");
            break;
          case Constants.MINIGAME_TO_NHO:
            this.gameProxy = this.facade.retrieveProxy("ToNhoProxy");
            this.loadMiniGame("ToNhoScene");
            break;
          case Constants.MINIGAME_VONG_QUAY:
            this.gameProxy = this.facade.retrieveProxy("VongQuayProxy");
            this.loadMiniGame("VongQuayScene");
            break;
      }


  }

  loadMiniGame(name, params, msgInitGame) {
      if(!this.gameProxy.isLoadDone){
          this.sendNotification(MiniGameMessage.ON_LOAD_MINIGAME, {name:name, onComplete:function () {
              this.gameProxy.isLoadDone = true;
              this.sendRefreshMoney();
              this.gameProxy.joinGame();
          }.bind(this)});
      }else{
          this.sendRefreshMoney();
          this.gameProxy.joinGame();
      }
  }
}
