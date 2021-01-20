var BaseMediator = require('BaseMediator');
var LobbyMessage = require('LobbyMessage');
var puremvc = BaseMediator.puremvc;
var AlertMediator = puremvc.define
(
    // CLASS INFO
    {
        name: 'AlertMediator',
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
                LobbyMessage.SHOW_ALERT,
                LobbyMessage.HIDE_ALERT,
                LobbyMessage.SHOW_ALERT_WITH_CONFIRM,
                LobbyMessage.HIDE_ALERT_WITH_CONFIRM
            ];
        },

        /** @override */
        handleNotification: function (notification) {
            var data = notification.getBody();
            switch (notification.getName()) {
                case LobbyMessage.SHOW_ALERT:
                    this.view.showAlert(data);
                    this.sendNotification(LobbyMessage.HIDE_LOADING);
                    break;
                case LobbyMessage.HIDE_ALERT:
                    this.view.hide();
                    break;
                case LobbyMessage.SHOW_ALERT_WITH_CONFIRM:
                    this.view.showConfirm(data);
                    this.sendNotification(LobbyMessage.HIDE_LOADING);
                    break;
                case LobbyMessage.HIDE_ALERT_WITH_CONFIRM:
                    this.view.hide();
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
                this.instance = new AlertMediator();
            }
            return this.instance;
        },
        instance: null,
        NAME: 'AlertMediator'
    }
);

module.exports = AlertMediator;
