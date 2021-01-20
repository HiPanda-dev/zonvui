var Component = require('Component');
var Composite = cc.Class({
    extends: Component,

    initComponent:function (componentId, container) {
        Component.prototype.initComponent.call(this, componentId, container);
        this.vtChildren = [];
    },

    buildUI: function () {
        this.callFunction("buildUI", arguments);
    },

    applyLayout: function () {
        this.callFunction("applyLayout", arguments);
    },

    initialize: function () {
        this.callFunction("initialize", arguments);
    },

    addEventListeners: function () {
        this.callFunction("addEventListeners", arguments);
    },

    removeEventListeners:function () {
        this.callFunction("removeEventListeners", arguments);
    },

    sitdown: function (seatId, user) {
        this.callFunction("sitdown", arguments);
    },

    standup: function (seatId) {
        this.callFunction("standup", arguments);
    },

    updateUserInfo: function (seatId, user) {
        this.callFunction("updateUserInfo", arguments);
    },

    updateMoney: function (seatId, addMoney) {
        this.callFunction("updateMoney", arguments);
    },

    leaveGame: function () {
        this.callFunction("leaveGame", arguments);
    },

    userExitGame: function (seatId) {
        this.callFunction("userExitGame", arguments);
    },

    countDownStartGame: function (timeLeft) {
        this.callFunction("countDownStartGame", arguments);
    },

    startGame: function () {
        this.callFunction("startGame", arguments);
    },

    dealCards: function () {
        this.callFunction("dealCards", arguments);
    },

    dealRandomCard: function () {
        this.callFunction("dealRandomCard", arguments);
    },

    updateCurrentTurn: function () {
        this.callFunction("updateCurrentTurn", arguments);
    },

    placeCard: function (playCards, startPlayCards, seatId) {
        this.callFunction("placeCard", arguments);
    },

    endRound: function () {
        this.callFunction("endRound", arguments);
    },

    showCards: function (seatId, arrCards) {
        this.callFunction("showCards", arguments);
    },

    showCardsPlace: function (arrCards) {
        this.callFunction("showCardsPlace", arguments);
    },

    finishCoundownTime: function () {
        this.callFunction("finishCoundownTime", arguments);
    },

    cancelTurn: function (seatId) {
        this.callFunction("cancelTurn", arguments);
    },

    finishGame: function (listResult) {
        this.callFunction("finishGame", arguments);
    },

    finishSortChi: function (listResult) {
        this.callFunction("finishSortChi", arguments);
    },

    destroy:function () {
        this.callFunction("destroy", arguments);
    },

    finishGameWinWhite: function (arrCards, type) {
        this.callFunction("finishGameWinWhite", arguments);
    },

    baoSam: function (seatId, sam) {
        this.callFunction("baoSam", arguments);
    },

    showBaoSamState: function () {
        this.callFunction("showBaoSamState", arguments);
    },

    sortFinishBinh:function (seatId, isSort) {
        this.callFunction("sortFinishBinh", arguments);
    },

    soChi:function (seatId, indexChi) {
        this.callFunction("soChi", arguments);
    },

    binhLung:function (seatId, isLung) {
        this.callFunction("binhLung", arguments);
    },

    mauBinh:function (seatId) {
        this.callFunction("mauBinh", arguments);
    },

    sapHam:function () {
        this.callFunction("sapHam", arguments);
    },

    sapLang:function (seatId) {
        this.callFunction("sapLang", arguments);
    },

    batSapLang:function (seatId) {
        this.callFunction("batSapLang", arguments);
    },

    showAllCardsBinh:function (seatId, isFaceUp) {
        this.callFunction("showAllCardsBinh", arguments);
    },

    hideResultBinh:function () {
        this.callFunction("hideResultBinh", arguments);
    },

    startBettingGame:function () {
        this.callFunction("startBettingGame", arguments);
    },
    drawCard:function (seatId) {
        this.callFunction("drawCard", arguments);
    },

    stopBettingGame:function () {
        this.callFunction("stopBettingGame", arguments);
    },

    diceResult:function (arrDice, arrPos) {
        this.callFunction("diceResult", arguments);
    },

    updateOwner:function () {
        this.callFunction("updateOwner", arguments);
    },

    showBuyMasterGame:function () {
        this.callFunction("showBuyMasterGame", arguments);
    },

    updateGameState:function () {
        this.callFunction("updateGameState", arguments);
    },

    soldBet:function (type) {
        this.callFunction("soldBet", arguments);
    },

    discard:function (card,userId,nextTurn) {
        this.callFunction("discard", arguments);
    },

    meDrawCard:function (card) {
        this.callFunction("meDrawCard", arguments);
    },

    stealCard:function (card,userId,moneyAR,moneyBR) {
        this.callFunction("stealCard", arguments);
    },

    downCard:function (cards,userId,index) {
        this.callFunction("downCard", arguments);
    },

    downCardFinish:function (userId) {
        this.callFunction("downCardFinish", arguments);
    },

    sendCard:function (cards,userId,index,playerDes) {
        this.callFunction("sendCard", arguments);
    },

    sendCardFinish:function (userId) {
        this.callFunction("sendCardFinish", arguments);
    },

    snapWithPlayer:function (userId) {
        this.callFunction("snapWithPlayer", arguments);
    },

    hideReadyGame:function () {
        this.callFunction("hideReadyGame", arguments);
    },

    countDownDestroyGame:function () {
        this.callFunction("countDownDestroyGame", arguments);
    },

    hideTextChi:function () {
        this.callFunction("hideTextChi", arguments);
    },

    updateUserViewState:function () {
        this.callFunction("updateUserViewState", arguments);
    },

    zoomOutCards:function () {
        this.callFunction("zoomOutCards", arguments);
    },

    zoomInCards:function () {
        this.callFunction("zoomInCards", arguments);
    },

    swapOtherPlayerCards: function () {
        this.callFunction("swapOtherPlayerCards", arguments);
    },

    registerQuit:function (seatId, isQuit) {
        this.callFunction("registerQuit", arguments);
    },

    // ///////////////////////////////////////////////////////////////////////////////////////////////////////
    // ///////////////////////////////////////////////////////////////////////////////////////////////////////
    // ///////////////////////////////////////////////////////////////////////////////////////////////////////
    add: function (c) {
        for (var i = 0; i < this.vtChildren.length; i++) {
            if (this.vtChildren[i].componentId === c.componentId)
                return;
        }
        this.vtChildren.push(c);
        c.setParent(this);
    },

    remove: function (c) {
        if (c === this) {
            // remove all my children
            for (var i = 0; i < this.vtChildren.length; i++) {
                this.safeRemove(this.vtChildren[i]); // remove children
            }
            this.vtChildren.splice(0, this.vtChildren.length); // remove references to children
            this.removeParentRef(); // remove my parent reference
        } else {
            for (var j = 0; j < this.vtChildren.length; j++) {
                if (this.vtChildren[j] === c) {
                    this.safeRemove(this.vtChildren[j]); // remove child
                    this.vtChildren.splice(j, 1); // remove reference
                    break;
                }
            }
        }
    },

    setEnabled: function (isEnable) {
        Component.prototype.setEnabled.call(this, isEnable);
        for (var i = 0; i < this.vtChildren.length; i++) {
            var c = this.vtChildren[i];
            c.setEnabled(arguments);
        }
    },

    safeRemove: function (c) {
        if (c.getComposite()){
            cc.log("safeRemove");
            c.remove(c); // composite
        }
        else{
            c.removeParentRef();
        }

    },


    getComposite: function () {
        return this;
    },

    clean: function () {
        for (var i = 0; i < this.vtChildren.length; i++) {
            this.safeRemove(this.vtChildren[i]); // remove children
        }
        this.vtChildren.splice(0, this.vtChildren.length); // remove references to children
    },

    getChild: function (componentId) {
        for (var i = 0; i < this.vtChildren.length; i++) {
            if (this.vtChildren[i].componentId === componentId)
                return this.vtChildren[i];
        }
        return null;
    },

    showChatContent: function () {
        this.callFunction("showChatContent", arguments);
    },

    callFunction: function (name, params) {
        for (var i = 0; i < this.vtChildren.length; i++) {
            var c = this.vtChildren[i];
            if (!c.isEnable)
                continue;
            if (c[name] !== undefined)c[name].apply(c, params);
        }
    }
});





Composite.create = function(componentId, container){
    var composite = new Composite();
    composite.initComponent(componentId, container);
    return composite;
};

module.exports = Composite;