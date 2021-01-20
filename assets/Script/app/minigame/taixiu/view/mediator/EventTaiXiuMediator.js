var BaseMediator = require('BaseMediator');
var MiniGameMessage = require('MiniGameMessage');
var puremvc = BaseMediator.puremvc;
var Constants = require('Constants');
var EventTaiXiuMediator = puremvc.define
(
    // CLASS INFO
    {
        name: 'EventTaiXiuMediator',
        parent: BaseMediator,
        constructor: function () {
            puremvc.Mediator.call(this, this.constructor.NAME);
        }
    },
    // INSTANCE MEMBERS
    {
        initialize: function () {
            this.eventProxy = this.facade.retrieveProxy('EventProxy');
        },

        /** @override */
        listNotificationInterests: function () {
            return [
                MiniGameMessage.SHOW_EVENT_TAI_XIU,
                MiniGameMessage.UPDATE_TOP_EVENT_TAI_XIU
            ];
        },

        /** @override */
        handleNotification: function (notification) {
            // var data = notification.getBody();
            // switch (notification.getName()) {
            //     case MiniGameMessage.SHOW_EVENT_TAI_XIU:
            //         this.view.show();
            //         this.sendNotification(MiniGameMessage.SEND_GET_EVENT_TAI_XIU);
            //         break;
            //
            //     case MiniGameMessage.UPDATE_TOP_EVENT_TAI_XIU:
            //         this.view.updateTopEventTaiXiu(data.params);
            //         break;
            //
            //     default:
            //         break;
            // }
        },


        addHanlers: function () {
            BaseMediator.prototype.addHanlers.call(this);
            this.view.activeGetTopEventTaiXiu = this.activeGetTopEventTaiXiu.bind(this);
        },

        activeGetTopEventTaiXiu: function (params) {
            //this.sendNotification(MiniGameMessage.SEND_GET_EVENT_TAI_XIU, params);
        }

    },
    // STATIC MEMBERS
    {
        getInstance: function () {
            if (this.instance === null) {
                this.instance = new EventTaiXiuMediator();
            }
            return this.instance;
        },
        instance: null,
        NAME: 'EventTaiXiuMediator'
    }
);

module.exports = EventTaiXiuMediator;
