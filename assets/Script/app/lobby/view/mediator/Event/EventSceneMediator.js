var BaseMediator = require('BaseMediator');
var LobbyMessage = require('LobbyMessage');
var puremvc = BaseMediator.puremvc;
var Constants = require('Constants');
var EventSceneMediator = puremvc.define
(
    // CLASS INFO
    {
        name: 'EventSceneMediator',
        parent: BaseMediator,
        constructor: function () {
            puremvc.Mediator.call(this, this.constructor.NAME);
        }
    },
    // INSTANCE MEMBERS
    {
        initialize: function () {
            this.eventProxy = this.facade.retrieveProxy('EventProxy');
            this.sendNotification(LobbyMessage.SEND_GET_EVENT_BANNER);
        },

        /** @override */
        listNotificationInterests: function () {
            return [
                LobbyMessage.SHOW_EVENT_SCENE,
                LobbyMessage.HIDE_EVENT_SCENE,
                LobbyMessage.SHOW_EVENT_FROM_BANNER,
                LobbyMessage.ON_UPDATE_DETAIL_EVENT
            ];
        },

        /** @override */
        handleNotification: function (notification) {
            var params = notification.getBody();
            switch (notification.getName()) {
                case LobbyMessage.SHOW_EVENT_SCENE:
                    this.view.resetUuTienId();
                    if(this.eventProxy.eventList.length !== 0) {
                        this.view.show();
                        return;
                    }
                    this.sendNotification(LobbyMessage.SEND_GET_ALL_CURRENT_EVENT);

                    break;

                case LobbyMessage.SHOW_EVENT_FROM_BANNER:
                    cc.log(params.operatorId);
                    this.view.setUuTienId(params.operatorId);
                    this.view.show();
                    this.sendNotification(LobbyMessage.SEND_GET_ALL_CURRENT_EVENT);
                    break;

                case LobbyMessage.HIDE_EVENT_SCENE:
                    this.view.hide();
                    break;

                case LobbyMessage.ON_UPDATE_DETAIL_EVENT:
                    this.view.onUpdateDetailEvent(params);
                    this.view.show();

                    break;
                default:
                    break;
            }
        },


        addHanlers: function () {
            this.view.activeShowRechargeFromEvent = this.activeShowRechargeFromEvent.bind(this);
            this.view.onJoinGameFromEvent = this.onJoinGameFromEvent.bind(this);
        },

        activeShowRechargeFromEvent: function () {
            this.sendNotification(LobbyMessage.SHOW_RECHARGE_SCENE);
            this.sendNotification(LobbyMessage.HIDE_EVENT_SCENE);
        },
        onJoinGameFromEvent:function(channelId){
            Constants.CURRENT_GAME = channelId;
            this.sendNotification(LobbyMessage.SEND_GET_CHANNEL_INFO, {channelId:channelId});
            this.sendNotification(LobbyMessage.HIDE_EVENT_SCENE);
        }
    },
    // STATIC MEMBERS
    {
        getInstance: function () {
            if (this.instance === null) {
                this.instance = new EventSceneMediator();
            }
            return this.instance;
        },
        instance: null,
        NAME: 'EventSceneMediator'
    }
);

module.exports = EventSceneMediator;
