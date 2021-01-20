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
            GET_PLAYING_INFO:'getPlayingInfo',
            SIT_DOWN:'sitDown',
            USER_NAME:'userName',
            POSITION:'position',
            BUY_ROOM_MASTER:'buyRoomMaster',
            MONEY:'money',
            TYPE_BET:'typeBet',
            BET:'bet',
            CANCEL_BET:'cancelBet',
            SOLD:'sold'
        },

        execute: function (notification) {
            var params = notification.getBody();
            SFSGameCommand.prototype.execute.call(this, notification);
            switch (params.cmd) {
                case SFSSubMesseage.SEND_PLAY_GAME:
                    this.onSendPlayGame(params);
                    break;
                case SFSSubMesseage.SEND_CANNEL_BET:
                    this.onSendCancelBet();
                    break;
                case SFSSubMesseage.SEND_SOLD_BET:
                    this.onSendSoldBet(params);
                    break;
            }
        },


        //ovrride
        onSitDown:function (params) {
            var pos = params.params.seatId - 1;
            var sfo = new SFS2X.SFSObject();
            sfo.putUtfString(this.SFSData.COMMAND, this.SFSData.SIT_DOWN);
            sfo.putInt(this.SFSData.POSITION, parseInt(pos));

            this.sendExtensionRequest(SFSEvent.SIT_DOWN, sfo);
        },

        //ovrride
        onBuyMasterGame:function () {
            var sfo = new SFS2X.SFSObject();
            sfo.putUtfString(this.SFSData.COMMAND, this.SFSData.BUY_ROOM_MASTER);

            this.sendExtensionRequest(SFSEvent.BUY_ROOM_MASTER, sfo);
        },

        onSendPlayGame:function (params) {
            var bet = params.params.bet;
            var pos = params.params.pos;
            var typeBet =  params.params.typeBet;
            var sfo = new SFS2X.SFSObject();
            sfo.putUtfString(this.SFSData.COMMAND, this.SFSData.BET);
            sfo.putUtfString(this.SFSData.MONEY, bet.toString());
            sfo.putInt(this.SFSData.POSITION, pos);
            sfo.putInt(this.SFSData.TYPE_BET, typeBet);

            this.sendExtensionRequest(SFSEvent.BET, sfo);
        },

        onSendCancelBet:function () {
            var sfo = new SFS2X.SFSObject();
            sfo.putUtfString(this.SFSData.COMMAND, this.SFSData.CANCEL_BET);

            this.sendExtensionRequest(SFSEvent.CANCEL_BET, sfo);
        },

        onSendSoldBet:function (params) {
            var type = params.params.type;
            var sfo = new SFS2X.SFSObject();
            sfo.putUtfString(this.SFSData.COMMAND, this.SFSData.SOLD);
            sfo.putInt(this.SFSData.POSITION, type);
            this.sendExtensionRequest(SFSEvent.SOLD, sfo);
        },
    },

    // STATIC MEMBERS
    {
        NAME: "SFSPokerCommand"
    }
);
