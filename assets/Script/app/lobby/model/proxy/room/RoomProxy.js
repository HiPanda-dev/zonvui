var BaseProxy = require("BaseProxy");
var RoomVO = require("RoomVO");

export default class RoomProxy extends BaseProxy {
    static get NAME() {
      return 'RoomProxy';
    }

    onRegister() {
      this.room = new RoomVO();
      this.vtRooms = [];
    }

    initData(params) {
        this.room.initData(params);
    }

    getRoomAllList(bet) {
        return this.vtRooms;
    }

    getRoomListNotFull() {
        var result = [];
        for (var i = 0; i < this.vtRooms.length; i++) {
            var r = this.vtRooms[i];
            if(r.userCount < r.maxUsers){
                result.push(r);
            }
        }

        return result;
    }

    getRoomListWithBet(bet) {
        var result = [];
        for (var i = 0; i < this.vtRooms.length; i++) {
            var r = this.vtRooms[i];
            if(r.bet === bet){
                result.push(r);
            }
        }

        return result;
    }

    reset() {
        this.onRegister();
    }
}
