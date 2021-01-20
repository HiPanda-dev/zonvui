var BaseVO = require("BaseVO");
var puremvc = BaseVO.puremvc;

module.exports = puremvc.define
(
    // CLASS INFO
    {
        constructor: function () {
            this.name = "";
            this.image = "";
            this.operatorId = null;
            this.act = "";
        }
    },

    // INSTANCE MEMBERS
    {
        update: function (data) {
            this.name = data.name;
            this.image = data.image;
            this.operatorId = data.operatorId;
            this.act =  data.button.act;

        }
    },
    // STATIC MEMBERS
    {}
);