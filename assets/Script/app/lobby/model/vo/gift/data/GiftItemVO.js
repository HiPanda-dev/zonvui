var BaseVO = require("BaseVO");

var puremvc = BaseVO.puremvc;

module.exports = puremvc.define
(
    // CLASS INFO
    {
        constructor: function () {
            this.gid = "";
            this.bcCode = "";
            this.bcName = "";
            this.bcShortDes = "";
            this.bcDes = "";
            this.money = "";
            this.status = "";
            this.buttons = [];
            this.rowIndex = [];
            this.createdDate = [];
        }
    },

    // INSTANCE MEMBERS
    {
        update:function (data) {
            for (var key in data) {
                this[key] = data[key];
            }
        }
    },
    // STATIC MEMBERS
    {}
);