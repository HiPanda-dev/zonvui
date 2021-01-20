var LobbyEvent = require('LobbyEvent');
var Utility = require('Utility');
var Captcha = require("Captcha");
var EditboxLocalized = require('EditboxLocalized');
var LabelLocalized = require('LabelLocalized');
cc.Class({
    extends: cc.Component,

    properties: {
      txtError: cc.Label,
      txtToDisplayName:EditboxLocalized,
      txtAmount: EditboxLocalized,
      txtReason:EditboxLocalized,
      lbAmount:cc.Label
    },

    // use this for initialization
    onLoad: function () {
      this.txtError.string = '';
      this.mySelf = null;
    },

    buildUI: function(root) {
      this.root = root;
    },

    updateMySelf: function(mySelf) {
      this.mySelf = mySelf;
    },

    onHandlerCheckAccountTransferdes: function () {
      if(this.txtToDisplayName.string === "") return;
      this.root.activeCheckAccountTransferdes({displayName: this.txtToDisplayName.string});
    },

    onHandlerAmountChange: function() {
      var amount = parseInt(this.txtAmount.string);
      if(amount < 0) this.txtAmount.string = Math.abs(amount);
      if(amount > this.mySelf.money) this.txtAmount.string = this.mySelf.money;
      amount = parseInt(this.txtAmount.string);
      this.lbAmount.string = amount - amount * 0.02;
    },

    onHadlerGetOTP: function() {
      this.root.activeGetOTP();
    },

    onHandlerAcceptTransfers: function() {
      this.root.activeSenTransferdes({
        toDisplayName: this.txtToDisplayName.string,
        amount: this.txtAmount.string,
        reason: this.txtReason.string,
      });

    },

    resetTransferdes: function() {
      this.txtToDisplayName.string = "";
      this.txtAmount.string = "";
      this.txtReason.string = "";
      this.txtError.string = "";
    },

    updateCheckAccountTransferdes: function(message) {
      this.txtError.string = message;
    },
});
