var DropListMainTemplate = require("DropListMainTemplate");
var Captcha = require("Captcha");
var EditboxLocalized = require('EditboxLocalized'); 
var Utility = require('Utility');
var i18n = require('i18n');
cc.Class({
    extends: cc.Component,

    properties: {
      dropListProvider:DropListMainTemplate,
      dropListMoney:DropListMainTemplate,
      txtCode: EditboxLocalized,
      txtSerial: EditboxLocalized,
      txtCaptcha: EditboxLocalized,
      mcCaptcha: Captcha,
    },

    // use this for initialization
    onLoad: function () {
      this.info = null;
    },

    buildUI: function(root) {
      this.root = root;
    },

    setupInfoRecharge: function () {
      if(this.info === null) return;
      var listProvider = [];
      for(var i = 0;i < this.info.length; i++) {
        if(this.info[i].state !== 1) continue;
        listProvider.push({
          name: this.getNameWithProvider(this.info[i].provider),
          id: this.info[i].provider
        });
      }
      this.dropListProvider.setupData(listProvider);
      this.updateCardMoneyWithProvider();
    },

    getNameWithProvider: function(provider) {
      switch (provider) {
        case 'VTT':
          return 'Viettel';
        case 'VMS':
          return 'Mobifone';
        case 'VNP':
          return 'Vinaphone'
        default:
      }

      return "";
    },

    onHandlerChooseProvider: function () {
      this.updateCardMoneyWithProvider();
    },

    updateCardMoneyWithProvider: function () {
      if(this.info === null) return;
      var provider = this.dropListProvider.getItemSelect().id;
      var listCardMoney = [];
      listCardMoney.push({
        name:i18n.t('C0101'),
        id:0
      });

      for(var i = 0;i < this.info.length; i++) {
        if(this.info[i].provider !== provider) continue;
        for(var j = 0; j< this.info[i].money.length; j++) {
          listCardMoney.push({
            name: Utility.formatCurrency(parseInt(this.info[i].money[j])),
            id: this.info[i].money[j]
          });
        }
      }

      this.dropListMoney.setupData(listCardMoney);
    },

    refeshCaptcha: function() {
      this.mcCaptcha.refeshCaptcha();
    },

    onHandlerRechargeCard:function() {
      this.root.activeRechargeCard({
        nameProvider: this.dropListProvider.getItemSelect().name,
        provider: this.dropListProvider.getItemSelect().id,
        money: this.dropListMoney.getItemSelect().id,
        code: this.txtCode.string,
        serial: this.txtSerial.string,
        captcha: this.txtCaptcha.string,
      });
    },

    resetMobileCardRecharge: function() {
      this.txtCode.string = "";
      this.txtSerial.string = "";
      this.txtCaptcha.string = "";
      this.refeshCaptcha();
    },

    updateRechargeInfo: function(params) {
      var cout = 0;
      for(var i = 0;i< params.info.length;i++) {
        if(params.info[i].state === 1) cout ++;
      }

      if(cout === 0) {
        //bao tri
      }else{
        this.info = params.info;
        this.setupInfoRecharge();
      }
    },

});
