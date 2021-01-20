var BaseVO = require("BaseVO");

var puremvc = BaseVO.puremvc;

module.exports = puremvc.define
(
    // CLASS INFO
    {
        constructor: function () {
            this.currentPage = 0;
            this.dataList = [];
            this.itemPerPage = 0;
            this.totalItems = 0;
            this.totalPages = 0;
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