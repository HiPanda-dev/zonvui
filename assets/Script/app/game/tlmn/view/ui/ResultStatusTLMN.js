var Component = require('Component');
var ResultStatusTLMN = cc.Class({
    extends: Component,

    initComponent: function (componentId, container) {
        Component.prototype.initComponent.call(this, componentId, container);

        this.tableVO = null;
    },

    applyLayout: function () {
        this.mcWin = this.container.getChildByName("mcWin");
        this.mcLose = this.container.getChildByName("mcLose");
    },

    initialize: function () {
        this.mcWin.active = false;
        this.mcLose.active = false;
    },

    //////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////override////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////
    startGame: function () {
        this.hide();
    },

    finishGame: function (listResult) {
        var resultVO = listResult.getResultBySeatId(this.tableVO.mySeatId);
        if (!resultVO) return;
        this.showWinLoseResult();
        this.show();

        TweenLite.delayedCall(this.tableVO.TIME_SHOW_RESULT, function () {
            this.hide();
        }.bind(this))
    },

    finishGameWinWhite: function (arrCards, type) {
        this.hide();
        TweenLite.delayedCall(this.tableVO.TIME_DISPLAY_WIN_WITE_CARDS, function () {
            var seat = this.tableVO.getSeatBySeatId(this.tableVO.mySeatId);
            if (seat && seat.cards && seat.cards.length > 0) {
                var isWin = (seat.earnMoney > 0) ? true : false;
                this.mcWin.active = isWin;
                this.mcLose.active = !isWin;
                this.show();
            }
        }.bind(this))
    },
    //////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////

    showWinLoseResult: function () {
        var seat = this.tableVO.getSeatBySeatId(this.tableVO.mySeatId);
        if (seat) {
            this.mcWin.active = seat.isWin;
            this.mcLose.active = !seat.isWin;

            TweenLite.from(this.mcWin, 0.5, {
                scaleX: 0.2,
                scaleY: 0.2,
                alpha: 0,
                ease: Back.easeOut.config(1.2)
            });
            TweenLite.from(this.mcLose, 0.5, {
                scaleX: 0.2,
                scaleY: 0.2,
                alpha: 0,
                ease: Back.easeOut.config(1.2)
            });
        }
    }
});

ResultStatusTLMN.create = function (componentId, container) {
    var component = new ResultStatusTLMN();
    component.initComponent(componentId, container);
    return component;
};

module.exports = ResultStatusTLMN;