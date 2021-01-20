var PlayerTable = require("PlayerTable");
var PlayerTableTLMN = cc.Class({
    extends: PlayerTable,

    buildUI: function () {
        PlayerTable.buildUI.applyLayout.call(this);
    },

    applyLayout: function () {
        PlayerTable.prototype.applyLayout.call(this);

        var mcStatus = this.container.getChildByName("mcStatus");
        this.mcCancel = mcStatus.getChildByName("mcCancel");
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
    },

    countDownStartGame: function (timeLeft) {
        PlayerTable.prototype.countDownStartGame.call(this, timeLeft);
    },

    endRound: function () {
        PlayerTable.prototype.endRound.call(this);
    },

    cancelTurn: function (seatId) {
        PlayerTable.prototype.cancelTurn.call(this, seatId);
        if (this.seatId !== seatId) return;
        this.mcCancel.active = true;
        TweenLite.delayedCall(2, function () {
            this.mcCancel.active = false;
        }.bind(this));
    },

    finishGame: function (listResult) {
        PlayerTable.prototype.finishGame.call(this, listResult);
        this.hideAllMovie();
    },

    finishGameWinWhite:function (arrCards, type) {
        this.removeTimer();
        this.showCycleCount(false);
        this.hideAllMovie();
    },

    hideReadyGame:function () {

    },

    //////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////

    hideAllMovie: function () {
        this.mcCancel.active = false;
    }

});

PlayerTableTLMN.create = function (componentId, container) {
    var component = new PlayerTableTLMN();
    component.initComponent(componentId, container);
    return component;
};

module.exports = PlayerTableTLMN;