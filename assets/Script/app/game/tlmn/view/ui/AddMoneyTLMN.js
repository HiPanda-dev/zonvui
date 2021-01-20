var AddMoney = require('AddMoney');
var AddMoneyTLMN = cc.Class({
    extends: AddMoney,

    initComponent: function (componentId, container) {
        AddMoney.prototype.initComponent.call(this, componentId, container);
    },

    //////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////override////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////

    finishGame: function (listResult) {
        var resultVO = listResult.getResultBySeatId(this.seatId);
        if (!resultVO) return;
        this.showEarnMoney(resultVO.earnMoney);
    },

    finishGameWinWhite:function (arrCards, type) {
        TweenLite.delayedCall(this.tableVO.TIME_DISPLAY_WIN_WITE_CARDS, function () {
            var seat = this.tableVO.getSeatBySeatId(this.seatId);
            if(seat && seat.user){
                this.showEarnMoney(seat.earnMoney);
            }
        }.bind(this))
    },


    //////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////


});

AddMoneyTLMN.create = function (componentId, container) {
    var component = new AddMoneyTLMN();
    component.initComponent(componentId, container);
    return component;
};

module.exports = AddMoneyTLMN;