var BaseCommand = require('BaseCommand');
var GameConfig = require('GameConfig');
var SFSSubMesseage = require('SFSSubMesseage');
var SFSEvent = require('SFSEvent');
var LobbyMessage = require('LobbyMessage');
var puremvc = BaseCommand.puremvc;

var SFSRoomVariable = SFS2X.SFSRoomVariable;
var SFSGameSettings = SFS2X.SFSGameSettings;

module.exports = puremvc.define(
    // CLASS INFO
    {
        parent: BaseCommand
    },

    // INSTANCE MEMBERS
    {
        SFSData:{
            COMMAND:'command',
            ROOM:'room',
            ROOM_BET:'roomBet',
            MIN_MONEY:'minMoney',
            NAME:'name',
            CREATER:'creater',
            MAX_USER:'maxUser',
            USER_NAME:'userName',
            REFRESH_MONEY:'refreshMoney',
            VARIABLES:'variables',
            VALUE:'value',
            ROOM_ID:'roomId'
        },


        execute: function (notification) {
            this.sfsProxy = this.facade.retrieveProxy('SFSGameProxy');
            this.dataUser = this.facade.retrieveProxy('UserProxy');
            this.channel = this.facade.retrieveProxy('ChannelProxy');

            var params = notification.getBody();
            switch (params.cmd) {
                case SFSSubMesseage.CREATE_ROOM:
                    this.onRefreshMoney();
                    this.onCreateRoom(params);
                    break;
                case SFSSubMesseage.JOIN_ZONE:
                    this.onJoinZone();
                    break;
                case SFSSubMesseage.JOIN_GAME:
                    this.onRefreshMoney();
                    this.onJoinGame(params);
                    break;
                case SFSSubMesseage.QUICK_JOIN_GAME:
                    this.onQuickJoinGame(params);
                    break;
                case SFSSubMesseage.DISCONNECT_NETWORK:
                    this.onDisconnect();
                    break;
                case SFSSubMesseage.SEND_REFERSH_MONEY:
                    this.onRefreshMoney();
                    break;
                case SFSSubMesseage.SEND_CHANGE_MODE:
                    this.onChangeMode(params.data);
                    break;
            }
        },

        sendExtensionRequest: function (command, sfo) {
            if(!this.sfsProxy.sfs) return;

            sfo[this.SFSData.USER_NAME] = this.dataUser.mySelf.userName;

            var room = this.sfsProxy.sfs.lastJoinedRoom;
            var request = new SFS2X.Requests.System.ExtensionRequest(command, sfo, room);
            this.sfsProxy.send(request);
        },


        onCreateRoom: function (params) {
            var sfo = {};
            var room = {};
            var sfsArray = [];

            room[this.SFSData.NAME] = this.SFSData.ROOM_BET;
            room[this.SFSData.VALUE] = params.data.roomBet.toString();
            sfsArray.push(room);

            sfo[this.SFSData.VARIABLES] = sfsArray;
            sfo[this.SFSData.ROOM_BET] = params.data.roomBet.toString();
            sfo[this.SFSData.MAX_USER] = params.data.maxPlayer.toString();
            sfo[this.SFSData.USER_NAME] = this.dataUser.mySelf.userName;

            var request = new SFS2X.Requests.System.ExtensionRequest(SFSEvent.CREATE_ROOM, sfo, null);
            this.sfsProxy.send(request);
        },


        onJoinZone: function () {
            var mySelf = this.dataUser.mySelf;
            var zoneName = this.channel.getCurZone();
            this.sfsProxy.joinZone(GameConfig.SOCKET_IP, GameConfig.SOCKET_PORT, mySelf.uid, mySelf.password, zoneName, mySelf.token);
            this.sfsProxy.startGetRoomList();
        },

        onJoinGame: function (params) {
            var sfo = {};
            sfo[this.SFSData.ROOM_ID] = params.data.tableId.toString();

            var request = new SFS2X.Requests.System.ExtensionRequest(SFSEvent.JOIN_ROOM, sfo, null);
            this.sfsProxy.send(request);
        },

        onQuickJoinGame: function (params) {
            var sfo = {};
            var room = {};
            var sfsArray = [];

            room[this.SFSData.NAME] = this.SFSData.ROOM_BET;
            room[this.SFSData.VALUE] = params.data.roomBet.toString();
            sfsArray.push(room);

            sfo[this.SFSData.VARIABLES] = sfsArray;
            sfo[this.SFSData.ROOM_BET] = params.data.roomBet.toString();
            sfo[this.SFSData.MAX_USER] = params.data.maxPlayer.toString();
            sfo[this.SFSData.USER_NAME] = this.dataUser.mySelf.userName;

            var request = new SFS2X.Requests.System.ExtensionRequest(SFSEvent.QUICK_JOIN, sfo, null);
            this.sfsProxy.send(request);
        },

        onQuickJoinFail: function (bet, maxPlayer) {
            var myMoney = this.dataUser.mySelf.gold();
            var betCreate =  parseInt(this.channel.getAutoBetCreateRoom(myMoney));
            bet = (!bet || bet > betCreate)?betCreate:bet;

            var minBet = this.channel.getMinBetRateInRoom(bet);
            if(this.checkEnoughMoney(minBet)) {
                this.sendNotification(LobbyMessage.HIDE_LOADING);
                return;
            }

            var params = {};
            params.roomName = "";
            params.roomBet = bet;
            params.maxPlayer = maxPlayer;
            params.password = "";

            this.sendNotification(LobbyMessage.SEND_CREATE_ROOM, params);
        },

        onDisconnect: function () {
            this.sfsProxy.onDisconnect();
        },

        onChangeMode:function (params) {
            this.sfsProxy.onDisconnect();
        },

        onRefreshMoney:function () {
            if(this.sfsProxy === undefined || this.sfsProxy === null) return;

            var sfo = {};
            sfo[this.SFSData.COMMAND] = this.SFSData.REFRESH_MONEY;
            sfo[this.SFSData.USER_NAME] = this.dataUser.mySelf.userName;

            var room = null;
            var request = new SFS2X.Requests.System.ExtensionRequest(SFSEvent.REFRESH_MONEY, sfo, room);
            this.sfsProxy.send(request);
        }



        /*onCreateRoom: function (params) {
            this.sfsProxy.onLeaveRoom();
            var roomVar = new SFSRoomVariable("Room", 1);
            roomVar.isPrivate = false;
            roomVar.isPersistent = true;

            // Add room variable to an array
            var roomVars = [];
            roomVars.push(roomVar);
            var roomBet = new SFSRoomVariable(SFSData.ROOM_BET, params.data.roomBet);
            roomBet.isPersistent = true;
            var minBet = new SFSRoomVariable(SFSData.MIN_MONEY, this.channel.getMinBetLimitOut(params.data.roomBet));
            minBet.isPersistent = true;

            roomVars.push(roomBet);
            roomVars.push(new SFSRoomVariable(SFSData.IS_SEND_CARD, params.data.isSendCard));
            roomVars.push(new SFSRoomVariable(SFSData.ROOM_NAME, params.data.roomName));
            roomVars.push(new SFSRoomVariable(SFSData.CREATER, "tl_" + this.dataUser.mySelf.uid));
            roomVars.push(minBet);

            var date = new Date();
            var newRoomName = this.dataUser.mySelf.uid.toString() + date.getHours() + date.getMinutes() + date.getSeconds();
            var settingGame = new SFSGameSettings(newRoomName.toString());
            settingGame.password = params.data.password;
            settingGame.maxSpectators = parseInt(params.data.maxPlayer);
            settingGame.maxUsers = parseInt(params.data.maxPlayer);
            settingGame.isGame = true;
            settingGame.isPublic = true;
            settingGame.minPlayersToStartGame = 2;
            settingGame.maxVariables = 10;
            settingGame.extension = this.channel.getCurRoomExtentsion();//new RoomExtension("tlmn", "com.dtime.tlmn.game.TLMNExtension");
            settingGame.isPublic = true;
            settingGame.variables = roomVars;

            this.sfsProxy.createGame(settingGame);

            //roomVars.push(new SFSRoomVariable(SFSData.ROOM_NAME, params.data.roomName)); -> SFSData.NAME, value
            //settingGame.maxUser = parseInt(params.data.maxPlayer);
            //roomVars -> variables

        },*/

    },

    // STATIC MEMBERS
    {
        NAME: "SFSLobbyCommand"
    }
);
