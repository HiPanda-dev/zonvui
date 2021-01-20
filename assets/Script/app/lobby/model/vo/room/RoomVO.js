var BaseVO = require("BaseVO");

var puremvc = BaseVO.puremvc;

module.exports = puremvc.define
(
    // CLASS INFO
    {
        constructor: function () {
            this.id = 0;
            this.name = "";
            this.isGame = false;
            this.isHidden = false;
            this.isJoined = false;
            this.isPasswordProtected = false;
            this.maxSpectators = 0;
            this.maxUsers = 0;
            this.roomBet = 0;
            this.roomName = "";
            this.userCount = 0;
        }
    },

    // INSTANCE MEMBERS
    {
        initData: function (params) {
            this.id = params.id;
            this.name = params.name;
            this.isGame = params.isGame;
            this.isHidden = params.isHidden;
            this.isJoined = params.isJoined;
            this.isPasswordProtected = params.isPasswordProtected;
            this.maxSpectators = params.maxSpectators;
            this.maxUsers = params.maxUsers;
            this.roomBet = (params.variables && params.variables.roomBet) ? params.variables.roomBet.value :  this.roomBet;
            this.roomBet = (params.roomBet) ? parseInt(params.roomBet) :  this.roomBet;
            this.roomName = (params.variables && params.variables.roomName) ? params.variables.roomName.value : this.roomName;
            this.roomName = (params.roomName) ? params.roomName : this.roomName;
            this.userCount = (params.userCount)?params.userCount:this.userCount;
        }
    },
    // STATIC MEMBERS
    {}
);