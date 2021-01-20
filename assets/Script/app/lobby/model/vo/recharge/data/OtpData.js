var BaseVO = require("BaseVO");

var puremvc = BaseVO.puremvc;

module.exports = puremvc.define
(
    // CLASS INFO
    {
        parent: BaseVO,
        constructor: function () {
            this.otpValueList = null;
            this.smsOtpRateList = null;
        }
    },

    // INSTANCE MEMBERS
    {},
    // STATIC MEMBERS
    {}
);