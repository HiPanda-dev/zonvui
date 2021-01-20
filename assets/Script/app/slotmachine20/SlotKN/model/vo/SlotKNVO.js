var BaseVO = require("BaseVO");
var Utility = require('Utility');
export default class SlotKNVO extends BaseVO{
    static get ERROR() { return 0 }
    static get NORMAL_WIN() { return 1 }
    static get BIG_WIN() { return 2 }
    static get JACKPOT_WIN() { return 3 }

    static get ITEM_JACKPOT_ID () {return 7}
    static get ITEM_SCATTER_ID () {return 8}

    onRegister() {
      this.bet = 1;
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
      this.session = 0;
      this.numAutoSpin = 5;
      this.curNumAutoSpin = this.numAutoSpin;
      this.isChoiThu = false;
      this.freeSpin = 0;

      this.roomJackpot1 = 0;
      this.roomJackpot2 = 0;
      this.roomJackpot3 = 0;
      this.linesBet = '11111111111111111111';
      this.listBet = [100, 500, 1000];
      this.showBlur = [0,0,0,0,0];
    }

    reset(){
      this.bet = 1;
      this.money = 0;
      this.prize = 0;
      this.isFreeSpin = false;
      this.jackpot = 0;
      this.wins = [];
      this.items = [];
      this.errorMessage = "";
      this.typeResult = -1;
      this.showBlur = [0,0,0,0,0];
    }

    updateData(data) {
      this.reset();
      if(data.m !== ""){
        this.typeResult = SlotKNVO.ERROR;
        this.errorMessage = data.m;
      }else{
        ///////////fake/////////////////
        // data.d.mg =  {
        //   vb:1000,
        //   v:500000,
        //   s:'x1x2x3x3x5x5x0x5'
        // },
        // data.d.fs = 10;

        // ///////////////////////////////
        if(this.freeSpin > 0){
          this.isFreeSpin = true;
        }else{
          this.isFreeSpin = false;
        }

        this.bet = data.d.r;
        this.money = data.d.b;
        this.prize = data.d.c;
        this.wins = data.d.res;
        this.items = data.d.items;

        if(this.jackpot > 0) this.typeResult = SlotKNVO.JACKPOT_WIN;
        else if(this.prize >= this.listBet[this.bet -  1] * 70) this.typeResult = SlotKNVO.BIG_WIN;
        else this.typeResult = SlotKNVO.NORMAL_WIN;

        this.checkShowBlurCol(this.items);
      }
    }

    checkShowBlurCol(items) {
      // for(var i = 0; i< this.items.length;i+=3){
      //
      // }
    }

    updateFreeSpin(freeSpin) {
      this.freeSpin = freeSpin;
    }

    updateChoiThuData() {
      //data choi thu
      var arrData = [];
      arrData[0] = {
	"i": 201,	"c": 101,	"d": {		"r": 1,		"c": 0,		"b": 5218152,		"res": [],		"items": [			[				7,				6,				5,				7,				6,				5,				7,				6,				5,				3			],			[				6,				2,				7,				5,				6,				4,				3,				7,				5,				4			],			[				6,				7,				4,				6,				7,				1,				5,				6,				4,				7			],			[				5,				2,				7,				5,				9,				1,				7,				2,				1,				5			],			[				6,				3,				6,				1,				5,				7,				6,				3,				2,				5			]		]	},	"m": ""}
      // arrData[1] = {"i": 200,"c": 101,"d": {"r": 1,"c": 900,"b": 9466500,"jp": 0,"mg": {"vb": 2000,"v": 900,"s": "x3x0x3"},"fs": 0,"ls": [],"i": "6218729A23A9A38"},"m": ""}
      // //thang lon
      // arrData[2] = {"i": 200,"c": 101,"d": {"r": 1,"c": 9000,"b": 9471100,"jp": 0,"fs": 0,"ls": [{"id": 3,"i": 7,"v": 1500},{"id": 7,"i": 7,"v": 1500},{"id": 9,"i": 9,"v": 5000},{"id": 19,"i": 8,"v": 1000}],"i": "471821897966936"},"m": ""}
      // arrData[3] = {"i": 200,"c": 101,"d": {"r": 1,"c": 11500,"b": 9495400,"jp": 0,"fs": 0,"ls": [{"id": 2,"i": 9,"v": 500},{"id": 4,"i": 9,"v": 5000},{"id": 14,"i": 9,"v": 5000},{"id": 18,"i": 9,"v": 500},{"id": 20,"i": 9,"v": 500}],"i": "94A9999A9A9A9A7"},"m": ""}
      // //jackpot
      // arrData[4] = {"i": 200,"c": 101,"d": {"r": 1,"c": 3398888,"b": 9475500,"jp": 3398888,"fs": 0,"ls": [{"id": 19,"i": 10,"v": 200}],"i": "761631137571841"},"m": ""}
      // arrData[5] = {"i": 200,"c": 101,"d": {"r": 1,"c": 22468100,"b": 22468100,"jp": 16998222,"fs": 0,"ls": [{"id": 3,"i": 9,"v": 500},{"id": 4,"i": 9,"v": 1500},{"id": 9,"i": 9,"v": 500},{"id": 12,"i": 9,"v": 1500},{"id": 13,"i": 9,"v": 1500},{"id": 15,"i": 9,"v": 1500},{"id": 19,"i": 8,"v": 2500},{"id": 20,"i": 9,"v": 500}],"i": "9A13918917917A1"},"m": ""}


      // arrData[9] = {"i": 200,"c": 101,"d": {"r": 1,"c": 9000,"b": 9466500,"jp": 188888, "mg": {"vb": 2000,"v": 900,"s": "x3x0x3"},"fs": 10,"ls": [{"id": 3,"i": 9,"v": 500},{"id": 4,"i": 9,"v": 1500},{"id": 9,"i": 9,"v": 500},{"id": 12,"i": 9,"v": 1500},{"id": 13,"i": 9,"v": 1500},{"id": 15,"i": 9,"v": 1500},{"id": 19,"i": 8,"v": 2500},{"id": 20,"i": 9,"v": 500}],"i": "6213729A23A9A38"},"m": ""}
      this.updateData(arrData[Utility.randomNumber(0, arrData.length-1)]);
      // this.updateData(arrData[9]);
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

    getListRoomJackpot() {
      return [this.roomJackpot1, this.roomJackpot2, this.roomJackpot3];
    }

    getLinesBet() {
      return this.linesBet;
    }

    setLinesBet(value) {
      this.linesBet = value;
    }

    setNextBet() {
      this.bet = (this.bet < this.listBet.length) ? this.bet + 1 : 1;
    }

    getCurBet() {
      return this.listBet[this.bet-1];
    }

    getNumBetLine() {
      var arr = this.linesBet.split("");
      var count = 0;
      for(var i = 0; i < arr.length; i++) {
        if(parseInt(arr[i]) === 1) count++;
      }

      return count;
    }

    getTotalBet() {
      return this.getCurBet() * this.getNumBetLine()
    }
}
