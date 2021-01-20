var SCProxy = require("SCProxy");
var Constants = require("Constants");
var MiniGameMessage = require("MiniGameMessage");
var Slot3x3VO = require("Slot3x3VO");
var GameConfig = require("GameConfig");
var Utility = require('Utility');

export default class Slot3x3Proxy extends SCProxy {
    static get NAME() {
      return 'Slot3x3Proxy';
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
      this.gameVO = new Slot3x3VO();
      this.gameVO.onRegister();
      this.moduleId = Constants.MINIGAME_SLOT3X3;
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
      var exception = [];
      exception[Slot3x3Proxy.Cmd.SPIN] = true;

      if(this.isOnMessageError(event, this.moduleId, exception)) return;
      var data = JSON.parse(Utility.gDecrypt(event.data));

      switch (data.c) {
        case Slot3x3Proxy.Cmd.ENTER_ROOM:
          this.receiveJoinMinigame();
          break;
        case Slot3x3Proxy.Cmd.SPIN:
          this.receiveSpin(data);
          break;
        case Slot3x3Proxy.Cmd.UPDATE_JACKPOT:
          this.receiveUpdateJackPot(data.d);
          break;
        default:
      }
    }

    //////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////

    receiveJoinMinigame(params) {
      this.sendNotification(MiniGameMessage.RECEIVE_JOIN_MINIGAME, {curMiniGame: Constants.MINIGAME_SLOT3X3});
    }

    receiveSpin(params) {
      this.gameVO.updateData(params);
      this.sendNotification(MiniGameMessage.RECEIVE_SPIN_SLOT3X3, {data: this.gameVO} );
    }

    receiveUpdateJackPot(params) {
      this.gameVO.updatejackpot(params);
      this.sendNotification(MiniGameMessage.RECEIVE_UPDATE_JACKPOT_SLOT3X3, {data: this.gameVO} );
    }

    //////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////
    joinGame() {
      var data = {
        i: this.moduleId,
        c: Slot3x3Proxy.Cmd.ENTER_ROOM,
        d: ""
      }

      this.send(data);
    }

    sendSpin(params) {
      var data = {
        i: this.moduleId,
        c: Slot3x3Proxy.Cmd.SPIN,
        d: {
          r: params.bet,
          l: params.lines
        }
      }

      this.send(data);
    }

    leaveRoom(params) {
      var data = {
        i: this.moduleId,
        c: Slot3x3Proxy.Cmd.LEAVE_ROOM,
        d: ""
      }

      this.send(data);
    }
}
