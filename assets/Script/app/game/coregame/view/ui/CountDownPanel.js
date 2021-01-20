var Component = require("Component");
var CountDownPanel = cc.Class({
    extends: Component,

    initComponent:function (componentId, container) {
        Component.prototype.initComponent.call(this, componentId, container);
        this.tableVO = null;
        this.timeLeft = 0;
        this.timer = null;
    },


    applyLayout: function () {
        this.txtTime = this.container.getChildByName("txtTime").getComponent(cc.Label);
    },

    initialize: function () {
        this.hide();
    },

    userExitGame:function (seatId) {
        if(this.tableVO.getNumPlayerWait() === 1){
            this.removeTimer();
            this.hide();
        }
    },

    leaveGame:function () {
        this.removeTimer();
        this.hide();
    },

    //////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////

    countDownStartGame: function (timeLeft) {
        if(this.timer) this.removeTimer();
        this.txtTime.string = timeLeft.toString();
        this.timeLeft = timeLeft;
        this.timer = setInterval(this.onTimer.bind(this), 1000);
        this.show();
    },

    onTimer: function () {
        this.timeLeft--;
        if (this.timeLeft > 0) {
            this.txtTime.string = this.timeLeft.toString();

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

CountDownPanel.create = function(componentId, container){
    var component = new CountDownPanel();
    component.initComponent(componentId, container);
    return component;
};

module.exports = CountDownPanel;