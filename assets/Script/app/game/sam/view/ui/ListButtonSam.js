var ListButtonTLMN = require('ListButtonTLMN');
var LogicSam = require("LogicSam");

var ListButtonSam = cc.Class({
    extends: ListButtonTLMN,

    initComponent: function (componentId, container) {
        ListButtonTLMN.prototype.initComponent.call(this, componentId, container);
    },

    applyLayout: function () {
        ListButtonTLMN.prototype.applyLayout.call(this);
    },

    initialize: function () {
        ListButtonTLMN.prototype.initialize.call(this);
    },

    //////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////override////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////


    //////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////

    //override
    checkEnablePlayCards:function (cardShot) {
        if(this.tableVO.curTurn !== this.tableVO.myId){
            this.setEnableButton(this.btnDanhBai, false);
            return;
        }
        var cardType = -1;
        var playCards = this.tableVO.playCards.concat();

        if (cardShot.length === 1) cardType = LogicSam.OTHER_CODE_SINGLE;
        if (cardShot.length === 2 && LogicSam.isSameNumber(cardShot)) cardType = LogicSam.OTHER_CODE_PAIR;
        if (cardShot.length === 3 && LogicSam.isSameNumber(cardShot)) cardType = LogicSam.OTHER_CODE_TRIPLE;
        if (LogicSam.isTuQuy(cardShot)) cardType = LogicSam.OTHER_CODE_FOUR_OF_AKIND;
        else if (LogicSam.isBoSanh(cardShot)) cardType = LogicSam.OTHER_CODE_STRAIGHT;
        else if (LogicSam.isDoiThong(cardShot)) cardType = LogicSam.OTHER_CODE_PAIR_SEQUENCES;

        if (!LogicSam.isCardValid(cardShot, cardType, playCards)) {
            this.setHintObject(this.icon_hint_danh, false);
            this.setHintObject(this.icon_hint_bo, false);
        } else if (cardType === -1) {
            this.setHintObject(this.icon_hint_danh, false);
            this.setHintObject(this.icon_hint_bo, false);
        }else{
            this.setHintObject(this.icon_hint_danh, true);
        }
    },
});

ListButtonSam.create = function (componentId, container) {
    var component = new ListButtonSam();
    component.initComponent(componentId, container);
    return component;
};

module.exports = ListButtonSam;