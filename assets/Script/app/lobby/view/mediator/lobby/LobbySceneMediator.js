var BaseMediator = require('BaseMediator');
var MainScene = require('MainScene');
var LobbyMessage = require('LobbyMessage');
var Constants = require('Constants');
var puremvc = BaseMediator.puremvc;
var LobbySceneMediator = puremvc.define
(
    // CLASS INFO
    {
        name: 'LobbyMediator',
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
                LobbyMessage.HIDE_LOBBY,
                LobbyMessage.SHOW_LOBBY
            ];
        },

        /** @override */
        handleNotification: function (notification) {
            switch (notification.getName()) {
                case LobbyMessage.SHOW_LOBBY:
                    this.view.show();
                    // Constants.CURRENT_SCENE = Constants.GAME_CHANNEL;
                    break;
                case LobbyMessage.HIDE_LOBBY:
                    this.view.hide();
                    break;
            }
        },

        addHanlers: function () {

        }
    },
    // STATIC MEMBERS
    {
        getInstance: function () {
            if (this.instance === null) {
                this.instance = new LobbySceneMediator();
            }
            return this.instance;
        },
        instance: null,
        NAME: 'LobbyMediator'
    }
);

module.exports = LobbySceneMediator;
