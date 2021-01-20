var PlayerTable = require('PlayerTable');
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

    //////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////override////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////
    sitdown: function (seatId, user) {
        PlayerTable.prototype.sitdown.call(this, seatId, user);
        if (this.seatId !== seatId) return;
        var seat = this.tableVO.getSeatBySeatId(this.seatId);
        if (!seat) return;

        this.mcSortFinish.active = seat.isSort;
    },

    startGame: function () {
        PlayerTable.prototype.startGame.call(this);
        //this.mcReady.active = false;
        this.mcSortFinish.active = false;

        var seat = this.tableVO.getSeatByUserId(this.tableVO.myId);
        if(seat && seat.id === this.seatId){
            this.onStartTimer();
            this.showCycleCount(false);
        }
    },

    countDownStartGame: function (timeLeft) {
        PlayerTable.prototype.countDownStartGame.call(this, timeLeft);
        //this.mcReady.active = true;
    },

    sortFinishBinh: function (seatId, isSort) {
        if (this.seatId !== seatId) return;
        this.mcSortFinish.active = isSort;
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