var BaseVO = require("BaseVO");
var SeatVO = require("SeatVO");
var puremvc = BaseVO.puremvc;

module.exports = puremvc.define
(
    // CLASS INFO
    {
        constructor: function () {
            this.id = -1;
            /*id của bàn*/
            this.gameId = "";
            /*id của game*/
            this.name = "";
            this.password = "";
            this.rules/*RulesVO*/ = null;
            this.seats/*Vector.<SeatVO>*/ = null;
            this.myId = -1;
            this.myGold = 0;
            this.mySeatId = 1;
            this.myPosition = -1;
            this.curTurn = -1;
            this.preTurn = -1;
            this.ownerId = -1;
            this.isPlaying = false;
            this.listSeatLeave = [];
            this.registerLeave = false;
            this.gameState = "";
            this.isSystem = null;
            this.registerOwerId = -1;
            this.listPlayerPos = [];
            this.timeLeft = -1;
            this.regQuit = [];
            /*mảng id những ghé đăng ký rời bàn*/
        }
    },

    // INSTANCE MEMBERS
    {
        /**
         * lấy ghế theo seatId
         * @param  seatId
         * @return SeatVO
         */
        getSeatBySeatId: function (seatId) {
            if (this.seats === null) return null;
            for (var i = 1; i < this.seats.length; i++) {
                if (seatId === this.seats[i].id) {
                    return this.seats[i];
                }
            }
            return null;
        },

        /**
         * Lấy ghế theo userId
         * @param userId:Number
         * @return SeatVO
         */
        getSeatByUserId: function (userId) {
            if (this.seats == null) return null;
            for (var i = 1; i < this.seats.length; i++) {
                if (this.seats[i].user && userId === this.seats[i].user.uid) {
                    return this.seats[i];
                }
            }
            return null;
        },

        /**
         * trả ra ghế của chủ bàn
         * return SeatVO
         */
        getSeatOwner: function () {
            var seat = this.getSeatByUserId(this.ownerId);
            return seat;
        },

        /**
         * thêm user vào ghế
         * @param    seat:SeatVO
         */
        addSeat: function (seat) {
            if (this.seats === null) return;
            for (var i = 1; i < this.seats.length; i++) {
                if (seat.id === this.seats[i].id) {
                    this.seats[i].addSeat(seat);
                    break;
                }
            }
        },

        /**
         * xoá user ra khỏi ghế
         * @param    seatId:Number
         */
        removeSeatBySeatId: function (seatId) {
            if (this.seats === null) return;
            for (var i = 1; i < this.seats.length; i++) {
                if (seatId === this.seats[i].id) {
                    this.seats[i].removeSeat();
                    break;
                }
            }
        },

        /**
         * xoá user ra khỏi ghế theo userId
         * @param    seatId
         */
        removeSeatByUserId: function (userId) {
            if (this.seats === null) return;
            for (var i = 1; i < this.seats.length; i++) {
                if (this.seats[i].user && userId === this.seats[i].user.id) {
                    this.seats[i].removeSeat();
                    break;
                }
            }
        },

        /**
         * Cập nhập bài của người chơi do server trả về
         * @param    seatId:Number: ghế cần cập nhập
         * @param    cards:Array: mảng bài cần cập nhập
         */
        addCardsBySeatId: function (seatId, cards) {
            if (this.seats === null) return;
            var seat = this.getSeatBySeatId(seatId);
            if (seat) {
                for (var i = 0; i < cards.length; i++) {
                    seat.cards.push(cards[i]);
                }
            }
        },

        /**
         * Lấy mảng bài của người chơi theo seatId
         * @param    seatId:Number
         * @return cards:Array
         */
        getCardsBySeatId: function (seatId) {
            var seat = this.getSeatBySeatId(seatId);
            if (seat) {
                return seat.cards;
            }
            return [];
        },

        /**
         * Bàn đang chơi solo hay không
         */
        isSolo: function () {
            if (this.rules === null)    return false;
            if (this.rules.maxPlayer === 2) return true;
            else return false;
        },

        /**
         * Khỏi tạo 1 ván mới
         */
        reset: function () {
            this.curTurn = -1;
            this.preTurn = -1;
            this.listSeatLeave.splice(0, this.listSeatLeave.length);
            this.registerLeave = false;
            this.gameState = "";
            for (var i = 1; i < this.seats.length; i++) {
                var seat = this.seats[i];
                if (seat) {
                    seat.reset();
                }
            }
        },

        /**
         * update luật chơi
         * @param    value:RulesVO
         */
        updateRules: function (rulesVO) {
            this.rules.update(rulesVO);
        },

        /**
         * trả ra số tiền tối thiêu phải cầm vào bàn
         * neeys trả ra -1 -> chả cầm tiền cũng vào được
         */
        minBuyInMoney: function () {
            return this.rules.minMoney;
        },

        /**
         * trả ra số tiền tối đa được cầm vào bàn
         * nếu trả ra -1 -> cầm bao nhiêu cũng được
         */
        maxBuyInMoney: function () {
            return this.rules.maxMoney;
        },

        /**
         * update giới hạn min, max tiền buyin cầm vào bàn
         */
        updateBoundBuyInMoney: function () {
            this.rules.minMoney = this.RATE_MIN_BET * this.rules.bet;
            this.rules.maxMoney = this.RATE_MAX_BET * this.rules.bet;
        },

        /**
         * Số lượng người chơi trong bàn
         */
        maxPlayer: function () {
            return this.rules.maxPlayer;
        },

        /**
         * danh sach user dang choi
         * return array
         */
        getPlayingSeatList: function () {
            var playingArray = [];
            for (var i = 1; i < this.seats.length; i++) {
                var seat = this.seats[i];
                if (seat && seat.status === SeatVO.PLAY && seat.user) {
                    playingArray.push(seat);
                }
            }
            return playingArray;
        },

        /**
         * Số lượng người đang ngổi chơi
         * return int
         */
        getNumPlaying: function () {
            var num = 0;
            for (var i = 1; i < this.seats.length; i++) {
                var seat = this.seats[i];
                if (seat && seat.status === SeatVO.PLAY) {
                    num++;
                }
            }
            return num;
        },

        getNumPlayerWait: function () {
            var num = 0;
            for (var i = 1; i < this.seats.length; i++) {
                var seat = this.seats[i];
                if (seat && seat.status === SeatVO.WAITING) {
                    num++;
                }
            }
            return num;
        },

        isOwner: function () {
            if (this.myId === this.ownerId && myId !== -1) return true;
            return false;
        },

        /**
         * cập nhập lại thông tin ghế của thằng thoát vào mảng listSeatLeave để xử lý tuỳ từng game
         * @param seatId
         */
        updateListSeatUserExitGame: function (seatId) {
            var seat = this.getSeatBySeatId(seatId);
            if (seat && seat.status === SeatVO.PLAY) {
                var seatClone = seat.clone();
                this.listSeatLeave[seatClone.id] = seatClone;
            }
        },

        getLeaveSeatByUserId: function (userId) {
            for (var i = 1; i < this.listSeatLeave.length; i++) {
                var seat = this.listSeatLeave[i];
                if (seat && seat.user && seat.user.id === userId) {
                    return seat;
                }
            }
            return null;
        },

        getSeatIdFormPosition: function (position) {
            var pos = this.myPosition;
            if(position === -1) return position;
            if(pos === -1) return position + 1;
            if (pos === position) return 1;
            for (var i = 1; i <= this.maxPlayer(); i++) {
                var nextPos = pos + 1;
                pos = (nextPos >= this.maxPlayer() ) ? nextPos-this.maxPlayer() : nextPos;
                if (pos === position) return i + 1;
            }
            return 0;
        },
        
        getPositionFormSeatId:function (seatId) {
            if(seatId === this.mySeatId) return this.myPosition;
            var sid = this.mySeatId;
            var pos = this.myPosition;
            for (var i = 1; i <= this.maxPlayer(); i++) {
                pos = (pos >= this.maxPlayer() ) ? 0 : pos + 1;
                sid++;
                if (sid === seatId) return pos;
            }
            return 0;
        },

        ownerName: function () {
            var seat = this.getSeatByUserId(this.ownerId);
            if (!seat || !seat.user) return "";
            return seat.user.charName;
        },

        resetIsCancel:function () {
            for (var i = 1; i < this.seats.length; i++) {
                var seat = this.seats[i];
                if (seat) {
                    seat.isCancel = false;
                }
            }
        },

        hasPass: function () {
            var result = (this.password === "") ? false : true;
            return result;
        },

        leaveGame: function () {
            this.reset();
        },

        clearData:function () {
            this.myId = -1;
           // this.mySeatId = -1;
            this.isPlaying = false;
            this.ownerId = -1;
            this.preTurn = -1;
            this.curTurn = -1;
            this.numPlay = 0;
            this.timeLeft = -1;
            for (var i = 1; i < this.seats.length; i++) {
                var seat = this.seats[i];
                seat.removeSeat();
            }
        },

        destroy: function () {
            for (var i = 1; i < this.seats.length; i++) {
                var seat = this.seats[i];
                seat.destroy();
                seat = null;
            }
            this.isSystem = null;
            this.seats = null;
            this.rules = null;
            this.userList = null;
        }
    },
    // STATIC MEMBERS
    {
        RATE_MIN_BET: 0, /*số lần nhân tối thiểu với mức cược để có thể ngồi xuống*/
        RATE_MAX_BET: 200,
        TURN_TIME: 15, /*thời gian cho mỗi turn*/
        TOTAL_PLAYER: 8,     /*tổng người chơi có thể có trong bàn*/
        TOTAL_CARDS:0
    }
);