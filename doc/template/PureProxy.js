var BaseProxy =  require("BaseProxy");

var puremvc = BaseProxy.puremvc;

module.exports = puremvc.define
(
    // CLASS INFO
    {
        parent: BaseProxy,
        constructor: function () {
            puremvc.Proxy.call(this, this.constructor.NAME);
        }
    },

    // INSTANCE MEMBERS
    {
        
    },
    // STATIC MEMBERS
    {
        NAME: '${NAME}'
    }
);