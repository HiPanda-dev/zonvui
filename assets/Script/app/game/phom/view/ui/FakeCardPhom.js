var FakeCard = require('FakeCard');
var Utility = require('Utility');
var FakeCardPhom = cc.Class({
    extends: FakeCard,

    initComponent: function (componentId, container) {
        FakeCard.prototype.initComponent.call(this, componentId, container);
    },

    applyLayout: function () {
        FakeCard.prototype.applyLayout.call(this);

        this.player1 = this.container.getChildByName("player1");
        this.player2 = this.container.getChildByName("player2");
        this.player3 = this.container.getChildByName("player3");
        this.player4 = this.container.getChildByName("player4");

        this.mcAllCards = this.container.getChildByName("mcAllCards");
        this.card1 = this.mcAllCards.getChildByName("mcCard1");
        this.card2 = this.mcAllCards.getChildByName("mcCard2");
        this.card3 = this.mcAllCards.getChildByName("mcCard3");

        this.toggleGroup = this.container.getChildByName("toggleGroup");

        this.btnClearAll = this.container.getChildByName("btnClearAll");
        this.btnCancel = this.container.getChildByName("btnCancel");
        this.btnRandom = this.container.getChildByName("btnRandom");

        this.playerCard1 = this.player1.getChildByName("mcCard1");
        this.playerCard2 = this.player1.getChildByName("mcCard2");

        this.setupUI();
    },

    setupUI: function () {
        this.posX = this.card1.x;
        this.posY = this.card1.y;
        this.spaceW = this.card2.x - this.card1.x;
        this.spaceH = this.card3.y - this.card1.y;
        this.scale = this.card1.scaleX;

        this.playerPosCardsX = this.playerCard1.x;
        this.playerPosCardsY = this.playerCard1.y;
        this.playerSpaceCard = this.playerCard2.x - this.playerCard1.x;

        this.mcAllCards.removeChild(this.card1);
        this.mcAllCards.removeChild(this.card2);
        this.mcAllCards.removeChild(this.card3);

        this.btnClearAll.on(cc.Node.EventType.TOUCH_START, this.onClearAll, this);
        this.btnCancel.on(cc.Node.EventType.TOUCH_START, this.onCancel, this);
        this.btnRandom.on(cc.Node.EventType.TOUCH_START, this.onRandom, this);

        this.setupAllCards();
        this.setupPlayerCards(this.player1, 0);
        this.setupPlayerCards(this.player2, 1);
        this.setupPlayerCards(this.player3, 2);
        this.setupPlayerCards(this.player4, 3);
    },

    //ovrride
    getPlayerIndex: function (index) {
        if (index === 0) return this.player1;
        if (index === 1) return this.player2;
        if (index === 2) return this.player3;
        if (index === 3) return this.player4;
    },

    //ovrride
    getIndexByPlayer: function (player) {
        if (player === this.player1) return 0;
        if (player === this.player2) return 1;
        if (player === this.player3) return 2;
        if (player === this.player4) return 3;
    },

    //override
    getMaxCardPlayer:function () {
        return 10;
    },

});

FakeCardPhom.create = function (componentId, container) {
    var component = new FakeCardPhom();
    component.initComponent(componentId, container);
    return component;
};

module.exports = FakeCardPhom;