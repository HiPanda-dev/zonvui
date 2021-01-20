var BaseVO = require("BaseVO");

var puremvc = BaseVO.puremvc;

module.exports = puremvc.define
(
    // CLASS INFO
    {
        constructor: function () {
            this.name = "";
            this.gameAccount = "";
            this.phone = [];
            this.address = "";
            this.fbUrl = "";
            this.rowIndex = 0;
            this.agentId = "";
        }
    },

    // INSTANCE MEMBERS
    {
        update:function (data) {
            for (var key in data) {
                this[key] = data[key];
            }
        }
    },
    // STATIC MEMBERS
    {}
);