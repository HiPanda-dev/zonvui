var SFSProxy = require("SFSProxy");
var BaseProxy = require("BaseProxy");

export default class SFSXengProxy extends SFSProxy {
    static get NAME() {
      return 'SFSXengProxy';
    }

    onRegister() {
    }

    //override
    onUserEnterRom(evtParams) {

    }
}
