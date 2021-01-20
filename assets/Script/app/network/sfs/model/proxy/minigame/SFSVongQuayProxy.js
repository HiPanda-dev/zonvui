var SFSProxy = require('SFSProxy');
var BaseProxy = require('BaseProxy');
var SFSMessage = require('SFSMessage');
var SFSEvent = require('SFSEvent');

export default class SFSVongQuayProxy extends SFSProxy {
    static get NAME() {
      return 'SFSVongQuayProxy';
    }

    onRegister() {
    }

    onRoomJoined(evtParams) {
        var data = {
            cmd: SFSEvent.USER_JOIN_MINIGAME,
            body: evtParams
        };

        this.sendNotification(SFSMessage.REPONSE_NETWORK_VONG_QUAY, data);
        this.startPingToServer();
    }

    onExtensionResponse(evtParams) {
        if (!this.isBlackListReponseLog(evtParams.cmd)) {
            this.reponseExtensionRequestLog(evtParams);
        }

        this.sendNotification(SFSMessage.REPONSE_NETWORK_VONG_QUAY, evtParams);
    }
}
