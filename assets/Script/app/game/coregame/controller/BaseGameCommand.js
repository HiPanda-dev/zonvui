var BaseCommand = require('BaseCommand');
var CoreGameProxy = require('CoreGameProxy');
var UserProxy = require('UserProxy');
var SeatVO = require('SeatVO');
var SFSMessage = require('SFSMessage');
var LobbyMessage = require('LobbyMessage');
var GameMessage = require('GameMessage');
var SoundGameMessage = require('SoundGameMessage');
var puremvc = BaseCommand.puremvc;

var BaseGameCommand = puremvc.define(
    // CLASS INFO
    {
        parent: BaseCommand
    },

    // INSTANCE MEMBERS
    {
        execute: function (notification) {
            this.dataUser = this.facade.retrieveProxy(UserProxy.NAME);
            if(this.gameProxy === undefined){
                this.gameProxy = this.facade.retrieveProxy(CoreGameProxy.NAME);
            }
        },

        updateVtPlayer: function (vtPlayer/*Vector.<UserVO>*/) {
            var table = this.gameProxy.getTable();
            for (var i = 0; i < vtPlayer.length; i++) {
                var player = vtPlayer[i];
                if (player) {
                    var seatId = table.getSeatIdFormPosition(player.position);
                    var seat = this.gameProxy.getSeatBySeatId(seatId);
                    if (seat && seat.status !== SeatVO.BLOCK) {
                        seat.user = player;
                        seat.status = player.status;
                        seat.cards = (player.cards) ? player.cards : [];
                        seat.cardNrReminder = player.cardNrReminder;

                        this.updateMoreInfoForSeat(seat, player, table);

                        if (player.isViewer) seat.status = SeatVO.WAITING;
                        this.gameProxy.addSeat(seat);
                    }
                }
                this.dataUser.addUser(player);
            }
        },

        updateMoreInfoForSeat: function (seat, player, table) {

        },

        registerCommand: function (notificationName, commandClassRef, notClean) {
            if (!this.facade.hasCommand(notificationName)) {
                if (!notClean) this.gameProxy.commandList.push(notificationName);
                this.facade.registerCommand(notificationName, commandClassRef);
            }
        },

        registerProxy: function (proxy) {
            if (!this.facade.hasProxy(proxy.proxyName)) {
                this.gameProxy.proxyList.push(proxy);
                this.facade.registerProxy(proxy);
            }
        },

        registerMediator: function (mediator) {
            if (!this.facade.hasMediator(mediator.mediatorName)) {
                this.gameProxy.mediatorList.push(mediator.mediatorName);
                this.facade.registerMediator(mediator);
            }
        },

        removeAllCommand: function () {
            for (var i = 0; i < this.gameProxy.commandList.length; i++) {
                var notificationName = this.gameProxy.commandList[i];
                this.facade.removeCommand(notificationName);
            }
            this.gameProxy.commandList = [];
        },

        removeCommand: function (notificationName) {
            for (var i = 0; i < this.gameProxy.commandList.length; i++) {
                if(notificationName === this.gameProxy.commandList[i]){
                    this.facade.removeCommand(notificationName);
                    this.gameProxy.commandList.splice(i, 1);
                    break;
                }
            }
        },

        removeAllProxy: function () {
            for (var i = 0; i < this.gameProxy.proxyList.length; i++) {
                var proxy = this.gameProxy.proxyList[i];
                this.facade.removeProxy(proxy.proxyName);
            }
            this.gameProxy.proxyList = [];
        },

        removeAllMediator: function () {
            for (var i = 0; i < this.gameProxy.mediatorList.length; i++) {
                var mediatorName = this.gameProxy.mediatorList[i];
                this.facade.removeMediator(mediatorName);
            }
            this.gameProxy.mediatorList = [];
        },

        onLeaveGame: function () {
            this.removeAllCommand();
            this.sendNotification(GameMessage.ON_HIDE_GAME);
            this.sendNotification(LobbyMessage.HIDE_CHAT_GAME_SCENE);
            this.sendNotification(LobbyMessage.SHOW_LOBBY);
            this.sendNotification(LobbyMessage.SHOW_TOP_MENU);
            this.sendNotification(LobbyMessage.SHOW_BOTTOM_MENU);
            this.sendNotification(LobbyMessage.SHOW_CHANNEL_SCENE);
            this.sendNotification(LobbyMessage.HIDE_SELECT_GAME_SCENE);
            this.sendNotification(LobbyMessage.HIDE_EVENT_BANNER_SCENE);
            this.sendNotification(LobbyMessage.PLAY_BACKGROUND_MUSIC, {soundName: SoundGameMessage.LOBBY_SOUND, volume: 1});

            this.facade.registerCommand(SFSMessage.DESTROY_GAME_NETWORK, require('SFSDestroyGameCommand'));
            this.sendNotification(SFSMessage.DESTROY_GAME_NETWORK);
            this.facade.removeCommand(SFSMessage.DESTROY_GAME_NETWORK);
        },

        onCheckLeaveGame: function (isLeave) {
            if (!isLeave) return;

            TweenLite.delayedCall(1, function () {
                var userName = this.dataUser.mySelf.id;
                this.sendNotification(GameMessage.RECEIVE_LEAVE_GAME, {userIdLeave: userName});
            }.bind(this));

        },

        showWarning: function (warn) {
            switch (warn) {
                case BaseGameCommand.WARNING.THE_TABLE_DOES_NOT_EXIST:
                    cc.warn("bàn chơi không tồn tại!!!");
                    break;
                case BaseGameCommand.WARNING.THE_SEAT_DOES_NOT_EXIST:
                    cc.warn("Không tồn tại ghế này!!!");
                    break;
                case BaseGameCommand.WARNING.SIT_DOWN_IS_TRUE:
                    cc.warn("user đã đăng kí chỗ ngồi này!!!");
                    break;
                case BaseGameCommand.WARNING.NOT_ENOUGH_MONEY:
                    cc.warn("không đủ tiền để chơi tiếp!!!");
                    break;
                case BaseGameCommand.WARNING.THE_SEAT_HAS_PLAYER:
                    cc.warn("Ghế đã có người ngồi!!!");
                    break;
                case BaseGameCommand.WARNING.DONT_HAS_USER_IN_LISTVIEW:
                    cc.warn("Không có user này trong listview!!!");
                    break;
                case BaseGameCommand.WARNING.PLAYER_IS_NOT_OWNER:
                    cc.warn("User không phải là chủ bàn!!!");
                    break;
                case BaseGameCommand.WARNING.NOT_ENOUNGH_TOTAL_PLAYER:
                    cc.warn("Không đủ số lượng người chơi!!!");
                    break;
                case BaseGameCommand.WARNING.TABLE_IS_PLAYING:
                    cc.warn("Bàn đang chơi!!!");
                    break;
                case BaseGameCommand.WARNING.PLAYER_NOT_SITTING:
                    cc.warn("Người chơi không ngồi trên ghế!!!");
                    break;
                case BaseGameCommand.WARNING.TABLE_DOES_NOT_PLAYING:
                    cc.warn("Bàn chưa chơi!!!");
                    break;
                case BaseGameCommand.WARNING.PLAYER_NOT_TURN:
                    cc.warn("không phải lượt đánh của người chơi!!!");
                    break;
                case BaseGameCommand.WARNING.PLAYER_SEND_PLACE_CARDS_IS_TRUE:
                    cc.warn("Người chơi đã đánh bài rồi (TH nháy 2 lần)!!!");
                    break;
                case BaseGameCommand.WARNING.THE_CARDS_DOES_NOT_EXIST:
                    cc.warn("Không có bài!!!");
                    break;
            }
        },

        resetUserViewState:function () {
            var tableVO = this.gameProxy.getTable();
            for (var i = 0; i < tableVO.seats.length; i++) {
                var seat = tableVO.seats[i];
                if(!seat || !seat.user) continue;
                seat.user.isViewer = false;
            }
            this.sendNotification(GameMessage.ON_UPDATE_USER_VIEW_STATE);
        },

        onSendQueueMsg: function () {
            var queueMsg = this.gameProxy.queueMsg;
            for (var i = 0; i < queueMsg.length; i++) {
                var params = queueMsg[i];
                this.sendNotification(SFSMessage.REPONSE_NETWORK, params);
            }

            this.gameProxy.queueMsg = [];
        }
    },

    // STATIC MEMBERS
    {
        NAME: "BaseGameCommand",

        WARNING: {
            THE_TABLE_DOES_NOT_EXIST: "THE_TABLE_DOES_NOT_EXIST",
            THE_SEAT_HAS_PLAYER: "THE_SEAT_HAS_PLAYER",
            SIT_DOWN_IS_TRUE: "SIT_DOWN_IS_TRUE",
            NOT_ENOUGH_MONEY: "NOT_ENOUGH_MONEY",
            DONT_HAS_USER_IN_LISTVIEW: "DONT_HAS_USER_IN_LISTVIEW",
            PLAYER_IS_NOT_OWNER: "PLAYER_IS_NOT_OWNER",
            NOT_ENOUNGH_TOTAL_PLAYER: "NOT_ENOUNGH_TOTAL_PLAYER",
            TABLE_IS_PLAYING: "TABLE_IS_PLAYING",
            PLAYER_NOT_SITTING: "PLAYER_NOT_SITTING",
            THE_SEAT_DOES_NOT_EXIST: "THE_SEAT_DOES_NOT_EXIST",
            TABLE_DOES_NOT_PLAYING: "TABLE_DOES_NOT_PLAYING",
            PLAYER_NOT_TURN: "PLAYER_NOT_TURN",
            PLAYER_SEND_PLACE_CARDS_IS_TRUE: "PLAYER_SEND_PLACE_CARDS_IS_TRUE",
            THE_CARDS_DOES_NOT_EXIST: "THE_CARDS_DOES_NOT_EXIST"
        }
    }
);

module.exports = BaseGameCommand;
