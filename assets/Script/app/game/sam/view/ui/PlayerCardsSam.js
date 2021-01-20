var PlayerCardsTLMN = require('PlayerCardsTLMN');
var LogicSam = require('LogicSam');
var Utility = require('Utility');

var PlayerCardsSam = cc.Class({
    extends: PlayerCardsTLMN,

    initComponent: function (componentId, container) {
        PlayerCardsTLMN.prototype.initComponent.call(this, componentId, container);
    },

    applyLayout: function () {
        PlayerCardsTLMN.prototype.applyLayout.call(this);
    },

    initialize: function () {
        PlayerCardsTLMN.prototype.initialize.call(this);
    },

    //////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////override////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////


    //////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////
    //override
    selectCardSuit:function (cardId) {
        if (!this.enableSelectCardSuit) return false;
        if (this.cardAcceptArr.length > 1) return false;
        var cards = [];
        var cardsNeedBeat = [];
        for (var i = 0; i < this.vtCardList.length; i++) {
            cards.push(this.vtCardList[i].id);
        }
        for (i = 0; i < this.tableVO.playCards.length; i++) {
            cardsNeedBeat.push(this.tableVO.playCards[i]);
        }
        var objCard = null;
        if (cardsNeedBeat.length > 0) objCard = LogicSam.getCardSuit(cards, cardId, cardsNeedBeat);
        else objCard = LogicSam.getAutoSelectCard(cards, cardId, this.cardAcceptArr);

        if (objCard) {
            for (i = 0; i < this.vtCardList.length; i++) {
                for (var j = 0; j < objCard.card.length; j++) {
                    if (this.vtCardList[i].id === objCard.card[j]) {
                        TweenLite.to(this.vtCardList[i], 0.2, {
                            x: this.vtCardList[i].x,
                            y: this.marginY + this.CARD_SELECTED_SPACE
                        });
                        this.cardAcceptArr.push(this.vtCardList[i].id);
                        break;
                    }
                }
            }
            Utility.removeDuplicateArray(this.cardAcceptArr);
            return true;
        } else {
            return false;
        }
    }
});

PlayerCardsSam.create = function (componentId, container) {
    var component = new PlayerCardsSam();
    component.initComponent(componentId, container);
    return component;
};

module.exports = PlayerCardsSam;