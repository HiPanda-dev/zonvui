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
            this.sam = 0;
        }
    },

    // INSTANCE MEMBERS
    {
        //overrride
        reset:function () {
            SeatVO.prototype.reset.call(this);
            this.sam = 0;

        }
    },
    // STATIC MEMBERS
    {
        SAM: "sam"
    }
);