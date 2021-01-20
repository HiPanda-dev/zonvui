var AddMoney = require('AddMoney');
var AddMoneyPhom = cc.Class({
    extends: AddMoney,

    initComponent: function (componentId, container) {
        AddMoney.prototype.initComponent.call(this, componentId, container);
    },

    //////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////override////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////

    stealCard: function (card,userId,moneyAR,moneyBR) {
        var stealerSeat = this.tableVO.getSeatByUserId(userId);
        var stealedPlayerSeat = this.tableVO.getPreviousSeat(stealerSeat.id);

        if(this.seatId === stealerSeat.id)
            this.showEarnMoney(moneyAR);
        else if(this.seatId === stealedPlayerSeat.id)
            this.showEarnMoney(moneyBR);
    },

    finishGame: function (listResult) {
        var resultVO = this.getResultBySeatId(this.seatId, listResult);
        if (!resultVO) return;
        this.showWinLoseResult();
    },

    showWinLoseResult: function () {
        var resultVO = this.tableVO.getSeatBySeatId(this.seatId);
        if(resultVO.resultPosition === 0)this.showEarnMoney(resultVO.earnMoney);
        else this.showEarnMoney(resultVO.earnMoney * -1);
    },

    getResultBySeatId:function (seatId, listResult) {
        for(var i=0;i< listResult.length;i++){
            var vo = this.tableVO.getSeatByUserId(listResult[i].uid);
            if(vo.id === seatId){
                return vo;
            }
        }
        return null;
    }

    //////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////


});

AddMoneyPhom.create = function (componentId, container) {
    var component = new AddMoneyPhom();
    component.initComponent(componentId, container);
    return component;
};

module.exports = AddMoneyPhom;