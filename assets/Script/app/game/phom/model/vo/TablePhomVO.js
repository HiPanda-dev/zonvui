var BaseVO = require("BaseVO");
var TableVO = require("TableVO");

var puremvc = BaseVO.puremvc;

module.exports = puremvc.define
(
    // CLASS INFO
    {
        parent: TableVO,
        constructor: function () {
            TableVO.prototype.constructor.call(this);
            this.nextTurn = -1;
            this.cardOfPreviousPlayer = -1;
            this.cardNumberToDown = 3;
            this.cardRemain = 0;

            this.TIME_SHOW_RESULT = 5;
            this.DISCARD_TIME = 10;
            this.DOWNCARD_TIME = 15;
            this.SENDCARD_TIME = 15;
            this.TOTAL_CARDS = 52;

            this.playingStatus = '';
            this.isDrawCard = false;
            this.isLayingDone = false;
            this.isStealCard = false;
            this.isSendDone = false;
            this.timePass = 0;
            this.timeLeft = 0;
        }
    },

    // INSTANCE MEMBERS
    {
        reset: function () {
            TableVO.prototype.reset.call(this);
        },

        getNextSeat: function (checkSeatId) {
            var playingArray = this.getPlayingSeatList();
            var nextSeat;
            for (var i = 0; i < playingArray.length; i++) {
                if (playingArray[i].id === checkSeatId) {
                    if (i === playingArray.length - 1)
                        nextSeat = playingArray[0];
                    else
                        nextSeat = playingArray[i + 1];
                    i = playingArray.length;
                }
            }
            return nextSeat;
        },

        getPreviousSeat: function (checkSeatId) {
            var playingArray = this.getPlayingSeatList();
            var previousSeat;
            for (var i = 0; i < playingArray.length; i++) {
                if (playingArray[i].id === checkSeatId) {
                    if (i === 0)
                        previousSeat = playingArray[playingArray.length - 1];
                    else
                        previousSeat = playingArray[i - 1];
                    i = playingArray.length;
                }
            }
            return previousSeat;
        }
    },
    // STATIC MEMBERS
    {}
);