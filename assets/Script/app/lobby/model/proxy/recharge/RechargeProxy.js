var BaseProxy = require("BaseProxy");
var RechargeVO = require('RechargeVO');

export default class RechargeProxy extends BaseProxy {
    static get NAME() {
      return 'RechargeProxy';
    }

    onRegister() {
      this.recharge = null;
    }

    updateRecharge(data) {
        this.recharge = new RechargeVO();
        this.recharge.update(data);
    }

    getRecharge() {
        return this.recharge;
    }

    updateResultOTP(data) {
        this.recharge.updateResultOTP(data);
    }

    reset() {
        this.onRegister();
    }
}
