var BaseMediator = require('BaseMediator');
var LobbyMessage = require('LobbyMessage');
var puremvc = BaseMediator.puremvc;
var MailSceneMediator = puremvc.define
(
    // CLASS INFO
    {
        name: 'MailSceneMediator',
        parent: BaseMediator,
        constructor: function () {
            puremvc.Mediator.call(this, this.constructor.NAME);
        }
    },
    // INSTANCE MEMBERS
    {
        initialize: function () {
        },

        /** @override */
        listNotificationInterests: function () {
            return [
                LobbyMessage.SHOW_MAIL_SCENE,
                LobbyMessage.HIDE_MAIL_SCENE,
                LobbyMessage.SHOW_SUPPORT_MAIL_SCENE,
                LobbyMessage.ON_UPDATE_MAIL_LIST,
                LobbyMessage.ON_UPDATE_MAIL_DETAIL,
                LobbyMessage.ON_UPDATE_DELETE_MAIL,
                LobbyMessage.ON_UPDATE_SUPPORT_DETAIL,
                LobbyMessage.ON_UPDATE_SUPPORT_INFO,
                LobbyMessage.ON_UPDATE_SEND_SUPPORT,
                LobbyMessage.ON_UPDATE_SUPPORT_ANSWER,
                LobbyMessage.SHOW_TAB_IN_MAIL_SCENE
            ];
        },

        /** @override */
        handleNotification: function (notification) {
            BaseMediator.prototype.handleNotification.call(this);
            this.mailProxy = this.facade.retrieveProxy('MailProxy');
            var params = notification.getBody();
            switch (notification.getName()) {
                case LobbyMessage.SHOW_MAIL_SCENE:
                    this.view.show();
                    break;
                case LobbyMessage.HIDE_MAIL_SCENE:
                    this.view.hide();
                    break;
                case LobbyMessage.SHOW_SUPPORT_MAIL_SCENE:
                    this.view.showSupportMail();
                    break;
                case LobbyMessage.ON_UPDATE_MAIL_LIST:
                    this.view.onUpdateMailList(params);
                    break;
                case LobbyMessage.ON_UPDATE_DELETE_MAIL:
                    this.view.onUpdateDeleteMail(this.mailProxy.mailVo.mailList);
                    break;
                case LobbyMessage.ON_UPDATE_SUPPORT_ANSWER:
                    this.view.onUpdateSupportAnswer(this.mailProxy.mailVo.supportAnswer);
                    break;
                case LobbyMessage.ON_UPDATE_MAIL_DETAIL:
                    this.view.onUpdateMailDetail(this.mailProxy.mailVo.mailDetail);
                    break;
                case LobbyMessage.ON_UPDATE_SUPPORT_DETAIL:
                    this.view.onUpdateSupportDetail(this.mailProxy.mailVo.supportDetail);
                    break;
                case LobbyMessage.ON_UPDATE_SUPPORT_INFO:
                    this.view.onUpdateSupportInfo(this.mailProxy.mailVo.supportInfo);
                    break;
                case LobbyMessage.ON_UPDATE_SEND_SUPPORT:
                    this.view.onUpdateSendSupport(this.mailProxy.mailVo.sendSupportResult);
                    break;
                case LobbyMessage.SHOW_TAB_IN_MAIL_SCENE:
                    this.view.onShowTab(params.tabId);
                    break;
                default:
                    break;
            }
        },

        addHanlers: function () {
            this.view.activeGetMailList = this.activeGetMailList.bind(this);
            this.view.activeGetMailDetail = this.activeGetMailDetail.bind(this);
            this.view.activeGetSupportDetail = this.activeGetSupportDetail.bind(this);
            this.view.activeGetSupportInfo = this.activeGetSupportInfo.bind(this);
            this.view.activeSendSupport = this.activeSendSupport.bind(this);
            this.view.activeSendSupportAnswer = this.activeSendSupportAnswer.bind(this);
            this.view.activeDeleteMail = this.activeDeleteMail.bind(this);
        },

        activeSendSupportAnswer: function (params) {
            this.sendNotification(LobbyMessage.SEND_SUPPORT_ANSWER, params);
        },

        activeGetMailList: function (params) {
            this.sendNotification(LobbyMessage.SEND_GET_MAIL_LIST, params);
        },

        activeDeleteMail: function (params) {
            this.sendNotification(LobbyMessage.SEND_DELETE_MAIL, params);
        },

        activeGetMailDetail: function (params) {
            this.sendNotification(LobbyMessage.SEND_GET_MAIL_DETAIL, params);
        },

        activeGetSupportDetail: function (params) {
            this.sendNotification(LobbyMessage.SEND_GET_SUPPORT_DETAIL, params);
        },

        activeGetSupportInfo: function (params) {
            this.sendNotification(LobbyMessage.SEND_GET_SUPPORT_INFO, params);
        },

        activeSendSupport: function (params) {
            this.sendNotification(LobbyMessage.SEND_SEND_SUPPORT, params);
        }
    },
    // STATIC MEMBERS
    {
        getInstance: function () {
            if (this.instance === null) {
                this.instance = new MailSceneMediator();
            }
            return this.instance;
        },
        instance: null,
        NAME: 'MailSceneMediator'
    }
);

module.exports = MailSceneMediator;
