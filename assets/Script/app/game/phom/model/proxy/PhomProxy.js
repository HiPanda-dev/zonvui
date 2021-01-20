var BaseProxy = require("BaseProxy");
var CoreGameProxy = require("CoreGameProxy");
var TablePhomVO = require("TablePhomVO");
var SeatPhomVO = require("SeatPhomVO");
var RulesPhomVO = require("RulesPhomVO");

export default class PhomProxy extends CoreGameProxy {
    static get NAME() {
      return 'PhomProxy';
    }

    onRegister() {

    }

    initTable() {
        CoreGameProxy.prototype.initTable.call(this);
        this.table = new TablePhomVO();
        this.table.TURN_TIME = 50;
        this.table.TOTAL_PLAYER = 4;
        this.table.RATE_MIN_BET = 4;

        this.table.DISCARD_TIME = 10;
        this.table.DOWNCARD_TIME = 15;
        this.table.SENDCARD_TIME = 15;
    }

    initRules() {
        CoreGameProxy.prototype.initRules.call(this);
        this.table.rules = new RulesPhomVO();
    }

    initSeats() {
        CoreGameProxy.prototype.initSeats.call(this);
        this.table.seats = [];
        this.table.seats.push(null);
        for (var i = 1; i <= this.table.TOTAL_PLAYER; i++) {
            var seat = new SeatPhomVO();
            seat.id = i;
            this.table.seats.push(seat);
        }
    }
}
