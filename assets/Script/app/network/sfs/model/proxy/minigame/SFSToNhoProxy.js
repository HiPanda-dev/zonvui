var SFSProxy = require('SFSProxy');
var BaseProxy = require('BaseProxy');
var SFSEvent = require('SFSEvent');
var SFSMessage = require('SFSMessage');

export default class SFSToNhoProxy extends SFSProxy {
    static get NAME() {
      return 'SFSToNhoProxy';
    }

    onRegister() {
    }

    //override
    onRoomJoined (evtParams) {
        var data = {
            cmd: SFSEvent.USER_JOIN_MINIGAME,
            body: evtParams
        };
        this.sendNotification(SFSMessage.REPONSE_NETWORK_TO_NHO, data);
        this.startPingToServer();
    }

    //override
    onExtensionResponse (evtParams) {
        if (!this.isBlackListReponseLog(evtParams.cmd)) {
            this.reponseExtensionRequestLog(evtParams);
        }

        this.sendNotification(SFSMessage.REPONSE_NETWORK_TO_NHO, evtParams);
    }
}
