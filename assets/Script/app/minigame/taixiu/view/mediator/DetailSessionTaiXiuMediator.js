var BaseMediator = require('BaseMediator');
var MiniGameMessage = require('MiniGameMessage');
var puremvc = BaseMediator.puremvc;
var DetailSessionTaiXiuMediator = puremvc.define
(
    // CLASS INFO
    {
        name: 'DetailSessionTaiXiuMediator',
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
                MiniGameMessage.SHOW_DETAIL_SESSION_TAI_XIU,
                MiniGameMessage.UPDATE_DETAIL_SESSION_TAI_XIU
            ];
        },

        /** @override */
        handleNotification: function (notification) {
            BaseMediator.prototype.handleNotification.call(this);
            var data = notification.getBody();

            switch (notification.getName()) {
                case MiniGameMessage.SHOW_DETAIL_SESSION_TAI_XIU:
                    this.view.show();
                    this.sendNotification(MiniGameMessage.SEND_GET_DETAIL_SESSION_TAI_XIU, data);
                    break;

                case MiniGameMessage.UPDATE_DETAIL_SESSION_TAI_XIU:
                    this.view.updateDetailSession(data);
                    break;

                default:
                    break;
            }
        },

        addHanlers: function () {
            BaseMediator.prototype.addHanlers.call(this);
            this.view.activeGetDetailSession = this.activeGetDetailSession.bind(this);

        },

        activeGetDetailSession: function (params) {
            this.sendNotification(MiniGameMessage.SEND_GET_DETAIL_SESSION_TAI_XIU, params);
        }
    },
    // STATIC MEMBERS
    {
        getInstance: function () {
            if (this.instance === null) {
                this.instance = new DetailSessionTaiXiuMediator();
            }
            return this.instance;
        },
        instance: null,
        NAME: 'DetailSessionTaiXiuMediator'
    }
);

module.exports = DetailSessionTaiXiuMediator;
