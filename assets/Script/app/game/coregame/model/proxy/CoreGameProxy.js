var BaseProxy = require("BaseProxy");

export default class CoreGameProxy extends BaseProxy {
    static get NAME() {
      return 'CoreGameProxy';
    }

    onRegister() {
      // CoreGameProxy.NAME = name;
      this.isLoadDone = false;
      this.gameRoom = null;
      this.table = null;
      this.queueMsg = [];
      this.initTable();
      this.initRules();
      this.initSeats();

      this.commandList = [];
      this.proxyList = [];
      this.mediatorList = [];
    }

    initTable() {

    }

    initRules() {

    }

    initSeats() {

    }

    getTable() {
        return this.table;
    }

    /**
     * thêm user vào ghế
     * @param	seat
     */
    addSeat(seat/*SeatVO*/) {
        this.table.addSeat(seat);
    }

    /**
     * update luật chơi
     * @param	value
     */
    updateRules(rulesVO/*RulesVO*/) {
        this.table.updateRules(rulesVO);
    }

    updateBoundBuyInMoney() {
        this.table.updateBoundBuyInMoney();
    }

    getSeatByUserId(userId) {
        return this.table.getSeatByUserId(userId);
    }

    /**
     * Số lượng người đang ngổi chơi
     * return int
     */
    getNumPlayer() {
        return this.table.getNumPlayer();
    }

    /**
     * lấy ghế theo seatId
     * @param	seatId
     * @return
     */
    getSeatBySeatId(seatId) {
        return this.table.getSeatBySeatId(seatId);
    }

    reset() {
        this.onRegister();
    }
}
