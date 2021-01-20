// import StaticsicProxy from "../../../base/model/proxy/StaticsicProxy";

var SCProxy = require('SCProxy');
var TaiXiuVO = require('TaiXiuVO');
var Constants = require('Constants');
var MiniGameMessage = require('MiniGameMessage');
var StaticsicProxy = require('StaticsicProxy');
var GameConfig = require('GameConfig');
var Utility = require('Utility');

export default class TaiXiuProxy extends SCProxy {
    static get NAME() {
      return 'TaiXiuProxy';
    }

    static get Cmd(){
        return {
          ENTER_ROOM: 10,
          LEAVE_CHAT_ROOM: 11,
          GAME_INFO: 100,
          BETTING: 101,
          REPAY: 102,
          WIN: 103,
          RESULT: 104,
          DATA_HISTORY: 105,
          DATA_HISTORY_115: 106,
          INFO_HU_LOC: 107,
          INFO_COUNT_RUT_LOC: 108,
          UPDATE_BALANCE_AFTER_TAN_LOC: 109,
          UPDATE_RUT_LOC: 110,
          CHAT_ENTER: 100,
          CHAT: 101,
        }
    }

    // addEventListener(socket) {
    //   this.socket = socket;
    //   if(cc.sys.isBrowser){
    //     this.socket.onmessage = this.onMessage.bind(this);
    //   }else{
    //     socket.onmessage = function(event) {
    //       this.onMessage(event);
    //     }.bind(this);
    //   }
    // }

    onRegister() {
      SCProxy.prototype.onRegister.call(this);
      this.txVO = new TaiXiuVO();
      this.txVO.onRegister();
      setInterval(this.timeTick.bind(this), 1000);
      this.moduleId = Constants.MINIGAME_TAI_XIU;
    }

    timeTick(evt) {
      if(this.txVO.time<=0) return;
      this.txVO.time--;
      this.sendNotification(MiniGameMessage.ON_UPDATE_TIMER_TAI_XIU, {time: this.txVO.time});
    }

    onMessage(event) {
        this.onMessageTaiXiu(event);
        this.onMessageChat(event);
        this.onMessageStaticsic(event);

    }

    onMessageTaiXiu (event){

        if(this.isOnMessageError(event, this.moduleId) ) return;
        var data = JSON.parse(Utility.gDecrypt(event.data));

        switch (data.c) {
            case TaiXiuProxy.Cmd.ENTER_ROOM:
                this.receiveJoinMinigame();
                break;
            case TaiXiuProxy.Cmd.GAME_INFO:
                this.receiveGameInfo(data.d);
                break;
            case TaiXiuProxy.Cmd.DATA_HISTORY:
                //this.receiveDataHistory(data.d);
                break;
            case TaiXiuProxy.Cmd.REPAY:
                this.receiveRepay(data.d);
                break;
            case TaiXiuProxy.Cmd.RESULT:
                this.receiveResult(data.d);
                break;
            case TaiXiuProxy.Cmd.BETTING:
                this.receiveBetting(data.d);
                break;
            case TaiXiuProxy.Cmd.DATA_HISTORY_115:
                this.receiveDataHistory115(data.d);
                break;
            default:

        }
    }

    onMessageChat (event){
        if(this.isOnMessageError(event, 888) ) return;
        var data = JSON.parse(Utility.gDecrypt(event.data));

        switch (data.c) {
            case TaiXiuProxy.Cmd.CHAT_ENTER:
            case TaiXiuProxy.Cmd.CHAT:
                this.receiveChat(data.d);
                break;
            default:

        }
    }

    onMessageStaticsic (event) {
        if(this.isOnMessageError(event, this.moduleId, null, false)) return;
        var data = JSON.parse(Utility.gDecrypt(event.data));

        switch (data.c) {
            case StaticsicProxy.Cmd.DETAI_SESSION:
                this.receiveDetailSessionTaiXiu(data.d);
                break;
            default:

        }
    }
    //////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////

    receiveChat(params) {
        var data = [];
        for (var i=0; i<params.length; i++){
            var o = {
                displayName : params[i].a,
                message : params[i].c
            }
            data.push(o);
        }
        this.sendNotification(MiniGameMessage.RECEIVE_CHAT_TAI_XIU, data);
    }

    receiveJoinMinigame() {
      this.sendNotification(MiniGameMessage.RECEIVE_JOIN_MINIGAME, {curMiniGame: Constants.MINIGAME_TAI_XIU});
      this.sendGetHistory115();
    }

    receiveGameInfo(params) {
      this.txVO.setGameInfo(params);
      this.sendNotification(MiniGameMessage.RECEIVE_UPDATE_GAME_STATE_TAI_XIU, {data: this.txVO});
      this.sendNotification(MiniGameMessage.RECEIVE_UPDATE_BOARD_BET_TAI_XIU, {data: this.txVO});
    }

    receiveDataHistory(params) {
      this.txVO.updateHistory(params);
      this.sendNotification(MiniGameMessage.RECEIVE_UPDATE_HISTORY_TAI_XIU, {data: this.txVO.history});
    }

    receiveDataHistory115(params) {
      this.txVO.setHistory(params);
      this.sendNotification(MiniGameMessage.RECEIVE_UPDATE_HISTORY_TAI_XIU, {data: this.txVO.history});
    }

    receiveRepay(params) {
      var data = {
        bet: params.v,
        typeBet: params.tx,
        money: params.b
      }

      TweenLite.delayedCall(3, function() {
          this.sendNotification(MiniGameMessage.RECEIVE_REPAY_TAI_XIU, {data: data});
      }.bind(this));

    }

    receiveResult(params) {
      var data = {
        dices:[params.xs1, params.xs2, params.xs3],
      }
      this.txVO.updateHistory(data.dices);
      this.txVO.gameState = params.s;
      this.txVO.time = params.cd;
      this.txVO.gameState = TaiXiuVO.STATE.RESULT;
      this.sendNotification(MiniGameMessage.RECEIVE_RESULT_DICE_TAI_XIU, {data: data});
      this.sendNotification(MiniGameMessage.RECEIVE_UPDATE_GAME_STATE_TAI_XIU, {data: this.txVO});
      this.sendNotification(MiniGameMessage.RECEIVE_UPDATE_HISTORY_TAI_XIU, {data: this.txVO.history});
    }

    receiveBetting(params) {
      var data = {
        money: params.b,
        totalBet: params.v,
        typeBet: params.tx
      }
      this.sendNotification(MiniGameMessage.RECEIVE_BET_TAI_XIU, {data: data});
    }

    //////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////
    joinGame() {
      var data = {
        i: this.moduleId,
        c: TaiXiuProxy.Cmd.ENTER_ROOM,
        d: ""
      }

      this.send(data);
      this.joinChat();
    }

    joinChat() {
        var data = {
            i: 888,
            c: TaiXiuProxy.Cmd.ENTER_ROOM,
            d: ''
        }

        this.send(data);
    }

    sendBet(params) {
      var data = {
        i: this.moduleId,
        c: TaiXiuProxy.Cmd.BETTING,
        d: {
          v: params.bet,
          tx: params.typeBet
        }
      }

      this.send(data);
    }

    sendGetHistory115() {
      var data = {
        i: this.moduleId,
        c: TaiXiuProxy.Cmd.DATA_HISTORY_115,
        d: ""
      }

      this.send(data);
    }

    sendChat(params) {
        var data = {
            i: 888,
            c: TaiXiuProxy.Cmd.CHAT,
            d: params
        }

        this.send(data);
    }
}
