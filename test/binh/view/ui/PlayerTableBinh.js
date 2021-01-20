var PlayerTable = require('PlayerTable');
var SeatVO = require('SeatVO');
var PlayerTableBinh = cc.Class({
    extends: PlayerTable,

    properties: {
        sortStatus: [cc.SpriteFrame]
    },

    buildUI: function () {
        PlayerTable.buildUI.applyLayout.call(this);
    },

    applyLayout: function () {
        PlayerTable.prototype.applyLayout.call(this);
        var mcStatus = this.container.getChildByName("mcStatus");
        this.mcReady = mcStatus.getChildByName("mcReady");
        this.mcSortFinish = mcStatus.getChildByName("mcSortFinish");
        this.mcView = mcStatus.getChildByName("mcView");
    },

    initialize: function () {
        PlayerTable.prototype.initialize.call(this);
        this.mcReady.active = false;
        this.mcSortFinish.active = false;
    },

    dealCards: function () {
        this.mcReady.active = false;
    },

    //////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////override////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////
    sitdown: function (seatId, user) {
        PlayerTable.prototype.sitdown.call(this, seatId, user);
        if (this.seatId !== seatId) return;
        var seat = this.tableVO.getSeatBySeatId(this.seatId);
        
        this.mcSortFinish.active = seat.isSort;
    },
 
    startGame: function () {
        var seat = this.tableVO.getSeatBySeatId(this.seatId);
        if (!seat || seat.status !== SeatVO.PLAY) return;

        PlayerTable.prototype.startGame.call(this);
        //this.mcReady.active = false;

        this.mcSortFinish.active = false;
        var timeLeft = this.tableVO.TURN_TIME;
        this.removeTimer();
        this.onStartTimer(timeLeft);
        this.showCycleCount(true);
    },

    updateCurrentTurn: function () {
        var seat = this.tableVO.getSeatBySeatId(this.seatId);
        if (!seat || seat.status !== SeatVO.PLAY) return;

        if (!this.mcCycle) return;
        var timeLeft = (this.tableVO.timeLeft === undefined || this.tableVO.timeLeft === -1) ? this.tableVO.TURN_TIME : this.tableVO.timeLeft;
        this.removeTimer();
        this.onStartTimer(timeLeft);
    },


    countDownStartGame: function (timeLeft) {
        PlayerTable.prototype.countDownStartGame.call(this, timeLeft);
        //this.mcReady.active = true;
    },

    sortFinishBinh: function (seatId, isSort) {
        if (this.seatId !== seatId) return;
        this.mcSortFinish.active = isSort;
        if (isSort)
            this.mcCycle.opacity = 0;
        else
            this.mcCycle.opacity = 255;
    },

    binhLung: function (seatId, isLung) {
        this.mcSortFinish.active = false;
        this.removeTimer();
    },

    soChi: function () {
        this.mcSortFinish.active = false;
        this.removeTimer();
    },

    sapHam: function () {
        this.mcSortFinish.active = false;
        this.removeTimer();
    },

    sapLang: function (seatId) {
        this.mcSortFinish.active = false;
        this.removeTimer();
    },

    batSapLang: function (seatId) {
        this.mcSortFinish.active = false;
        this.removeTimer();
    },

    mauBinh: function() {
        this.mcSortFinish.active = false;
    },

    finishGame: function (listResult) {
        PlayerTable.prototype.finishGame.call(this, listResult);
        //this.mcReady.active = false;
        this.mcSortFinish.active = false;
    },

    hideReadyGame:function () {
        //this.mcReady.active = false;
    },

    showEarnMoney: function (money) {

    },

    updateUserViewState:function () {
        var seat = this.tableVO.getSeatBySeatId(this.seatId);
        if(!seat || !seat.user) return;
        this.mcView.active = seat.user.isViewer;
        // this.mcView.getComponent(dragonBones.ArmatureDisplay).playAnimation("start", 1);
    },


    //////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////

});

PlayerTableBinh.create = function (componentId, container) {
    var component = new PlayerTableBinh();
    component.initComponent(componentId, container);
    return component;
};

module.exports = PlayerTableBinh;