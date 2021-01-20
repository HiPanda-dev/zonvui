var BaseVO = require('BaseVO');
var GameConfig = require('GameConfig');
var puremvc = BaseVO.puremvc;

module.exports = puremvc.define
(
    // CLASS INFO
    {
        constructor: function () {
            this.resultList = [];
            this.description = '';
            this.displayName = '';
            this.earnMoney = 0;
            this.userName = '';
            this.winCard = 0;
            this.winType = 0;
            this.seatId = -1;
            this.cards = [];
        }
    },

    // INSTANCE MEMBERS
    {
        addResultList:function (results) {
            this.resultList.push(results);
        },

        setupData:function (data) {
            this.description = data.description;
            this.displayName = data.displayName;
            this.earnMoney = (GameConfig.CURRENT_MODE === 'MONEY')?parseInt(data.money):parseInt(data.chip);
            this.userName = data.userName;
            this.winCard = data.winCard;
            this.winType = data.winType;
            this.cards = data.cards;
        },
        
        getResultBySeatId:function (seatId) {
            for(var i=0;i< this.resultList.length;i++){
                var vo = this.resultList[i];
                if(vo.seatId === seatId){
                    return vo;
                }
            }
            return null;
        }
        
    },
    // STATIC MEMBERS
    {}
);