var Utility = require('Utility');
var i18n = require('i18n');
cc.Class({
    extends: cc.Component,

    properties: {
        lbCurPage: cc.Label,
        btnGroup:cc.Node,
        content:cc.Node
    },

    // use this for initialization
    onLoad: function () {
        this.itemTemp = this.content.getChildByName("item");
        this.curPage = 1;
        // this.totalPages = 20;
        this.isLoad = true;
    },

    buildUI(root) {
        this.root = root;
    },

    updateData: function(data) {
        this.data = data;
        if(this.isLoad !== true) this.onLoad();
        this.lbCurPage.string = this.curPage;
        // this.btnGroup.active = true;
        this.content.removeAllChildren();
        for(var i=0 ; i<data.length ; i++){
            var item = cc.instantiate(this.itemTemp);
            item.data = data[i].d;
            item.getChildByName("bgLine").active = (i % 2 === 0);
            item.getChildByName("id").getComponent(cc.Label).string = data[i].id;
            item.getChildByName("txtTime").getComponent(cc.Label).string = data[i].t;
            // item.getChildByName("txtServiceType").getComponent(cc.Label).string = data[i].s;
            item.getChildByName("txtMoneyTranfer").getComponent(cc.Label).string = Utility.formatCurrency(data[i].v);
            item.getChildByName("txtBalance").getComponent(cc.Label).string = Utility.formatCurrency(data[i].b);
            if(data[i].ts === 1) {
                item.getChildByName("txtStatus").getComponent(cc.Label).string = i18n.t("T0054");
                item.getChildByName("btnDetail").active = true;
            }
            else {
                item.getChildByName("txtStatus").getComponent(cc.Label).string = i18n.t("T0055");
                item.getChildByName("btnCancel").active = true;
            }
            this.content.addChild(item);
        }
    },

    setPage(page) {
        this.curPage = page;
        this.root.activeRankShowPage(this.curPage);
    },

    onHandlerNextPage: function() {
        if(this.data.length < 10) return;
        this.curPage = this.curPage + 1;
        var params;
        params = {};
        params.io = 0;
        params.p = this.curPage;
        this.root.activeSendGetHisCashOut(params);
    },

    onHandlerPrevPage: function() {
        this.curPage = (this.curPage > 1) ? this.curPage - 1: 1;
        var params;
        params = {};
        params.io = 0;
        params.p = this.curPage;
        this.root.activeSendGetHisCashOut(params);
    },

    showContentCashOut: function (sender) {
        this.root.activeShowAlert(sender.target.getParent().data);
    },

    onHandlerCashIn: function (sender) {
        this.root.activeCashInCard({
            // nameProvider: this.dropListProvider.getItemSelect().name,
            // provider: this.dropListProvider.getItemSelect().id,
            money: this.dropListMoney.getItemSelect().id,
            code: this.txtCode.string,
            serial: this.txtSerial.string,
            // captcha: this.txtCaptcha.string,
        });
    },

    cancelCashOut: function () {

    }
});
