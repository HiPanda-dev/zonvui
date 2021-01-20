var Component = require('Component');
var LogicTLMN = require('LogicTLMN');
var CardVO = require('CardVO');
var StatusPlaceCardsTLMN = cc.Class({
    extends: Component,

    initComponent: function (componentId, container) {
        Component.prototype.initComponent.call(this, componentId, container);
    },

    initialize: function () {
        this.statusPlaceControl = this.container.getComponent('StatusPlaceControl');
        this.show();
    },

    //////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////override////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////
    placeCard: function (playCards,startPlayCards, seatId) {
        this.checkShowSpecialCards(playCards);
    },

    finishGameWinWhite:function (arrCards, type) {
        this.statusPlaceControl.showWinWhite(type, this.tableVO.TIME_DISPLAY_WIN_WITE_CARDS);
    },

    //////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////
    checkShowSpecialCards:function (arrCards) {
        var cardType = LogicTLMN.getTypeFromVtCards(arrCards);
        if(cardType === LogicTLMN.OTHER_CODE_FOUR_OF_AKIND){
            this.statusPlaceControl.showSpecial(0);
        }else if(cardType === LogicTLMN.OTHER_CODE_PAIR_SEQUENCES){
            if(arrCards.length === 6){
                this.statusPlaceControl.showSpecial(1);
            }else if(arrCards.length === 8){
                this.statusPlaceControl.showSpecial(2);
            }
        }else if(cardType === LogicTLMN.OTHER_CODE_SINGLE){
            var cardVO = new CardVO(arrCards[0]);
            if(cardVO.num === CardVO.CARD_3 && cardVO.type === CardVO.TYPE_SPADE){
                this.statusPlaceControl.showSpecial(32);
            }
        }
    },
});

StatusPlaceCardsTLMN.create = function (componentId, container) {
    var component = new StatusPlaceCardsTLMN();
    component.initComponent(componentId, container);
    return component;
};

module.exports = StatusPlaceCardsTLMN;