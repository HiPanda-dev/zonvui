var BaseVO = require("BaseVO");

var puremvc = BaseVO.puremvc;

module.exports = puremvc.define
(
    // CLASS INFO
    {
        constructor: function () {
            this.mailList = null;
            this.mailDetail = null;
            this.supportList = null;
            this.supportInfo = null;
            this.supportAnswer = null;
            this.supportDetail = null;
            this.sendSupportResult = null;
        }
    },

    // INSTANCE MEMBERS
    {
        updateMailList:function (data) {
            this.mailList = data;
        },

        updateMailDetail:function (data) {
            this.mailDetail = data;
        },

        updateSupportList:function (data) {
            this.supportList = data;
        },

        updateSupportAnswer:function (data) {
            this.supportAnswer = data;
        },

        updateSupportInfo:function (data) {
            this.supportInfo = data;
        },

        updateSendSupport:function (data) {
            this.sendSupportResult = data;
        },

        updateSupportDetail:function (data) {
            this.supportDetail = data;
        }
    },
    // STATIC MEMBERS
    {}
);