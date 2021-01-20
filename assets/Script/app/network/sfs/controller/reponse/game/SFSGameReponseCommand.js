var BaseCommand = require('BaseCommand');
var GameMessage = require('GameMessage');
var UserProxy = require('UserProxy');
var CoreGameProxy = require('CoreGameProxy');
var UserVO = require('UserVO');
var SeatVO = require('SeatVO');
var SFSEvent = require('SFSEvent');
var Utility = require('Utility');
var LobbyMessage = require('LobbyMessage');

var puremvc = BaseCommand.puremvc;

module.exports = puremvc.define(
    // CLASS INFO
    {
        parent: BaseCommand
    },

    // INSTANCE MEMBERS
    {
        SFSBaseData: {
            UID: 'uid',
            USER_NAME: 'userName',
            USER_INFO: 'userInfo',
            PLAYER_LIST: 'playerList',
            ROOM_BET: 'roomBet',
            RB: 'rb',
            IS_SYSTEM: 'isSystem',
            CURRENT_CARD_GROUP: 'currentCardGroup',
            CURRENT_TURN: 'currentTurn',
            TIME_LEFT: 'timeLeft',
            MONEY: 'money',
            GAME_STATE: 'gameState',
            POSITION: 'position',
            PLAYER_CARDS: 'playerCards',
            PLUS_NAME: 'plusName',
            SUB_NAME: 'subName',
            PLUS_MONEY: 'plusMoney',
            SUB_MONEY: 'subMoney',
            TIME_PASS: 'timePass',
            REG_QUIT: 'regQuit',
            SUCCESS: 'success',
            // RANDOM_CARD_LIST: 'randomCardList'
        },

        execute: function (notification) {
            var params = notification.getBody();
            this.dataUser = this.facade.retrieveProxy(UserProxy.NAME);
            this.gameProxy = this.facade.retrieveProxy(CoreGameProxy.NAME);
            this.tableVO = this.gameProxy.getTable();
            this.sfsProxy = this.facade.retrieveProxy('SFSGameProxy');

            switch (params.cmd) {
                case SFSEvent.UPDATE_ROOM_MASTER:
                    this.onUpdateOwnerId(params);
                    break;
                case SFSEvent.UPDATE_CURRENT_TURN:
                    this.onUpdateCurTurn(params);
                    break;
                case SFSEvent.GET_PLAYING_INFO: //done
                    this.onJoinGame(params);
                    break;
                case SFSEvent.USER_JOIN_ROOM: //thằng khác vào game
                    this.onUserJoinGame(params);
                    break;
                case SFSEvent.UPDATE_GAME_ROOM_DATA:
                    this.onUpdateGameRoomData(params);
                    break;
                case SFSEvent.UPDATE_USER_LIST:
                    this.onUpdateUserList(params.body.user);
                    break;
                case SFSEvent.USER_LEAVE_GAME:
                    this.onUserLeaveGame(params);
                    break;
                case SFSEvent.COUNT_DOWN:
                    this.onCountDownStartGame(params);
                    break;
                case SFSEvent.START_GAME:
                    this.onStartGame(params);
                    break;
                case SFSEvent.DEAL_CARD:
                    this.onStartGame(params);
                    this.onDealCards(params);
                    break;
                case SFSEvent.UPDATE_USER_INFO:
                    this.onUpdateUserInfo(params);
                    break;
                case SFSEvent.UPDATE_MONEY:
                    this.onUpdateMoney(params);
                    break;
                case SFSEvent.SIT_DOWN:
                    this.onSitDown(params);
                    break;
                case SFSEvent.PUBLIC_CHAT:
                    this.onUpdateChat(params);
                    break;
                case SFSEvent.REGISTER_QUIT:
                    this.onRegisterQuit(params);
                    break;
                case SFSEvent.CANCEL_REGISTER_QUIT:
                    this.onCancelRegisterQuit(params);
                    break;
            }
        },

        onRegisterQuit: function (params) {
            var sfo = params.params;
            var userName = sfo[this.SFSBaseData.USER_NAME];
            var user = this.dataUser.getUserByUserName(userName);
            this.sendNotification(GameMessage.RECEIVE_REGISTER_QUIT, {userId: user.uid, isQuit: true});
        },

        onCancelRegisterQuit: function (params) {
            var sfo = params.params;
            var userName = sfo[this.SFSBaseData.USER_NAME];
            var user = this.dataUser.getUserByUserName(userName);
            this.sendNotification(GameMessage.RECEIVE_REGISTER_QUIT, {userId: user.uid, isQuit: false});
        },

        onUpdateChat: function (evtParams) {
            var seat = this.tableVO.getSeatByUserId(evtParams.userName);
            var data = {
                seatId: seat.id,
                chatContent: evtParams.message,
                chatType: evtParams.type
            };
            this.sendNotification(GameMessage.ON_SHOW_CHAT_GAME_CONTENT, data);
        },

        onUpdateGameRoomData: function (params) {
            var room = params.body.room;
            var gameRoom = {};
            gameRoom.id = room.id;
            gameRoom.name = room.name;
            gameRoom.password = (room.isPasswordProtected) ? '1' : '0';
            gameRoom.stake = (room.getVariable(this.SFSBaseData.ROOM_BET)) ? room.getVariable(this.SFSBaseData.ROOM_BET).value : gameRoom.stake;
            gameRoom.stake = (room.getVariable(this.SFSBaseData.RB)) ? room.getVariable(this.SFSBaseData.RB).value : gameRoom.stake;
            gameRoom.maxPlayer = room.maxUsers;
            gameRoom.isSystem = room.getVariable(this.SFSBaseData.IS_SYSTEM);

            var vtPlayer = [];
            var playerList = room.getUserList();
            for (var key in playerList) {
                var sfsUserInfo = playerList[key].getVariable(this.SFSBaseData.USER_INFO).value;
                var playerInfo = Utility.convertSFSObjectToObject(sfsUserInfo);
                var user = this.dataUser.getUserById(playerInfo.uid);
                if (!user) {
                    user = new UserVO();
                    user.updateData(playerInfo);
                    this.dataUser.addUser(user);
                } else {
                    user.updateData(playerInfo);
                }
                this.dataUser.adPrefixUser(user);
                vtPlayer.push(user);
            }

            var data = {
                gameRoom: gameRoom,
                vtPlayer: vtPlayer,
                curTurn: -1
            };
            this.gameProxy.gameRoom = data;
        },

        onJoinGame: function (params) {
            var sfo = params.params;
            var sfoRoom = params.room;

            var playerList = sfo[this.SFSBaseData.PLAYER_LIST];
            var status = sfo[this.SFSBaseData.GAME_STATE];
            var vtPlayer = this.gameProxy.gameRoom.vtPlayer;
            if (playerList) {
                for (var i = 0; i < playerList.length; i++) {
                    var playerInfo = Utility.convertSFSObjectToObject(playerList[i]);
                    var user = this.dataUser.getUserByUserName(playerInfo.userName);
                    if (!user) {
                        user = new UserVO();
                        this.dataUser.addUser(user);
                    }
                    playerInfo.seatId = playerInfo.position + 1;
                    user.updateData(playerInfo);
                    user.status = status;
                    user.position = (playerInfo.position === undefined || playerInfo.position === null) ? -1 : playerInfo.position;
                    user.cards = this.convertCardInCurrentGame(playerInfo.cards);
                    user.isViewer = (status !== SeatVO.WAITING) ? user.isViewer : false;
                    this.dataUser.adPrefixUser(user);
                    var sfoUser = sfoRoom.getUserByName(playerInfo.userName);
                    if (sfoUser) {
                        user.money = parseInt(sfoUser.getVariable(this.SFSBaseData.MONEY).value);
                    }

                    if (!this.checkHasIdVtPlayer(user.uid, vtPlayer)) {
                        vtPlayer.push(user);
                    }
                }
            }

            this.updateMoreInfoJoinGame(params);

            var timePass = sfo[this.SFSBaseData.TIME_PASS];
            var currentTurn = sfo[this.SFSBaseData.CURRENT_TURN];
            currentTurn = (currentTurn === undefined || currentTurn === null || currentTurn === "") ? -1 : this.dataUser.getUserByUserName(currentTurn).uid;

            this.gameProxy.gameRoom.gameRoom.isPlaying = (status !== SeatVO.WAITING) ? true : false;
            this.gameProxy.gameRoom.gameRoom.cardsPlace = sfo[this.SFSBaseData.CURRENT_CARD_GROUP];
            this.gameProxy.gameRoom.gameRoom.gameState = status;
            this.gameProxy.gameRoom.curTurn = currentTurn;
            this.gameProxy.gameRoom.timePass = (timePass) ? timePass : 0;
            this.gameProxy.gameRoom.regQuit = sfo[this.SFSBaseData.REG_QUIT];

            this.sendNotification(GameMessage.RECEIVE_JOIN_GAME, this.gameProxy.gameRoom);
        },

        updateMoreInfoJoinGame: function (params) {

        },

        convertCardInCurrentGame: function (cards) {
            return cards;
        },

        onUpdateUserList: function (params) {
            var playerInfo = Utility.convertSFSObjectToObject(params.getVariable(this.SFSBaseData.USER_INFO).value);
            var user = this.dataUser.getUserById(playerInfo.uid);
            playerInfo.money = params.getVariable(this.SFSBaseData.MONEY).value;
            if (!user) {
                user = new UserVO();
                user.updateData(playerInfo);
                this.dataUser.addUser(user);
                this.dataUser.adPrefixUser(user);
            } else {
                user.updateData(playerInfo);
                this.dataUser.adPrefixUser(user);
            }
        },

        onUserJoinGame: function (params) {
            var sfo = params.params;
            var userName = sfo[this.SFSBaseData.USER_NAME];
            var user = this.dataUser.getUserByUserName(userName);
            if (user.uid === this.dataUser.mySelf.uid) {
                return;
            }

            var position = sfo[this.SFSBaseData.POSITION];

            var vtPlayer = this.gameProxy.gameRoom.vtPlayer;
            var hasUser = false;
            for (var i = 0; i < vtPlayer.length; i++) {
                if (vtPlayer[i].uid === user.uid) {
                    vtPlayer[i] = user;
                    hasUser = true;
                }
            }

            if (!hasUser) vtPlayer.push(user);
            user.position = position;

            this.sendNotification(GameMessage.RECEIVE_USER_JOIN_GAME, {user: user});
        },

        onUpdateOwnerId: function (params) {
            var ownerId = params.params.roomMaster;
            this.sendNotification(GameMessage.RECEIVE_CHANGE_OWNER, {ownerId: ownerId});
        },

        onUserLeaveGame: function (params) {
            var userName = params.params[this.SFSBaseData.USER_NAME];
            var user = this.dataUser.getUserByUserName(userName);
            if (user.uid === this.dataUser.mySelf.uid) {
                this.sfsProxy.stopPingToServer();
                //this.sfsProxy.onLeaveRoom();
            }

            this.sendNotification(GameMessage.RECEIVE_LEAVE_GAME, {userIdLeave: user.uid});


        },

        onCountDownStartGame: function (params) {
            var timeLeft = params.params[this.SFSBaseData.TIME_LEFT];
            this.sendNotification(GameMessage.RECEIVE_COUNT_DOWN_START_GAME, {timeLeft: timeLeft});
        },

        onStartGame: function (params) {
            this.sendNotification(GameMessage.RECEIVE_START_GAME);
        },

        onDealCards: function (params) {
            var sfo = params.params;
            var arrCard = sfo[this.SFSBaseData.PLAYER_CARDS];
            var curTurn = sfo[this.SFSBaseData.CURRENT_TURN];
            var playerList = sfo[this.SFSBaseData.PLAYER_LIST];
            var randomCardList = sfo[this.SFSBaseData.RANDOM_CARD_LIST];
            var userIdList = [];
            var uid, randomCard, arrCardList = [];
            curTurn = this.dataUser.getUserByUserName(curTurn).uid;
            for (var i = 0; i < playerList.length; i++) {
                uid = this.dataUser.getUserByUserName(playerList[i]).uid;
                userIdList.push(uid);
            }

            // mảng cac quân bài random để chia lượt đánh trước
            // for (i = 0; i < randomCardList.length; i++) {
            //     var obj = Utility.convertSFSObjectToObject(randomCardList[i]);
            //     uid = this.dataUser.getUserByUserName(obj.userName).uid;
            //     randomCard = obj.randomCard;
            //     arrCardList.push({
            //         uid: uid,
            //         randomCard: randomCard
            //     });
            // }

            this.sendNotification(GameMessage.RECEIVE_DEAL_CARDS, {
                arrCard: arrCard,
                curTurn: curTurn,
                playerList: userIdList,
                //randomCardList: arrCardList
            });
        },

        onUpdateCurTurn: function (params) {
            var curTurn = params.params[this.SFSBaseData.CURRENT_TURN];
            curTurn = this.dataUser.getUserByUserName(curTurn).uid;
            this.sendNotification(GameMessage.RECEIVE_UPDATE_CURRENT_TURN, {curTurn: curTurn});
        },

        onUpdateUserInfo: function (params) {
            var sfsUser = params.body.user.getVariable(this.SFSBaseData.USER_INFO);
            var sfsMoney = params.body.user.getVariable(this.SFSBaseData.MONEY);
            var playerInfo = Utility.convertSFSObjectToObject(sfsUser.value);
            playerInfo.money = (sfsMoney) ? sfsMoney.value : playerInfo.money;
            var user = this.dataUser.getUserByUserName(playerInfo.userName);
            if (!user) {
                user = new UserVO();
                this.dataUser.addUser(user);
            }
            user.updateData(playerInfo);

            this.sendNotification(GameMessage.RECEIVE_UPDATE_USER_INFO, {user: user});
        },

        onSitDown: function (params) {

        },

        /**
         *
         * @param params
         * @returns {boolean}
         * true: -> queue
         * false-> not queue
         */
        checkQueueMesseage: function (params) {
            var gameProxy = this.facade.retrieveProxy(CoreGameProxy.NAME);
            switch (params.cmd) {
                case SFSEvent.UPDATE_GAME_ROOM_DATA:
                case SFSEvent.GET_PLAYING_INFO:
                case SFSEvent.GET_PLAYING_INFO_XD:
                    return false;
                    break;
            }

            if (gameProxy && gameProxy.isLoadDone) {
                return false;
            } else {
                gameProxy.queueMsg.push(params);
                return true;
            }
        },

        onUpdateMoney: function (params) {
            var sfo = params.params;
            var plusName = sfo[this.SFSBaseData.PLUS_NAME];
            var subName = sfo[this.SFSBaseData.SUB_NAME];
            var data = {
                plusName: this.dataUser.getUserByUserName(plusName).uid,
                plusMoney: sfo[this.SFSBaseData.PLUS_MONEY],
                subName: this.dataUser.getUserByUserName(subName).uid,
                subMoney: sfo[this.SFSBaseData.SUB_MONEY]
            };

            this.sendNotification(GameMessage.RECEIVE_UPDATE_MONEY, data);
        },

        checkHasIdVtPlayer: function (uid, vtPlayer) {
            for (var i = 0; i < vtPlayer.length; i++) {
                if (vtPlayer[i].uid === uid) return true;
            }
            return false;
        }
    },

    // STATIC MEMBERS
    {
        NAME: 'SFSGameReponseCommand'
    }
);
