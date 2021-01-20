var BaseMediator = require('BaseMediator');
var LobbyMessage = require('LobbyMessage');
var puremvc = BaseMediator.puremvc;
var BottomMenuSceneMediator = puremvc.define
(
    // CLASS INFO
    {
        name: 'BottomMenuSceneMediator',
        parent: BaseMediator,
        constructor: function () {
            puremvc.Mediator.call(this, this.constructor.NAME);
        }
    },
    // INSTANCE MEMBERS
    {
        initialize: function () {
        },

        /** @override */
        listNotificationInterests: function () {
            return [
                LobbyMessage.SHOW_BOTTOM_MENU,
                LobbyMessage.HIDE_BOTTOM_MENU
            ];
        },

        /** @override */
        handleNotification: function (notification) {
            switch (notification.getName()) {
                case LobbyMessage.SHOW_BOTTOM_MENU:
                    this.view.show();
                    break;
                case LobbyMessage.HIDE_BOTTOM_MENU:
                    this.view.hide();
                    break;
                default:
                    break;
            }
        },

        addHanlers: function () {
            this.view.activeShowShop = this.activeShowShop.bind(this);
            this.view.activeShowEvent = this.activeShowEvent.bind(this);
            this.view.activeShowRecharge = this.activeShowRecharge.bind(this);
            this.view.activeShowRechargeGold = this.activeShowRechargeGold.bind(this);
        },

        activeShowRecharge:function () {
            this.sendNotification(LobbyMessage.SHOW_RECHARGE_SCENE);
        },

        activeShowRechargeGold:function () {
            this.sendNotification(LobbyMessage.SHOW_RECHARGE_SCENE);
        },

        activeShowShop:function () {
            this.sendNotification(LobbyMessage.SHOW_SHOP_SCENE);
        },

        activeShowEvent:function () {
            this.sendNotification(LobbyMessage.SHOW_EVENT_SCENE);
        }
    },
    // STATIC MEMBERS
    {
        getInstance: function () {
            if (this.instance === null) {
                this.instance = new BottomMenuSceneMediator();
            }
            return this.instance;
        },
        instance: null,
        NAME: 'BottomMenuSceneMediator'
    }
);

module.exports = BottomMenuSceneMediator;
