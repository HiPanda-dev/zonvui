var BaseVO = require("BaseVO");
var SeatVO = require("SeatVO");
var LogicBinh = require('LogicBinh');
var puremvc = BaseVO.puremvc;

module.exports = puremvc.define
(
    // CLASS INFO
    {
        parent: SeatVO,
        constructor: function () {
            SeatVO.prototype.constructor.call(this);
            this.discards = [];
            this.downCards = [];
            this.stealCards = [];
            this.numCard = 0;
        }
    },

    // INSTANCE MEMBERS
    {
        addDownCards: function (arrCard, index) {
            this.downCards[index] = arrCard;
        },

        updateDownCards: function (arrCard, index) {
            for (var i = 0; i < arrCard.length; i++) {
                this.downCards[index].push(arrCard[i]);
            }
        },

        clone: function () {
            var seat = SeatVO.prototype.clone.call(this);
            seat.discards = this.discards;
            seat.downCards = this.downCards;
            seat.stealCards = this.stealCards;
            return seat;
        },

        reset: function () {
            SeatVO.prototype.reset.call(this);
            this.discards = [];
            this.downCards = [];
            this.stealCards = [];
        },

        addSeat: function (seatVO) {
            SeatVO.prototype.addSeat.call(this, seatVO);
            this.discards = seatVO.discards;
            this.downCards = seatVO.downCards;
            this.stealCards = seatVO.stealCards;
        },

        removeSeat: function () {
            SeatVO.prototype.removeSeat.call(this);
            this.discards = [];
            this.downCards = [];
            this.stealCards = [];
        },

        destroy: function () {
            SeatVO.prototype.destroy.call(this);
            this.discards = null;
            this.downCards = null;
            this.stealCards = null;
        }

    },
    // STATIC MEMBERS
    {}
);