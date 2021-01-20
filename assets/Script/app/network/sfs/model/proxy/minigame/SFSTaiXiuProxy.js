var SFSProxy = require('SFSProxy');
var SFSEvent = require('SFSEvent');
var SFSMessage = require('SFSMessage');
var BaseProxy = require('BaseProxy');
var Utility = require('Utility');

export default class SFSTaiXiuProxy extends SFSProxy {
    static get NAME() {
      return 'SFSTaiXiuProxy';
    }

    static get SFSData(){
        return {
          CMD:'cmd',
          COMMAND:'command',
          PUBLIC_CHAT:'PUBLIC_CHAT'
        }
    }

    onRegister() {
    }

    //override
    onRoomJoined(evtParams) {
        var data = {
            cmd: SFSEvent.USER_JOIN_MINIGAME,
            body: evtParams
        };
        this.sendNotification(SFSMessage.REPONSE_NETWORK_TAI_XIU, data);
        //this.startPingToServer();
    }

    //override
    onExtensionResponse(evtParams) {
        if (!this.isBlackListReponseLog(evtParams.cmd)) {
            this.reponseExtensionRequestLog(evtParams);
        }

        this.sendNotification(SFSMessage.REPONSE_NETWORK_TAI_XIU, evtParams);
    }

    onPublicMessage(evtParams) {
        evtParams.data.putUtfString(this.SFSData.CMD, SFSEvent.PUBLIC_CHAT);
        var vo = Utility.convertSFSObjectToObject(evtParams.data);
        this.sendNotification(SFSMessage.REPONSE_NETWORK_TAI_XIU, vo);
    }
}
