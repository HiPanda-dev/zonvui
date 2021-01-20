var BasePopup = require('BasePopup');
var Utility = require('Utility');
var DetailSessionTaiXiuMediator = require('DetailSessionTaiXiuMediator');

cc.Class({
    extends: BasePopup,

    properties: {
        itemTaiXiu : cc.Node,
        dice: [cc.Sprite],
        iconDice: [cc.SpriteFrame]
    },

    // use this for initialization
    onLoad: function () {
        DetailSessionTaiXiuMediator.getInstance().init(this);
        this.hide();

        this.contentDetailTai = this.node.getChildByName("contentDetailTai");
        this.contentDetailXiu = this.node.getChildByName("contentDetailXiu");
        this.imgTai = this.node.getChildByName("img_tai");
        this.imgXiu = this.node.getChildByName("img_xiu");
        this.lbSesion = this.node.getChildByName("lbSesion").getComponent(cc.Label);
        this.lbScore = this.node.getChildByName("lbScore").getComponent(cc.Label);
        this.lbCurPage = this.node.getChildByName("lbCurPage").getComponent(cc.Label);
        this.lbTotalTai = this.node.getChildByName("lbTotalTai").getComponent(cc.Label);
        this.lbTotalRepayTai = this.node.getChildByName("lbTotalRepayTai").getComponent(cc.Label);
        this.lbTotalXiu = this.node.getChildByName("lbTotalXiu").getComponent(cc.Label);
        this.lbTotalRepayXiu = this.node.getChildByName("lbTotalRepayXiu").getComponent(cc.Label);

        this.currentPage = 1;
        this.session = 0;
        this.moneyType = 0;
        this.totalPages = 20;

    },

    show: function () {
        this.currentPage = 1;
        BasePopup.prototype.show.call(this);
    },

    onPrevSession: function () {
        var params = {};
        params.session = this.session - 1;
        params.page = 1;
        this.node.emit('ACTIVE_DETAIL_SESSION_UPDATE', params);

        this.currentPage = 1;
    },

    onNextSession: function () {
        var params = {};
        params.session = this.session + 1;
        params.page = 1;

        this.node.emit('ACTIVE_DETAIL_SESSION_UPDATE', params);
        this.currentPage = 1;
    },

    onPrevPage: function () {
        if (this.currentPage <= 1) return;

        var params = {};
        params.session = this.session;
        params.page = this.currentPage-1;
        this.currentPage -=1;
        this.node.emit('ACTIVE_DETAIL_SESSION_UPDATE', params);
    },

    onNextPage: function () {
        if (this.currentPage >= this.totalPages) return;

        var params = {};
        params.session = this.session;
        params.page = this.currentPage+1;
        this.currentPage +=1;
        this.node.emit('ACTIVE_DETAIL_SESSION_UPDATE', params);
    },

    updateDetailSession: function (data) {
        // var info = Utility.convertSFSObjectToObject(data.session);
        if (data.r.length === 0)
            return;
        var arrayHis = data.his;
        this.contentDetailTai.removeAllChildren();
        this.contentDetailXiu.removeAllChildren();
        this.imgTai.stopAllActions();
        this.imgXiu.stopAllActions();
        this.imgTai.opacity = 255;
        this.imgXiu.opacity = 255;
        //
        this.session = data.id;
        this.totalPages = data.pt;
        this.lbSesion.string = "Phiên #" + this.session;
        this.lbCurPage.string = "" + this.currentPage + " / " + this.totalPages;
        this.lbTotalTai.string = Utility.formatCurrency(data.tt);
        this.lbTotalRepayTai.string = Utility.formatCurrency(data.rt);
        this.lbTotalXiu.string = Utility.formatCurrency(data.tx);
        this.lbTotalRepayXiu.string = Utility.formatCurrency(data.rx);
        //
        var dices = data.r.split('');
        var result = parseInt(dices[0]) + parseInt(dices[1]) + parseInt(dices[2]);
        this.lbScore.string = ' = ' + result;
        //
        this.dice[0].spriteFrame = this.iconDice[dices[0]-1];
        this.dice[1].spriteFrame = this.iconDice[dices[1]-1];
        this.dice[2].spriteFrame = this.iconDice[dices[2]-1];
        //
        if(result >= 11)
            this.showEffect(this.imgTai);
        else
            this.showEffect(this.imgXiu);
        //
        // var transactions = Utility.convertSFSObjectToObject(data.transactions);
        // var taiTransactions = Utility.convertSFSArrayToArray(transactions.TaiTransaction);
        // var xiuTransactions = Utility.convertSFSArrayToArray(transactions.XiuTransaction);
        //
        for(var i=0 ; i<arrayHis.length ; i++){
            if(arrayHis[i].tx === 1) {
                var item = cc.instantiate(this.itemTaiXiu);
                this.contentDetailTai.addChild(item);
            }
            else {
                var item = cc.instantiate(this.itemTaiXiu);
                this.contentDetailXiu.addChild(item);
            }
            item.getChildByName("bgLine").active = (i % 2 !== 0);
            item.getChildByName("lbTime").getComponent(cc.Label).string = '00:' + arrayHis[i].s;
            item.getChildByName("lbName").getComponent(cc.Label).string = arrayHis[i].aa;
            item.getChildByName("lbBetValue").getComponent(cc.Label).string = Utility.formatCurrency(arrayHis[i].vb);
            item.getChildByName("lbRepay").getComponent(cc.Label).string = Utility.formatCurrency(arrayHis[i].r);
        }
    },

    showEffect: function (node) {
        var fadeIn = cc.fadeIn(0.15);
        var fadeOut = cc.fadeOut(0.15);
        node.runAction(cc.sequence(fadeIn, fadeOut).repeatForever());
    }
});

