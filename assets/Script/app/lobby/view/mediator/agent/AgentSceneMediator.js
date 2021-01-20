var BaseMediator = require('BaseMediator');
var LobbyMessage = require('LobbyMessage');
var CustomAction = require('CustomAction');
var puremvc = BaseMediator.puremvc;
var AgentSceneMediator = puremvc.define
(
    // CLASS INFO
    {
        name: 'AgentSceneMediator',
        parent: BaseMediator,
        constructor: function () {
            puremvc.Mediator.call(this, this.constructor.NAME);
        }
    },
    // INSTANCE MEMBERS
    {
        initialize: function () {
            this.agentProxy = this.facade.retrieveProxy('AgentProxy');
        },

        /** @override */
        listNotificationInterests: function () {
            return [
                LobbyMessage.SHOW_AGENT_SCENE,
                LobbyMessage.HIDE_AGENT_SCENE,
                LobbyMessage.ON_UPDATE_AGENT_INFO_LIST
            ];
        },

        /** @override */
        handleNotification: function (notification) {
            switch (notification.getName()) {
                case LobbyMessage.SHOW_AGENT_SCENE:
                    this.sendNotification(LobbyMessage.SEND_GET_AGENT_INFO);
                    this.view.show();
                    break;
                case LobbyMessage.HIDE_AGENT_SCENE:
                    this.view.hide();
                    break;
                case LobbyMessage.ON_UPDATE_AGENT_INFO_LIST:
                    this.view.onUpdateAgentInfoList(this.agentProxy.listAgent);
                    break;
                default:
                    break;
            }
        },

        addHanlers: function () {
            this.view.activeTransferdesGoldAgent = this.activeTransferdesGoldAgent.bind(this);
            this.view.activeBack = this.activeBack.bind(this);
        },

        activeTransferdesGoldAgent:function (params) {
            if (!this.isLogin("C0052")) {
                return;
            }

            this.sendNotification(LobbyMessage.SHOW_SHOP_SCENE);
            this.sendNotification(LobbyMessage.SHOW_TAB_IN_SHOP_SCENE, {tabId:CustomAction.ACTION_SHOP_TRANSFEDERS});
            this.sendNotification(LobbyMessage.HIDE_AGENT_SCENE);
        },

        activeBack:function () {
            this.sendNotification(LobbyMessage.SHOW_SHOP_SCENE);
        }
    },
    // STATIC MEMBERS
    {
        getInstance: function () {
            if (this.instance === null) {
                this.instance = new AgentSceneMediator();
            }
            return this.instance;
        },
        instance: null,
        NAME: 'AgentSceneMediator'
    }
);

module.exports = AgentSceneMediator;
