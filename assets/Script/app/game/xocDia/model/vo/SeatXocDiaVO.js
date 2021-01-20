var BaseVO = require("BaseVO");
var SeatVO = require("SeatVO");

var puremvc = BaseVO.puremvc;

module.exports = puremvc.define
(
    // CLASS INFO
    {
        parent: SeatVO,
        constructor: function () {
            SeatVO.prototype.constructor.call(this);
        }
    },

    // INSTANCE MEMBERS
    {},
    // STATIC MEMBERS
    {}
);