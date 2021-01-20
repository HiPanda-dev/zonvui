var BaseCommand = require('BaseCommand');
var SFSSubMesseage = require('SFSSubMesseage');
var SFSMinigameCommand = require('SFSMinigameCommand');
var SFSEvent = require('SFSEvent');

var puremvc = BaseCommand.puremvc;

module.exports = puremvc.define(
    // CLASS INFO
    {
        parent: SFSMinigameCommand
    },

    // INSTANCE MEMBERS
    {
        SFSData:{
            COMMAND:'cmd',
            BET:'bet',
            VALUE: 'value',
            TYPE: 'type',
            PAGE: 'page',
            SESSION:'sId',
            MONEY_TYPE:'moneyType',
            MESSAGE:'message',
            USER_NAME:'userName',
            DISPLAY_NAME:'displayName',
            PUBLIC_CHAT:'PUBLIC_CHAT'
        },

        execute: function (notification) {
            this.sfsProxy = this.facade.retrieveProxy('SFSTaiXiuProxy');
            this.dataUser = this.facade.retrieveProxy('UserProxy');

            SFSMinigameCommand.prototype.execute.call(this, notification);

            var params = notification.getBody();
            switch (params.cmd) {
                case SFSSubMesseage.SEND_BET_TAIXIU:
                    this.onSendBet(params);
                    break;

                case SFSSubMesseage.SEND_CHANGE_MONEY_TYPE_TAIXIU:
                    this.onChangeMoneyType(params);
                    break;

                case SFSSubMesseage.SEND_GET_DETAIL_SESSION_TAIXIU:
                    this.onSendGetDetailSession(params);
                    break;

                case SFSSubMesseage.SEND_CHAT:
                    this.onSendChat(params.data);
                    break;

                case SFSSubMesseage.SEND_GET_EVENT_TAIXIU:
                    this.onSendGetEvent(params.params);
                    break;
            }
        },

        // onJoinGame: function (params) {
        //     this.sfsProxy.joinZone("192.168.0.135", 8080, params.data.userJoin, "", params.data.zoneName, this.dataUser.mySelf.token);
        // },

        onSendBet: function (params) {
            var sfo = {};//new SFS2X.SFSObject();
            sfo[this.SFSData.VALUE] = params.params.value;
            sfo[this.SFSData.TYPE] = params.params.type;
            sfo[this.SFSData.MONEY_TYPE] = params.params.moneyType;

            this.sendExtensionRequest(SFSEvent.BET, sfo);
        },

        onChangeMoneyType: function (params) {
            var sfo = {};
            sfo[this.SFSData.MONEY_TYPE] = params.params.moneyType;
            this.sendExtensionRequest(SFSEvent.CHANGE_MONEY_TYPE, sfo);
        },

        onSendGetDetailSession: function (params) {
            params = params.params;
            var session = params.session;
            var page = params.page;
            var type = params.moneyType;
            var sfsob = {};
            sfsob[this.SFSData.VALUE] = params.params.page;
            sfsob[this.SFSData.MONEY_TYPE] = params.params.type;
            sfsob[this.SFSData.SESSION] = params.params.session;

            this.sendExtensionRequest(SFSEvent.GET_DETAIL_SESSION, sfsob);
        },

        onSendChat:function (params) {
            var sfo = {};
            sfo[this.SFSData.COMMAND] = this.SFSData.PUBLIC_CHAT;
            sfo[this.SFSData.MESSAGE] = params.message;
            sfo[this.SFSData.DISPLAY_NAME] = params.displayName;
            sfo[this.SFSData.USER_NAME] = this.dataUser.mySelf.uid;

            var room = this.sfsProxy.sfs.lastJoinedRoom;
            var request = new SFS2X.PublicMessageRequest(SFSEvent.PUBLIC_CHAT, sfo, room);
            this.sfsProxy.send(request);
        },

        onSendGetEvent: function (params) {
            var type = params.type;
            var isWin = params.isWin;
            var indexDate = params.indexDate;

            var sfsob = {};
            sfsob['type'] = type;
            sfsob['isWin'] = isWin;
            sfsob['indexDate'] = indexDate;

            this.sendExtensionRequest("getTopEvent", sfsob);
        }

    },

    // STATIC MEMBERS
    {
        NAME: "SFSTaiXiuCommand"
    }
);
