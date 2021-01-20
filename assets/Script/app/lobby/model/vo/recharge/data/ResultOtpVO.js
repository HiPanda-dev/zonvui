var BaseVO = require("BaseVO");
var puremvc = BaseVO.puremvc;

module.exports = puremvc.define
(
    // CLASS INFO
    {
        parent: BaseVO,
        constructor: function () {
            this.phone = "";
            this.requestId = "";
            this.transId = "";
            this.amount = "";
            this.vinaUrl = "";
        }
    },

    // INSTANCE MEMBERS
    {},
    // STATIC MEMBERS
    {}
);