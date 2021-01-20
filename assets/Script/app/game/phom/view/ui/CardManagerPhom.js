var Component = require("Component");
var CardManagerPhom = cc.Class({
    extends: Component,

    initComponent: function (componentId, container) {
        Component.prototype.initComponent.call(this, componentId, container);
    },

    buildUI: function () {
        this.tableVO = null;

        this.label = null;
        this.cardNumber = 0;
    },

    applyLayout: function () {
        this.label = this.container.getChildByName("Label").getComponent(cc.Label);
        this.hide();
    },

    initialize: function () {

    },

    //////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////override//////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////

    dealCards: function () {
        this.cardNumber = this.tableVO.TOTAL_CARDS;
        var playingArray = this.tableVO.getPlayingSeatList();
        this.cardNumber -= playingArray.length * 9 + 1;
        this.label.string = this.cardNumber;
        this.show();
    },

    finishGame: function (listResult) {
        this.hide();
    },

    showCards:function (seatId, cards) {
        this.cardNumber = this.tableVO.cardRemain;
        this.label.string = this.cardNumber;
        this.show();
    },

    drawCard: function (cardId) {
        this.cardNumber--;
        this.label.string = this.cardNumber;
    }
});


CardManagerPhom.create = function (componentId, container) {
    var component = new CardManagerPhom();
    component.initComponent(componentId, container);
    return component;
};

module.exports = CardManagerPhom;
