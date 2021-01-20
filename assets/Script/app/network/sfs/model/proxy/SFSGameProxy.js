var BaseProxy = require("BaseProxy");
var SFSProxy = require("SFSProxy");
var GameConfig = require('GameConfig');
var SFSEvent = require('SFSEvent');
var SFSMessage = require('SFSMessage');
var LobbyMessage = require('LobbyMessage');
var Utility = require('Utility');
var i18n = require('i18n');
var GameMessage = require('GameMessage');

export default class SFSGameProxy extends SFSProxy {
    static get NAME() {
      return 'SFSGameProxy';
    }

    onRegister() {
    }

    createGame(settingGame) {
        SFSProxy.prototype.createGame.call(this, settingGame);
        if(this.timeoutCreateRoom) clearTimeout(this.timeoutCreateRoom);
        this.timeoutCreateRoom = setTimeout(this.onTimeOutCreateGame.bind(this), 10000);
    }

    onTimeOutCreateGame() {
        this.isGame = false;
        this.timeoutCreateRoom = null;
        this.sendNotification(LobbyMessage.HIDE_LOADING);
        this.sendNotification(LobbyMessage.SHOW_ALERT, {content: i18n.t("C0046")});
    }

    quickJoinGame(bet, maxPlayer, onQuickJoinFail) {
        // var exp;
        // this.onQuickJoinFail = onQuickJoinFail;
        // if (bet === null) {
        //     exp = new SFS2X.MatchExpression("userCount", SFS2X.NumberMatch.LESS_THAN, maxPlayer).and("userCount", SFS2X.NumberMatch.NOT_EQUALS, 0).and(SFS2X.RoomProperties.NAME, SFS2X.StringMatch.NOT_EQUALS, "lobby1");
        // } else {
        //     exp = new SFS2X.MatchExpression("roomBet", SFS2X.NumberMatch.EQUALS, bet).and("userCount", SFS2X.NumberMatch.LESS_THAN, maxPlayer).and("userCount", SFS2X.NumberMatch.NOT_EQUALS, 0).and(SFS2X.RoomProperties.NAME, SFS2X.StringMatch.NOT_EQUALS, "lobby1");
        // }
        //
        // this.sfs.send(new SFS2X.QuickJoinGameRequest(exp, ["default"], this.sfs.lastJoinedRoom));
        // if (GameConfig.IS_DEBUG) console.log('%c' + '[QUICK JOIN GAME]', 'background: #222; color: #bada55');

    }

    onRoomJoined(evtParams) {
        this.isGame = evtParams.room.isGame;
        if (!this.isGame) {
            this.sendNotification(LobbyMessage.RECEIVE_JOIN_CHANNEL, evtParams.room);
            this.onRefeshChannelTimer();
        }
        else {
            if(this.timeoutCreateRoom) clearTimeout(this.timeoutCreateRoom);
            this.sendNotification(LobbyMessage.RECEIVE_JOIN_ROOM, evtParams.room);
            var data = {
                cmd: SFSEvent.UPDATE_GAME_ROOM_DATA,
                body: evtParams
            };
            this.sendNotification(SFSMessage.REPONSE_NETWORK, data);
        }
    }

    onLoginError(evtParams) {

        if (GameConfig.IS_DEBUG) console.log('%c' + '[LOGIN ERROR] ' + evtParams.errorMessage, 'background: #222; color: #ff0000');
        if (!this.isGame) {
            this.sendNotification(LobbyMessage.SHOW_ALERT, {content: i18n.t("C0002")});
        } else {
            this.sendNotification(LobbyMessage.SHOW_ALERT, {content: i18n.t("C0003")});
        }
    }


    onExtensionResponse(evtParams) {
        if (!this.isBlackListReponseLog(evtParams.cmd)) {
            this.reponseExtensionRequestLog(evtParams);
        }

        this.sendNotification(SFSMessage.REPONSE_NETWORK, evtParams);
    }

    onPublicMessage(evtParams) {
        evtParams.data.putUtfString("cmd", SFSEvent.PUBLIC_CHAT);
        var vo = Utility.convertSFSObjectToObject(evtParams.data);
        this.sendNotification(SFSMessage.REPONSE_NETWORK, vo);
    }

    onUserVariablesUpdate(evtParams) {
        SFSProxy.prototype.onUserVariablesUpdate.call(this, evtParams);
        if (GameConfig.IS_DEBUG && cc.sys.platform === cc.sys.DESKTOP_BROWSER) {
            console.log('%c' + '[VARIABLES UPDATE]', 'background: #222; color: #bada55');
            console.log(evtParams);
        }
        var data = {
            cmd: SFSEvent.UPDATE_USER_INFO,
            body: evtParams
        };
        this.sendNotification(SFSMessage.REPONSE_NETWORK, data);
    }

    onUserEnterRom(evtParams) {
        if (GameConfig.IS_DEBUG) console.log('%c' + '[USER ENTER ROOM]', 'background: #222; color: #bada55');
        var data = {
            cmd: SFSEvent.UPDATE_USER_LIST,
            body: evtParams
        };
        this.sendNotification(SFSMessage.REPONSE_NETWORK, data);
    }

    onConnectionLost(evtParams) {
        if (GameConfig.IS_DEBUG) console.log('%c' + '[CONNECTTION LOST]', 'background: #222; color: #ff0000');
        this.isGame = false;
        this.sendNotification(GameMessage.SEND_LEAVE_GAME);
        this.sendNotification(LobbyMessage.SHOW_SELECT_GAME_SCENE);
        this.sendNotification(LobbyMessage.SHOW_EVENT_BANNER_SCENE);
        this.sendNotification(LobbyMessage.SHOW_LOBBY);
        this.sendNotification(LobbyMessage.HIDE_CHAT_SCENE);
        this.sendNotification(LobbyMessage.HIDE_CHANNEL_SCENE);
        this.sendNotification(LobbyMessage.SHOW_TOP_MENU);
        this.sendNotification(LobbyMessage.SHOW_ALERT, {content: i18n.t("C0004")});
        this.sendNotification(LobbyMessage.HIDE_LOADING);
        this.facade.registerCommand(SFSMessage.DESTROY_GAME_NETWORK, require('SFSDestroyGameCommand'));
        this.sendNotification(SFSMessage.DESTROY_GAME_NETWORK);
        this.facade.removeCommand(SFSMessage.DESTROY_GAME_NETWORK);
        this.sendNotification(GameMessage.DESTROY_GAME);
        this.onDisconnect();
    }

    onRoomJoinError(evtParams) {
        console.warn("[SFS]onRoomJoinError: " + evtParams.errorMessage);
        switch (evtParams.errorCode) {
            case 41: //QuickJoinGame action failed: no matching Rooms were found
                if (this.onQuickJoinFail) {
                    this.onQuickJoinFail.call();
                }
                break;
            default:
                this.sendNotification(LobbyMessage.SHOW_ALERT, {content: i18n.t("C0046")});
                break;
        }

    }
}
