var BaseCommand = require('BaseCommand');
var SFSGameCommand = require('SFSGameCommand');
var SFSSubMesseage = require('SFSSubMesseage');
var SFSEvent = require('SFSEvent');

var puremvc = BaseCommand.puremvc;

module.exports = puremvc.define(
    // CLASS INFO
    {
        parent: SFSGameCommand
    },

    // INSTANCE MEMBERS
    {
        SFSData:{
            COMMAND:'command',
            DISCARD:'discard',
            NEXT_TURN:'nextTurn',
            USER_NAME:'userName',
            CARDS:'cards',
            CARD_ARRAY_1:'cardArray1',
            CARD_ARRAY_2:'cardArray2',
            CARD_ARRAY_3:'cardArray3',
            CARD_ARRAY_4:'cardArray4',
            START_GAME_1:'startGame1'
        },

        execute: function (notification) {
            var params = notification.getBody();
            SFSGameCommand.prototype.execute.call(this, notification);
            switch (params.cmd) {
                case SFSSubMesseage.SEND_PLAY_GAME:
                    this.onSendPlayGame(params);
                    break;
                case SFSSubMesseage.SEND_CANNEL_TURN:
                    this.onSendCancelTurn(params);
                    break;
            }
        },

        onSendPlayGame:function (params) {
            var cards = params.params.cards;
            var sfo = {};
            sfo[this.SFSData.COMMAND] = this.SFSData.DISCARD;
            sfo[this.SFSData.CARDS] = cards;

            this.sendExtensionRequest(SFSEvent.DISCARD, sfo);
        },

        onSendCancelTurn:function (params) {
            var userName = params.params.userName;
            var sfo = {};
            sfo[this.SFSData.COMMAND] = this.SFSData.NEXT_TURN;
            sfo[this.SFSData.USER_NAME] = userName;

            this.sendExtensionRequest(SFSEvent.NEXT_TURN, sfo);
        },

        onSendFakeCard: function (params) {
            var arrCards = params.params.arrCards;
            var sfo = {};

            sfo[this.SFSData.COMMAND] = this.SFSData.START_GAME_1;
            sfo[this.SFSData.CARD_ARRAY_1] = arrCards[0];
            sfo[this.SFSData.CARD_ARRAY_2] = arrCards[1];
            sfo[this.SFSData.CARD_ARRAY_3] = arrCards[2];
            sfo[this.SFSData.CARD_ARRAY_4] = arrCards[3];

            this.sendExtensionRequest(SFSEvent.START_GAME_1, sfo);
        },
    },

    // STATIC MEMBERS
    {
        NAME: "SFSTLMNCommand"
    }
);
