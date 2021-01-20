var BaseMediator = require('BaseMediator');
var LobbyMessage = require('LobbyMessage');
var puremvc = BaseMediator.puremvc;

var SlotSceneLayerMediator = puremvc.define
(
    // CLASS INFO
    {
        name: 'SlotSceneLayerMediator',
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
                LobbyMessage.ON_LOAD_SLOT
            ];
        },

        /** @override */
        handleNotification: function (notification) {
            BaseMediator.prototype.handleNotification.call(this);
            var data = notification.getBody();
            switch (notification.getName()) {
                case LobbyMessage.ON_LOAD_SLOT:
                    this.view.onLoadSlotmachine(data.name, data.onComplete);
                    break;
                default:
                    break;
            }
        }
    },

    // STATIC MEMBERS
    {
        getInstance: function () {
            if (this.instance === null) {
                this.instance = new SlotSceneLayerMediator();
            }
            return this.instance;
        },
        instance: null,
        NAME: 'SlotSceneLayerMediator'
    }
);

module.exports = SlotSceneLayerMediator;
