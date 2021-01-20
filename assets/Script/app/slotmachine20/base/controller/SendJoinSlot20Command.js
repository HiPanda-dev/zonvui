var BaseGameCommand = require('BaseGameCommand');
var LobbyMessage = require('LobbyMessage');
var i18n = require('i18n');
var Constants = require('Constants');

export default class SendJoinSlot20Command extends BaseGameCommand {
  execute(notification) {
      BaseGameCommand.prototype.execute.call(this, notification);
      if(!this.isLogin(i18n.t("C0047"))) return;
      this.gameProxy = null;
      switch (notification.getBody()){
          case Constants.SLOT20_KEO_NGOT:
            this.gameProxy = this.facade.retrieveProxy("SlotKNProxy");
            this.loadGame("slotmachine20/keoNgot/SlotKNScene");
            break;
          case Constants.SLOT20_LUCKY_CAFE:
            this.gameProxy = this.facade.retrieveProxy("SlotLCProxy");
            this.loadGame("slotmachine20/luckyCafe/SlotLCScene");
            break;
      }
  }

  loadGame(name, params, msgInitGame) {
      if(!this.gameProxy.isLoadDone){
          this.sendNotification(LobbyMessage.ON_LOAD_SLOT, {name:name, onComplete:function () {
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
