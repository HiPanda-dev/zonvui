var BaseProxy = require("BaseProxy");
var CoreGameProxy = require("CoreGameProxy");
var TableXocDiaVO = require("TableXocDiaVO");
var RulesXocDiaVO = require("RulesXocDiaVO");
var SeatXocDiaVO = require("SeatXocDiaVO");

export default class XocDiaProxy extends CoreGameProxy {
    static get NAME() {
      return 'XocDiaProxy';
    }

    onRegister() {
    }

    initTable() {
        CoreGameProxy.prototype.initTable.call(this);
        this.table = new TableXocDiaVO();
        this.table.TOTAL_PLAYER = 9;

        this.table.START_TIME = 3;
        this.table.START_TIME_BETTING = 25;
        this.table.STOP_TIME_BETTING_LVC = 3;
        this.table.STOP_TIME_BETTING = 10;
        this.table.TIME_SHOW_RESULT = 10;
    }

    initRules() {
        CoreGameProxy.prototype.initRules.call(this);
        this.table.rules = new RulesXocDiaVO();
    }

    initSeats() {
        CoreGameProxy.prototype.initSeats.call(this);
        this.table.seats = [];
        this.table.seats.push(null);
        for (var i = 1; i <= this.table.TOTAL_PLAYER; i++) {
            var seat = new SeatXocDiaVO();
            seat.id = i;
            this.table.seats.push(seat);
        }
    }

}
