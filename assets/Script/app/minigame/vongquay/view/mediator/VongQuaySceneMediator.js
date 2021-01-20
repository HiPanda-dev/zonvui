var BaseMediator = require('BaseMediator');
var Constants = require('Constants');
var LobbyMessage = require('LobbyMessage');
var MiniGameMessage = require('MiniGameMessage');
var CustomAction = require('CustomAction');
var puremvc = BaseMediator.puremvc;
var VongQuaySceneMediator = puremvc.define
(
    // CLASS INFO
    {
        name: 'VongQuaySceneMediator',
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
                MiniGameMessage.SHOW_MINIGAME_VONG_QUAY,
                MiniGameMessage.HIDE_MINIGAME_VONG_QUAY,
                MiniGameMessage.ON_UPDATE_INFO_VONG_QUAY,
                MiniGameMessage.ON_SPIN_VONG_QUAY,
                MiniGameMessage.ON_SHOW_RESULT_VONG_QUAY,
                MiniGameMessage.SHOW_MESSAGE_VONG_QUAY,
                MiniGameMessage.DISCONNECT_ALL_MINIGAME
            ];
        },

        /** @override */
        handleNotification: function (notification) {
            BaseMediator.prototype.handleNotification.call(this);
            var data = notification.getBody();
            switch (notification.getName()) {
                case MiniGameMessage.SHOW_MINIGAME_VONG_QUAY:
                    this.view.show();
                    break;
                case MiniGameMessage.DISCONNECT_ALL_MINIGAME:
                    this.view.hide();
                    this.activeDisconnect();
                    break;
                case MiniGameMessage.ON_UPDATE_INFO_VONG_QUAY:
                    this.view.onUpdateInfo(data);
                    break;
                case MiniGameMessage.ON_SPIN_VONG_QUAY:
                    this.view.onStartSpin(data);
                    break;
                case MiniGameMessage.ON_SHOW_RESULT_VONG_QUAY:
                    this.view.onShowResultSpin(data);
                    break;
                case MiniGameMessage.SHOW_MESSAGE_VONG_QUAY:
                    this.view.onShowMessage(data);
                    break;
                default:
                    break;
            }
        },

        addHanlers: function () {
            BaseMediator.prototype.addHanlers.call(this);
            this.view.activeSendGetInfoVongQuay = this.activeSendGetInfoVongQuay.bind(this);
            this.view.activeSendSpinVongQuay = this.activeSendSpinVongQuay.bind(this);
            this.view.activeBtnRank = this.activeBtnRank.bind(this);
            this.view.activeBtnHistory = this.activeBtnHistory.bind(this);
            this.view.activeBtnGuide = this.activeBtnGuide.bind(this);
            this.view.activeUpdateMoney = this.activeUpdateMoney.bind(this);
            this.view.activeDisconnect = this.activeDisconnect.bind(this);

        },

        activeSendGetInfoVongQuay: function () {
            this.sendNotification(MiniGameMessage.SEND_GET_INFO_VONG_QUAY);
        },

        activeSendSpinVongQuay: function () {
            this.sendNotification(MiniGameMessage.SEND_SPIN_VONG_QUAY);
        },

        activeBtnRank: function () {
            this.sendNotification(MiniGameMessage.SHOW_RANK_MINIGAME, Constants.MINIGAME_VONG_QUAY);
        },

        activeBtnHistory: function () {
            this.sendNotification(MiniGameMessage.SHOW_HISTORY_MINIGAME, Constants.MINIGAME_VONG_QUAY);
        },

        activeBtnGuide: function () {
            this.sendNotification(MiniGameMessage.SEND_SHOW_GUIDE_MINIGAME, CustomAction.ACTION_VONG_QUAY);
        },

        activeUpdateMoney: function () {
            this.sendNotification(LobbyMessage.ON_UPDATE_MY_INFO);
        },

        activeDisconnect:function () {
            this.sendNotification(MiniGameMessage.SEND_DISCONNECT_MINIGAME, Constants.MINIGAME_VONG_QUAY);
        }
    },
    // STATIC MEMBERS
    {
        getInstance: function () {
            if (this.instance === null) {
                this.instance = new VongQuaySceneMediator();
            }
            return this.instance;
        },
        instance: null,
        NAME: 'VongQuaySceneMediator'
    }
);

module.exports = VongQuaySceneMediator;
