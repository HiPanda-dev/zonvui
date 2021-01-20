var BaseVO = require("BaseVO");

var puremvc = BaseVO.puremvc;

var SeatVO = puremvc.define
(
    // CLASS INFO
    {
        constructor: function () {
            this.id = 0;
            this.user/*UserVO*/ = null;
            this.status = "blank";
            this.cards = [];
            this.earnMoney = 0;
            this.cardNrReminder = 0;
            this.randomCard = -1;
            this.isWin  = false;

        }
    },

    // INSTANCE MEMBERS
    {
        get seatId() {
            return this.id;
        },

        clone: function () {
            var seat = new SeatVO();
            seat.id = this.id;
            seat.user/*UserVO*/ = this.user;
            seat.status = this.status;
            seat.cards = this.cards;
            seat.earnMoney = this.earnMoney;
            seat.cardNrReminder = this.cardNrReminder;
            seat.isWin  = this.isWin;
            return seat;
        },

        addSeat: function (seatVO) {
            this.user = seatVO.user;
            this.status = seatVO.status;
            this.cards = seatVO.cards;
        },

        removeSeat: function () {
            this.user = null;
            this.cards = [];
            this.earnMoney = 0;
            this.status = (SeatVO.status != SeatVO.BLOCK) ? SeatVO.BLANK : SeatVO.BLOCK;
        },

        /**
         * xoa mang bai di
         * @param arrCard:Array : mang bai can xoa
         */
        removeCard: function (arrCard) {
            for (var i = 0; i < arrCard.length; i++) {
                for (var j = 0; j < this.cards.length; j++) {
                    if (arrCard[i] === this.cards[j]) {
                        this.cards.splice(j, 1);
                        break;
                    }
                }
            }
        },

        reset: function () {
            this.cards = [];
            this.earnMoney = 0;
            this.cardNrReminder = 0;
            this.randomCard = -1;
            this.isWin = false;
        },

        destroy: function () {
            this.cards = null;
            this.earnMoney = null;
        }
    },
    // STATIC MEMBERS
    {
        BLOCK: "block",
        BLANK: "blank",
        PLAY: "playing",
        WAITING: "waiting"
    }
);

module.exports = SeatVO;