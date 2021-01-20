var BaseVO = require("BaseVO");

var puremvc = BaseVO.puremvc;

module.exports = puremvc.define
(
    // CLASS INFO
    {
        constructor: function () {
            this.currentLevel = 0;
            this.maxLevel = 0;
            this.levelName = "";
        }
    },

    // INSTANCE MEMBERS
    {},
    // STATIC MEMBERS
    {}
);