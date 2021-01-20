var Utility = require('Utility');
cc.Class({
    extends: cc.Component,

    properties: {
        lbCurPage: cc.Label,
        content:cc.Node
    },

    // use this for initialization
    onLoad: function () {
        this.itemTemp = this.content.getChildByName("item");
        this.curPage = 1;
        // this.totalPages = 20;
        // this.isLoad = true;
    },

    buildUI(root) {
        this.root = root;
    },

    updateData: function(data) {
        if(this.isLoad !== true) this.onLoad();
        // this.lbCurPage.string = "" + this.curPage + " / " + this.totalPages;
        // this.btnGroup.active = true;
        this.content.removeAllChildren();
        for(var i=0 ; i<data.length ; i++){
            var item = cc.instantiate(this.itemTemp);
            item.data = data[i];
            item.getChildByName("bgLine").active = (i % 2 === 0);
            item.getChildByName("id").getComponent(cc.Label).string = data[i].id;
            item.getChildByName("txtTime").getComponent(cc.Label).string = data[i].t;
            item.getChildByName("txtServiceType").getComponent(cc.Label).string = data[i].s;
            item.getChildByName("txtMoneyTranfer").getComponent(cc.Label).string = Utility.formatCurrency(data[i].v);
            item.getChildByName("txtBalance").getComponent(cc.Label).string = Utility.formatCurrency(data[i].b);
            this.contentTranfer = data[i].d;
            this.content.addChild(item);
        }
    },

    setPage(page) {
        this.curPage = page;
        this.root.activeRankShowPage(this.curPage);
    },

    onHandlerNextPage: function() {
        if(this.dataLength < 10) return;
        this.curPage = (this.curPage < this.totalPages) ? this.curPage + 1: this.totalPages;
        var params;
        params = {};
        params.io = 1;
        params.p = this.curPage;
        this.root.activeSendGetHisCashOut(params);
    },

    onHandlerPrevPage: function() {
        this.curPage = (this.curPage > 1) ? this.curPage - 1: 1;
        var params;
        params = {};
        params.io = 1;
        params.p = this.curPage;
        this.root.activeSendGetHisCashOut(params);
    },

    showContentCashIn: function () {
        this.root.activeShowAlert(this.contentTranfer);
    },

    cancelCashIn: function () {

    }
});
