var SCProxy = require("SCProxy");
var Constants = require("Constants");
var SlotMessage = require("SlotMessage");
var Slot3x3VO = require("Slot3x3VO");
var Utility = require('Utility');

export default class Slot20Proxy extends SCProxy {
    static get NAME() {
      return 'Slot20Proxy';
    }
    
    onRegister() {
      SCProxy.prototype.onRegister.call(this);
    }
}
