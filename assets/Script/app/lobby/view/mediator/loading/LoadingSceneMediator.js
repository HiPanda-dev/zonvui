var BaseMediator = require('BaseMediator');
var LobbyMessage = require('LobbyMessage');
var puremvc = BaseMediator.puremvc;
var LoadingSceneMediator = puremvc.define
(
    // CLASS INFO
    {
        name: 'LoadingSceneMediator',
        parent: BaseMediator,
        constructor: function () {
            puremvc.Mediator.call(this, this.constructor.NAME);
        }
    },
    // INSTANCE MEMBERS
    {
        initialize: function () {
            this.view.hide();
        },

        /** @override */
        listNotificationInterests: function () {
            return [
                LobbyMessage.SHOW_LOADING,
                LobbyMessage.HIDE_LOADING
            ];
        },

        /** @override */
        handleNotification: function (notification) {
            switch (notification.getName()) {
                case LobbyMessage.SHOW_LOADING:
                    this.view.show();
                    break;
                case LobbyMessage.HIDE_LOADING:
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
                this.instance = new LoadingSceneMediator();
            }
            return this.instance;
        },
        instance: null,
        NAME: 'LoadingSceneMediator'
    }
);

module.exports = LoadingSceneMediator;
