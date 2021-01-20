var BaseVO = require("BaseVO");
var puremvc = BaseVO.puremvc;

module.exports = puremvc.define
(
    // CLASS INFO
    {
        parent: BaseVO,
        constructor: function () {
            this.rateToChip = 1;
        }
    },

    // INSTANCE MEMBERS
    {},
    // STATIC MEMBERS
    {}
);