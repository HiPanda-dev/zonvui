var BaseVO = require("BaseVO");

var puremvc = BaseVO.puremvc;

module.exports = puremvc.define
(
    // CLASS INFO
    {
        constructor: function () {
            this.avatarList = null;
        }
    },

    // INSTANCE MEMBERS
    {
        updateAvatarList:function (data) {
            this.avatarList = data;
        }
    },
    // STATIC MEMBERS
    {}
);