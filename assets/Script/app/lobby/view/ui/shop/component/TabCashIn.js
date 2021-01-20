var DropListMainTemplate = require("DropListMainTemplate");
var FormCashInCard = require("FormCashInCard");
var FormCashInInApp = require("FormCashInInApp");
var i18n = require("i18n");
cc.Class({
    extends: cc.Component,

    properties: {
        dropListCashIn: DropListMainTemplate,
        formCashInCard: FormCashInCard,
        formCashInInApp: FormCashInInApp,
        formBaoTri: cc.Node,
    },

    // use this for initialization
    onLoad: function () {
      var list = [
        {
          name:i18n.t('C0143'),
          value:1
        }
      ]
      if(cc.sys.isMobile === true) {
        list.push({
          name:i18n.t('C0144'),
          value:2
        })
      }

      this.isBaoTri = false;
      this.dropListCashIn.setupData(list);
    },

    buildUI: function(root) {
      this.root = root;
      this.formCashInCard.buildUI(root);
      this.formCashInInApp.buildUI(root);
    },

    refeshCaptcha: function() {
      this.formCashInCard.refeshCaptcha();
    },

    onHandlerChooseCashInType: function() {
      var selectItem = this.dropListCashIn.getItemSelect();
      if(selectItem.value === 1) {
        this.formCashInCard.node.active = !this.isBaoTri;
        this.formBaoTri.active = this.isBaoTri;
        this.formCashInInApp.node.active = false;
      }else if(selectItem.value === 2){
        this.formCashInCard.node.active = false;
        this.formBaoTri.active = false;
        this.formCashInInApp.node.active = true;
      }
    },

    resetMobileCardRecharge: function() {
      this.formCashInCard.resetMobileCardRecharge();
    },

    updateRechargeInfo: function(params) {
      var count = 0;
      for(var i = 0;i< params.info.length;i++) {
        if(params.info[i].state === 1) count ++;
      }

      if(count === 0) {
        this.formCashInCard.node.active = false;
        this.formCashInInApp.node.active = false;
        this.formBaoTri.active = true;
        this.isBaoTri = true;
      }else{
        this.formCashInCard.updateRechargeInfo(params);
        this.formCashInCard.node.active = true;
        this.formCashInInApp.node.active = false;
        this.formBaoTri.active = false;
        this.isBaoTri = false;
      }
    },


});
