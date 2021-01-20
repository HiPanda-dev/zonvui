var StatusPlaceCardsTLMN = require('StatusPlaceCardsTLMN');
var StatusPlaceCardsSam = cc.Class({
    extends: StatusPlaceCardsTLMN,

    initComponent: function (componentId, container) {
        StatusPlaceCardsTLMN.prototype.initComponent.call(this, componentId, container);
    },

    applyLayout: function () {
        StatusPlaceCardsTLMN.prototype.applyLayout.call(this);
    },

    initialize: function () {
        StatusPlaceCardsTLMN.prototype.initialize.call(this);
    },

    //////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////override////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////

    finishGame: function (listResult) {
        var seatBaoSam =  this.tableVO.getSeatBySeatId(this.tableVO.seatIdBaoSam);
        if(!seatBaoSam) return;
        if(seatBaoSam.isWin) this.statusPlaceControl.showSpecial(4);
        else this.statusPlaceControl.showSpecial(5);
    }
    //////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////

});

StatusPlaceCardsSam.create = function (componentId, container) {
    var component = new StatusPlaceCardsSam();
    component.initComponent(componentId, container);
    return component;
};

module.exports = StatusPlaceCardsSam;