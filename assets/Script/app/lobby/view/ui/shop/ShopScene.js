var BasePopup = require('BasePopup');
var Constants = require('Constants');
var ShopSceneMediator = require('ShopSceneMediator');
var TabMain = require('TabMain');
var LobbyEvent = require('LobbyEvent');
var CustomAction = require('CustomAction');
var TabMain = require('TabMain');
var TabCashIn = require('TabCashIn');
var TabCashOut = require('TabCashOut');
var TabTransferdes = require('TabTransferdes');

cc.Class({
    extends: BasePopup,

    properties: {
      tabCashIn:TabCashIn,
      tabCashOut:TabCashOut,
      tabTransferdes:TabTransferdes,
      tabMain:TabMain
    },

    ctor: function() {
      ShopSceneMediator.getInstance.init(this);
    },

    // use this for initialization
    onLoad: function () {
        this.hide();
        this.buildUI();
    },

    buildUI: function() {
      this.tabCashIn.buildUI(this);
      this.tabCashOut.buildUI(this);
      this.tabTransferdes.buildUI(this);
    },

    show: function () {
        BasePopup.prototype.show.call(this);
        this.tabCashIn.refeshCaptcha();
        this.activeRequestCardConfig();
    },

    onShowTab:function (tabIndex) {
      this.show();
      this.tabMain.openTabIndex(tabIndex, 0);
    },

    onResetMobileCardRecharge: function() {
      this.tabCashIn.resetMobileCardRecharge();
    },

    onUpdateRechargeInfo: function(params) {
      if(params.info.length === 0) {
        this.tabMain.disableTab('0x00022');
      }else{
        this.tabCashIn.updateRechargeInfo(params);
        this.tabMain.enableTab('0x00022');
      }
    },

    onUpdateCashOutInfo: function(params) {
      if(params.info.length === 0) {
        this.tabMain.disableTab('0x00021');
      }else{
        this.tabCashOut.updateCashOutInfo(params);
        this.tabMain.enableTab('0x00021');
      }
    },

    onResetTransferdes: function() {
      this.tabTransferdes.resetTransferdes();
    },

    onUpdateMySelf:function (mySelf) {
        this.tabTransferdes.updateMySelf(mySelf);
    },

    onUpdateCheckAccountTransferdes:function (message) {
        this.tabTransferdes.updateCheckAccountTransferdes(message);
    },

});
