var BaseVO = require("BaseVO");
var puremvc = BaseVO.puremvc;

module.exports = puremvc.define
(
    // CLASS INFO
    {
        parent: BaseVO,
        constructor: function () {
            this.sysConfig = null;
            this.configData = [];
        }
        
    },

    // INSTANCE MEMBERS
    {

    },
    // STATIC MEMBERS
    {
        LIST_CUSTUM_BUTTON:[]
    }
);