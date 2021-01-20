var BaseVO = require("BaseVO");

export default class TaiXiuVO extends BaseVO{
    static get STATE() {
      return {
        BETTING: 1,
        REPAY: 2,
        RESULT: 3,
      }
    }

    static get BET_TAI() { return 2 }
    static get BET_XIU() { return 1 }

    onRegister() {
      this.session = 0;
      this.gameState = "";    //trang thai ban
      this.totalTai = 0;      //Tổng tiền cược tài
      this.totalXiu = 0;      //Tổng tiền cược xiu
      this.time = 0;     //Thời gian đếm ngược
      this.numTai = 0;        //Tổng người chơi cược tài
      this.numXiu = 0;        //Tổng người chơi cược xiu
      this.dice1 = 0;
      this.dice2 = 0;
      this.dice3 = 0;
      this.result = null;
      this.history = [/*type, result*/];
      this.betSide = 0;
      this.isNan = false;
    }

    setGameInfo(data) {
      this.session = data.id;
      this.gameState = data.s;
      this.totalTai = data.t;
      this.totalXiu = data.x;
      this.time = data.cd;
      this.numTai = data.cT;
      this.numXiu = data.cX;
    }

    setHistory(data) {
      this.history = [];
      var arr = data.split(',');
      for(var i = 0; i < arr.length; i++){
        var dices = arr[i].split('');
        var result = parseInt(dices[0]) + parseInt(dices[1]) + parseInt(dices[2]);
        var type = (result > 10) ? TaiXiuVO.BET_TAI: TaiXiuVO.BET_XIU;
        this.history.push({
          type:type,
          result:dices.toString()
        })
      }
    }

    updateHistory(dices) {
      var result = parseInt(dices[0]) + parseInt(dices[1]) + parseInt(dices[2]);
      var type = (result > 10) ? TaiXiuVO.BET_TAI: TaiXiuVO.BET_XIU;
      this.history.push({
        type:type,
        result:dices.toString()
      })
    }

    setDice(data) {
      this.time = data.cd;
      this.dice1 = data.xs1;
      this.dice2 = data.xs2;
      this.dice3 = data.xs3;
    }
}
