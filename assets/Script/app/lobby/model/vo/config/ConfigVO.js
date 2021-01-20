var BaseVO = require("BaseVO");
var puremvc = BaseVO.puremvc;

module.exports = puremvc.define
(
    // CLASS INFO
    {
        parent: BaseVO,
        constructor: function () {
            this.clientKey = "default";
            if(cc.sys.isBrowser){
              this.deviceId = "web";
            }else{
              this.deviceId = "mobile";
            }
        }
    },

    // INSTANCE MEMBERS
    {},
    // STATIC MEMBERS
    {}
);
