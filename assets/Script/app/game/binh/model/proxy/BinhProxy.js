var BaseProxy = require("BaseProxy");
var CoreGameProxy = require("CoreGameProxy");
var TableBinhVO = require("TableBinhVO");
var RulesBinhVO = require("RulesBinhVO");
var SeatBinhVO = require("SeatBinhVO");

export default class BinhProxy extends CoreGameProxy {
    static get NAME() {
      return 'BinhProxy';
    }

    onRegister() {
    }

    initTable() {
        CoreGameProxy.prototype.initTable.call(this);
        this.table = new TableBinhVO();
        this.table.TURN_TIME = 55;
        this.table.TOTAL_PLAYER = 4;
        this.table.RATE_MIN_BET = 4;

        TableBinhVO.TIME_SO_CHI = 2.5;
        TableBinhVO.TIME_SHOW_RESULT = 2;
    }

    initRules() {
        CoreGameProxy.prototype.initRules.call(this);
        this.table.rules = new RulesBinhVO();
    }

    initSeats() {
        CoreGameProxy.prototype.initSeats.call(this);
        this.table.seats = [];
        this.table.seats.push(null);
        for (var i = 1; i <= this.table.TOTAL_PLAYER; i++) {
            var seat = new SeatBinhVO();
            seat.id = i;
            this.table.seats.push(seat);
        }
    }

    reset() {
        this.onRegister();
    }
}
