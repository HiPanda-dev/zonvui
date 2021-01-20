var BaseMediator = require('BaseMediator');
var LobbyMessage = require('LobbyMessage');
var puremvc = BaseMediator.puremvc;
var ChatGameSceneMediator = puremvc.define
(
    // CLASS INFO
    {
        name: 'ChatGameSceneMediator',
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
                LobbyMessage.SHOW_CHAT_GAME_SCENE,
                LobbyMessage.HIDE_CHAT_GAME_SCENE,
                LobbyMessage.ON_UPDATE_CHAT_GAME
            ];
        },

        /** @override */
        handleNotification: function (notification) {
            var params = notification.getBody();
            switch (notification.getName()) {
                case LobbyMessage.SHOW_CHAT_GAME_SCENE:
                    this.view.show(params);
                    break;
                case LobbyMessage.HIDE_CHAT_GAME_SCENE:
                    this.view.hide();
                    break;
                case LobbyMessage.ON_UPDATE_CHAT_GAME:
                    this.view.onUpdateChat(params);
                    break;
                default:
                    break;
            }
        },

        addHanlers: function () {
            this.view.activeSendChat = this.onSendChat.bind(this);
        },

        onSendChat:function (params) {
            this.sendNotification(LobbyMessage.SEND_CHAT_GAME, params);
            this.view.hide();
        }
    },
    // STATIC MEMBERS
    {
        getInstance: function () {
            if (this.instance === null) {
                this.instance = new ChatGameSceneMediator();
            }
            return this.instance;
        },
        instance: null,
        NAME: 'ChatGameSceneMediator'
    }
);

module.exports = ChatGameSceneMediator;
