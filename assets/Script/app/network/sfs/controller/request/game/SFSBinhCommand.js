var BaseCommand = require('BaseCommand');
var SFSEvent = require('SFSEvent');
var SFSSubMesseage = require('SFSSubMesseage');
var SFSGameCommand = require('SFSGameCommand');
var Utility = require('Utility');

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
            SORT_FINISH:'sortFinish',
            SUBMIT_HAND:'submitHand',
            USER_NAME:'userName',
            CARDS:'cards',
            IS_SORT:'isSort',
            SPECIAL_GROUP:'specialGroup',
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
                case SFSSubMesseage.SEND_SUBMIT_HAND:
                    this.onSendSubmitHand(params);
                    break;
            }
        },

        onSendPlayGame: function (params) {
            var arrCards = params.params.arrCards;
            var isSort = (params.params.isSort === undefined)?false:params.params.isSort;
            var type = (params.params.type === undefined)?0:params.params.type;
            var sfo = {};
            sfo[this.SFSData.COMMAND] = this.SFSData.SORT_FINISH;
            sfo[this.SFSData.CARDS] = Utility.convertClientToServerCardsBinh(arrCards);
            sfo[this.SFSData.IS_SORT] = isSort;
            sfo[this.SFSData.SPECIAL_GROUP] = type;

            this.sendExtensionRequest(SFSEvent.SORT_FINISH, sfo);
        },

        onSendSubmitHand:function (params) {
            var arrCards = params.params.arrCards;
            var sfo = {};
            sfo[this.SFSData.COMMAND] = this.SFSData.SUBMIT_HAND;
            sfo[this.SFSData.CARDS] = Utility.convertClientToServerCardsBinh(arrCards);

            this.sendExtensionRequest(SFSEvent.SUBMIT_HAND, sfo);
        },

        //ovrride
        onSendFakeCard: function (params) {
            var arrCards = params.params.arrCards;
            var sfo = {};
            sfo[this.SFSData.COMMAND] = this.SFSData.START_GAME_1;
            sfo[this.SFSData.CARD_ARRAY_1] = Utility.convertClientToServerCardsBinh(arrCards[0]);
            sfo[this.SFSData.CARD_ARRAY_2] = Utility.convertClientToServerCardsBinh(arrCards[1]);
            sfo[this.SFSData.CARD_ARRAY_3] = Utility.convertClientToServerCardsBinh(arrCards[2]);
            sfo[this.SFSData.CARD_ARRAY_4] = Utility.convertClientToServerCardsBinh(arrCards[3]);

            this.sendExtensionRequest(SFSEvent.START_GAME_1, sfo);
        }

    },

    // STATIC MEMBERS
    {
        NAME: "SFSBinhCommand"
    }
);
