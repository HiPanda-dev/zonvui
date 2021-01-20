var BaseVO = require("BaseVO");

export default class Slot3x3VO extends BaseVO{
    static get ERROR() { return 0 }
    static get NORMAL_WIN() { return 1 }
    static get BIG_WIN() { return 2 }
    static get JACKPOT_WIN() { return 3 }

    onRegister() {
      this.session = 0;
      this.bet = 0;
      this.money = 0;
      this.prize = 0;
      this.jackpot = 0;
      this.wins = [];
      this.items = [];
      this.isSpining = false;
      this.prevDataSpin = false;
      this.autoSpin = false;
      this.errorMessage = "";
      this.typeResult = -1;
      this.selectRoomId = 1;

      this.roomJackpot1 = 0;
      this.roomJackpot2 = 0;
      this.roomJackpot3 = 0;

      this.linesBet = '11111111111111111111';
      this.listBet = [0, 100, 1000, 5000, 10000];
      this.listRoom = [0, 1, 2, 3, 4]
    }

    reset(){
      this.bet = 0;
      this.money = 0;
      this.prize = 0;
      this.freeSpin = "";
      this.jackpot = 0;
      this.wins = [];
      this.items = [];
      this.errorMessage = "";
      this.typeResult = -1;
    }

    updateData(data) {
      this.reset();
      if(data.m !== ""){
        this.typeResult = Slot3x3VO.ERROR;
        this.errorMessage = data.m;
      }else{
        this.bet = data.d.r;
        this.money = data.d.b;
        this.prize = data.d.c;
        this.jackpot = data.d.jp;
        this.wins = [];
        for(var i = 0; i < data.d.ls.length; i++) {
          var o = data.d.ls[i];
          var iw = {
            line: o.id,
            itemId: o.i,
            money: o.v
          }
          this.wins.push(iw);
        }
        this.items = data.d.i.split('');

        // if(this.jackpot > 0) this.typeResult = Slot3x3VO.JACKPOT_WIN;
        // else if(this.prize >= this.listBet[this.bet] * 70) this.typeResult = Slot3x3VO.BIG_WIN;
        // else
        this.typeResult = Slot3x3VO.NORMAL_WIN;
      }

    }

    setLinesBet(value) {
      this.linesBet = value;
    }

    getCountBet() {
      var arr = this.linesBet.split('');
      var count = 0;
      for(var i=0;i<this.linesBet.length;i++){
          if(this.linesBet[i] === "1") count++;
      }
      return count;
    }

    getLinesBet() {
      return this.linesBet;
    }

    getTotalBet() {
      var count = this.getCountBet();
      return count * this.listBet[this.selectRoomId];
    }

    updateSelectRoomId(selectRoomId) {
      this.selectRoomId = selectRoomId;
    }

    updatejackpot(data) {
      this.roomJackpot1 = data.c1;
      this.roomJackpot2 = data.c2;
      this.roomJackpot3 = data.c3;
    }

    getCurrentJackpot() {
      var roomJackPot = 0;
      if(this.selectRoomId === 1) roomJackPot = this.roomJackpot1;
      if(this.selectRoomId === 2) roomJackPot = this.roomJackpot2;
      if(this.selectRoomId === 3) roomJackPot = this.roomJackpot3;
      return roomJackPot;
    }
}
