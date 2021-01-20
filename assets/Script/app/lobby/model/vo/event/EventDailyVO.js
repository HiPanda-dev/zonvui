var BaseVO = require("BaseVO");
var puremvc = BaseVO.puremvc;

module.exports = puremvc.define
(
    // CLASS INFO
    {
        constructor: function () {
            this.title = "";
            this.content = "";
            this.image = null;
            this.buttons = [];
            this.time = "";
        }
    },

    // INSTANCE MEMBERS
    {
        update: function (data) {
            this.title = data.title;
            this.content = data.content;
            this.image = data.image;
            this.buttons = data.buttons;
            this.time = data.time;
        }
    },
    // STATIC MEMBERS
    {}
);