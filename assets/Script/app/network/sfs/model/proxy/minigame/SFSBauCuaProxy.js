var SFSProxy = require('SFSProxy');
var SFSEvent = require('SFSEvent');
var SFSMessage = require('SFSMessage');
var BaseProxy = require('BaseProxy');

export default class SFSBauCuaProxy extends SFSProxy {
    static get NAME() {
      return 'SFSBauCuaProxy';
    }

    onRegister() {
    }

    //override
    onRoomJoined(evtParams) {
        var data = {
            cmd: SFSEvent.USER_JOIN_MINIGAME,
            body: evtParams
        };
        this.sendNotification(SFSMessage.REPONSE_NETWORK_BAU_CUA, data);
        this.startPingToServer();
    }

    //override
    onExtensionResponse(evtParams) {
        if (!this.isBlackListReponseLog(evtParams.cmd)) {
            this.reponseExtensionRequestLog(evtParams);
        }

        this.sendNotification(SFSMessage.REPONSE_NETWORK_BAU_CUA, evtParams);
    }
}
