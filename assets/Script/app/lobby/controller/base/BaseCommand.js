var puremvc = window.puremvc;//require('../../../../lib/puremvc-1.0.1').puremvc;
var i18n = require('i18n');
var LobbyMessage = require('LobbyMessage');
var SFSSubMesseage = require('SFSSubMesseage');
var SFSMessage = require('SFSMessage');
var Utility = require('Utility');
var GameConfig = require('GameConfig');
var LocalStorage = require('LocalStorage');

module.exports = puremvc.define(
    // CLASS INFO
    {
        parent: puremvc.SimpleCommand
    },

    // INSTANCE MEMBERS
    {
        execute: function (notification) {
            this.dataUser = this.facade.retrieveProxy("UserProxy");
        },

        /**
         * kiểm tra xem đã login hay chua?
         */

        isLogin: function (alertMsg) {
            var userProxy = this.facade.retrieveProxy('UserProxy');
            if (userProxy.mySelf.id === "") {
                this.sendNotification(LobbyMessage.SHOW_FLY_ALERT, {content: i18n.t(alertMsg)});
                return false;
            }
            return true;
        },

        /**
         * kiểm tra xem có đủ tiền hay ko?
         * @param money
         * @returns {boolean}
         */
        checkEnoughMoney: function (money) {
            money = (money) ? money : 0;
            var mySelf = this.dataUser.mySelf;

            if (mySelf.gold() < money || mySelf.gold() === 0) {
                var txt = (GameConfig.CURRENT_MODE === "MONEY") ? i18n.t("C0044") : i18n.t("C0045");
                this.openAlertEnoughMoney(Utility.setText(i18n.t("C0010"), [txt, txt]));
                return true;
            }
            return false;
        },

        /**
         * kiểm tra xem có đủ tiền hay ko?
         * type la money hoac chip
         * @param money
         * @returns {boolean}
         */
        checkEnoughMoneyWithType: function (money, type) {
            money = (money) ? money : 0;
            var mySelf = this.dataUser.mySelf;

            var isNotEnoughMoney = false;
            if (type === 'money') {
                if (mySelf.money < money)
                    isNotEnoughMoney = true;
            }
            else {
                if (mySelf.chip < money)
                    isNotEnoughMoney = true;
            }

            if (isNotEnoughMoney) {
                var txt = (type === 'money') ? i18n.t("C0044") : i18n.t("C0045");
                this.openAlertEnoughMoney(Utility.setText(i18n.t("C0010"), [txt, txt]));
                return true;
            }

            return false;
        },

        sendRefreshMoney: function () {
            var data = {
                cmd: SFSSubMesseage.SEND_REFERSH_MONEY
            };

            this.sendNotification(SFSMessage.SEND_TO_SERVER, data);
        },

        isError: function (data) {
            switch (data.errCode) {
                case "00": //Không có lỗi
                    return false;
                case "01": //Là mã lỗi được trả về khi muốn thông báo cho user biết, khi gặp mã lỗi này thì hiển thị trường message cho user
                    this.sendNotification(LobbyMessage.SHOW_FLY_ALERT, {content: data.message});
                    return true;
                case "02": //Là mã lỗi được trả về khi thông tin user không đúng, ví dụ như sai token, khi gặp mã lỗi này thì logout ra màn hình login
                    this.sendNotification(LobbyMessage.SHOW_FLY_ALERT, {content: data.message});
                    this.sendNotification(LobbyMessage.SHOW_LOGIN_SCENE);
                    this.sendNotification(LobbyMessage.SHOW_SELECT_GAME_SCENE);
                    this.sendNotification(LobbyMessage.SHOW_EVENT_BANNER_SCENE);
                    this.sendNotification(LobbyMessage.HIDE_TOP_MENU);
                    this.sendNotification(LobbyMessage.HIDE_BOTTOM_MENU);
                    this.sendNotification(LobbyMessage.HIDE_ALL_POPUP);
                    this.sendNotification(LobbyMessage.ON_RESET_MYSELF);
                    this.sendNotification(LobbyMessage.UPDATE_LOGIN_SCENE, {userName: "", password: ""});
                    LocalStorage.setIsSocial(-1);
                    return true;
                case "03": //Không đủ tiền bật form nạp
                    this.openAlertEnoughMoney(data.message);
                    return true;
            }
            return false;
        },

        isErrorMinigame: function (data) {
            switch (data.errorCode) {
                case 0:
                    this.onShowMessageMinigame(i18n.t("T0001"));
                    return false;
                case 1:
                    this.onShowMessageMinigame(i18n.t("T0002"));
                    return true;
                case 2:
                    this.onShowMessageMinigame(i18n.t("T0003"));
                    return true;
                case 3:
                    this.onShowMessageMinigame(i18n.t("T0004"));
                    return true;
                case 4:
                    this.onShowMessageMinigame(i18n.t("T0005"));
                    return true;
                case 5:
                    this.onShowMessageMinigame(i18n.t("T0006"));
                    return true;
            }
        },

        openAlertEnoughMoney: function (message) {
            this.sendNotification(LobbyMessage.SHOW_ALERT_WITH_CONFIRM, {
                content: message,
                acceptLabel: i18n.t("C0025"),
                callback: this.onShowRechargePopup.bind(this)
            });
        },

        onShowRechargePopup: function () {
            this.sendNotification(LobbyMessage.SHOW_RECHARGE_SCENE);
        },

        onShowMessageMinigame: function () {

        }

    },

    // STATIC MEMBERS
    {
        puremvc: puremvc,
        NAME: "BaseCommand"
    }
);
