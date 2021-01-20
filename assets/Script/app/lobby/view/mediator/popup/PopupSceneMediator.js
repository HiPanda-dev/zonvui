var BaseMediator = require('BaseMediator');
var LobbyMessage = require('LobbyMessage');
var puremvc = BaseMediator.puremvc;
var PopupSceneMediator = puremvc.define
(
    // CLASS INFO
    {
        name: 'PopupSceneMediator',
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
            return [LobbyMessage.HIDE_ALL_POPUP];
        },

        /** @override */
        handleNotification: function (notification) {
            switch (notification.getName()) {
                case LobbyMessage.HIDE_ALL_POPUP:
                    this.view.hideAll();
                    break;
                default:
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
                this.instance = new PopupSceneMediator();
            }
            return this.instance;
        },
        instance: null,
        NAME: 'PopupSceneMediator'
    }
);

module.exports = PopupSceneMediator;
