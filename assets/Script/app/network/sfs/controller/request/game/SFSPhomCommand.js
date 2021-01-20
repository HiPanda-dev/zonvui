var BaseCommand = require('BaseCommand');
var SFSGameCommand = require('SFSGameCommand');
var SFSSubMesseage = require('SFSSubMesseage');
var SFSEvent = require('SFSEvent');
var SFSData = require('SFSData');
var Utility = require('Utility');
var puremvc = BaseCommand.puremvc;

module.exports = puremvc.define(
    // CLASS INFO
    {
        parent: SFSGameCommand
    },

    // INSTANCE MEMBERS
    {

        SFSData: {
            COMMAND: 'command',
            CARD: 'card',
            CARDS: 'cards',
            DISCARD: 'discard',
            LAYING_CARD: 'layingCard',
            LAYING_DONE: 'layingDone',
            SEND_CARD: 'sendCard',
            SEND_CARD_FINISH: 'sendCardFinish',
            DRAW_CARD: 'drawCard',
            STEAL_CARD: 'stealCard',
            FULL_LAYING_CARDS: 'fullLayingCards',
            PLAYER_DESTINATION: 'playerDestination',
            CARD_ARRAY_1: 'cardArray1',
            CARD_ARRAY_2: 'cardArray2',
            CARD_ARRAY_3: 'cardArray3',
            CARD_ARRAY_4: 'cardArray4',
            START_GAME_1: 'startGame1'
        },


        execute: function (notification) {
            var params = notification.getBody();
            SFSGameCommand.prototype.execute.call(this, notification);
            switch (params.cmd) {
                case SFSSubMesseage.SEND_PLAY_GAME:
                    this.onSendPlayGame(params);
                    break;
                case SFSSubMesseage.SEND_DOWN_CARD:
                    this.onSendDownCard(params);
                    break;
                case SFSSubMesseage.SEND_DOWN_CARD_FINISH:
                    this.onSendDownCardFinish(params);
                    break;
                case SFSSubMesseage.SEND_SEND_CARD:
                    this.onSendSendCard(params);
                    break;
                case SFSSubMesseage.SEND_SEND_CARD_FINISH:
                    this.onSendSendCardFinish(params);
                    break;
                case SFSSubMesseage.SEND_DRAW_CARD:
                    this.onSendDrawCard(params);
                    break;
                case SFSSubMesseage.SEND_STEAL_CARD:
                    this.onSendStealCard(params);
                    break;
                case SFSSubMesseage.SEND_FULL_LAYING_CARDS:
                    this.onSendFullLayingCards(params);
                    break;
            }
        },

        onSendPlayGame: function (params) {
            var card = params.params.card;
            var sfo = new SFS2X.SFSObject();
            sfo.putUtfString(this.SFSData.COMMAND, this.SFSData.DISCARD);
            sfo.putInt(SFSData.CARD, Utility.convertClientToServerCardsBinh([card])[0]);

            this.sendExtensionRequest(SFSEvent.DISCARD, sfo);
        },

        onSendDownCard: function (params) {
            var cards = params.params.cards;
            var userId = params.params.userId;
            var sfo = new SFS2X.SFSObject();
            sfo.putUtfString(this.SFSData.COMMAND, this.SFSData.LAYING_CARD);
            sfo.putIntArray(this.SFSData.CARDS, Utility.convertClientToServerCardsBinh(cards));
            this.sendExtensionRequest(SFSEvent.LAYING_CARD, sfo);
        },

        onSendDownCardFinish: function (params) {
            var userId = params.params.userId;
            var sfo = new SFS2X.SFSObject();
            sfo.putUtfString(this.SFSData.COMMAND, this.SFSData.LAYING_DONE);
            this.sendExtensionRequest(SFSEvent.LAYING_DONE, sfo);
        },

        onSendSendCard: function (params) {
            var prefix = this.sfsProxy.userName.split('_')[0];
            var userId = params.params.userId;
            var card = params.params.card;
            var index = params.params.index;
            var destinationUser = prefix + "_" + params.params.destinationUser;
            var sfo = new SFS2X.SFSObject();
            sfo.putUtfString(this.SFSData.COMMAND, this.SFSData.SEND_CARD);
            sfo.putUtfString(this.SFSData.PLAYER_DESTINATION, destinationUser);
            sfo.putIntArray(this.SFSData.CARD, Utility.convertClientToServerCardsBinh(card));
            sfo.putInt(SFSData.INDEX, index);
            this.sendExtensionRequest(SFSEvent.SEND_CARD, sfo);
        },

        onSendSendCardFinish: function (params) {
            var userId = params.params.userId;
            var sfo = new SFS2X.SFSObject();
            sfo.putUtfString(this.SFSData.COMMAND, this.SFSData.SEND_CARD_FINISH);
            this.sendExtensionRequest(SFSEvent.SEND_CARD_FINISH, sfo);
        },

        onSendDrawCard: function (params) {
            var userId = params.params.userId;
            var sfo = new SFS2X.SFSObject();
            sfo.putUtfString(this.SFSData.COMMAND, this.SFSData.DRAW_CARD);
            this.sendExtensionRequest(SFSEvent.DRAW_CARD, sfo);
        },

        onSendStealCard: function (params) {
            var card = params.params.card;
            var userId = params.params.userId;
            var sfo = new SFS2X.SFSObject();
            sfo.putUtfString(this.SFSData.COMMAND, this.SFSData.STEAL_CARD);
            sfo.putInt(this.SFSData.CARD, Utility.convertClientToServerCardsBinh([card])[0]);
            this.sendExtensionRequest(SFSEvent.STEAL_CARD, sfo);
        },

        onSendFullLayingCards: function (params) {
            var sfo = new SFS2X.SFSObject();
            sfo.putUtfString(this.SFSData.COMMAND, this.SFSData.FULL_LAYING_CARDS);
            this.sendExtensionRequest(SFSEvent.FULL_LAYING_CARDS, sfo);
        },

        //ovrride
        onSendFakeCard: function (params) {
            var arrCards = params.params.arrCards;
            arrCards[1].pop();
            arrCards[2].pop();
            arrCards[3].pop();
            var sfo = new SFS2X.SFSObject();
            sfo.putUtfString(this.SFSData.COMMAND, this.SFSData.START_GAME_1);
            sfo.putIntArray(this.SFSData.CARD_ARRAY_1, Utility.convertClientToServerCardsBinh(arrCards[0]));
            sfo.putIntArray(this.SFSData.CARD_ARRAY_2, Utility.convertClientToServerCardsBinh(arrCards[1]));
            sfo.putIntArray(this.SFSData.CARD_ARRAY_3, Utility.convertClientToServerCardsBinh(arrCards[2]));
            sfo.putIntArray(this.SFSData.CARD_ARRAY_4, Utility.convertClientToServerCardsBinh(arrCards[3]));

            this.sendExtensionRequest(SFSEvent.START_GAME_1, sfo);
        }
    },

    // STATIC MEMBERS
    {
        NAME: "SFSPhomCommand"
    }
);
