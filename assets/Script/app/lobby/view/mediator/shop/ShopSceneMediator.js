var BaseMediator = require('BaseMediator');
var LobbyMessage = require('LobbyMessage');

class ShopSceneMediator extends BaseMediator {
  static get NAME() {
    return 'ShopSceneMediator';
  }

  static get getInstance() {
    if(this.instance === undefined){
        this.instance = new ShopSceneMediator();
    }
    return this.instance;
  }

  onRegister() {
      puremvc.Mediator.call(this, this.constructor.NAME);
      this.userProxy = this.facade.retrieveProxy('UserProxy');
  }
  /** @override */
  listNotificationInterests() {
      return [
        LobbyMessage.SHOW_SHOP_SCENE,
        LobbyMessage.HIDE_SHOP_SCENE,
        LobbyMessage.ON_UPDATE_SHOP_TYPE,
        LobbyMessage.ON_UPDATE_SHOP_ITEM_BY_SHOP_TYPE,
        LobbyMessage.ON_UPDATE_SHOP_BANK_LIST,
        LobbyMessage.ON_UPDATE_TRANSFERDES,
        LobbyMessage.ON_UPDATE_LIST_CARD_PAY_BACK,
        LobbyMessage.ON_UPDATE_OUT_CARD_INFO,
        LobbyMessage.ON_UPDATE_MY_INFO,
        LobbyMessage.ON_UPDATE_CHECK_ACCOUNT_TRANSFERDES,

        LobbyMessage.SHOW_TAB_IN_SHOP_SCENE,
        LobbyMessage.ON_RESET_MOBILE_CARD_RECHARGE,
        LobbyMessage.ON_UPDATE_RECHARGE_INFO,
        LobbyMessage.ON_UPDATE_CASH_OUT_INFO,
        LobbyMessage.ON_RESET_TRANSFERDES,

      ]
  }

  /** @override */
  handleNotification(notification) {
    BaseMediator.prototype.handleNotification.call(this);
    var params = notification.getBody();
    this.shopProxy = this.facade.retrieveProxy('ShopProxy');
    this.mySelf = this.facade.retrieveProxy('UserProxy').mySelf;
    switch (notification.getName()) {
      case LobbyMessage.SHOW_SHOP_SCENE:
        if (!this.isLogin("C0052")) {
            return;
        }
        this.view.show();
        this.view.onUpdateMySelf(this.mySelf);
        this.sendNotification(LobbyMessage.SEND_GET_OUT_CARD_INFO, params);
        this.sendNotification(LobbyMessage.SEND_GET_LIST_CARD_PAY_BACK);
        break;
      case LobbyMessage.HIDE_SHOP_SCENE:
        this.view.hide();
        break;
      case LobbyMessage.ON_UPDATE_OUT_CARD_INFO:
        this.view.onUpdateOutCardInfo(this.shopProxy.shopVO);
        break;
      case LobbyMessage.ON_UPDATE_TRANSFERDES:
        this.view.onUpdateTranferdes(this.shopProxy.transferdesVO);
        break;

      case LobbyMessage.ON_UPDATE_SHOP_BANK_LIST:
        this.view.onUpdateBankList(this.shopProxy.bankList);
        this.view.onUpdateMoneyList(this.shopProxy.moneyList);
        break;
      case LobbyMessage.ON_UPDATE_LIST_CARD_PAY_BACK:
        this.view.onUpdateListCardPayBack(this.shopProxy.payBackVO);
        break;

      case LobbyMessage.ON_UPDATE_MY_INFO:
        this.view.onUpdateMySelf(this.mySelf);
        break;
      case LobbyMessage.SHOW_TAB_IN_SHOP_SCENE:
        this.view.onShowTab(params.tabIndex);
        this.view.onUpdateMySelf(this.mySelf);
        break;
      case LobbyMessage.ON_RESET_MOBILE_CARD_RECHARGE:
        this.view.onResetMobileCardRecharge();
        break;
      case LobbyMessage.ON_UPDATE_RECHARGE_INFO:
        this.view.onUpdateRechargeInfo(params);
        break;
      case LobbyMessage.ON_RESET_TRANSFERDES:
        this.view.onResetTransferdes();
        break;
      case LobbyMessage.ON_UPDATE_CHECK_ACCOUNT_TRANSFERDES:
        this.view.onUpdateCheckAccountTransferdes(params.message);
        break;
      case LobbyMessage.ON_UPDATE_CASH_OUT_INFO:
        this.view.onUpdateCashOutInfo(params);
        break;
      default:
        break;
    }
  }

  addHanlers() {
    BaseMediator.prototype.addHanlers.call(this);
    this.view.activeRechargeCard = this.activeRechargeCard.bind(this);
    this.view.activeRequestCardConfig = this.activeRequestCardConfig.bind(this);
    this.view.activeGetOTP = this.activeGetOTP.bind(this);
    this.view.activeSenTransferdes = this.activeSenTransferdes.bind(this);
    this.view.activeCheckAccountTransferdes = this.activeCheckAccountTransferdes.bind(this);
    this.view.activeCashOutCard = this.activeCashOutCard.bind(this);
  }

  activeSenTransferdes(params) {
      this.sendNotification(LobbyMessage.SEND_TRANSFERDES, params);
  }

  activeGetOTP() {
    this.sendNotification(LobbyMessage.SEND_GET_OTP);
  }

  activeRechargeCard(params) {
    this.sendNotification(LobbyMessage.SEND_MOBILE_CARD_RECHARGE, params);
  }

  activeRequestCardConfig() {
    this.sendNotification(LobbyMessage.SEND_GET_RECHARGE_INFO);
    this.sendNotification(LobbyMessage.SEND_GET_OUT_CARD_INFO)
  }

  activeCheckAccountTransferdes(params) {
    this.sendNotification(LobbyMessage.SEND_CHECK_ACCOUNT_TRANSFERDES, params);
  }

  activeCashOutCard(params) {
    this.sendNotification(LobbyMessage.SEND_CASH_OUT_CARD, params);
  }
}

module.exports = ShopSceneMediator;
