var Component = require('Component');
var BaoSamPannel = cc.Class({
    extends: Component,

    initComponent: function (componentId, container) {
        Component.prototype.initComponent.call(this, componentId, container);
        this.totalTime = 0;
        this.MILISECS = 10;
        this.timeLeft = 0;
        this.timer = null;
    },

    applyLayout: function () {
        this.btnBaoSam = this.container.getChildByName("btnBaoSam").getComponent(cc.Button);
        this.btnHuy = this.container.getChildByName("btnHuy").getComponent(cc.Button);
        this.mcCycle = this.container.getChildByName("mcCycle");
    },

    initialize: function () {
        this.hide();
    },

    //////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////override////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////

    showBaoSamState:function () {
        var mySeat = this.tableVO.getSeatByUserId(this.tableVO.myId);
        if(mySeat.sam === 0){
            this.show();
            this.countDownBaoSam(this.tableVO.TIME_BAO_SAM - this.tableVO.timePass);
        }

    },
    
    countDownStartGame:function (timeLeft) {
        this.hide();
    },

    dealCards:function () {
        if(!this.tableVO.isWhiteWin){
            this.show();
            this.countDownBaoSam(this.tableVO.TIME_BAO_SAM);
        }
    },

    finishGame:function (listResult) {
        this.removeTimer();
        this.hide();
    },

    finishGameWinWhite:function (arrCards, type) {
        this.removeTimer();
        this.hide();
    },

    leaveGame: function () {
        this.removeTimer();
        this.hide();
    },

    //////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////

    countDownBaoSam: function (totalTime) {
        if(this.timer) this.removeTimer();
        this.totalTime = totalTime;
        this.timeLeft = 0;
        this.showAnimCycle(0);
        this.show();
        this.timer = setInterval(this.onTimer.bind(this), this.MILISECS);
    },

    showAnimCycle: function (fillRange) {
        if (!this.mcCycle) return;

        var sprite = this.mcCycle.getComponent(cc.Sprite);
        sprite.fillRange = fillRange;
    },

    onTimer: function () {
        this.timeLeft++;
        var esTime = (1000 / this.MILISECS);

        if (this.timeLeft <= this.totalTime * esTime) {
            this.showAnimCycle(1 - this.timeLeft / (this.totalTime * esTime));
        } else {
            this.removeTimer();
            this.hide();
        }
    },

    removeTimer:function () {
        clearInterval(this.timer);
        this.timer = null;
    }
});

BaoSamPannel.create = function (componentId, container) {
    var component = new BaoSamPannel();
    component.initComponent(componentId, container);
    return component;
};

module.exports = BaoSamPannel;