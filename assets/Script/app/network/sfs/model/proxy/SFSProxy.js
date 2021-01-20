var i18n = require('i18n');
var BaseProxy = require("BaseProxy");
var LobbyMessage = require('LobbyMessage');
var GameMessage = require('GameMessage');
var SFSMessage = require('SFSMessage');
var SFSEvent = require('SFSEvent');
var GameConfig = require('GameConfig');
var Utility = require('Utility');
var SFSData = require('SFSData');

export default class SFSProxy extends BaseProxy {
    static get NAME() {
      return 'SFSProxy';
    }

    onRegister() {
      this.userName = "";
      this.curZone = "";
      this.sfs = null;
      this.userId = "";
      this.pass = "";
      this.zoneName = "";
      this.isGame = false;
    }

    joinZone(ip, port, userId, pass, zoneName, token) {
        this.userId = userId;
        this.pass = pass;
        this.curZone = zoneName;
        this.token = token;

        if (this.sfs && this.sfs.isConnected) {
            if (GameConfig.IS_DEBUG) console.log('%c [LOGIN] userName:' + this.userId.toString() + " zoneName: " + this.curZone, 'background: #222; color: #bada55');
            var params = {};
            params['token'] = this.token;
            try {
                this.sfs.send(new SFS2X.Requests.System.LoginRequest(this.userId.toString(), String(this.pass), params, this.curZone));
            } catch (e) {

            }
        } else {
            this.connectNetwork(ip, port);
        }
    }

    // joinGame(tableId, pass) {
    //     this.stopGetRoomList();
    //     this.onLeaveRoom();
    //     this.sfs.send(new SFS2X.JoinRoomRequest(tableId, pass));
    //     if (GameConfig.IS_DEBUG) console.log('%c' + '[JOIN GAME] [tableId:' + tableId + ' pass:' + pass + ']', 'background: #222; color: #bada55');
    // }

    quickJoinGame(bet, maxPlayer, onQuickJoinFail) {

    }

    createRoom(settingGame) {
        this.sfs.send(new SFS2X.Requests.System.CreateRoomRequest(settingGame, true));
        if (GameConfig.IS_DEBUG) console.log('%c' + '[CREATE ROOM]', 'background: #222; color: #bada55');
    }

    createGame(settingGame) {
        this.sfs.send(new SFS2X.Requests.Game.CreateSFSGameRequest(settingGame, true));
        if (GameConfig.IS_DEBUG) {
            console.log('%c' + '[CREATE GAME] ' + settingGame.extension.className, 'background: #222; color: #bada55');
            console.log(settingGame);
        }
    }

    send(request, isLog) {
        if(!this.sfs) return;
        if (isLog === undefined || isLog === true) {
            this.sendExtensionRequestLog(request, isLog);
        }

        this.sfs.send(request);
    }

    //==============================================================================================================
    connectNetwork(ip, port) {
        if (this.sfs && this.sfs.isConnected) {
            if (GameConfig.IS_DEBUG) console.log('%c' + "ip: " + ip + ":" + port + " is connected", 'background: #222; color: #bada55');
            return;
        }
        var config = {};
        config.host = ip;
        config.port = parseInt(port);
        config.debug = false;

        if (GameConfig.IS_DEBUG) console.log('%c' + "[CONNECT SMARTFOX SERVER] [" + ip + ":" + port + "]", 'background: #222; color: #bada55');

        // Create SmartFox client instance
        this.sfs = new SFS2X.SmartFox(config);
        this.sfs.addEventListener(SFS2X.SFSEvent.CONNECTION, this.onConnection, this);
        this.sfs.addEventListener(SFS2X.SFSEvent.LOGIN, this.onLogin, this);
        this.sfs.addEventListener(SFS2X.SFSEvent.ROOM_JOIN, this.onRoomJoined, this);
        this.sfs.addEventListener(SFS2X.SFSEvent.EXTENSION_RESPONSE, this.onExtensionResponse, this);
        this.sfs.addEventListener(SFS2X.SFSEvent.CONNECTION_LOST, this.onConnectionLost, this);
        this.sfs.addEventListener(SFS2X.SFSEvent.LOGOUT, this.onLogout, this);
        this.sfs.addEventListener(SFS2X.SFSEvent.LOGIN_ERROR, this.onLoginError, this);
        this.sfs.addEventListener(SFS2X.SFSEvent.ROOM_JOIN_ERROR, this.onRoomJoinError, this);
        this.sfs.addEventListener(SFS2X.SFSEvent.ROOM_VARIABLES_UPDATE, this.onRoomVariablesUpdate, this);
        this.sfs.addEventListener(SFS2X.SFSEvent.USER_COUNT_CHANGE, this.onUserCountChange, this);
        this.sfs.addEventListener(SFS2X.SFSEvent.USER_VARIABLES_UPDATE, this.onUserVariablesUpdate, this);
        this.sfs.addEventListener(SFS2X.SFSEvent.ROOM_ADD, this.onRoomAdd, this);
        this.sfs.addEventListener(SFS2X.SFSEvent.ROOM_REMOVE, this.onRoomRemove, this);
        this.sfs.addEventListener(SFS2X.SFSEvent.USER_ENTER_ROOM, this.onUserEnterRom, this);
        this.sfs.addEventListener(SFS2X.SFSEvent.USER_EXIT_ROOM, this.onUserExitRom, this);
        this.sfs.addEventListener(SFS2X.SFSEvent.PUBLIC_MESSAGE, this.onPublicMessage, this);
        this.sfs.addEventListener(SFS2X.SFSEvent.ROOM_CREATION_ERROR, this.onRoomCreationError, this);


        // this.sfs.logger.addEventListener(SFS2X.LoggerEvent.INFO, this.onInfoMessage, this);

        this.sfs.connect();
    }

    onRoomCreationError(evtParams) {
        this.sendNotification(LobbyMessage.SHOW_ALERT, {content: i18n.t("C0046")});
        this.sendNotification(LobbyMessage.HIDE_LOADING);
    }

    onInfoMessage(evtParams) {

    }

    onConnection(evtParams) {
        if (evtParams.success) {
            if (GameConfig.IS_DEBUG) {
                console.log('%c' + '[CONNECT SUCCESS!!!]', 'background: #222; color: #bada55');
                console.log('%c' + '[LOGIN] userName:' + this.userId.toString() + " zoneName: " + this.curZone, 'background: #222; color: #bada55');
                console.log(this.pass + "  #  " + this.curZone);
            }

            var params = {};//SFS2X.SFSObject();
            params['token'] = this.token;
            this.sfs.send(new SFS2X.Requests.System.LoginRequest(this.userId.toString(), String(this.pass), params, this.curZone));
        } else {
            if (GameConfig.IS_DEBUG) console.log("connect network is fail");
            this.sendNotification(LobbyMessage.SHOW_ALERT, {content: i18n.t("C0043")});
        }

    }

    onLogin(evtParams) {
        this.userName = evtParams.user.name;
    }

    onRoomJoined(evtParams) {

    }

    onExtensionResponse(evtParams) {

    }


    onPublicMessage(evtParams) {

    }

    onLogout(evtParams) {
        if (GameConfig.IS_DEBUG) {
            console.log('%c' + '[LOGOUT]', 'background: #222; color: #bada55');
            console.log(evtParams);
        }
    }

    onRoomVariablesUpdate(evtParams) {
        if (GameConfig.IS_DEBUG) {
            console.log('%c' + '[ROOM VAIABLES UPDATE]', 'background: #222; color: #bada55');
            console.log(evtParams);
        }
    }

    onUserCountChange(evtParams) {
        //if (GameConfig.IS_DEBUG) console.log('%c' + '[USER COUNT CHANGE]', 'background: #222; color: #bada55');
    }

    onUserVariablesUpdate(evtParams) {
        var user = evtParams.user;
        var sfsUser = user.getVariable('userInfo');
        var sfsMoney = user.getVariable('money');
        var playerInfo = Utility.convertSFSObjectToObject(sfsUser.value);
        var dataUser = this.facade.retrieveProxy("UserProxy");

        if(playerInfo.uid === dataUser.mySelf.uid){
            dataUser.mySelf.money = parseInt(sfsMoney.value);
            this.sendNotification(LobbyMessage.ON_UPDATE_MY_INFO);
        }
    }

    onRoomAdd(evtParams) {
        if (GameConfig.IS_DEBUG) {
            console.log('%c' + '[ROOM ADD]', 'background: #222; color: #bada55');
            console.log(evtParams);
        }
    }

    onRoomRemove(evtParams) {
        if (GameConfig.IS_DEBUG) console.log('%c' + '[ROOM REMOVE]', 'background: #222; color: #bada55');
    }

    onUserExitRom(evtParams) {
        // if (GameConfig.IS_DEBUG) console.log('%c' + '[USER EXIT ROOM]', 'background: #222; color: #bada55');
        // if (this.isGame) {
        //     var userName = evtParams.user.name;
        //     this.sendNotification(GameMessage.RECEIVE_LEAVE_GAME, {userIdLeave: userName});
        // }
    }

    onUserEnterRom(evtParams) {

    }

    onConnectionLost(evtParams) {

    }

    onLoginError(evtParams) {
        if (GameConfig.IS_DEBUG) console.log('%c' + '[LOGIN ERROR] ' + evtParams.errorMessage, 'background: #222; color: #ff0000');
        this.sendNotification(LobbyMessage.SHOW_ALERT, {content: i18n.t("C0002")});

    }

    onRoomJoinError(evtParams) {
        console.warn("[SFS]onRoomJoinError: " + evtParams.errorMessage);
    }

    onLeaveRoom() {
        try {
            this.sfs.send(new SFS2X.Requests.System.LeaveRoomRequest());
        } catch (e) {
        }
    }

    onDisconnect() {
        if (GameConfig.IS_DEBUG) console.log('%c' + '[DISCONNECT] ' + this.curZone, 'background: #222; color: #ff0000');
        if (this.sfs === null) {
            console.log('%c' + '[SFS is Null]', 'background: #222; color: #ff0000');
            return;
        }
        this.stopPingToServer();
        this.stopGetRoomList();
        this.removeAllEvent();
        this.sfs.disconnect();
        this.sfs = null;
    }

    removeAllEvent() {
        this.sfs.removeEventListener(SFS2X.SFSEvent.CONNECTION, this.onConnection);
        this.sfs.removeEventListener(SFS2X.SFSEvent.LOGIN, this.onLogin);
        this.sfs.removeEventListener(SFS2X.SFSEvent.ROOM_JOIN, this.onRoomJoined);
        this.sfs.removeEventListener(SFS2X.SFSEvent.EXTENSION_RESPONSE, this.onExtensionResponse);
        this.sfs.removeEventListener(SFS2X.SFSEvent.CONNECTION_LOST, this.onConnectionLost);
        this.sfs.removeEventListener(SFS2X.SFSEvent.LOGOUT, this.onLogout);
        this.sfs.removeEventListener(SFS2X.SFSEvent.LOGIN_ERROR, this.onLoginError);
        this.sfs.removeEventListener(SFS2X.SFSEvent.ROOM_JOIN_ERROR, this.onRoomJoinError);
        this.sfs.removeEventListener(SFS2X.SFSEvent.ROOM_VARIABLES_UPDATE, this.onRoomVariablesUpdate);
        this.sfs.removeEventListener(SFS2X.SFSEvent.USER_COUNT_CHANGE, this.onUserCountChange);
        this.sfs.removeEventListener(SFS2X.SFSEvent.USER_VARIABLES_UPDATE, this.onUserVariablesUpdate);
        this.sfs.removeEventListener(SFS2X.SFSEvent.ROOM_ADD, this.onRoomAdd);
        this.sfs.removeEventListener(SFS2X.SFSEvent.ROOM_REMOVE, this.onRoomRemove);
        this.sfs.removeEventListener(SFS2X.SFSEvent.USER_ENTER_ROOM, this.onUserEnterRom);
        this.sfs.removeEventListener(SFS2X.SFSEvent.USER_EXIT_ROOM, this.onUserExitRom);
    }


    startPingToServer() {
        if (this.timerPing) return;
        this.timerPing = setInterval(this.onPingTimer.bind(this), GameConfig.PING_TIMER * 1000);
    }

    stopPingToServer() {
        if (!this.timerPing) return;

        clearInterval(this.timerPing);
        this.timerPing = null;
    }

    onPingTimer() {
        var sfo = {};
        sfo[SFSData.COMMAND] = SFSData.HEART_BEAT;
        var request = new SFS2X.Requests.System.ExtensionRequest(SFSEvent.HEART_BEAT, sfo, null);
        this.sfs.send(request);
    }

    startGetRoomList() {
        if (this.timerRefeshChannel) return;
        this.timerRefeshChannel = setInterval(this.onRefeshChannelTimer.bind(this), GameConfig.REFESH_CHANNEL_TIMMER * 1000);
    }

    stopGetRoomList() {
        if (!this.timerRefeshChannel) return;

        clearInterval(this.timerRefeshChannel);
        this.timerRefeshChannel = null;
    }

    onRefeshChannelTimer() {
        var sfo = {}
        sfo[SFSData.COMMAND] = SFSData.GET_ROOM_LIST;
        sfo[SFSData.USER_NAME] = this.userId;

        var request = new SFS2X.Requests.System.ExtensionRequest(SFSEvent.GET_ROOM_LIST, sfo);
        this.send(request, false);
    }

    sendExtensionRequestLog(extRequest) {
        if (!GameConfig.IS_DEBUG || cc.sys.platform !== cc.sys.DESKTOP_BROWSER) return;
        console.log('%c[SEND EXTENSION REQUEST]: ' + extRequest._extCmd, 'background: #222; color: #04FFEB');
        console.log(extRequest);
        cc.log(Utility.convertSFSObjectToJson(extRequest._params, 0));
    }

    reponseExtensionRequestLog(extRequest) {
        if (!GameConfig.IS_DEBUG || cc.sys.platform !== cc.sys.DESKTOP_BROWSER) return;
        console.log('%c[REPONSE EXTENSION REQUEST]: ' + extRequest.cmd, 'background: #222; color: #bada55');
        console.log(extRequest);
        cc.log(Utility.convertSFSObjectToJson(extRequest.params, 0));
    }

    isBlackListReponseLog(cmd) {
        switch (cmd) {
            case SFSEvent.GET_ROOM_LIST:
            case SFSEvent.UPDATE_POT:
            case SFSData.HEART_BEAT:
                return true;
        }
        return false;
    }

    reset() {
        this.onRegister();
    }
}
