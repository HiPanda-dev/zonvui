var SFSProxy = require('SFSProxy');
var BaseProxy = require('BaseProxy');
var SFSEvent = require('SFSEvent');
var SFSMessage = require('SFSMessage');

export default class SFSPokeGoProxy extends SFSProxy {
    static get NAME() {
      return 'SFSPokeGoProxy';
    }

    onRegister() {
    }

    //override
    onLogin(evtParams) {

        this.userName = evtParams.user.name;
        cc.log('on Login: user: ' + + this.userName );

        var data = {
            cmd: SFSEvent.USER_JOIN_MINIGAME,
            body: evtParams
        };

        this.sendNotification(SFSMessage.REPONSE_NETWORK_POKE_GO, data);
        this.startPingToServer();
    }

    //override
    onExtensionResponse(evtParams) {
        if (!this.isBlackListReponseLog(evtParams.cmd)) {
            this.reponseExtensionRequestLog(evtParams);
        }

        this.sendNotification(SFSMessage.REPONSE_NETWORK_POKE_GO, evtParams);
    }
}
