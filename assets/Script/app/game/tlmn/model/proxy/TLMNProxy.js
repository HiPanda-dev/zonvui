var BaseProxy = require("BaseProxy");
var CoreGameProxy = require("CoreGameProxy");
var TableTLMNVO = require("TableTLMNVO");
var RulesTLMNVO = require("RulesTLMNVO");
var SeatTLMNVO = require("SeatTLMNVO");

export default class TLMNProxy extends CoreGameProxy {
    static get NAME() {
      return 'TLMNProxy';
    }

    onRegister() {
    }

    initTable() {
        CoreGameProxy.prototype.initTable.call(this);
        this.table = new TableTLMNVO();


        this.table.TURN_TIME = 15;
        this.table.TOTAL_PLAYER = 4;
        this.table.RATE_MIN_BET = 5;

        this.table.TIME_SHOW_RESULT = 3;
        this.table.TIME_SHOW_RESULT_WIN_WHITE = 5;
        this.table.TIME_DISPLAY_WIN_WITE_CARDS = 2;
        this.table.TOTAL_CARDS = 13;
    }

    initRules() {
        CoreGameProxy.prototype.initRules.call(this);
        this.table.rules = new RulesTLMNVO();
    }

    initSeats() {
        CoreGameProxy.prototype.initSeats.call(this);
        this.table.seats = [];
        this.table.seats.push(null);
        for (var i = 1; i <= this.table.TOTAL_PLAYER; i++) {
            var seat = new SeatTLMNVO();
            seat.id = i;
            this.table.seats.push(seat);
        }
    }

    /**
     * xem có phải vòng mới hay không
     * return true/false
     */
    isNewRound() {
        return this.table.isNewRound;
    }

    /**
     * Trả ra người đánh kế tiếp theo userId, lưu ý nếu ko còn ai thì trả ra -1
     * return Number
     */
    nextTurn() {
        return this.table.nextTurn();
    }

    /**
     * trả ra id của ghế tiếp theo, lưu ý nếu ko còn ai thì trả ra -1
     */
    nextSeatTurnId() {
        return this.table.nextSeatTurnId();
    }
}
