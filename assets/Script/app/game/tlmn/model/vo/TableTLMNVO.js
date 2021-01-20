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

            this.TIME_SHOW_RESULT = 3;
            this.TIME_SHOW_RESULT_WIN_WHITE = 5;
            this.TIME_DISPLAY_WIN_WITE_CARDS = 2;

            this.playCards = [];
            /*mảng bài vừa được đánh*/
            this.winUserId = -1;
            this.winType = -1;
        }
    },

    // INSTANCE MEMBERS
    {

    },
    // STATIC MEMBERS
    {}
);