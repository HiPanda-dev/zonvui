var BaseVO = require("BaseVO");

var puremvc = BaseVO.puremvc;

module.exports = puremvc.define
(
    // CLASS INFO
    {
        parent: BaseVO,
        constructor: function () {
            this.sms9029RateList = null;
            this.sms9029ValueList = null;
            this.smsTelcoList = null;
            this.command = null;
        }
    },

    // INSTANCE MEMBERS
    { },
    // STATIC MEMBERS
    {}
);