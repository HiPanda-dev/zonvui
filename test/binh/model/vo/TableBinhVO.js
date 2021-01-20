var BaseVO = require("BaseVO");
var TableVO = require("TableVO");

var puremvc = BaseVO.puremvc;

module.exports = puremvc.define
(
    // CLASS INFO
    {
        parent: TableVO,
        constructor: function () {
            TableVO.prototype.constructor.call(this);
            this.resultChi = [];
            this.isSapHam = false;
            this.isSapLang = false;
            this.isBatSapLang = false;
            this.totalTime = 0;
        }
    },

    // INSTANCE MEMBERS
    {
        reset:function () {
            this.resultChi = [];
            this.isSapHam = false;
            this.isSapLang = false;
            this.isBatSapLang = false;
            // this.totalTime = 0;
            TableVO.prototype.reset.call(this);
        }
    },
    // STATIC MEMBERS
    {
        TIME_SO_CHI:5,
        TIME_SHOW_RESULT:5
    }
);