var BaseVO = require("BaseVO");
var puremvc = BaseVO.puremvc;

module.exports = puremvc.define
(
    // CLASS INFO
    {
        constructor: function () {
            this.providerList = [];
            this.cardValueList = [];
            this.outCardRateList = [];
            this.otpDes = "";
            this.ratioBuyCard = 1;
        }
    },

    // INSTANCE MEMBERS
    {
        update:function (data) {
            this.providerList = data.providerList;
            this.cardValueList = data.cardValueList;
            this.outCardRateList = data.outCardRateList;
            this.ratioBuyCard = data.ratioBuyCard;
            this.otpDes = data.otpDes;
        }
    },
    // STATIC MEMBERS
    {}
);