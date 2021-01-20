var BaseVO = require("BaseVO");
var RulesVO = require("RulesVO");

var puremvc = BaseVO.puremvc;

module.exports = puremvc.define
(
    // CLASS INFO
    {
        parent: RulesVO,
        constructor: function () {
            RulesVO.prototype.constructor.call(this);
            this.listMoneyChip = [];
        }
    },

    // INSTANCE MEMBERS
    {
        update:function (rulesVO) {
            RulesVO.prototype.update.call(this,rulesVO);
            this.listMoneyChip = [];
            this.listMoneyChip.push(rulesVO.bet);
            this.listMoneyChip.push(rulesVO.bet * 5);
            this.listMoneyChip.push(rulesVO.bet * 10);
            this.listMoneyChip.push(rulesVO.bet * 20);
        },
    },
    // STATIC MEMBERS
    {}
);