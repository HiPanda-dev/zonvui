var BaseVO = require("BaseVO");

var puremvc = BaseVO.puremvc;

module.exports = puremvc.define
(
    // CLASS INFO
    {
        parent: BaseVO,
        constructor: function () {
            this.bankValueList = null;
            this.bankDescription = null;

        }
    },

    // INSTANCE MEMBERS
    {},
    // STATIC MEMBERS
    {}
);