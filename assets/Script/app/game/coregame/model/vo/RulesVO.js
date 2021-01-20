var BaseVO = require("BaseVO");

var puremvc = BaseVO.puremvc;

module.exports = puremvc.define
(
    // CLASS INFO
    {
        constructor: function () {
            this.minMoney = 0;
            this.maxMoney = 0;
            this.maxPlayer = 0;
            this.bet = 0;
        }
    },

    // INSTANCE MEMBERS
    {
        update:function (rulesVO) {
            this.maxPlayer = rulesVO.maxPlayer;
            this.bet = rulesVO.bet;
        }
    },
    // STATIC MEMBERS
    {}
);