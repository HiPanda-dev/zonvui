var Captcha = require("Captcha");
var Utility = require('Utility');
var EditboxLocalized = require('EditboxLocalized'); 
cc.Class({
    extends: cc.Component,

    properties: {
      toggleProvider: cc.ToggleContainer,
      toggleCard: cc.ToggleContainer,
      listProvider:[cc.Node],
      listCard:[cc.Node]
    },

    // use this for initialization
    onLoad: function () {
      this.curProvider = null;
      this.curCard = null;
    },

    buildUI: function(root) {
      this.root = root;
    },

    updateCashOutInfo: function(params) {
      this.data = params;
      for (var i = 0; i < this.listProvider.length; i++) {
        this.listProvider[i].active = false;
      }

      for (var i = 0; i < this.data.info.length; i++) {
        this.updateDataProvider(this.data.info[i]);
      }

      this.curProvider = this.listProvider[0];
      this.curCard = this.listCard[0];
      this.updateCardsFromProvider(this.listProvider[0].cards);
    },

    updateDataProvider: function(o) {
      var provider = null;
      if(o.provider === "VTT") provider = this.listProvider[0];
      if(o.provider === "VMS") provider = this.listProvider[1];
      if(o.provider === "VNP") provider = this.listProvider[2];

      provider.active = (o.state === 1) ? true : false;
      provider.cards = o.cards;
    },


    onHandlerCashOutCard: function() {
      this.root.activeCashOutCard({
        provider: this.curProvider.name,
        card: this.curCard.name,
        telco: this.getTelco(this.curProvider.name),
        money: this.getMoneyRecharge()
      });
    },

    getMoneyRecharge() {
      var money = parseInt(this.curCard.name);
      return money * 100 / this.data.percentRecharge;
    },

    getTelco(provider) {
      switch (provider) {
        case 'VTT':
          return 'Viettel';
        case 'VMS':
          return 'Vinaphone';
        case 'VNP':
          return 'Mobifone'
        default:

      }
    },

    onHandlerChangeProvider: function(params) {
      this.curProvider = params.node;
      this.updateCardsFromProvider(params.node.cards)
    },

    onHanderChangeCard:function(params) {
      this.curCard = params.node;
    },

    updateCardsFromProvider: function(cards) {
      var o1, o2 ;
      var setCheck = false;
      for (var i = 0; i < this.listCard.length; i++) {
        o1 = this.listCard[i];
        o1.active = false;
        for (var j = 0; j < cards.length; j++) {
          o2 = cards[j];
          if(o1.name === o2) {
            o1.active = true;
            if(!setCheck) {
              setCheck = true;
              o1.getComponent(cc.Toggle).check();
            }
            break;
        }
      }
    }
  },

});
