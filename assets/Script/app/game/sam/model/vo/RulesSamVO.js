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
        }
    },

    // INSTANCE MEMBERS
    {},
    // STATIC MEMBERS
    {}
);