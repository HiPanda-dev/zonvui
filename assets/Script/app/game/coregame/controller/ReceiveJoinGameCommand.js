var BaseCommand = require('BaseCommand');
var BaseGameCommand = require('BaseGameCommand');
var RulesVO = require('RulesVO');
var SeatVO = require('SeatVO');
var GameMessage = require('GameMessage');
var LobbyMessage = require('LobbyMessage');
var ChannelProxy = require('ChannelProxy');
var GameConfig = require('GameConfig');
var Constants = require('Constants');
var LocalStorage = require('LocalStorage');

var puremvc = BaseCommand.puremvc;

module.exports = puremvc.define(
    // CLASS INFO
    {
        parent: BaseGameCommand
    },

    // INSTANCE MEMBERS
    {
        execute: function (notification) {
            BaseGameCommand.prototype.execute.call(this, notification);
            var channelProxy = this.facade.retrieveProxy(ChannelProxy.NAME);

            var body = notification.getBody();
            var gameRoom = body.gameRoom;
            var vtPlayer = body.vtPlayer;

            var mySelf = this.dataUser.mySelf;
            var tableVO = this.gameProxy.getTable();
            var rules = new RulesVO();
            tableVO.reset();

            tableVO.id = gameRoom.id;
            tableVO.name = gameRoom.name;
            tableVO.channelName = channelProxy.getChannelName();
            tableVO.isPlaying = gameRoom.isPlaying;
            tableVO.curTurn = body.curTurn;
            tableVO.password = gameRoom.password;
            tableVO.myGold = mySelf.gold();
            tableVO.myId = mySelf.id;
            tableVO.myPosition = mySelf.position;
            tableVO.seatId = 1;
            tableVO.gameState = gameRoom.gameState;
            tableVO.isSystem = gameRoom.isSystem;
            tableVO.regQuit = body.regQuit;
            mySelf.seatId = 1;


            rules.bet = gameRoom.stake;
            rules.maxPlayer = gameRoom.maxPlayer;

            this.gameProxy.updateRules(rules);
            this.gameProxy.updateBoundBuyInMoney();
            this.updateVtPlayer(vtPlayer);
            this.updateCurGameProperties(body);
            this.loadGame();
        },

        loadGame: function () {
            var mySelf = this.dataUser.mySelf;
            this.sendNotification(LobbyMessage.SHOW_LOADING);
            if (!this.gameProxy.isLoadDone) {
                cc.director.loadScene(GameConfig.CURRENT_SCENE, function (err, data) {
                    this.sendNotification(LobbyMessage.HIDE_LOADING);
                    LocalStorage.setIsReconnect(true);
                }.bind(this));
            } else {
                this.sendNotification(GameMessage.ON_SHOW_GAME);
                this.sendNotification(GameMessage.ON_UPDATE_GAME_STATE);
                this.sendNotification(GameMessage.ON_UPDATE_USER_VIEW_STATE);
                this.sendNotification(LobbyMessage.HIDE_LOBBY);
                var tableVO = this.gameProxy.getTable();

                for (var i = 0; i < tableVO.seats.length; i++) {
                    var seat = tableVO.seats[i];
                    if (!seat) continue;
                    if (seat.user && seat.status !== SeatVO.BLANK) {
                        this.sendNotification(GameMessage.ON_SIT_DOWN, {seatId: seat.id, user: seat.user});
                        if(seat.user.uid === mySelf.uid){
                            LocalStorage.setIsReconnect(Constants.CURRENT_GAME);
                        }
                    }
                    if (tableVO.isPlaying && seat.cards.length !== 0) {
                        this.sendNotification(GameMessage.ON_SHOW_CARDS, {seatId: seat.id, cards: seat.cards});
                    }
                }

                this.onSendQueueMsg();
                this.sendNotification(LobbyMessage.HIDE_LOADING);
                LocalStorage.setIsReconnect(true);
            }

        },


        /**
         * update thuộc tính riêng cho từng game
         * @param params
         */
        updateCurGameProperties: function (params) {

        }

    },

    // STATIC MEMBERS
    {
        NAME: "ReceiveJoinGameCommand"
    }
);
