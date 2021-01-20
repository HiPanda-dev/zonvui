var BaseMediator = require('BaseMediator');
var LobbyMessage = require('LobbyMessage');
var puremvc = BaseMediator.puremvc;
var SecuritySceneMediator = puremvc.define
(
    // CLASS INFO
    {
        name: 'SecuritySceneMediator',
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
                LobbyMessage.SHOW_SECURITY_SCENE,
                LobbyMessage.HIDE_SECURITY_SCENE,
                LobbyMessage.ON_UPDATE_CHANGE_PASS,
                LobbyMessage.ON_UPDATE_SET_PHONE,
                LobbyMessage.ON_UPDATE_SET_OTP,
                LobbyMessage.ON_UPDATE_GET_DESCRIPTION,
            ];
        },

        /** @override */
        handleNotification: function (notification) {
            BaseMediator.prototype.handleNotification.call(this);
            this.mySelf = this.facade.retrieveProxy('UserProxy').mySelf;
            var params = notification.getBody();
            switch (notification.getName()) {
                case LobbyMessage.SHOW_SECURITY_SCENE:
                    this.view.show(this.mySelf);
                    this.view.onShowTab(params);
                    break;
                case LobbyMessage.HIDE_SECURITY_SCENE:
                    this.view.hide();
                    break;
                case LobbyMessage.ON_UPDATE_CHANGE_PASS:
                    this.view.onUpdateChangePass();
                    break;
                case LobbyMessage.ON_UPDATE_SET_PHONE:
                    this.view.onUpdateSetPhone();
                    break;
                case LobbyMessage.ON_UPDATE_SET_OTP:
                    this.view.onUpdateSetOtp();
                    break;
                case LobbyMessage.ON_UPDATE_GET_DESCRIPTION:
                    this.view.onUpdateGetDescription(params);
                    break;
                default:
                    break;
            }
        },

        addHanlers: function () {
            this.view.activeChangePass = this.activeChangePass.bind(this);
            this.view.activeSetPhone = this.activeSetPhone.bind(this);
            this.view.activeSetOtp = this.activeSetOtp.bind(this);
            this.view.activeGetDescription = this.activeGetDescription.bind(this);
            this.view.activeShowInfo = this.activeShowInfo.bind(this);
        },

        activeChangePass: function (params) {
            this.sendNotification(LobbyMessage.SEND_CHANGE_PASS, params);
        },

        activeSetPhone: function (params) {
            this.sendNotification(LobbyMessage.SEND_SET_PHONE, params);
        },

        activeSetOtp: function (params) {
            this.sendNotification(LobbyMessage.SEND_SET_OTP, params);
        },

        activeGetDescription: function (params) {
            this.sendNotification(LobbyMessage.SEND_GET_DESCRIPTION, params);
        },

        activeShowInfo:function () {
            this.sendNotification(LobbyMessage.SHOW_USER_PROFILE_SCENE);
            this.sendNotification(LobbyMessage.HIDE_SECURITY_SCENE);
        }
    },
    // STATIC MEMBERS
    {
        getInstance: function () {
            if (this.instance === null) {
                this.instance = new SecuritySceneMediator();
            }
            return this.instance;
        },
        instance: null,
        NAME: 'SecuritySceneMediator'
    }
);

module.exports = SecuritySceneMediator;
