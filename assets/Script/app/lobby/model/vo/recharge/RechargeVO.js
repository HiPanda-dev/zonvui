var BaseVO = require("BaseVO");
var CardData = require('CardData');
var Sms9029Data = require('Sms9029Data');
var OtpData = require('OtpData');
var BankData = require('BankData');
var ChargeChipData = require('ChargeChipData');
var ResultOtpVO = require('ResultOtpVO');

var puremvc = BaseVO.puremvc;

module.exports = puremvc.define
(
    // CLASS INFO
    {
        constructor: function () {
            this.cardData = null;
            this.sms9029Data = null;
            this.otpData = null;
            this.bankData = null;
            this.chargeChipData = null;
            this.resultOtpVO = null;
        }
    },

    // INSTANCE MEMBERS
    {
        update:function (data) {
            this.cardData = new CardData();
            this.sms9029Data = new Sms9029Data();
            this.otpData = new OtpData();
            this.bankData = new BankData();
            this.chargeChipData = new ChargeChipData();

            this.cardData.update(data.cardData);
            this.sms9029Data.update(data.sms9029Data);
            this.otpData.update(data.otpData);
            this.bankData.update(data.bankData);
            this.chargeChipData.update(data.chargeChipData);
        },

        updateResultOTP: function (data) {
            this.resultOtpVO = new ResultOtpVO();
            this.resultOtpVO.update(data);
        }
    },
    // STATIC MEMBERS
    {}
);