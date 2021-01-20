var BaseProxy = require("BaseProxy");

export default class VongQuayProxy extends BaseProxy {
    static get NAME() {
      return 'VongQuayProxy';
    }

    onRegister() {
    }

    reset() {
        this.onRegister();
    }
}
