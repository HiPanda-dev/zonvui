var puremvc = window.puremvc;//require('../../../../../lib/puremvc-1.0.1').puremvc;
var LobbyMessage = require('LobbyMessage');
var GameConfig = require('GameConfig');
var i18n = require('i18n');
var Utility = require('Utility');

module.exports = puremvc.define
(
    // CLASS INFO
    {
        name: 'BaseMediator',
        parent: puremvc.Mediator,
        view:null,
        constructor: function () {
            puremvc.Mediator.call(this, this.constructor.NAME);
        }
    },
    // INSTANCE MEMBERS
    {
        init: function(viewComponent) {
            if(this.viewComponent && this.viewComponent.uuid === viewComponent.uuid) return;
            this.viewComponent = viewComponent;
            this.view = this.getViewComponent();
            this.addHanlers();
            this.initialize();

        },

        initialize:function () {

        },

        /** @override */
        listNotificationInterests: function () {

        },

        /** @override */
        handleNotification: function (notification) {

        },

        /** @override */
        addHanlers: function () {
            this.view.activeShowAlert = this.activeShowAlert.bind(this);
        },

        activeShowAlert:function (message) {
            this.sendNotification(LobbyMessage.SHOW_ALERT, {content: message});
        },

        /**
         * kiểm tra xem có đủ tiền hay ko?
         * @param money
         * @returns {boolean}
         */
        checkEnoughMoney:function (money) {
            this.dataUser = this.facade.retrieveProxy("UserProxy");
            money = (money)?money:0;
            var mySelf =  this.dataUser.mySelf;

            if(mySelf.gold() < money || mySelf.gold() === 0){
                var txt = (GameConfig.CURRENT_MODE === "MONEY")?i18n.t("C0044"):i18n.t("C0045");
                this.openAlertEnoughMoney(Utility.setText(i18n.t("C0010"), [txt, txt]));
                return true;
            }
            return false;
        },

        openAlertEnoughMoney:function (message) {
            this.sendNotification(LobbyMessage.SHOW_ALERT_WITH_CONFIRM, {
                content: message,
                acceptLabel: i18n.t("C0025"),
                callback: this.onShowRechargePopup.bind(this)
            });
        },

        onShowRechargePopup: function () {
            this.sendNotification(LobbyMessage.SHOW_RECHARGE_SCENE);
        },

        isLogin: function (alertMsg) {
            var userProxy = this.facade.retrieveProxy('UserProxy');
            if (userProxy.mySelf.id === "") {
                this.sendNotification(LobbyMessage.SHOW_FLY_ALERT, {content: i18n.t(alertMsg)});
                return false;
            }
            return true;
        },


    },
    // STATIC MEMBERS
    {
        puremvc:puremvc
    }
);
