var BasePopup = require('BasePopup');
var HistoryMiniGameMediator = require('HistoryMiniGameMediator');
var Constants = require('Constants');
var Utility = require('Utility');
var AssetVO = require('AssetVO');
var TaiXiuVO = require('TaiXiuVO');

cc.Class({
    extends: BasePopup,

    properties: {
        lbCurPage: cc.Label,
        btnRoy: cc.Toggle,
        btnCen: cc.Toggle
    },

    // use this for initialization
    onLoad: function () {
        HistoryMiniGameMediator.getInstance.init(this);
        this.hide();

        this.fieldHistory = this.node.getChildByName("fieldHistory");
        this.itemFieldTaiXiu = this.fieldHistory.getChildByName("itemFieldTaiXiu");
        this.itemFieldMiniPoker = this.fieldHistory.getChildByName("itemFieldMiniPoker");
        this.itemFieldPokeGo = this.fieldHistory.getChildByName("itemFieldPokeGo");
        this.itemFieldVongQuay = this.fieldHistory.getChildByName("itemFieldVongQuay");

        this.contentHistory = this.node.getChildByName("contentHistory");
        this.itemTaiXiu = this.contentHistory.getChildByName("itemTaiXiu");
        this.itemPokeGo = this.contentHistory.getChildByName("itemPokeGo");
        this.itemMiniPoker = this.contentHistory.getChildByName("itemMiniPoker");
        this.itemVongQuay = this.contentHistory.getChildByName("itemVongQuay");

        this.moneyType = 0;
        this.currentPage = 1;
        this.totalPages = 30;
        this.curMiniGame = "";
    },

    show: function () {
        BasePopup.prototype.show.call(this);

        this.hideAllFields();
        this.contentHistory.removeAllChildren();

        this.btnRoy.enabled = false;
        this.btnRoy.isChecked = true;
        this.btnCen.enabled = true;
        this.btnCen.isChecked = false;
    },

    selectMoneyType: function (event) {
        var params = {};

        if(event.node.name === "btnRoy"){
            this.btnRoy.enabled = false;
            this.btnCen.enabled = true;
            this.btnCen.isChecked = false;

            this.moneyType = 0;
            params.moneyType = this.moneyType;
            params.curMiniGame = this.curMiniGame;
            this.currentPage = 1;
        }
        else{
            this.btnRoy.enabled = true;
            this.btnCen.enabled = false;
            this.btnRoy.isChecked = false;

            this.moneyType = 1;
            params.moneyType = this.moneyType;
            params.curMiniGame = this.curMiniGame;
            this.currentPage = 1;
        }

        this.activeGetHistoryMiniGame(params);

    },

    onNextPage: function () {
        if (this.currentPage < this.totalPages) {
            var params = {};
            params.curMiniGame = this.curMiniGame;
            params.page = this.currentPage+1;
            params.moneyType = this.moneyType;

            this.currentPage +=1;
            this.activeGetHistoryMiniGame(params);
        }
    },

    onPrevPage: function () {
        if (this.currentPage > 1) {
            var params = {};
            params.curMiniGame = this.curMiniGame;
            params.page = this.currentPage-1;
            params.moneyType = this.moneyType;

            this.currentPage -=1;
            this.activeGetHistoryMiniGame(params);
        }
    },

    updateHistory: function (data) {
        this.curMiniGame = data.curMiniGame;

        var history = Utility.convertSFSArrayToArray(data.history);
        this.lbCurPage.string = "" + this.currentPage + " / " + this.totalPages;

        switch (this.curMiniGame) {
            case Constants.MINIGAME_TAI_XIU:
                this.showHistoryTaiXiu(history);
                break;
            case Constants.MINIGAME_SLOT3X3:
                this.showHistorySlot3x3(history);
                break;
            case Constants.MINIGAME_MINI_POKER:
                this.showHistoryMiniPoker(history);
                break;
            case Constants.MINIGAME_VONG_QUAY:
                this.showHistoryVongQuay(history);
                break;
        }
    },

    showHistoryTaiXiu: function (history) {
        this.hideAllFields();
        this.contentHistory.removeAllChildren();
        this.itemFieldTaiXiu.active = true;
        this.itemTaiXiu.active = true;

        for(var i=0 ; i<history.length ; i++){
            var itemTaiXiu = cc.instantiate(this.itemTaiXiu);
            itemTaiXiu.getChildByName("bgLine").active = (i % 2 !== 0);
            itemTaiXiu.getChildByName("lbPhien").getComponent(cc.Label).string = history[i].session;
            itemTaiXiu.getChildByName("lbTime").getComponent(cc.Label).string = history[i].dateTime;
            if(history[i].typeBet === TaiXiuVO.BET_TAI)
                itemTaiXiu.getChildByName("lbGate").getComponent(cc.Label).string = "Tài";
            else
                itemTaiXiu.getChildByName("lbGate").getComponent(cc.Label).string = "Xỉu";
            var result = JSON.parse("[" + history[i].result + "]");
            var score = parseInt(result[0]) + parseInt(result[1]) + parseInt(result[2]);
            if (score < 11) {
                itemTaiXiu.getChildByName("lbResult").getComponent(cc.Label).string = "Xỉu - " + history[i].result;
            }
            else {
                itemTaiXiu.getChildByName("lbResult").getComponent(cc.Label).string = "Tài - " + history[i].result;
            }
            itemTaiXiu.getChildByName("lbBetValue").getComponent(cc.Label).string = Utility.formatCurrency(history[i].bet);
            itemTaiXiu.getChildByName("lbRepay").getComponent(cc.Label).string = Utility.formatCurrency(history[i].repay);
            itemTaiXiu.getChildByName("lbWin").getComponent(cc.Label).string = Utility.formatCurrency(history[i].prize);
            this.contentHistory.addChild(itemTaiXiu);
        }
    },

    showHistoryMiniPoker: function (history) {
        this.hideAllFields();
        this.itemFieldMiniPoker.active = true;
        this.contentHistory.removeAllChildren();

        this.itemMiniPoker.active = true;
        for(var i=0 ; i<history.length ; i++){
            var itemMiniPoker = cc.instantiate(this.itemMiniPoker);
            var arrayCards = history[i].cards;
            itemMiniPoker.getChildByName("bgLine").active = (i % 2 !== 0);
            itemMiniPoker.getChildByName("lbPhien").getComponent(cc.Label).string = history[i].id;
            itemMiniPoker.getChildByName("lbTime").getComponent(cc.Label).string = history[i].date;
            itemMiniPoker.getChildByName("lbBetValue").getComponent(cc.Label).string = Utility.formatCurrency(history[i].mucCuoc);
            itemMiniPoker.getChildByName("lbWin").getComponent(cc.Label).string = Utility.formatCurrency(history[i].prize);
            for(var j=0 ; j<5 ; j++){
                var cardName = (arrayCards[j] < 10) ? "cards_0" + arrayCards[j] : "cards_" + arrayCards[j];
                var card = itemMiniPoker.getChildByName("card" + j);
                card.getComponent(cc.Sprite).spriteFrame = AssetVO.getTextureGameAtlas(cardName);
            }
            this.contentHistory.addChild(itemMiniPoker);
        }
    },


    showHistorySlot3x3: function (history) {

        this.hideAllFields();
        this.itemFieldPokeGo.active = true;
        this.itemPokeGo.active = true;

        this.contentHistory.removeAllChildren();

        for(var i=0 ; i<history.length ; i++){
            var itemPokego = cc.instantiate(this.itemPokeGo);
            itemPokego.getChildByName("bgLine").active = (i % 2 !== 0);
            itemPokego.getChildByName("lbPhien").getComponent(cc.Label).string = history[i].id;
            // itemPokego.getChildByName("lbNickName").getComponent(cc.Label).string =  this.cutOffNickName(history[i].nickName);
            itemPokego.getChildByName("lbPhong").getComponent(cc.Label).string = Utility.formatCurrency(history[i].mucCuoc);
            itemPokego.getChildByName("lbNBetLine").getComponent(cc.Label).string = history[i].nBetLine;
            itemPokego.getChildByName("lbNWinLine").getComponent(cc.Label).string = history[i].nWinLine;
            itemPokego.getChildByName("lbPrize").getComponent(cc.Label).string = Utility.formatCurrency(history[i].prize);
            itemPokego.getChildByName("lbDate").getComponent(cc.Label).string = this.js_mm_dd_hh_mm_ss(history[i].date);
            this.contentHistory.addChild(itemPokego);
        }
    },

    showHistoryVongQuay: function (history) {
        this.itemFieldVongQuay.active = true;
        this.itemVongQuay.active = true;
        this.contentHistory.removeAllChildren();

        for(var i=0 ; i<history.length ; i++){
            var itemVongQuay = cc.instantiate(this.itemVongQuay);
            itemVongQuay.getChildByName("bgLine").active = (i % 2 !== 0);
            itemVongQuay.getChildByName("lbTime").getComponent(cc.Label).string = history[i].dateTime;
            itemVongQuay.getChildByName("lbResult").getComponent(cc.Label).string = history[i].result;
            itemVongQuay.getChildByName("lbWin").getComponent(cc.Label).string = Utility.formatCurrency(history[i].prize);

            this.contentHistory.addChild(itemVongQuay);
        }
    },

    hideAllFields: function () {
        this.itemFieldTaiXiu.active = false;
        this.itemFieldMiniPoker.active = false;
        this.itemFieldPokeGo.active = false;
        this.itemFieldVongQuay.active = false;
    },

    js_mm_dd_hh_mm_ss: function(value) {
        var now = new Date(value );
        var year = "" + now.getFullYear();
        var month = "" + (now.getMonth() + 1); if (month.length == 1) { month = "0" + month; }
        var day = "" + now.getDate(); if (day.length == 1) { day = "0" + day; }
        var hour = "" + now.getHours(); if (hour.length == 1) { hour = "0" + hour; }
        var minute = "" + now.getMinutes(); if (minute.length == 1) { minute = "0" + minute; }
        var second = "" + now.getSeconds(); if (second.length == 1) { second = "0" + second; }
        return month + "-" + day + " " + hour + ":" + minute + ":" + second;
    },

    cutOffNickName: function(nickName){
        var t = "";
        if(nickName && nickName.length > 16){
            t = nickName.substring(0, 16);
        }
        else{
            t = nickName;
        }
        return t;

    }

});
