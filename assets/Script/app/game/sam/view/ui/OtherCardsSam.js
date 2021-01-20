var OtherCardsTLMN = require('OtherCardsTLMN');
var OtherCardsSam = cc.Class({
    extends: OtherCardsTLMN,

    initComponent: function (componentId, container) {
        OtherCardsTLMN.prototype.initComponent.call(this, componentId, container);
    },

    applyLayout: function () {
        OtherCardsTLMN.prototype.applyLayout.call(this);
        this.icon1La = this.container.getChildByName("icon_1_la");
    },

    initialize: function () {
        OtherCardsTLMN.prototype.initialize.call(this);
        this.icon1La.active = false;
    },

    //////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////override////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////

    updateNumText: function () {
        OtherCardsTLMN.prototype.updateNumText.call(this);
        var seat = this.tableVO.getSeatBySeatId(this.seatId);
        if (seat.cardNrReminder === 0) {
            this.hide();
            return;
        }

        this.icon1La.active = (seat.cardNrReminder === 1)?true:false;
    }

    //////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////

});

OtherCardsSam.create = function (componentId, container) {
    var component = new OtherCardsSam();
    component.initComponent(componentId, container);
    return component;
};

module.exports = OtherCardsSam;