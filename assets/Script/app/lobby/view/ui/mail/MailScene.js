var BasePopup = require('BasePopup');
var MailSceneMediator = require('MailSceneMediator');
var TabMail = require('TabMail');
var TabSupport = require('TabSupport');
var LobbyEvent = require('LobbyEvent');
var TabMain = require('TabMain');

cc.Class({
    extends: BasePopup,

    properties: {
        tabMain:TabMain,
        tabMail: TabMail,
        tabSupport: TabSupport,
    },

    ctor: function () {
      MailSceneMediator.getInstance().init(this);
    },

    // use this for initialization
    onLoad: function () {
        this.addEventListeners();
        this.hide();
    },

    addEventListeners: function () {
        this.tabMail.node.on(LobbyEvent.GET_MAIL_LIST, this.onHandlerGetMailList, this);
        this.tabMail.node.on(LobbyEvent.GET_MAIL_DETAIL, this.onHandlerGetMailDetail, this);
        this.tabMail.node.on(LobbyEvent.DELETE_MAIL, this.onHandlerDeleteMail, this);
        this.tabSupport.node.on(LobbyEvent.GET_SUPPORT_DETAIL, this.onHandlerGetSupportDetail, this);
        this.tabSupport.node.on(LobbyEvent.SEND_SUPPORT_ANSWER, this.onHandlerSendSupportAnswer, this);
    },

    removeEventListeners: function () {
        this.tabMail.node.off(LobbyEvent.GET_MAIL_LIST, this.onHandlerGetMailList, this);
        this.tabMail.node.off(LobbyEvent.GET_MAIL_DETAIL, this.onHandlerGetMailDetail, this);
        this.tabMail.node.off(LobbyEvent.DELETE_MAIL, this.onHandlerDeleteMail, this);
        this.tabSupport.node.off(LobbyEvent.GET_SUPPORT_DETAIL, this.onHandlerGetSupportDetail, this);
        this.tabSupport.node.off(LobbyEvent.SEND_SUPPORT_ANSWER, this.onHandlerSendSupportAnswer, this);
    },

    onChangeTab: function (params) {
        switch (this.tabMain.getCurPageView()) {
            case  this.tabMail.node:
                this.tabMail.onGetMailList();
                break;
            case  this.tabSupport.node:
                this.tabSupport.onViewSupport();
                break;
            default:
                break;
        }
    },

    onShowTab:function (tabId) {
        this.tabMain.openTab(tabId);
    },

    onHandlerSendSupportAnswer: function (params) {
        this.activeSendSupportAnswer(params.detail);
    },

    onHandlerGetMailList: function (params) {
        this.activeGetMailList(params);
    },

    onHandlerGetSupportList: function (params) {
        this.activeGetSupportList(params.detail);
    },

    onHandlerGetMailDetail: function (params) {
        this.activeGetMailDetail(params);
    },

    onHandlerDeleteMail: function (params) {
        this.activeDeleteMail(params);
    },

    onHandlerGetSupportDetail: function (params) {
        this.activeGetSupportDetail(params.detail);
    },

    onHandlerSendSupport: function (params) {
        this.activeSendSupport(params.detail);
    },

    onUpdateMailList:function (mailList) {
        this.tabMail.updateMailList(mailList);
    },

    onUpdateDeleteMail:function (mailList) {
        this.tabMail.updateDeleteMail();
    },

    onUpdateMailDetail:function (mailDetail) {
        this.tabMail.updateMailDetail(mailDetail);
    },

    onUpdateSupportDetail:function (supportDetail) {
        this.tabSupport.updateSupportDetail(supportDetail);
    },

    onUpdateSupportInfo:function (supportInfo) {
        this.tabSupport.updateSupportInfo(supportInfo);
    },

    onUpdateSendSupport:function (data) {
        this.tabSupport.updateSendSupport(data);
    },

    onUpdateSupportAnswer: function (data) {
        this.tabSupport.updateSupportAnswer(data);
    },

    show:function () {
        BasePopup.prototype.show.call(this);
        this.activeGetMailList({pageIndex: 1});
    },

    showSupportMail:function () {
        BasePopup.prototype.show.call(this);
        this.onShowTab("0x00032");
    }
});
