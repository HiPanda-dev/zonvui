var BaseVO = require("BaseVO");

var puremvc = BaseVO.puremvc;

module.exports = puremvc.define
(
    // CLASS INFO
    {
        constructor: function () {
            this.money = 0;
            this.chi = "";
            this.cards = [];
            this.royaltyType = 0;

            this.listResult = [];

        }
    },

    // INSTANCE MEMBERS
    {},
    // STATIC MEMBERS
    {}
);