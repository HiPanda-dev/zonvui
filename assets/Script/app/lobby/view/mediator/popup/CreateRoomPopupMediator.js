var BaseMediator = require('BaseMediator');
var LobbyMessage = require('LobbyMessage');
var GameConfig = require('GameConfig');
var i18n = require('i18n');
var Utility = require('Utility');
var puremvc = BaseMediator.puremvc;
var CreateRoomPopupMediator = puremvc.define
(
    // CLASS INFO
    {
        name: 'CreateRoomPopupMediator',
        parent: BaseMediator,
        constructor: function () {
            puremvc.Mediator.call(this, this.constructor.NAME);
        }
    },
    // INSTANCE MEMBERS
    {
        initialize: function () {
            this.channelProxy = this.facade.retrieveProxy("ChannelProxy");
            this.userProxy = this.facade.retrieveProxy("UserProxy");
        },

        /** @override */
        listNotificationInterests: function () {
            return [
                LobbyMessage.SHOW_CREATE_ROOM_POPUP,
                LobbyMessage.HIDE_CREATE_ROOM_POPUP
            ];
        },

        /** @override */
        handleNotification: function (notification) {
            switch (notification.getName()) {
                case LobbyMessage.SHOW_CREATE_ROOM_POPUP:
                    var listBet = this.channelProxy.getListBetCreateTable(this.userProxy.mySelf.gold());
                    if(listBet.length > 0){
                        this.view.show();
                        this.view.initBetCombobox(listBet);
                        this.view.initNumPlayCombobox(this.channelProxy.getCurrentNumPlay());
                    }else{
                        var txt = (GameConfig.CURRENT_MODE === "MONEY")?i18n.t("C0044"):i18n.t("C0045");
                        this.openAlertEnoughMoney(Utility.setText(i18n.t("C0010"), [txt, txt]));
                    }
                    break;
                case LobbyMessage.HIDE_CREATE_ROOM_POPUP:
                    this.view.hide();
                    break;
                default:
                    break;
            }
        },

        addHanlers: function () {
            this.view.activeCreateRoom = this.activeCreateRoom.bind(this);
        },

        activeCreateRoom:function (params) {
            this.sendNotification(LobbyMessage.SEND_CREATE_ROOM, params);
            this.view.hide();
        }
    },
    // STATIC MEMBERS
    {
        getInstance: function () {
            if (this.instance === null) {
                this.instance = new CreateRoomPopupMediator();
            }
            return this.instance;
        },
        instance: null,
        NAME: 'CreateRoomPopupMediator'
    }
);

module.exports = CreateRoomPopupMediator;
