var BaseVO = require("BaseVO");
var puremvc = BaseVO.puremvc;

var CardVO = puremvc.define
(
    // CLASS INFO
    {
        constructor: function (id) {
            this.id = id;
            this.num = parseInt(id / 4);
            this.type = id % 4;
            this.numBinh = this.getNumBinh();
            this.cardName = this.getCardName(id);
        }
    },

    // INSTANCE MEMBERS
    {
        getCardName: function (id) {
            var num = parseInt(id / 4);
            var type = id % 4;

            var strType = "";
            var strNum = (num + 3).toString();
            if (num === CardVO.CARD_11) strNum = "J";
            if (num === CardVO.CARD_12) strNum = "Q";
            if (num === CardVO.CARD_13) strNum = "K";
            if (num === CardVO.CARD_1) strNum = "A";
            if (num === CardVO.CARD_2) strNum = "2";

            // if(type === 0) strType = "♠";
            // if(type === 1) strType = "♣";
            // if(type === 2) strType = "♦";
            // if(type === 3) strType = "♥";

            if (type === 0) strType = " bích";
            if (type === 1) strType = " tép";
            if (type === 2) strType = " rô";
            if (type === 3) strType = " cơ";

            return strNum + "" + strType;
        },

        /**
         * chuyen 2 ve dau chi ap dung cho game binh
         * @returns {*}
         */
        getNumBinh: function () {
            var binhNum = this.num + 1;
            binhNum = (binhNum >= 13) ? binhNum - 13 : binhNum;
            return binhNum;
        }
    },
    // STATIC MEMBERS
    {
        CARD_1: 11,
        CARD_2: 12,
        CARD_3: 0,
        CARD_4: 1,
        CARD_5: 2,
        CARD_6: 3,
        CARD_7: 4,
        CARD_8: 5,
        CARD_9: 6,
        CARD_10: 7,
        CARD_11: 8,
        CARD_12: 9,
        CARD_13: 10,

        TYPE_SPADE: 0, 	//CHẤT BÍCH
        TYPE_CLUB: 1, 	//CHÁT TÉP
        TYPE_DIAMOND: 2, //CHẤT RÔ
        TYPE_HEART: 3 	//CHẤT CƠ
    }
);

module.exports = CardVO;