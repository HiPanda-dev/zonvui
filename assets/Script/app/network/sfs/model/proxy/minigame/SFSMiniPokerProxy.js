var SFSProxy = require('SFSProxy');
var BaseProxy = require('BaseProxy');
var SFSEvent = require('SFSEvent');
var SFSMessage = require('SFSMessage');

export default class SFSMiniPokerProxy extends SFSProxy {
    static get NAME() {
      return 'SFSMiniPokerProxy';
    }

    onRegister() {
    }

    //override
    onLogin(evtParams) {
        SFSProxy.prototype.onLogin.call(this, evtParams);
        var data = {
            cmd: SFSEvent.USER_JOIN_MINIGAME,
            body: evtParams
        };

        this.sendNotification(SFSMessage.REPONSE_NETWORK_MINI_POKER, data);
        this.startPingToServer();
    }

    onConnectionLost(evtParams){
        cc.log('f: onConnectionLost: ' + evtParams.reason);
        var data = {
            cmd: SFSEvent.USER_DISCONNECT,
            body: evtParams
        };

        this.sendNotification(SFSMessage.REPONSE_NETWORK_MINI_POKER, data);
    }

    //override
    onExtensionResponse(evtParams) {
        if (!this.isBlackListReponseLog(evtParams.cmd)) {
            this.reponseExtensionRequestLog(evtParams);
        }

        this.sendNotification(SFSMessage.REPONSE_NETWORK_MINI_POKER, evtParams);
    }
}
