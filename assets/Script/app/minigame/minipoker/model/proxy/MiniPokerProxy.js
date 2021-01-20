var SCProxy = require("SCProxy");
var Constants = require("Constants");
var MiniGameMessage = require("MiniGameMessage");
var Utility = require('Utility');
var MiniPokerVO = require("MiniPokerVO");
var GameConfig = require('GameConfig');

export default class MiniPokerProxy extends SCProxy {
    static get NAME() {
      return 'MiniPokerProxy';
    }

    static get Cmd(){
        return {
          ENTER_ROOM: 10,
          LEAVE_ROOM: 11,
          SPIN:101,
          UPDATE_JACKPOT:100,
        }
    }

    onRegister() {
      SCProxy.prototype.onRegister.call(this);
      this.gameVO = new MiniPokerVO();
      this.gameVO.onRegister();
      this.moduleId = Constants.MINIGAME_MINI_POKER;
    }

    onMessage(event) {
      var exception = [];
      exception[MiniPokerProxy.Cmd.SPIN] = true;

      if(this.isOnMessageError(event, this.moduleId, exception)) return;
      var data = JSON.parse(Utility.gDecrypt(event.data));

      switch (data.c) {
        case MiniPokerProxy.Cmd.ENTER_ROOM:
          this.receiveJoinMinigame();
          break;
        case MiniPokerProxy.Cmd.SPIN:
          this.receiveSpin(data);
          break;
        case MiniPokerProxy.Cmd.UPDATE_JACKPOT:
          this.receiveUpdateJackPot(data.d);
          break;
        default:
      }
    }

    //////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////

    receiveJoinMinigame(params) {
      this.sendNotification(MiniGameMessage.RECEIVE_JOIN_MINIGAME, {curMiniGame: Constants.MINIGAME_MINI_POKER});
    }

    receiveSpin(params) {
      this.gameVO.updateData(params);
      this.sendNotification(MiniGameMessage.RECEIVE_SPIN_MINI_POKER, {data: this.gameVO} );
    }

    receiveUpdateJackPot(params) {
      this.gameVO.updatejackpot(params);
      this.sendNotification(MiniGameMessage.RECEIVE_UPDATE_JACKPOT_MINI_POKER, {data: this.gameVO} );
    }

    //////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////
    joinGame() {
      var data = {
        i: this.moduleId,
        c: MiniPokerProxy.Cmd.ENTER_ROOM,
        d: ""
      }

      this.send(data);
    }

    sendSpin(params) {
      var data = {
        i: this.moduleId,
        c: MiniPokerProxy.Cmd.SPIN,
        d: params.bet
      }

      this.send(data);
    }

    leaveRoom(params) {
      var data = {
        i: this.moduleId,
        c: MiniPokerProxy.Cmd.LEAVE_ROOM,
        d: ""
      }

      this.send(data);
    }
}
