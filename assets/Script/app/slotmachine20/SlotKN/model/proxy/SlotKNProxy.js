var SCProxy = require("SCProxy");
var Constants = require("Constants");
var SlotMessage = require("SlotMessage");
var Utility = require('Utility');
var SlotKNVO = require('SlotKNVO');
var LobbyMessage = require('LobbyMessage');
var GameConfig = require('GameConfig');

export default class SlotKNProxy extends SCProxy {
    static get NAME() {
      return 'SlotKNProxy';
    }

    static get Cmd(){
        return {
          ENTER_ROOM: 10,
          LEAVE_ROOM: 11,
          SPIN:101,
          UPDATE_JACKPOT:100,
          STATIC_RANK: 104,
          STATIC_HISTORY:101,
        }
    }

    onRegister() {
      this.gameVO = new SlotKNVO();
      this.gameVO.onRegister();
      this.moduleId = Constants.SLOT20_KEO_NGOT;
      SCProxy.prototype.onRegister.call(this);
    }

    onMessage(event) {
      this.onMessageStaticsic(event);
      this.onMessageLuckyCafe(event);
    }

    onMessageStaticsic(event) {
      if(this.isOnMessageError(event, Constants.STATICSIC_ID, null, true)) return;
      var data = JSON.parse(Utility.gDecrypt(event.data));
      if(data.d.i !== this.moduleId) return;

      switch (data.c) {
        case SlotKNProxy.Cmd.STATIC_RANK:
          this.receiveGetRank(data.d);
          break;
        case SlotKNProxy.Cmd.STATIC_HISTORY:
          this.receiveGetHistory(data.d);
          break;
        default:
      }
    }

    onMessageLuckyCafe(event) {
      var exception = [];
      exception[SlotKNProxy.Cmd.SPIN] = true;
      exception[SlotKNProxy.Cmd.UPDATE_JACKPOT] = true;

      if(this.isOnMessageError(event, this.moduleId, exception)) return;
      var data = JSON.parse(Utility.gDecrypt(event.data));

      switch (data.c) {
        case SlotKNProxy.Cmd.ENTER_ROOM:
          this.receiveJoinSlot(data.d);
          break;
        case SlotKNProxy.Cmd.SPIN:
          this.receiveSpin(data);
          break;
        case SlotKNProxy.Cmd.UPDATE_JACKPOT:
          this.receiveUpdateJackPot(data.d);
          break;
        default:
      }
    }

    //////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////
    receiveSpin(params) {
      this.gameVO.updateData(params);
      this.sendNotification(SlotMessage.RECEIVE_SPIN_KEO_NGOT, {data: this.gameVO} );
    }

    receiveGetRank(params) {
      var data = [];
      for(var i = 0; i< params.t.length;i++){
        data[i] = {
          rank: i + 1,
          id: params.t[i].id,
          nickName: params.t[i].aa,
          date:params.t[i].t,
          bet: params.t[i].vb,
          jackpot: this.getJackpotRank(params.t[i]),
          prize: params.t[i].v,
          detail: params.t[i].d
        }
      }
      this.sendNotification(SlotMessage.RECEIVE_GET_RANK_KEO_NGOT, {data: data});
    }

    getJackpotRank(params) {
      //"11111111111111111111|[[9,8,8],[10,9,1],[1,4,2],[2,9,1],[2,10,1]]|{"Coin":6930620,"Jp":3,"Bonus":1,"Scastter":0,"mg":"","CoinMg":0,"Lines":[{"LineId":2,"ItemId":10,"Count":3,"Type":0,"Coin":200},{"LineId":2,"ItemId":10,"Count":3,"Type":0,"Coin":200},{"LineId":5,"ItemId":9,"Count":5,"Type":0,"Coin":5000},{"LineId":5,"ItemId":9,"Count":5,"Type":0,"Coin":5000},{"LineId":5,"ItemId":9,"Count":5,"Type":0,"Coin":5000},{"LineId":6,"ItemId":10,"Count":3,"Type":0,"Coin":200},{"LineId":6,"ItemId":10,"Count":3,"Type":0,"Coin":200},{"LineId":9,"ItemId":4,"Count":3,"Type":0,"Coin":4000},{"LineId":9,"ItemId":4,"Count":3,"Type":0,"Coin":4000},{"LineId":11,"ItemId":4,"Count":3,"Type":0,"Coin":4000},{"LineId":11,"ItemId":4,"Count":3,"Type":0,"Coin":4000},{"LineId":14,"ItemId":9,"Count":4,"Type":0,"Coin":1500},{"LineId":14,"ItemId":9,"Count":4,"Type":0,"Coin":1500},{"LineId":14,"ItemId":9,"Count":4,"Type":0,"Coin":1500},{"LineId":14,"ItemId":9,"Count":4,"Type":0,"Coin":1500},{"LineId":16,"ItemId":9,"Count":4,"Type":0,"Coin":1500},{"LineId":16,"ItemId":9,"Count":4,"Type":0,"Coin":1500},{"LineId":16,"ItemId":9,"Count":4,"Type":0,"Coin":1500},{"LineId":19,"ItemId":8,"Count":5,"Type":0,"Coin":10000},{"LineId":19,"ItemId":1,"Count":5,"Type":1,"Coin":2878320},{"LineId":19,"ItemId":1,"Count":5,"Type":1,"Coin":2000000},{"LineId":19,"ItemId":1,"Count":5,"Type":1,"Coin":2000000}]}"
      var arrData = params.d.split('|');
      var data = JSON.parse(arrData[2]);
      return data.Jp;
    }

    receiveGetHistory(params) {
      var data = [];
      for(var i = 0; i< params.h.length;i++){
        data[i] = {
          rank: i + 1,
          id: params.h[i].id,
          date: params.h[i].t,
          betLine: this.getBetLineHistory(params.h[i]),
          lineWin: this.getLineWinHistory(params.h[i]),
          jackpot: this.getJackpotHistory(params.h[i]),
          bet: params.h[i].vb,
          prize: params.h[i].v,
          detail: params.h[i].d
        }
      }
      this.sendNotification(SlotMessage.RECEIVE_GET_MY_HISTORY_KEO_NGOT, {data: data});
    }

    getJackpotHistory(params) {
      var arrData = params.d.split('|');
      var data = JSON.parse(arrData[2]);
      var jp = 0;
      for(var i = 0;i< data.length;i++) {
        jp += data[i].Jp;
      }
      return jp;
    }

    getLineWinHistory(params) {
      var arrData = params.d.split('|');
      var data = JSON.parse(arrData[2]);
      var lines = 0;
      for(var i = 0;i< data.length;i++) {
        lines += data[i].Lines.length;
      }
      return lines;
    }

    getBetLineHistory(params) {
      // "11111111111111111111|[[4,10,5],[6,2,9],[10,10,9],[10,10,1],[7,10,3]]|{"Coin":0,"Jp":0,"Bonus":1,"Scastter":0,"mg":"","CoinMg":0,"Lines":[]}"

      var arrData = params.d.split('|');
      var data = JSON.parse(arrData[2]);
      var countBetLine = 0;
      var arrBet = arrData[0].split('');
      for(var i=0;i<arrBet.length;i++) {
        if(arrBet[i] === "1") countBetLine++;
      }
      return params.vb + '/' + countBetLine;
    }

    receiveSpin(params) {
      this.gameVO.updateData(params);
      this.sendNotification(SlotMessage.RECEIVE_SPIN_KEO_NGOT, {data: this.gameVO} );
    }

    receiveUpdateJackPot(params) {
      this.gameVO.updatejackpot(params);
      this.sendNotification(SlotMessage.RECEIVE_UPDATE_JACKPOT_KEO_NGOT, {data: this.gameVO} );
    }

    //////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////
    joinGame() {
      var data = {
        i: this.moduleId,
        c: SlotKNProxy.Cmd.ENTER_ROOM,
        d: ""
      }

      this.send(data);
    }

    sendSpin(params) {
      var tourProxy = this.facade.retrieveProxy("TournamentProxy");
      var listTour = this.facade.retrieveProxy("TournamentProxy").curTournament;
      var dataTour = listTour[Constants.SLOT20_KEO_NGOT];

      var data = {
          i: this.moduleId,
          c: SlotKNProxy.Cmd.SPIN,
          d: {
              r: params.bet,
              l: params.lines,
              tId: (dataTour && dataTour.tourId === tourProxy.curTourId[Constants.SLOT20_KEO_NGOT]) ? dataTour.tourId : null
          }
      }
      this.send(data);
    }

    sendLeaveRoom(params) {
      var data = {
        i: this.moduleId,
        c: SlotKNProxy.Cmd.LEAVE_ROOM,
        d: ""
      }

      this.send(data);
    }

    sendGetRank(page) {
      var data = {
        i: Constants.STATICSIC_ID,
        c: SlotKNProxy.Cmd.STATIC_RANK,
        d: {
          i:this.moduleId,
          p:page
        }
      }

      this.send(data);
    }

    sendGetMyHistory(page) {
      var data = {
        i: Constants.STATICSIC_ID,
        c: SlotKNProxy.Cmd.STATIC_HISTORY,
        d: {
          i:this.moduleId,
          p:page
        }
      }

      this.send(data);
    }
    //////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////

    receiveJoinSlot(params) {
      this.sendNotification(LobbyMessage.RECEIVE_JOIN_SLOT20, {curGame: Constants.SLOT20_KEO_NGOT});
      if(params === "") return;
      if(params.fs) {
        this.gameVO.updateFreeSpin(params.fs);
      }
    }
}
