var BasePopup = require('BasePopup');
var HistoryTranferSceneMediator = require('HistoryTranferSceneMediator');
var TabHisCashIn = require('TabHisCashIn');
var TabHisCashOut = require('TabHisCashOut');
var TabHisTranfer = require('TabHisTranfer');

cc.Class({
    extends: BasePopup,

    properties: {
        tabHisCashIn: TabHisCashIn,
        tabHisCashOut: TabHisCashOut,
        tabHisTranfer: TabHisTranfer
    },

    ctor: function () {
        HistoryTranferSceneMediator.getInstance.init(this);
    },

    buildUI() {
        this.tabHisCashIn.buildUI(this);
        this.tabHisCashOut.buildUI(this);
        this.tabHisTranfer.buildUI(this);
    },

    // use this for initialization
    onLoad: function () {
        this.hide();
        this.buildUI();
        // this.captcha = this.mcGiftCode.getChildByName('captcha').getComponent('Captcha');
        // this.txtGiftCode = this.mcGiftCode.getChildByName('txtGiftCode').getChildByName('txtInput').getComponent(EditboxLocalized);
        // this.txtCaptcha = this.mcGiftCode.getChildByName('txtCaptcha').getChildByName('txtInput').getComponent(EditboxLocalized);
        //
        // this.txtGiftMoney = this.mcComplete.getChildByName('txtGiftMoney').getComponent(cc.Label);
    },

    show: function () {
        BasePopup.prototype.show.call(this);
        // this.mcGiftCode.active = true;
        // this.mcComplete.active = false;
        // this.resetFormGiftCode();
    },

    onUpdateHistoryCashIn: function (data) {
        this.tabHisCashIn.updateData(data);
    },

    onUpdateHistoryCashOut: function (data) {
        this.tabHisCashOut.updateData(data);
    },

    onUpdateHistoryTranfer: function (data) {
        this.tabHisTranfer.updateData(data);
    }
});
