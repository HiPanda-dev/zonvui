var ConfigInGameVO = require('ConfigInGameVO');
var AppFacade = require('AppFacade');
var TabMain = require('TabMain');

var CustomAction = cc.Class({
    extends: cc.Component,

    properties: {
        code: "",
        labelButton: cc.Label,
        webview: cc.WebView,
        tabMain: TabMain,
        showContents:[cc.Node],
        hideContents: [cc.Node]
    },

    statics: {
        ACTION_RECHARGE: "0x0001",
        ACTION_RECHARGE_ROY: "0x00011",
        ACTION_RECHARGE_CEN: "0x00013",
        ACTION_RECHARGE_MPAY: "0x00012",
        ACTION_RECHARGE_BANK: "0x00014",
        ACTION_RECHARGE_INAPP: "0x00015",
        ACTION_SHOP: "0x0002",
        ACTION_SHOP_ROY: "0x00022",
        ACTION_SHOP_TRANSFEDERS: "0x00021",
        ACTION_SHOP_PAY_BACK: "0x00023",
        ACTION_MAIL: "0x0003",
        ACTION_MAIL_NOTI: "0x00031",
        ACTION_MAIL_SUPPORT: "0x00032",
        ACTION_MAIL_SUPPORT_LIST: "0x00033",
        ACTION_SETTING: "0x0004",
        ACTION_SUPPORT: "0x00041",
        ACTION_HELP: "0x00042",
        ACTION_AGENT: "0x00043",
        ACTION_GIFT_CODE: "0x00044",
        ACTION_HOTLINE_1: "0x00051",
        ACTION_HOTLINE_2: "0x00052",
        ACTION_HU_GAME: "0x0006",
        ACTION_EVENT: "0x0007",
        ACTION_FANPAGE: "0x0008",
        //ACTION_

        ACTION_TLMN: "0x0010",
        ACTION_SAM: "0x0011",
        ACTION_BINH: "0x0012",
        ACTION_PHOM: "0x0013",
        ACTION_XITO: "0x0014",
        ACTION_XOC_DIA: "0x0015",
        ACTION_LIENG: "0x0016",
        ACTION_NHAT_AN_TAT: "0x0017",
        ACTION_MINI_POKER: "0x0018",
        ACTION_TO_NHO: "0x0019",
        ACTION_XENG: "0x0020",
        ACTION_TAI_XIU: "0x0021",
        ACTION_BAU_CUA_CA: "0x0022",
        ACTION_VONG_QUAY: "0x0023",
        ACTION_POKEGO: "0x0024"
    },


    // use this for initialization
    onLoad: function () {
        if(this.code === "") return;
        this.updateCode(this.code);
    },

    updateCode:function (code) {
        ConfigInGameVO.LIST_CUSTUM_BUTTON[code] = this;
        if (window.facade) {
            var config = window.facade.retrieveProxy('ConfigProxy');
            config.checkButtonState(code);
        }
    }


    
});

module.exports = CustomAction;
