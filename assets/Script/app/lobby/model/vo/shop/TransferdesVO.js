var BaseVO = require("BaseVO");

var puremvc = BaseVO.puremvc;

module.exports = puremvc.define
(
    // CLASS INFO
    {
        constructor: function () {
            this.transferDescription = "";
            this.ratioForUser = 1;
            this.ratioForAgent = 1;
            this.otpDes = "";
            this.isAgent = -2;
        }
    },

    // INSTANCE MEMBERS
    {
        update:function (data) {
            this.transferDescription = data.transferDescription;
            this.ratioForUser = data.ratioForUser;
            this.ratioForAgent = data.ratioForAgent;
            this.otpDes = data.otpDes;
        }
    },
    // STATIC MEMBERS
    {}
);