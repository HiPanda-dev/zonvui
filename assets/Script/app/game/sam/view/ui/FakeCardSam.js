var FakeCardTLMN = require('FakeCardTLMN');
var FakeCardSam = cc.Class({
    extends: FakeCardTLMN,

    initComponent: function (componentId, container) {
        FakeCardTLMN.prototype.initComponent.call(this, componentId, container);
    },

    applyLayout: function () {
        FakeCardTLMN.prototype.applyLayout.call(this);
        this.player5 = this.container.getChildByName("player5");
    },

    initialize: function () {
        FakeCardTLMN.prototype.initialize.call(this);
        this.setupPlayerCards(this.player5, 4);
    },

    //////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////override////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////


    //////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////

    //override
    getMaxCardPlayer:function () {
        return 10;
    },

    //override
    getPlayerIndex: function (index) {
        FakeCardTLMN.prototype.getPlayerIndex.call(this, index);
        if (index === 4) return this.player5;
    },

    //override
    getIndexByPlayer: function (player) {
        FakeCardTLMN.prototype.getIndexByPlayer.call(this, player);
        if (player === this.player5) return 4;
    }
});

FakeCardSam.create = function (componentId, container) {
    var component = new FakeCardSam();
    component.initComponent(componentId, container);
    return component;
};

module.exports = FakeCardSam;