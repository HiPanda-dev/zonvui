var BaseProxy = require("BaseProxy");
var GiftVO = require("GiftVO");

export default class GiftProxy extends BaseProxy {
    static get NAME() {
      return 'GiftProxy';
    }

    onRegister() {
      this.data = new GiftVO();
    }

    getGiftList() {
        return this.data.giftList;
    }

    updateGiftList(data) {
        this.data.updateGiftList(data);
    }

    reset() {
        this.data.reset();
    }
}
