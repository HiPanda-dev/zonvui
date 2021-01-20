var BaseVO = require("BaseVO");
var Utility = require('Utility');

export default class MiniPokerVO extends BaseVO{
    static get ERROR() { return 0 }
    static get NORMAL_WIN() { return 1 }
    static get BIG_WIN() { return 2 }
    static get JACKPOT_WIN() { return 3 }

    onRegister() {
      this.bet = 0;
      this.money = 0;
      this.prize = 0;
      this.jackpot = 0;
      this.items = [];
      this.isSpining = false;
      this.autoSpin = false;
      this.errorMessage = "";
      this.typeResult = -1;
      this.currentBetIndex = 1;
      this.listBets = [0, 100, 1000, 10000];
      this.winType = 0;

      this.roomJackpot1 = 0;
      this.roomJackpot2 = 0;
      this.roomJackpot3 = 0;

      this.mapCardId = [];
      this.initMapCard();
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
        this.typeResult = MiniPokerVO.ERROR;
        this.errorMessage = data.m;
      }else{
        this.money = data.d.b;
        this.prize = data.d.v;
        this.jackpot = data.d.jp;
        this.winType = data.d.t;
        this.items = [];
        var rs = data.d.c.split(',');
        for(var i = 0; i < rs.length; i++) {
          this.items.push(this.mapCardId.indexOf(rs[i]));
        }

        this.typeResult = MiniPokerVO.NORMAL_WIN;

        // if(this.jackpot > 0) this.typeResult = MiniPokerVO.JACKPOT_WIN;
        // else if(data.d.ls.length >= 3) this.typeResult = MiniPokerVO.BIG_WIN;
        // else this.typeResult = MiniPokerVO.NORMAL_WIN;
      }

    }

    updateCurrentBetIndex(currentBetIndex) {
      this.currentBetIndex = currentBetIndex;
    }

    updatejackpot(data) {
      this.roomJackpot1 = data.c1;
      this.roomJackpot2 = data.c2;
      this.roomJackpot3 = data.c3;
    }

    getCurrentBet() {
      return this.listBets[this.currentBetIndex];
    }

    getCurrentJackpot() {
      var roomJackPot = 0;
      if(this.currentBetIndex === 1) roomJackPot = this.roomJackpot1;
      if(this.currentBetIndex === 2) roomJackPot = this.roomJackpot2;
      if(this.currentBetIndex === 3) roomJackPot = this.roomJackpot3;
      return roomJackPot;
    }

    initMapCard() {
      this.mapCardId = Utility.getListCardMap();
    }

    getCurrentWinType() {
      return 0;
    }
}
