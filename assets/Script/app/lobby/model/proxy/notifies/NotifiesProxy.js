var BaseProxy = require("BaseProxy");
var NotifiesVO = require("NotifiesVO");

export default class NotifiesProxy extends BaseProxy {
    static get NAME() {
      return 'NotifiesProxy';
    }

    onRegister() {
      this.data = new NotifiesVO();
    }
}
