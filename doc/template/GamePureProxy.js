var CoreGameProxy =  require("CoreGameProxy");
var puremvc = CoreGameProxy.puremvc;

module.exports = puremvc.define
(
    // CLASS INFO
    {
        parent: CoreGameProxy,
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