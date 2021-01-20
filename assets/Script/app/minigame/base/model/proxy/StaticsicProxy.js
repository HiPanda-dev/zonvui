var SCProxy = require('SCProxy');
var Constants = require('Constants');
var MiniGameMessage = require('MiniGameMessage');
var LobbyMessage = require('LobbyMessage');
var Utility = require('Utility');

export default class StaticsicProxy extends SCProxy {
    static get NAME() {
      return 'StaticsicProxy';
    }

    static get Cmd(){
        return {
          ENTER_ROOM: 10,
          STATIC_RANK: 104,
          STATIC_HISTORY:101,
          DETAI_SESSION:102,
          EVENT_TAIXIU:105,
          MOBILE_CARD_RECHARGE:202,
          MOBILE_CARD_RECHARGE_INFO:201,
          USER_GIFT_CODE:200,
          UPDATE_TIMER_TAI_XIU:43,
          GET_OUT_CARD_INFO: 211,
          SEND_CASH_OUT: 212,
          INBOX_NOTIFY:110,
          INBOX_LOAD_PAGE:111,
          INBOX_READ:112,
          INBOX_DELETE:113,
          HISTORY_TRANFER:109,
          HISTORY_CASH_IN_OUT:107,
        }
    }


    onRegister() {
      SCProxy.prototype.onRegister.call(this);
      this.moduleId = 889;
    }

    // addEventListener(socket) {
    //   SCProxy.prototype.addEventListener.call(this, socket);
    //   if(cc.sys.isBrowser){
    //     this.socket.addEventListener('message', this.onMessage.bind(this));
    //   }else{
    //     socket.onmessage = function(event) {
    //       this.onMessage(event);
    //     }.bind(this);
    //   }
    // }

    onMessage(event) {
      if(this.isOnMessageError(event, this.moduleId)) return;
      var data = JSON.parse(Utility.gDecrypt(event.data));

      switch (data.c) {
        case StaticsicProxy.Cmd.STATIC_RANK:
          this.receiveGetRank(data.d);
          break;
        case StaticsicProxy.Cmd.STATIC_HISTORY:
          this.receiveMyHistory(data.d);
          break;
        case StaticsicProxy.Cmd.DETAI_SESSION:
          this.receiveDetailSessionTaiXiu(data.d);
          break;
        case StaticsicProxy.Cmd.EVENT_TAIXIU:
          this.receiveEventTaiXiu(data.d);
          break;
        case StaticsicProxy.Cmd.MOBILE_CARD_RECHARGE:
          this.receiveGetRechargeInfo(data.d);
          break;
        case StaticsicProxy.Cmd.MOBILE_CARD_RECHARGE_INFO:
          this.receiveGetRechargeInfo(data.d);
          break;
        case StaticsicProxy.Cmd.USER_GIFT_CODE:
          this.receiveUsingGiftCode(data.d);
          break;
        case StaticsicProxy.Cmd.UPDATE_TIMER_TAI_XIU:
          this.receiveUpdateTimeTaiXiu(data.d);
          break;
        case StaticsicProxy.Cmd.GET_OUT_CARD_INFO:
          this.receiveGetConfigInfoCashOut(data.d);
          break;
        case StaticsicProxy.Cmd.SEND_CASH_OUT:
          this.receiveSendCashOut(data.d);
          break;
        case StaticsicProxy.Cmd.INBOX_NOTIFY:
          this.receiveInboxNotify(data.d);
          break;
        case StaticsicProxy.Cmd.INBOX_LOAD_PAGE:
          this.receiveInboxLoadPage(data.d);
          break;
        case StaticsicProxy.Cmd.INBOX_READ:
          this.receiveInboxRead(data.d);
          break;
        case StaticsicProxy.Cmd.INBOX_DELETE:
          this.receiveInboxDelete(data.d);
          break;
        case StaticsicProxy.Cmd.HISTORY_CASH_IN_OUT:
            if(data.d.io === 1)
                this.receiveHistoryCashIn(data.d.l);
            else
                this.receiveHistoryCashOut(data.d.l);
          break;
        case StaticsicProxy.Cmd.HISTORY_TRANFER:
          this.receiveHistoryTranfer(data.d.l);
          break;

        default:

      }
    }

    //////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////
    receiveInboxNotify(params) {
      console.log('receiveInboxNotify ' + params);
    }

    receiveInboxLoadPage(params) {
      console.log('receiveInboxLoadPage ' + params);
    }

    receiveInboxRead(params) {
      console.log('receiveInboxRead ' + params);
    }

    receiveInboxDelete(params) {
      console.log('receiveInboxDelete ' + params);
    }

    receiveGetConfigInfoCashOut(params) {
      var info = [];

      for(var i=0;i<params.c.length;i++) {
        var o = {
          provider: params.c[i].t,
          cards: params.c[i].v.split(','),
          state: params.c[i].s
        }
        info.push(o);
      }

      var data = {
        info: info,
        percentRecharge: params.p
      };

      this.sendNotification(LobbyMessage.RECEIVE_GET_OUT_CARD_INFO, {data: data});
    }

    receiveSendCashOut(params) {
      var data = {
        telco: params.t,
        value:params.a,
        code: params.c[0].c,
        serial:params.c[0].s
      };

      this.sendNotification(LobbyMessage.RECEIVE_CASH_OUT_CARD, {data: data});
    }

    receiveUpdateTimeTaiXiu(params) {
      console.log('1111111111');
    }

    receiveUsingGiftCode(params) {
      var data = {
        money: params.b,
        giftMoney:params.v
      }
      this.sendNotification(LobbyMessage.RECEIVE_USE_GIFT_CODE, {data: data});
    }

    receiveGetRechargeInfo(params) {
      var info = [];

      for(var i=0;i<params.c.length;i++) {
        var o = {
          provider: params.c[i].t,
          money: params.c[i].v.split(','),
          state: params.c[i].s
        }
        info.push(o);
      }

      var data = {
        info: info,
        percentRecharge: params.p
      };

      this.sendNotification(LobbyMessage.RECEIVE_GET_RECHARGE_INFO, {data: data});
    }

    receiveMobileCardRecharge(params) {
      var data = {
        money: params.b,
        addMoney: params.v
      };
      this.sendNotification(LobbyMessage.RECEIVE_MOBILE_CARD_RECHARGE, {data: data});
    }

    receiveHistoryCashIn(params){
        this.sendNotification(LobbyMessage.RECEIVE_GET_HISTORY_CASH_IN, {data: params});
    }

    receiveHistoryCashOut(params) {
        this.sendNotification(LobbyMessage.RECEIVE_GET_HISTORY_CASH_OUT, {data: params});
    }

    receiveHistoryTranfer(params){
        this.sendNotification(LobbyMessage.RECEIVE_GET_HISTORY_TRANFER, {data: params});
    }

    receiveMyHistory(params){
      //i: moduleId
      switch (params.i) {
        case 100:
          this.receiveMyHistoryTaiXiu(params);
          break;
        case 102:
          this.receiveMyHistoryMiniPoker(params);
          break;
        case 103:
          this.receiveMyHistorySlot3x3(params);
          break;
        default:

      }
    }

    receiveGetRank(params){
      //i: moduleId
      switch (params.i) {
        case 100:
          this.receiveGetRankTaiXiu(params);
          break;
        case 102:
          this.receiveGetRankMiniPoker(params);
          break;
        case 103:
          this.receiveGetRankSlot3x3(params);
          break;

        default:

      }
    }


    receiveGetRankSlot3x3(params) {
      var data = [];
      for(var i = 0; i< params.t.length;i++){
        data[i] = {
          rank: i + 1,
          id: params.t[i].id,
          nickName: params.t[i].aa,
          date:params.t[i].t,
          bet: params.t[i].vb,
          prize: params.t[i].v,
          detail: params.t[i].d
        }
      }

      this.sendNotification(MiniGameMessage.RECEIVE_GET_RANK_SLOT3X3, {data: data});
    }

    receiveGetRankMiniPoker(params) {
      var data = [];
      for(var i = 0; i< params.t.length;i++){
        data[i] = {
          rank: i + 1,
          nickName: params.t[i].aa,
          dateTime: params.t[i].t,
          bet:params.t[i].vb,
          prize: params.t[i].v,
          cards: this.getCardMiniPoker(params.t[i].d.replace('|',''))
        }
      }

      this.sendNotification(MiniGameMessage.RECEIVE_GET_RANK_MINI_POKER, {data: data});
    }

    receiveGetRankTaiXiu(params){
      var data = [];
      for(var i = 0; i< params.t.length;i++){
        data[i] = {
          rank: i + 1,
          nickName: params.t[i].aa,
          money: params.t[i].v
        }
      }

      this.sendNotification(MiniGameMessage.RECEIVE_GET_RANK_TAI_XIU, {data: data});
    }

    receiveMyHistoryTaiXiu(params){
      var data = [];
      for(var i = 0; i< params.h.length;i++){
        data[i] = {
          session: params.h[i].id,
          dateTime: params.h[i].t,
          typeBet: params.h[i].txb,
          result: params.h[i].txr.split(""),
          bet: params.h[i].vb,
          repay: params.h[i].r,
          prize: params.h[i].w,
        }
      }

      this.sendNotification(MiniGameMessage.RECEIVE_GET_HISTORY_TAI_XIU, {data: data});
    }

    receiveDetailSessionTaiXiu(params){
        this.sendNotification(MiniGameMessage.RECEIVE_GET_DETAIL_SESSION_TAI_XIU, {data: params});
    }

    receiveEventTaiXiu(params){
        this.sendNotification(MiniGameMessage.RECEIVE_GET_EVENT_TAI_XIU, {data: params});
    }

    receiveMyHistoryMiniPoker(params){
      var data = [];
      for(var i = 0; i< params.h.length;i++){
        data[i] = {
          id:params.h[i].id,
          dateTime:params.h[i].t,
          bet:params.h[i].vb,
          prize:params.h[i].v,
          cards: this.getCardMiniPoker(params.h[i].d)
        }
      }

      this.sendNotification(MiniGameMessage.RECEIVE_GET_HISTORY_MINI_POKER, {data: data});
    }

    getCardMiniPoker(data) {
      var result = [];
      data = JSON.parse(data);
      var mapCardId = Utility.getListCardMap();
      for(var i=0;i<data.length;i++){
        var card = data[i].key + data[i].type;
        result.push(mapCardId.indexOf(card));
      }
      return result;
    }

    receiveMyHistorySlot3x3(params){
      //checl lai data
      var data = [];
      for(var i = 0; i< params.h.length;i++){
        data[i] = {
          id: params.h[i].id,
          dateTime: params.h[i].t,
          bet: params.h[i].vb,
          betLine: "",//params.h[i].bl,
          winLine: "",//params.h[i].wl,
          prize: params.h[i].v,
        }
      }

      this.sendNotification(MiniGameMessage.RECEIVE_GET_HISTORY_SLOT3X3, {data: data});
    }

    //////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////
    joinGame() {
      var data = {
        i: this.moduleId,
        c: StaticsicProxy.Cmd.ENTER_ROOM,
        d: ""
      }

      this.send(data);
    }

    sendGetRank(curMiniGame, page) {
      var cmd = StaticsicProxy.Cmd.STATIC_RANK;
      var gameModuleId = 0;
      switch (curMiniGame){
          case Constants.MINIGAME_BAU_CUA:
              break;
          case Constants.MINIGAME_MINI_POKER:
              gameModuleId = 102;
              break;
          case Constants.MINIGAME_SLOT3X3:
              gameModuleId = 103;
              break;
          case Constants.MINIGAME_TAI_XIU:
              gameModuleId = 100;
              break;
          case Constants.MINIGAME_TO_NHO:
              break;
          case Constants.MINIGAME_VONG_QUAY:
              break;
          case Constants.SLOT20_LUCKY_CAFE:
              gameModuleId = 200;
              break;
      }

      var data = {
        i: this.moduleId,
        c: cmd,
        d: {
          i:gameModuleId,
          p:page
        }
      }

      this.send(data);
    }

    sendGetHistory(curMiniGame, page) {
      var cmd = "";
      var gameModuleId = 0;
      switch (curMiniGame){
          case Constants.MINIGAME_BAU_CUA:
              break;
          case Constants.MINIGAME_MINI_POKER:
              cmd = StaticsicProxy.Cmd.STATIC_HISTORY;
              gameModuleId = 102;
              break;
          case Constants.MINIGAME_SLOT3X3:
              cmd = StaticsicProxy.Cmd.STATIC_HISTORY;
              gameModuleId = 103;
              break;
          case Constants.MINIGAME_TAI_XIU:
              cmd = StaticsicProxy.Cmd.STATIC_HISTORY;
              gameModuleId = 100;
              break;
          case Constants.MINIGAME_TO_NHO:
              break;
          case Constants.MINIGAME_VONG_QUAY:
              break;
      }

      var data = {
        i: this.moduleId,
        c: cmd,
        d: {
          i:gameModuleId,
          p:page
        }
      }

      this.send(data);
    }

    sendGetDetailSession(params){
        var data = {
            i: 889,
            c: 102,
            d: {
                id:params.session,
                p:params.page
            }
        }

        this.send(data);
    }

    sendGetEvent(params){
        var data = {
            i: 889,
            c: 105,
            d: {
                isWin:params.isWin,
                date:params.date
            }
        }

        this.send(data);
    }

    sendMobileCardRecharge(params) {
      var data = {
        i: this.moduleId,
        c: StaticsicProxy.Cmd.MOBILE_CARD_RECHARGE,
        d: params
      }

      this.send(data);
    }

    sendGetRechargeInfo() {
      var data = {
        i: this.moduleId,
        c: StaticsicProxy.Cmd.MOBILE_CARD_RECHARGE_INFO,
        d: ''
      }

      this.send(data);
    }

    sendGetOutCardInfo(params) {
      var data = {
        i: this.moduleId,
        c: StaticsicProxy.Cmd.GET_OUT_CARD_INFO,
        d: params
      }

      this.send(data);
    }

    sendCashOutCard(params) {
      // this.receiveSendCashOut({		"t": "VMS",		"a": 20000,		"q": 1,		"c": [			{				"s": "948427203823",				"c": "8569382938452"			}		],		"b": 7705050	})

      var data = {
        i: this.moduleId,
        c: StaticsicProxy.Cmd.SEND_CASH_OUT,
        d: params
      }

      this.send(data);
    }

    useGiftCode(params) {
      var data = {
        i: this.moduleId,
        c: StaticsicProxy.Cmd.USER_GIFT_CODE,
        d: params
      }

      this.send(data);
    }

    sendGetInboxPage(params) {
      var data = {
        i: this.moduleId,
        c: StaticsicProxy.Cmd.INBOX_LOAD_PAGE,
        d: params
      }

      this.send(data);
    }

    sendDeleteInbox(params) {
      var data = {
        i: this.moduleId,
        c: StaticsicProxy.Cmd.INBOX_DELETE,
        d: params
      }

      this.send(data);
    }

    sendGetHistoryCashIn(params) {
        var data = {
            i: this.moduleId,
            c: StaticsicProxy.Cmd.HISTORY_CASH_IN_OUT,
            d: params
        }

        this.send(data);
    }

    sendGetHistoryCashOut(params) {
        var data = {
            i: this.moduleId,
            c: StaticsicProxy.Cmd.HISTORY_CASH_IN_OUT,
            d: params
        }

        this.send(data);
    }

    sendGetHistoryTranfer(params) {
        var data = {
            i: this.moduleId,
            c: StaticsicProxy.Cmd.HISTORY_TRANFER,
            d: params
        }

        this.send(data);
    }
}
