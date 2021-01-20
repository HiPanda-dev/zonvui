var BaseProxy = require("BaseProxy");
var ShopVO = require('ShopVO');
var TransferdesVO = require('TransferdesVO');
var PayBackVO =require('PayBackVO');
var Utility = require('Utility');
var puremvc = BaseProxy.puremvc;

export default class ShopProxy extends BaseProxy {
    static get NAME() {
      return 'ShopProxy';
    }

    onRegister() {
      this.shopVO = null;
      this.transferdesVO = null;
      this.payBackVO = new PayBackVO();
    }
    updateShop(data) {
        this.shopVO = new ShopVO();
        this.shopVO.update(data);
    }

    updateTransferdes(data) {
        this.transferdesVO = new TransferdesVO();
        this.transferdesVO.update(data);
    }


    updateIsAgent(isAgent) {
        this.transferdesVO.isAgent = isAgent;
    }

    getIsAgent() {
        return  this.transferdesVO.isAgent;
    }

    updatePayBack(data) {
        this.payBackVO.update(data);
    }

    reset() {
        this.shopVO = null;
        this.transferdesVO = null;
        this.payBackVO = new PayBackVO();
    }

    reset() {
        this.onRegister();
    }
}
