var BaseMediator = require('BaseMediator');
var LobbyMessage = require('LobbyMessage');
var Constants = require('Constants');
var ChannelProxy = require('ChannelProxy');
var puremvc = BaseMediator.puremvc;
var ChannelSceneMediator = puremvc.define
(
    // CLASS INFO
    {
        name: 'ChannelSceneMediator',
        parent: BaseMediator,
        constructor: function () {
            puremvc.Mediator.call(this, this.constructor.NAME);
        }
    },
    // INSTANCE MEMBERS
    {
        initialize: function () {
            this.channelProxy = this.facade.retrieveProxy("ChannelProxy");
            this.roomProxy = this.facade.retrieveProxy('RoomProxy');
            this.userProxy = this.facade.retrieveProxy('UserProxy');
            this.configProxy = this.facade.retrieveProxy('ConfigProxy');
        },

        /** @override */
        listNotificationInterests: function () {
            return [
                LobbyMessage.SHOW_CHANNEL_SCENE,
                LobbyMessage.HIDE_CHANNEL_SCENE,
                LobbyMessage.HIDE_TOP_PLAYER,
                LobbyMessage.ON_UPDATE_ROOM_LIST,
                LobbyMessage.ON_UPDATE_RANKING,
                LobbyMessage.ON_UPDATE_MY_INFO,
            ];
        },

        /** @override */
        handleNotification: function (notification) {
            if (this.view === undefined) return;
            var data = notification.getBody();
            switch (notification.getName()) {
                case LobbyMessage.SHOW_CHANNEL_SCENE:
                    // Constants.CURRENT_SCENE = Constants.GAME_CHANNEL;
                    this.view.show(this.channelProxy.zoneName);
                    this.view.setupData(this.channelProxy.channelList[0].childChannel);
                    this.view.onUpdateSortListBet(this.channelProxy.getSortListBet());
                    this.view.onUpdateLimitIn(this.channelProxy.getCurrentLimitIn());
                    this.view.onUpdateMySelf(this.userProxy.mySelf);
                    this.view.onUpdateSelectTableType(this.configProxy.getSelectType());
                    break;
                case LobbyMessage.HIDE_CHANNEL_SCENE:
                    this.view.hide();
                    break;
                case LobbyMessage.HIDE_TOP_PLAYER:
                    this.activeShowChat();
                    break;
                case LobbyMessage.ON_UPDATE_ROOM_LIST:
                    this.view.onUpdateRoomList(this.roomProxy);
                    break;
                case LobbyMessage.ON_UPDATE_RANKING:
                    this.view.onUpdateRanking(data);
                    break;
                case LobbyMessage.ON_UPDATE_MY_INFO:
                    this.view.onUpdateMySelf(this.userProxy.mySelf);
                    break;

                default:
                    break;
            }
        },

        addHanlers: function () {
            this.view.activeShowCreateRoomPopup = this.activeShowCreateRoomPopup.bind(this);
            this.view.activeGotoChannel = this.activeGotoChannel.bind(this);
            this.view.activeJoinGame = this.activeJoinGame.bind(this);
            this.view.activeQuickJoinGame = this.activeQuickJoinGame.bind(this);
            this.view.activeQuickJoinGameWithBet = this.activeQuickJoinGameWithBet.bind(this);
            this.view.activeChooseMoneyMode = this.activeChooseMoneyMode.bind(this);
            this.view.activeChooseChipMode = this.activeChooseChipMode.bind(this);
            this.view.activeListJackpot = this.activeListJackpot.bind(this);
            this.view.activeShowChat = this.activeShowChat.bind(this);
            this.view.activeHideChat = this.activeHideChat.bind(this);
        },

        activeGotoChannel:function (channelId) {
            this.channelProxy = this.facade.retrieveProxy("ChannelProxy");
            if(channelId !== this.channelProxy.curChannelId){
                this.sendNotification(LobbyMessage.SEND_JOIN_CHANNEL,{channelId:channelId});
            }
        },

        activeShowCreateRoomPopup:function () {
            var minBet = this.channelProxy.getListBetCreateTable()[0];
            if(this.checkEnoughMoney(minBet)) return;
            this.sendNotification(LobbyMessage.SHOW_CREATE_ROOM_POPUP);
        },

        activeJoinGame:function (tableId, pass, roomBet) {
            this.sendNotification(LobbyMessage.SEND_JOIN_GAME,{tableId:tableId, pass:pass, roomBet:roomBet});
        },

        activeQuickJoinGame:function () {
            this.sendNotification(LobbyMessage.SEND_QUICK_JOIN_GAME,{roomBet:-1});
        },

        activeQuickJoinGameWithBet:function (bet) {
            this.sendNotification(LobbyMessage.SEND_QUICK_JOIN_GAME,{roomBet:bet});
        },

        activeChooseMoneyMode:function () {
            this.sendNotification(LobbyMessage.SEND_CHANGE_MODE_GAME,{mode:ChannelProxy.MONEY_MODE});
        },

        activeChooseChipMode:function () {
            this.sendNotification(LobbyMessage.SEND_CHANGE_MODE_GAME,{mode:ChannelProxy.CHIP_MODE});
        },

        activeListJackpot: function(){
            cc.log("mediator: " + "onSelectJackpot");
            var userProxy = this.facade.retrieveProxy('UserProxy');
            if(userProxy.mySelf.id === ""){
                return;
            }
            this.sendNotification(LobbyMessage.SEND_SHOW_HIDE_JACKPOT);
        },

        activeShowChat:function () {
            this.sendNotification(LobbyMessage.SHOW_CHAT_SCENE);
        },

        activeHideChat:function () {
            this.sendNotification(LobbyMessage.HIDE_CHAT_SCENE);
        }

    },
    // STATIC MEMBERS
    {
        getInstance: function () {
            if (this.instance === null) {
                this.instance = new ChannelSceneMediator();
            }
            return this.instance;
        },
        instance: null,
        NAME: 'ChannelSceneMediator'
    }
);

module.exports = ChannelSceneMediator;
