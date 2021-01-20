var BaseProxy = require('BaseProxy');
var SFSProxy = require('SFSProxy');
var GameConfig = require('GameConfig');
var SFSMessage = require('SFSMessage');
var SFSEvent = require('SFSEvent');
var Utility = require('Utility');

export default class SFSChatProxy extends SFSProxy {
    static get NAME() {
      return 'SFSChatProxy';
    }

    static get SFSData(){
        return {
          CMD:'cmd',
          COMMAND:'command',
          MESSAGE:'message',
          USER_NAME:'userName',
          DISPLAY_NAME:'displayName',
          PUBLIC_CHAT:'PUBLIC_CHAT'
        }
    }

    onRegister() {
    }

    //override
    onLogin(evtParams) {
        console.log('%c' + '[JOIN ROOM CHAT LOBBY1]', 'background: #222; color: #bada55');
        this.sfs.send(new SFS2X.JoinRoomRequest("lobby1", ""));
        this.startPingToServer();
    }

    onUserEnterRom(evtParams) {

    }

    onPublicMessage(evtParams) {
        evtParams.data.putUtfString(this.SFSData.CMD, SFSEvent.PUBLIC_CHAT);
        var vo = Utility.convertSFSObjectToObject(evtParams.data);
        this.sendNotification(SFSMessage.REPONSE_NETWORK_CHAT, vo);
    }

    onConnectionLost(evtParams) {
        if (GameConfig.IS_DEBUG) console.log('%c' + '[CONNECTTION LOST]', 'background: #222; color: #ff0000');
        this.onDisconnect();
    }

    onPingTimer() {
        var sfo = new SFS2X.SFSObject();
        sfo.putUtfString(this.SFSData.COMMAND, SFSEvent.PUBLIC_CHAT);
        sfo.putUtfString(this.SFSData.MESSAGE, "dkm");
        sfo.putUtfString(this.SFSData.DISPLAY_NAME, "");
        sfo.putUtfString(this.SFSData.USER_NAME, "");

        var room = this.sfs.lastJoinedRoom;
        var request = new SFS2X.PublicMessageRequest(SFSEvent.PUBLIC_CHAT, sfo, room);
        this.send(request, false);
    }
}
