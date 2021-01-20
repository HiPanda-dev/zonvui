var BaseMediator = require('BaseMediator');
var LobbyMessage = require('LobbyMessage');
var puremvc = BaseMediator.puremvc;
var ${NAME} = puremvc.define
(
    // CLASS INFO
    {
        name: '${NAME}',
        parent: BaseMediator,
        constructor: function () {
            puremvc.Mediator.call(this, this.constructor.NAME);
        }
    },
    // INSTANCE MEMBERS
    {
        onRegister: function() {
  
        },

        /** @override */
        listNotificationInterests: function () {
            return [
               
            ];
        },

        /** @override */
        handleNotification: function (notification) {
            BaseMediator.prototype.handleNotification.call(this);
            switch (notification.getName()) {
                default:
                    break;
            }
        },

        addHanlers:function(){
            BaseMediator.prototype.addHanlers.call(this);
        }
    },
    // STATIC MEMBERS
    {
        getInstance: function() {
            if(this.instance === null){
                this.instance = new ${NAME}();
            }
            return this.instance;
        },
        instance:null,
        NAME: '${NAME}'
    }
);

module.exports = ${NAME};
