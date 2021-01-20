var Component = require('Component');
var PhomCard = require('PhomCard');
var Utility = require('Utility');
var GameConfig = require('GameConfig');
var ResultTablePhom = cc.Class({
    extends: Component,

    initComponent: function (componentId, container) {
        Component.prototype.initComponent.call(this, componentId, container);

        this.SCALE = 1;
        this.tableVO = null;
        this.seatId = -1;
        this.vtCardList = [];
    },

    applyLayout: function () {
        var mcStatus = this.container.getChildByName("mcStatus");

        this.mcWin = mcStatus.getChildByName("mcWin");
        this.mcLose = mcStatus.getChildByName("mcLose");
        this.u = mcStatus.getChildByName("u");
        this.uTron = mcStatus.getChildByName("uTron");
        this.uKhan = mcStatus.getChildByName("uKhan");
        this.mom = mcStatus.getChildByName("mom");
        this.biDen = mcStatus.getChildByName("biDen");

    },

    initialize: function () {
        this.hide();
    },

    setup: function (seatId, tableVO) {
        this.tableVO = tableVO;
        this.seatId = seatId;
    },

    //////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////override////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////
    startGame: function () {
        this.hide();
        this.clearAllCards();
    },

    finishGame: function (listResult) {
        var resultVO = this.getResultBySeatId(this.seatId, listResult);
        if (!resultVO) return;
        this.showWinLoseResult();
        this.show();

        TweenLite.delayedCall(this.tableVO.TIME_SHOW_RESULT,function () {
            this.hide();
        }.bind(this))
    },

    getResultBySeatId:function (seatId, listResult) {
        for(var i=0;i< listResult.length;i++){
            var vo = this.tableVO.getSeatByUserId(listResult[i].uid);
            if(vo.id === seatId){
                return vo;
            }
        }
        return null;
    },
    //////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////

    hideAllMovie: function () {
        this.mcWin.active = false;
        this.mcLose.active = false;
        this.u.active = false;
        this.uTron.active = false;
        this.uKhan.active = false;
        this.mom.active = false;
        this.biDen.active = false;
    },

    showWinLoseResult: function () {
        this.hideAllMovie();
        var resultVO = this.tableVO.getSeatBySeatId(this.seatId);
        if(resultVO.resultPosition === 0)
        {
            switch (resultVO.point)
            {
                case 0:
                    this.u.active = true;
                    this.u.getComponent(dragonBones.ArmatureDisplay).playAnimation("start", 1);
                    break;
                case -5:
                    this.uKhan.active = true;
                    this.uKhan.getComponent(dragonBones.ArmatureDisplay).playAnimation("start", 1);
                    break;
                case -6:
                    this.uTron.active = true;
                    this.uTron.getComponent(dragonBones.ArmatureDisplay).playAnimation("start", 1);
                    break;
                case -7:
                    this.u.active = true;
                    this.u.getComponent(dragonBones.ArmatureDisplay).playAnimation("start", 1);
                    break;
                default:
                    this.mcWin.active = true;
                    this.mcWin.getComponent(dragonBones.ArmatureDisplay).playAnimation("start", 1);
            }
        }
        else
        {
            switch (resultVO.point)
            {
                case -1:
                    this.mom.active = true;
                    //this.mom.getComponent(dragonBones.ArmatureDisplay).playAnimation("start", 1);
                    break;
                case -2:
                    this.biDen.active = true;
                    //this.biDen.getComponent(dragonBones.ArmatureDisplay).playAnimation("start", 1);
                    break;
                default:
                    this.mcLose.active = true;
                    this.mcLose.getComponent(dragonBones.ArmatureDisplay).playAnimation("start", 1);
            }
        }
    },

    setWinResult:function (isWin) {
        this.mcWin.active = isWin;
        this.mcLose.active = !isWin;

        this.mcWin.getComponent(dragonBones.ArmatureDisplay).playAnimation("start", 1);
        this.mcLose.getComponent(dragonBones.ArmatureDisplay).playAnimation("start", 1);
    },


    showCardsResult: function (listCards) {
        this.clearAllCards();
        if (!listCards || listCards.length === 0) return;

        Utility.sortArray(listCards, "NUMERIC");
        for (var i = 0; i < listCards.length; i++) {
            var cardId = listCards[i];
            var cardNode = new PhomCard.create(cardId, true);
            this.addCard(cardNode);
        }

        this.updatePositionCard();
    },

    updatePositionCard: function () {
        if (this.seatId !== 2) return;

        var count = 0;
        for (var i = this.vtCardList.length - 1; i >= 0; i--) {
            var card = this.vtCardList[i];
            card.x = this.marginX + this.space - (count * this.space);
            count++;
        }
    },

    addCard: function (card) {
        if (card === null) return;
        card.setAnchorPoint(0, 1);
        card.scaleX = card.scaleY = this.SCALE;
        card.zIndex = this.container.childrenCount;
        card.x = this.marginX + this.vtCardList.length * this.space;
        card.y = this.marginY;
        this.container.addChild(card);
        this.vtCardList.push(card);
    },

    clearAllCards: function () {
        for (var i = 0; i < this.vtCardList.length; i++) {
            var card = this.vtCardList[i];
            this.container.removeChild(card);
            card.destroy();
        }

        this.vtCardList = [];
    }
});

ResultTablePhom.create = function (componentId, container) {
    var component = new ResultTablePhom();
    component.initComponent(componentId, container);
    return component;
};

module.exports = ResultTablePhom;