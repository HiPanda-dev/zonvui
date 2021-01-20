var BaseMediator = require('BaseMediator');
var LobbyMessage = require('LobbyMessage');
var puremvc = BaseMediator.puremvc;
var WebviewSceneMediator = puremvc.define
(
    // CLASS INFO
    {
        name: 'WebviewSceneMediator',
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
                LobbyMessage.SHOW_WEB_VIEW_POPUP,
                LobbyMessage.HIDE_WEB_VIEW_POPUP
            ];
        },

        /** @override */
        handleNotification: function (notification) {
            var params = notification.getBody();
            BaseMediator.prototype.handleNotification.call(this);
            switch (notification.getName()) {
                case LobbyMessage.SHOW_WEB_VIEW_POPUP:
                    this.view.show(params.url, params.title);
                    break;
                case LobbyMessage.HIDE_WEB_VIEW_POPUP:
                    this.view.hide();
                    break;
                default:
                    break;
            }
        },

        addHanlers: function () {
            BaseMediator.prototype.addHanlers.call(this);
        }
    },
    // STATIC MEMBERS
    {
        getInstance: function () {
            if (this.instance === null) {
                this.instance = new WebviewSceneMediator();
            }
            return this.instance;
        },
        instance: null,
        NAME: 'WebviewSceneMediator'
    }
);

module.exports = WebviewSceneMediator;
