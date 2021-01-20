var Component = cc.Class({
    extends: cc.Node,

    initComponent:function (componentId, container) {
        this.name = componentId;
        this.componentId = componentId;
        this.container = container;
        this.parentNode/*Composite*/ = null;
        this.isEnable = true;
    },

    buildUI: function () {},

    applyLayout: function () {},

    initialize: function () {},

    addEventListeners: function () {},

    removeEventListeners: function () {},

    sitdown: function (seatId, user) {},

    standup: function (seatId) {},

    updateUserInfo: function (seatId, user) {},

    updateMoney: function (seatId, addMoney) {},

    leaveGame: function () {},

    userExitGame: function (seatId) {},

    countDownStartGame: function (timeLeft) {},

    startGame: function () {},

    dealCards: function () {},

    dealRandomCard: function () {},

    updateCurrentTurn: function () {},

    placeCard: function (playCards, startPlayCards, seatId) {},

    endRound: function () {},

    showCards: function (seatId, arrCards) {},

    showCardsPlace: function (arrCards) {},

    finishCoundownTime: function () {},

    cancelTurn: function (seatId) {},

    finishGame: function (listResult) {},

    finishGameWinWhite: function (arrCards, type) {},

    baoSam: function (seatId, sam) {},

    showBaoSamState: function () {},

    sortFinishBinh:function (seatId, isSort) {},

    soChi:function (seatId, indexChi) {},

    binhLung:function (seatId, isLung) {},

    mauBinh:function (seatId) {},

    sapHam:function () {},

    sapLang:function (seatId) {},

    batSapLang:function (seatId) {},

    showAllCardsBinh:function (seatId, isFaceUp) {},

    hideResultBinh:function () {},

    drawCard:function (seatId) {},

    startBettingGame:function () {},

    stopBettingGame:function () {},

    discard:function (card,userId,nextTurn) {},

    diceResult:function (arrDice, arrPos) {},

    updateOwner:function () {},

    showBuyMasterGame:function () {},

    updateGameState:function () {},

    soldBet:function (type) {},

    snapWithPlayer:function () {},

    hideReadyGame:function () {},

    countDownDestroyGame:function (time) {},

    hideTextChi:function () {},

    updateUserViewState:function () {},

    registerQuit:function (seatId, isQuit) {},

    ///////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////
    meDrawCard:function (card) {},

    stealCard:function (card,userId,moneyAR,moneyBR) {},

    downCard:function (cards,userId,index) {},

    downCardFinish:function (userId) {},

    sendCard:function (cards,userId,index,playerDes) {},

    sendCardFinish:function (userId) {},

    destroy:function () {
        if(this.container){
            this.container.removeAllChildren();
            this.container.destroy();
        }
    },

    setParent: function (compositeNode) {
        this.parentNode = compositeNode;
    },

    setEnabled: function (isEnable) {
        this.isEnable = isEnable;
    },

    getComposite: function () {
        return null;
    },
    removeParentRef: function () {
        this.parentNode = null;
    },

    show: function () {
        if (this.container) this.container.active = true;
    },

    hide: function () {
        if (this.container) this.container.active = false;
    },

    hideFromStage: function (btn) {
        btn.y = - cc.director.getWinSize().height;
    },

    showInStage: function (btn,yCordinate) {
        btn.y = yCordinate;
    },

    showChatContent: function () {},

    zoomOutCards: function () {},

    zoomInCards: function () {},

    swapOtherPlayerCards: function () {},

    finishSortChi: function () {}


});

module.exports = Component;