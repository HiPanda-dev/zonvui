var BaseVO = require("BaseVO");

var puremvc = BaseVO.puremvc;

module.exports = puremvc.define
(
    // CLASS INFO
    {
        constructor: function () {
            this.userID = undefined;
            this.accessToken = undefined;
            this.userName = undefined;
            this.avatar = undefined;
            this.gender = undefined;
            this.email = undefined;
        }
    },

    // INSTANCE MEMBERS
    {},
    // STATIC MEMBERS
    {}
);