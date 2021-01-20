var BaseMediator = require('BaseMediator');
var LobbyMessage = require('LobbyMessage');
var puremvc = BaseMediator.puremvc;
var NotifiesSceneMediator = puremvc.define
(
    // CLASS INFO
    {
        name: 'NotifiesSceneMediator',
        parent: BaseMediator,
        constructor: function () {
            puremvc.Mediator.call(this, this.constructor.NAME);
        }
    },
    // INSTANCE MEMBERS
    {
        onRegister: function () {

        },

        /** @override */
        listNotificationInterests: function () {
            return [
                LobbyMessage.ON_UPDATE_NOTIFIES
            ];
        },

        /** @override */
        handleNotification: function (notification) {
            var data = notification.getBody();
            BaseMediator.prototype.handleNotification.call(this);
            switch (notification.getName()) {
                case LobbyMessage.ON_UPDATE_NOTIFIES:
                    this.view.onUpdateNotifies(data.strNotifies);
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
                this.instance = new NotifiesSceneMediator();
            }
            return this.instance;
        },
        instance: null,
        NAME: 'NotifiesSceneMediator'
    }
);

module.exports = NotifiesSceneMediator;
