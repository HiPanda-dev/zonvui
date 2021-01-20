var BaseMediator = require('BaseMediator');
var CoreGameMediator = require('CoreGameMediator');
var puremvc = BaseMediator.puremvc;
var ${NAME} = puremvc.define
(
    // CLASS INFO
    {
        name: '${NAME}',
        parent: CoreGameMediator,
        constructor: function () {
            puremvc.Mediator.call(this, this.constructor.NAME);
        }
    },
    // INSTANCE MEMBERS
    {
        onRegister: function () {
            CoreGameMediator.prototype.onRegister.call(this);
        },

        /** @override */
        listNotificationInterests: function () {
            return [].concat(CoreGameMediator.prototype.listNotificationInterests.call(this));
        },

        /** @override */
        handleNotification: function (notification) {
            var data = notification.getBody();
            CoreGameMediator.prototype.handleNotification.call(this, notification);
            switch (notification.getName()) {
                default:
                    break;
            }
        },

        addHanlers: function () {
           CoreGameMediator.prototype.addHanlers.call(this);
        }
    },
    // STATIC MEMBERS
    {
        getInstance: function () {
            if (this.instance === null) {
                this.instance = new ${NAME}();
            }
            return this.instance;
        },
        instance: null,
        NAME: '${NAME}'
    }
);

module.exports = ${NAME};
