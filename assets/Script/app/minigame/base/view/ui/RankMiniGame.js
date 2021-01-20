var BasePopup = require('BasePopup');
var RankMiniGameMediator = require('RankMiniGameMediator');
var Constants = require('Constants');
var AssetVO = require('AssetVO');
var Utility = require('Utility');

cc.Class({
    extends: BasePopup,

    properties: {
        title: cc.Node,
        lbCurPage: cc.Label,
        btnRoy: cc.Toggle,
        btnCen: cc.Toggle,
        icon_top: [cc.SpriteFrame]
    },

    // use this for initialization
    onLoad: function () {
        RankMiniGameMediator.getInstance.init(this);
        this.hide();

        this.itemFieldTaiXiu = this.node.getChildByName("itemFieldTaiXiu");
        this.itemFieldMiniPoker = this.node.getChildByName("itemFieldMiniPoker");
        this.itemFieldPokeGo = this.node.getChildByName("itemFieldPokeGo");
        this.itemFieldVongQuay = this.node.getChildByName("itemFieldVongQuay");

        this.btnGroup = this.node.getChildByName("btnGroup");
        this.contentRank = this.node.getChildByName("contentRank");
        this.itemTaiXiu = this.contentRank.getChildByName("itemTaiXiu");
        this.itemPokego = this.contentRank.getChildByName("itemPokeGo");
        this.itemMiniPoker = this.contentRank.getChildByName("itemMiniPoker");
        this.itemVongQuay = this.contentRank.getChildByName("itemVongQuay");

        this.moneyType = 0;
        this.currentPage = 1;
        this.totalPages = 20;
        this.curMiniGame = "";

    },

    show: function () {
        BasePopup.prototype.show.call(this);

        this.btnRoy.enabled = false;
        this.btnRoy.isChecked = true;
        this.btnCen.enabled = true;
        this.btnCen.isChecked = false;
        this.moneyType = 0;
        this.currentPage = 1;

        this.hideAllFields();
        this.contentRank.removeAllChildren();
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

        this.activeGetRankMiniGame(params);
    },

    onNextPage: function () {
        if (this.currentPage < this.totalPages) {
            var params = {};
            params.curMiniGame = this.curMiniGame;
            params.page = this.currentPage+1;
            params.moneyType = this.moneyType;

            this.currentPage +=1;
            this.activeGetRankMiniGame(params);
        }
    },

    onPrevPage: function () {
        if (this.currentPage > 1) {
            var params = {};
            params.curMiniGame = this.curMiniGame;
            params.page = this.currentPage-1;
            params.moneyType = this.moneyType;

            this.currentPage -=1;
            this.activeGetRankMiniGame(params);
        }
    },

    updateRank: function (data) {
        this.curMiniGame = data.curMiniGame;
        var listRank = Utility.convertSFSArrayToArray(data.list);
        this.lbCurPage.string = "" + this.currentPage + " / " + this.totalPages;

        switch (data.curMiniGame) {
            case Constants.MINIGAME_TAI_XIU:
                this.showRankTaiXiu(listRank);
                break;
            case Constants.MINIGAME_SLOT3X3:
                this.showRankSlot3x3(listRank);
                break;
            case Constants.MINIGAME_MINI_POKER:
                this.showRankMiniPoker(listRank);
                break;
            case Constants.MINIGAME_VONG_QUAY:
                this.showRankVongQuay(listRank);
                break;
        }
    },

    showRankTaiXiu: function (listRank){
        this.hideAllFields();
        this.title.getComponent(cc.Label).string = "TOP THẮNG";
        this.btnGroup.active = false;
        this.contentRank.height = 400;
        this.itemFieldTaiXiu.active = true;
        this.itemTaiXiu.active = true;

        this.contentRank.removeAllChildren();
        for(var i=0 ; i<listRank.length ; i++){
            var itemTaiXiu = cc.instantiate(this.itemTaiXiu);
            itemTaiXiu.getChildByName("bgLine").active = (i % 2 === 0);
            if(i <= 2){
                itemTaiXiu.getChildByName("lbSTT").active = false;
                itemTaiXiu.getChildByName("iconTop").getComponent(cc.Sprite).spriteFrame = this.icon_top[i];
            }
            else{
                itemTaiXiu.getChildByName("lbSTT").getComponent(cc.Label).string = "" + listRank[i].rank;
            }
            itemTaiXiu.getChildByName("lbName").getComponent(cc.Label).string = listRank[i].nickName;
            itemTaiXiu.getChildByName("lbWin").getComponent(cc.Label).string = Utility.formatCurrency(listRank[i].moneyWin);

            this.contentRank.addChild(itemTaiXiu);
        }
    },

    showRankSlot3x3: function(listRank){
        this.btnGroup.active = true;
        this.title.getComponent(cc.Label).string = "VINH DANH";
        this.hideAllFields();
        this.contentRank.height = 400;
        this.itemFieldPokeGo.active = true;
        this.itemPokego.active = true;

        this.contentRank.removeAllChildren();
        for(var i=0 ; i<listRank.length ; i++){
            var item = cc.instantiate(this.itemPokego);
            item.data = listRank[i];
            item.getChildByName("bgLine").active = (i % 2 !== 0);
            item.getChildByName("lbThoiGian").getComponent(cc.Label).string = Utility.js_mm_dd_hh_mm_ss(listRank[i].date);
            item.getChildByName("lbNickName").getComponent(cc.Label).string = listRank[i].nickName;
            item.getChildByName("lbMucCuoc").getComponent(cc.Label).string = Utility.formatCurrency(listRank[i].bet);
            item.getChildByName("lbPrize").getComponent(cc.Label).string = Utility.formatCurrency(listRank[i].prize);
            var btn = item.getChildByName("lbChiTiet");
            btn.on(cc.Node.EventType.TOUCH_END, this.onShowChiTietSlot3x3.bind(this), item);
            // var s;
            // if(listRank[i].result === 2){
            //     s = "Thắng lớn";
            // }
            // else{
            //     s = "Nổ hũ";
            // }
            // item.getChildByName("lbChiTiet").getComponent(cc.Label).string = s;
            this.contentRank.addChild(item);
        }
    },

    onShowChiTietSlot3x3: function(event){
      var data = event.target.parent.data;
      console.log(data);
    },

    showRankMiniPoker: function (listRank) {
        this.btnGroup.active = true;
        this.contentRank.height = 400;
        this.itemFieldMiniPoker.active = true;
        this.itemMiniPoker.active = true;

        this.contentRank.removeAllChildren();
        for(var i=0 ; i<listRank.length ; i++){
            var itemMiniPoker = cc.instantiate(this.itemMiniPoker);

            itemMiniPoker.getChildByName("bgLine").active = (i % 2 !== 0);
            itemMiniPoker.getChildByName("lbDate").getComponent(cc.Label).string = "" + listRank[i].date;
            itemMiniPoker.getChildByName("lbNickName").getComponent(cc.Label).string = listRank[i].nickName;
            itemMiniPoker.getChildByName("lbBetValue").getComponent(cc.Label).string = Utility.formatCurrency(listRank[i].mucCuoc);
            itemMiniPoker.getChildByName("lbWin").getComponent(cc.Label).string = Utility.formatCurrency(listRank[i].jackpot);
            if(listRank[i].result === 3) {
                itemMiniPoker.getChildByName("lbResult").getComponent(cc.Label).string = "Nổ hũ";
            }
            else if(listRank[i].result === 2){
                itemMiniPoker.getChildByName("lbResult").getComponent(cc.Label).string = "Thắng lớn";
            }
            // for(var j=0 ; j<5 ; j++){
            //     var cardName = (listRank[i].cards[j] < 10) ? "cards_0" + listRank[i].cards[j] : "cards_" + listRank[i].cards[j];
            //     var card = itemMiniPoker.getChildByName("card" + j);
            //     card.getComponent(cc.Sprite).spriteFrame = AssetVO.getTextureGameAtlas(cardName);
            // }

            this.contentRank.addChild(itemMiniPoker);
        }
    },

    showRankVongQuay: function (listRank) {
        this.btnGroup.active = true;
        this.itemFieldVongQuay.active = true;
        this.itemVongQuay.active = true;

        this.contentRank.removeAllChildren();

        for(var i=0 ; i<listRank.length ; i++){
            var itemVongQuay = cc.instantiate(this.itemVongQuay);
            itemVongQuay.getChildByName("bgLine").active = (i % 2 === 0);
            itemVongQuay.getChildByName("lbId").getComponent(cc.Label).string = "" + listRank[i].rank;
            itemVongQuay.getChildByName("lbName").getComponent(cc.Label).string = listRank[i].uid;
            itemVongQuay.getChildByName("lbBetValue").getComponent(cc.Label).string = Utility.formatCurrency(listRank[i].moneyWin);
            itemVongQuay.getChildByName("lbWin").getComponent(cc.Label).string = Utility.formatCurrency(listRank[i].moneyWin);
            itemVongQuay.getChildByName("lbWin").getComponent(cc.Label).string = Utility.formatCurrency(listRank[i].moneyWin);

            this.contentRank.addChild(itemVongQuay);
        }
    },

    hideAllFields: function () {
        this.itemFieldTaiXiu.active = false;
        this.itemFieldMiniPoker.active = false;
        this.itemFieldPokeGo.active = false;
        this.itemFieldVongQuay.active = false;
    }

});
