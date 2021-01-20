var BaseVO =  require("BaseVO");
var Constants = require('Constants');
var puremvc = BaseVO.puremvc;

module.exports = puremvc.define
(
    // CLASS INFO
    {
        constructor: function () {
           this.bet = null;
           this.betBound = null;
           this.buyMaster = null;
           this.checkedIsChild = null;
           this.childChanel = null;
           this.countUserOnline = 0;
           this.displayOrder = null;
           this.fee = null;
           this.gameCode = null;
           this.gameName = null;
           this.id = "";
           this.isError = null;
           this.isPublished = "";
           this.liengLimitBuyinMax = null;
           this.liengLimitBuyinMin = null;
           this.limitCreate = null;
           this.limitIn = null;
           this.limitOut = null;
           this.maxPlayer = 0;
           this.message = null;
           this.name = "";
           this.parentChanelName = null;
           this.parentId = null;
           this.rowIndex = null;
           this.status = null;
           this.toChannelAmount = 0;
           this.type = null;

           this.xxx = 100;
        }
    },

    // INSTANCE MEMBERS
    {
         initData:function(data){
            for (var key in data) {
                this[key] = data[key];
            }
         }
    },
    // STATIC MEMBERS
    {

    }
);
