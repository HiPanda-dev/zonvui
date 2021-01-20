var BaseVO = require("BaseVO");
var Constants = require('Constants');
var ChildChannelVO = require('ChildChannelVO');
var puremvc = BaseVO.puremvc;

module.exports = puremvc.define(
    // CLASS INFO
    {
        constructor: function() {
            this.bet = '';
            this.betBound = 0;
            this.betNoInit = null;
            this.buyMaster = 0;
            this.childChannel = [];
            this.checkedlsChild = null;
            this.countUserOnline = null;
            this.displayOrder = null;
            this.fee = "";
            this.gameCode = null;
            this.gameName = null;
            this.id = "";
            this.isChild = null;
            this.isError = null;
            this.isPublished = "";
            this.liengLimitBuyinMax = 0;
            this.liengLimitBuyinMin = 0;
            this.limitCreate = "";
            this.limitIn = "";
            this.limitOut = "";
            this.maxPlayer = "";
            this.message = null;
            this.name = "";
            this.parentChannelName = null;
            this.parentId = null;
            this.rowIndex = null;
            this.status = "";
            this.toChannelAmount = null;
            this.type = "";
            this.currentChildId = 0;
            this.maxTablePlayer = 0;
        }
    },

    // INSTANCE MEMBERS
    {
        initData: function(data) {
            for (var key in data) {
                if (key == "childChanel") {
                    this.initChildChannel(data[key]);
                } else {
                    this[key] = data[key];
                }
            }
        },
        initChildChannel: function(data) {
            this.childChannel = [];
            for (var i = 0; i < data.length; i++) {
                var child = new ChildChannelVO();
                child.initData(data[i]);
                this.childChannel.push(child);
            }
        }
    },
    // STATIC MEMBERS
    {

    }
);
