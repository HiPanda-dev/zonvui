var DropListMainTemplate = require("DropListMainTemplate");
var FormCashOutCard = require("FormCashOutCard");
var FormCashOutItem = require("FormCashOutItem");
var i18n = require("i18n");
cc.Class({
    extends: cc.Component,

    properties: {
        dropListCashIn: DropListMainTemplate,
        formCashOutCard: FormCashOutCard,
        formCashOutItem: FormCashOutItem,
    },

    // use this for initialization
    onLoad: function () {
      var list = [
        {
          name:i18n.t('C0143'),
          value:1
        },
        // {
        //   name:i18n.t('C0148'),
        //   value:2
        // }
      ]

      this.dropListCashIn.setupData(list);
    },

    buildUI: function(root) {
      this.root = root;
      this.formCashOutCard.buildUI(root);
      this.formCashOutItem.buildUI(root);
    },

    refeshCaptcha: function() {
      this.formCashOutCard.refeshCaptcha();
    },

    updateCashOutInfo: function (params) {
      this.formCashOutCard.updateCashOutInfo(params);
    },

    onHandlerChooseCashOutType: function() {
      var selectItem = this.dropListCashIn.getItemSelect();
      if(selectItem.value === 1) {
        this.formCashOutCard.node.active = true;
        this.formCashOutItem.node.active = false;
      }else if(selectItem.value === 2){
        this.formCashOutCard.node.active = false;
        this.formCashOutItem.node.active = true;
      }
    },

});
