var PlayerTable = require('PlayerTable');
var PlayerTablePhom = cc.Class({
    extends: PlayerTable,

    buildUI: function () {
        PlayerTable.prototype.buildUI.call(this);
    },

    applyLayout: function () {
        PlayerTable.prototype.applyLayout.call(this);

        var mcStatus = this.container.getChildByName("mcStatus");
        this.mcReady = mcStatus.getChildByName("mcReady");
        this.mcView = mcStatus.getChildByName("mcView");
    },

    initialize: function () {
        PlayerTable.prototype.initialize.call(this);
        this.hideAllMovie();
    },

    //////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////override//////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////

    updateUserViewState:function () {
        var seat = this.tableVO.getSeatBySeatId(this.seatId);
        if(!seat || !seat.user) return;
        this.mcView.active = seat.user.isViewer;
        this.mcView.getComponent(dragonBones.ArmatureDisplay).playAnimation("start", 1);
    },

    startGame: function () {
        this.mcReady.active = false;
    },

    countDownStartGame: function (timeLeft) {
        PlayerTable.prototype.countDownStartGame.call(this, timeLeft);
        this.mcReady.active = true;
    },

    finishGame: function (listResult) {
        PlayerTable.prototype.finishGame.call(this, listResult);
        this.hideAllMovie();
    },

    meDrawCard: function () {
        //this.updateCurrentTurn();
    },

    drawCard: function (seatId) {
        var seat = this.tableVO.getSeatBySeatId(seatId);
        this.tableVO.TURN_TIME = this.tableVO.DISCARD_TIME;
        if(seat.discards.length === this.tableVO.cardNumberToDown)
        {
            this.tableVO.TURN_TIME = this.tableVO.DOWNCARD_TIME;
            this.updateCurrentTurn();
        }
    },

    downCardFinish: function (userId) {
        this.tableVO.TURN_TIME = this.tableVO.SENDCARD_TIME;
        this.updateCurrentTurn();
    },

    sendCardFinish: function (userId) {
        this.tableVO.TURN_TIME = this.tableVO.DISCARD_TIME;
        this.updateCurrentTurn();
    },

    sendCard: function (cards,userId,index,playerDes) {

    },

    discard: function (card,userId,nextTurn) {
        // var seat = this.tableVO.getSeatByUserId(nextTurn);
        // if(seat.discards.length === this.tableVO.cardNumberToDown + 1)
        //     return;
        // if (this.seatId === seat.id)
        //     this.tableVO.TURN_TIME = this.tableVO.DISCARD_TIME;
        // this.updateCurrentTurn();
    },


    dealCards: function () {
        // var seat = this.tableVO.getSeatByUserId(this.tableVO.curTurn);
        // if(seat.id === this.seatId)
        // {
            //this.tableVO.TURN_TIME = this.tableVO.DISCARD_TIME;
            //this.updateCurrentTurn();
        // }
    },

    showCards: function (seatId, arrCards) {
        if(this.tableVO.curTurn === -1)
            return;
        var seat = this.tableVO.getSeatByUserId(this.tableVO.curTurn);
        if(seat.id === this.seatId)
        {
            this.tableVO.TURN_TIME = this.tableVO.DISCARD_TIME;
            if(this.tableVO.timePass !== 0)
                this.tableVO.TURN_TIME -= this.tableVO.timePass;
            this.updateCurrentTurn();
        }
    },

    // override
    updateCurrentTurn:function () {
        if(!this.mcCycle) return;

        var seat = this.tableVO.getSeatByUserId(this.tableVO.curTurn);
        if(seat && this.seatId === seat.id){
            this.removeTimer();
            this.onStartTimer();
        }else{
            this.removeTimer();
            this.showCycleCount(false);
        }
    },

    hideReadyGame:function () {
        this.mcReady.active = false;
    },
    //////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////

    hideAllMovie: function () {
        this.mcReady.active = false;
    },

});

PlayerTablePhom.create = function (componentId, container) {
    var component = new PlayerTablePhom();
    component.initComponent(componentId, container);
    return component;
};

module.exports = PlayerTablePhom;