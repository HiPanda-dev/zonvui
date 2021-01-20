var BaseMediator = require('BaseMediator');
var LobbyMessage = require('LobbyMessage');
var puremvc = BaseMediator.puremvc;
var ChatSceneMediator = puremvc.define
(
    // CLASS INFO
    {
        name: 'ChatSceneMediator',
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
                LobbyMessage.SHOW_CHAT_SCENE,
                LobbyMessage.HIDE_CHAT_SCENE,
                LobbyMessage.ON_UPDATE_CHAT,
                LobbyMessage.ON_UPDATE_ADMIN_CHAT,
                LobbyMessage.ON_UPDATE_LIST_CHAT
            ];
        },

        /** @override */
        handleNotification: function (notification) {
            var params = notification.getBody();
            switch (notification.getName()) {
                case LobbyMessage.SHOW_CHAT_SCENE:
                    this.view.show();
                    this.onGetChatData();
                    break;
                case LobbyMessage.HIDE_CHAT_SCENE:
                    this.view.hide();
                    break;
                case LobbyMessage.ON_UPDATE_CHAT:
                    this.view.onUpdateChat(params);
                    break;
                case LobbyMessage.ON_UPDATE_ADMIN_CHAT:
                    this.view.onUpdateAdminChat(params);
                    break;
                case LobbyMessage.ON_UPDATE_LIST_CHAT:
                    this.view.onUpdateListChat(params);
                    break;
                default:
                    break;
            }
        },

        addHanlers: function () {
            this.view.activeSendChat = this.onSendChat.bind(this);
        },

        onSendChat:function (params) {
            this.sendNotification(LobbyMessage.SEND_CHAT, params);
        },

        onGetChatData:function () {
            TweenLite.delayedCall(0.2, function () {
                this.sendNotification(LobbyMessage.SEND_GET_CHAT_DATA);
            }.bind(this));
        }
    },
    // STATIC MEMBERS
    {
        getInstance: function () {
            if (this.instance === null) {
                this.instance = new ChatSceneMediator();
            }
            return this.instance;
        },
        instance: null,
        NAME: 'ChatSceneMediator'
    }
);

module.exports = ChatSceneMediator;
