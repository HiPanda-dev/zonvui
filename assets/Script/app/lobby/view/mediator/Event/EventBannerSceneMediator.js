var BaseMediator = require('BaseMediator');
var LobbyMessage = require('LobbyMessage');
var puremvc = BaseMediator.puremvc;
var EventBannerSceneMediator = puremvc.define
(
    // CLASS INFO
    {
        name: 'EventBannerSceneMediator',
        parent: BaseMediator,
        constructor: function () {
            puremvc.Mediator.call(this, this.constructor.NAME);
        }
    },
    // INSTANCE MEMBERS
    {
        initialize: function () {
            this.eventProxy = this.facade.retrieveProxy('EventProxy');
        },

        /** @override */
        listNotificationInterests: function () {
            return [
                LobbyMessage.SHOW_EVENT_BANNER_SCENE,
                LobbyMessage.HIDE_EVENT_BANNER_SCENE,
                LobbyMessage.ON_UPDATE_EVENT_BANNER
            ];
        },

        /** @override */
        handleNotification: function (notification) {
            BaseMediator.prototype.handleNotification.call(this);
            switch (notification.getName()) {
                case LobbyMessage.SHOW_EVENT_BANNER_SCENE:
                    this.view.show();
                    break;
                case LobbyMessage.ON_UPDATE_EVENT_BANNER:
                    this.view.updateEventBanner(this.eventProxy.eventBannerList);
                    break;
                case LobbyMessage.HIDE_EVENT_BANNER_SCENE:
                    this.view.hide();
                    break;
                default:
                    break;
            }
        },

        addHanlers: function () {
            this.view.onActiveEventBanner = this.onActiveEventBanner.bind(this);
        },

        onActiveEventBanner: function(operatorId){
            cc.log("onActiveEventBanner: "  + operatorId);
            this.sendNotification(LobbyMessage.SHOW_EVENT_FROM_BANNER, {operatorId: operatorId});
        }
    },
    // STATIC MEMBERS
    {
        getInstance: function () {
            if (this.instance === null) {
                this.instance = new EventBannerSceneMediator();
            }
            return this.instance;
        },
        instance: null,
        NAME: 'EventBannerSceneMediator'
    }
);

module.exports = EventBannerSceneMediator;
