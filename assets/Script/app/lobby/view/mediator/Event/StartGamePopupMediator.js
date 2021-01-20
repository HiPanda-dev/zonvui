var BaseMediator = require('BaseMediator');
var LobbyMessage = require('LobbyMessage');
var puremvc = BaseMediator.puremvc;
var StartGamePopupMediator = puremvc.define
(
    // CLASS INFO
    {
        name: 'StartGamePopupMediator',
        parent: BaseMediator,
        constructor: function () {
            puremvc.Mediator.call(this, this.constructor.NAME);
        }
    },
    // INSTANCE MEMBERS
    {
        initialize: function () {
            this.eventProxy = this.facade.retrieveProxy('EventProxy');
            this.sendNotification(LobbyMessage.SEND_GET_INFO_STARTGAME_POPUP);
        },

        /** @override */
        listNotificationInterests: function () {
            return [
                LobbyMessage.SHOW_STARTGAME_POPUP_SCENE,
                LobbyMessage.HIDE_STARTGAME_POPUP_SCENE,
                LobbyMessage.ON_UPDATE_INFO_STARTGAME_POPUP
            ];
        },

        /** @override */
        handleNotification: function (notification) {
            BaseMediator.prototype.handleNotification.call(this);
            var params = notification.getBody();
            switch (notification.getName()) {
                case LobbyMessage.SHOW_STARTGAME_POPUP_SCENE:
                    this.view.show();
                    break;
                case LobbyMessage.ON_UPDATE_INFO_STARTGAME_POPUP:
                    this.view.updateInfoEvent(params);
                    break;
                case LobbyMessage.HIDE_STARTGAME_POPUP_SCENE:
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
                this.instance = new StartGamePopupMediator();
            }
            return this.instance;
        },
        instance: null,
        NAME: 'StartGamePopupMediator'
    }
);

module.exports = StartGamePopupMediator;
