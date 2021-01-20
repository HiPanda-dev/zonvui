var BaseCommand = require('BaseCommand');
var LobbyMessage = require('LobbyMessage');
var SFSEvent = require('SFSEvent');
var Utility = require('Utility');
var GameConfig = require('GameConfig');
var i18n = require('i18n');

var puremvc = BaseCommand.puremvc;

module.exports = puremvc.define(
    // CLASS INFO
    {
        parent: BaseCommand
    },

    // INSTANCE MEMBERS
    {

        errData: {
            ROOM_BET_NOT_EXIST: 1000,
            FREE_CURRENCY_NOT_ENOUGH: 1001,
            ROOM_NOT_EXIST: 1002
        },

        execute: function (notification) {
            var params = notification.getBody();

            switch (params.cmd) {
                case SFSEvent.GET_ROOM_LIST:
                    this.onUpdateRoomList(params);
                    break;
                case SFSEvent.ADD_ROOM:
                    this.onAddRoom(params);
                    break;
                case SFSEvent.REMOVE_ROOM:
                    this.onRemoveRoom(params);
                    break;
                case SFSEvent.ERROR:
                    this.onError(params);
                    break;
            }
        },

        onUpdateRoomList: function (evtParams) {
            var responseParams = evtParams.params;
            var sfsRoomList = responseParams['roomList'];
            var roomList = [];
            for (var i = 0; i < sfsRoomList.length; i++) {
                var vo = sfsRoomList[i];
                roomList.push(vo);
            }
            this.sendNotification(LobbyMessage.RECEIVE_UPDATE_ROOM_LIST, {roomList: roomList});
        },

        onAddRoom: function (evtParams) {

        },

        onRemoveRoom: function (evtParams) {

        },

        onError: function (evtParams) {
            var responseParams = evtParams.params;
            var code = responseParams['code'];
            switch (code) {
                case this.errData.ROOM_BET_NOT_EXIST:
                    this.sendNotification(LobbyMessage.SHOW_ALERT, {content: i18n.t('C0048')});
                    this.sendNotification(LobbyMessage.HIDE_LOADING);
                    break;
                case this.errData.FREE_CURRENCY_NOT_ENOUGH:
                    //var freeBalance = responseParams.get('code');
                    var txt = (GameConfig.CURRENT_MODE === "MONEY") ? i18n.t("C0044") : i18n.t("C0045");
                    this.openAlertEnoughMoney(Utility.setText(i18n.t("C0010"), [txt, txt]));
                    this.sendNotification(LobbyMessage.HIDE_LOADING);
                    break;
                case this.errData.ROOM_NOT_EXIST:
                    this.sendNotification(LobbyMessage.SHOW_ALERT, {content: i18n.t('C0049')});
                    this.sendNotification(LobbyMessage.HIDE_LOADING);
                    break;
            }
        }
    },

    // STATIC MEMBERS
    {
        NAME: "SFSLobbyReponseCommand"
    }
);
