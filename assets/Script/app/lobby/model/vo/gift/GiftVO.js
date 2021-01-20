var BaseVO = require("BaseVO");
var GiftItemVO = require("GiftItemVO");
var puremvc = BaseVO.puremvc;

module.exports = puremvc.define
(
    // CLASS INFO
    {
        constructor: function () {
            this.giftList = null;
        }
    },

    // INSTANCE MEMBERS
    {
        updateGiftList:function (data) {
            this.giftList = [];
            for(var i=0;i<data.length;i++){
                var item = new GiftItemVO();
                item.update(data[i]);
                this.giftList.push(item);
            }
        },

        reset:function () {
            this.giftList = null;
        }
    },
    // STATIC MEMBERS
    {}
);