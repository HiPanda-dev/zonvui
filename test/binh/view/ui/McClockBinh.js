var Component = require('Component');
var SeatVO = require('SeatVO');
var McClockBinh = cc.Class({
    extends: Component,

    initComponent: function (componentId, container) {
        Component.prototype.initComponent.call(this, componentId, container);
    },

    buildUI: function () {
        this.tableVO = null;

    },

    applyLayout: function () {
        this.progressBar = this.container.getComponent(cc.ProgressBar);
    },

    initialize: function () {
        this.hide();
    },

    //////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////override////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////


    startGame: function () {
        var pre = 20;
        this.turnTime = this.tableVO.TURN_TIME * pre;
        this.timeLeft = this.turnTime;
        this.progressBar.progress = this.timeLeft / this.turnTime;
        if (this.timer) this.removeTimer();
        this.timer = setInterval(this.onTimer.bind(this), 1000 / pre);
    },

    onTimer: function () {
        this.timeLeft--;
        if (this.timeLeft >= 0) {
            this.progressBar.progress = this.timeLeft / this.turnTime;
        } else {
            this.removeTimer();
        }
    },

    finishGame: function (listResult) {
        this.removeTimer();
        this.hide();
    },

    removeTimer: function () {
        clearInterval(this.timer);
        this.timer = null;
    },

    soChi: function (seatId, indexChi) {
        this.removeTimer();
        this.hide();
    },

    binhLung: function (seatId, isLung) {
        this.removeTimer();
        this.hide();
    },

    mauBinh: function (seatId) {
        this.removeTimer();
        this.hide();
    },

    zoomOutCards: function () {
        this.show();
        //this.container.x = 260;
        //this.container.y = 100;
    },

    zoomInCards: function () {
        //this.container.x = 0;
        //this.container.y = 200;
    },

    updateCurrentTurn: function () {
        this.timeLeft = (this.tableVO.timeLeft === undefined || this.tableVO.timeLeft === -1) ? this.tableVO.TURN_TIME : this.tableVO.timeLeft;
        this.progressBar.progress = this.timeLeft / this.turnTime;
        if (this.timer) this.removeTimer();
        this.timer = setInterval(this.onTimer.bind(this), 1000);
        this.show();
    }
});

McClockBinh.create = function (componentId, container) {
    var component = new McClockBinh();
    component.initComponent(componentId, container);
    return component;
};

module.exports = McClockBinh;