var BaseVO = require("BaseVO");

var puremvc = BaseVO.puremvc;

module.exports = puremvc.define
(
    // CLASS INFO
    {
        constructor: function () {
            this.curTextchat = "";
        }
    },

    // INSTANCE MEMBERS
    {
        getNotifiesList:function () {
            return this.data.giftList;
        },
    },
    // STATIC MEMBERS
    {}
);