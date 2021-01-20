var Component = require("Component");
var Utility = require('Utility');
var GameEvent = require('GameEvent');

module.exports = cc.Class({
    extends: Component,

    initComponent: function (componentId, container) {
        Component.prototype.initComponent.call(this, componentId, container);
        this.MILISECS = 10;
        this.seatId = -1;
        this.tableVO = null;
        this.timeLeft = 0;
        this.timer = null;
    },

    buildUI: function () {

    },

    setup: function (seatId, tableVO) {
        this.seatId = seatId;
        this.tableVO = tableVO;
    },

    applyLayout: function () {
        this.txtName = this.container.getChildByName("txtName").getComponent(cc.Label);
        this.txtMoney = this.container.getChildByName("txtMoney").getComponent(cc.Label);
        this.mcAvatar = this.container.getChildByName("mcAvatar");
        this.mcCycle = this.container.getChildByName("mcCycle");
        this.mcExit = this.container.getChildByName("mcExit");

    },

    initialize: function () {
        this.hide();
        this.showCycleCount(false);
        this.mcExit.active = false;
    },

    //////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////override//////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////

    sitdown: function (seatId, user) {
        if (this.seatId !== seatId) return;
        this.mcExit.active = user.regQuit;
        this.txtName.string = user.displayName;
        this.txtMoney.string = Utility.formatCurrency(user.gold());
        this.updateAvatar(user.avatar);
        this.show();
    },

    standup: function (seatId) {
        if (this.seatId !== seatId) return;
        this.mcExit.active = false;
        this.hide();
    },

    updateUserInfo: function (seatId, user) {
        if (this.seatId !== seatId) return;

        this.txtName.string = user.displayName;
        this.txtMoney.string = Utility.formatCurrency(user.gold());
    },

    userExitGame: function (seatId) {
        if (this.seatId !== seatId) return;
        this.hide();
    },

    updateCurrentTurn: function () {
        if (!this.mcCycle) return;

        var seat = this.tableVO.getSeatByUserId(this.tableVO.curTurn);
        if (seat && this.seatId === seat.id) {
            var timeLeft = (this.tableVO.timeLeft === undefined || this.tableVO.timeLeft === -1) ? this.tableVO.TURN_TIME : this.tableVO.timeLeft;
            this.removeTimer();
            this.onStartTimer(timeLeft);
        } else {
            this.removeTimer();
            this.showCycleCount(false);
        }
    },

    finishGame: function (listResult) {
        this.removeTimer();
        this.showCycleCount(false);
    },

    leaveGame: function () {
        this.hide();
    },

    registerQuit: function (seatId, isQuit) {
        if (this.seatId !== seatId) return;
        this.mcExit.active = isQuit;
    },


    //////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////

    updateAvatar: function (avatar) {
        var avatarControl = this.mcAvatar.getComponent("Avatar");
        if (avatarControl) {
            avatarControl.updateImg(avatar);
        }
    },

    onStartTimer: function (timeLeft) {
        this.timeLeft = (timeLeft === undefined) ? 0 : timeLeft;
        this.showAnimCycle(0);
        this.timer = setInterval(this.onTimer.bind(this), this.MILISECS);
        this.showCycleCount(true);
    },

    onTimer: function () {
        this.timeLeft++;
        var esTime = (1000 / this.MILISECS);
        if (this.timeLeft <= this.tableVO.TURN_TIME * esTime) {
            this.showAnimCycle(1 - this.timeLeft / (this.tableVO.TURN_TIME * esTime));
        } else {
            this.removeTimer();
            this.showCycleCount(false);

            this.container.emit(GameEvent.FINISH_TURN);
        }
    },

    showAnimCycle: function (fillRange) {
        if (!this.mcCycle) return;

        var sprite = this.mcCycle.getComponent(cc.Sprite);
        sprite.fillRange = fillRange;
    },

    showCycleCount: function (isShow) {
        if (!this.mcCycle) return;
        this.mcCycle.active = isShow;
    },

    removeTimer: function () {
        clearInterval(this.timer);
        this.timer = null;
    }
});
