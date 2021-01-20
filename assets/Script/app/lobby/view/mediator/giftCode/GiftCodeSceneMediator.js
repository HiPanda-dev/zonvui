var BaseMediator = require('BaseMediator');
var LobbyMessage = require('LobbyMessage');

class GiftCodeSceneMediator extends BaseMediator {
  static get NAME() {
    return 'GiftCodeSceneMediator';
  }

  static get getInstance() {
    if(this.instance === undefined){
        this.instance = new GiftCodeSceneMediator();
    }
    return this.instance;
  }

  onRegister() {
      puremvc.Mediator.call(this, this.constructor.NAME);
  }
  /** @override */
  listNotificationInterests() {
      return [
        LobbyMessage.SHOW_GIFTCODE_SCENE,
        LobbyMessage.HIDE_GIFTCODE_SCENE,
        LobbyMessage.ON_SHOW_USE_GIFT_CODE_COMPLETE
      ]
  }

  /** @override */
  handleNotification(notification) {
    BaseMediator.prototype.handleNotification.call(this);
    var params = notification.getBody();
    switch (notification.getName()) {
        case LobbyMessage.SHOW_GIFTCODE_SCENE:
            this.view.show();
            break;
        case LobbyMessage.HIDE_GIFTCODE_SCENE:
            this.view.hide();
            break;
        case LobbyMessage.ON_SHOW_USE_GIFT_CODE_COMPLETE:
            this.view.onShowGiftCodeComplete(params.giftMoney);
            break;
        default:
            break;
    }
  }

  addHanlers () {
      BaseMediator.prototype.addHanlers.call(this);
      this.view.activeUseGiftCode = this.activeUseGiftCode.bind(this);
  }

  activeUseGiftCode (giftCode) {
      this.sendNotification(LobbyMessage.SEND_USE_GIFT_CODE, giftCode);
  }
}

module.exports = GiftCodeSceneMediator;
