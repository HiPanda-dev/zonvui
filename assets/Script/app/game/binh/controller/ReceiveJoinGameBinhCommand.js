var BaseCommand = require('BaseCommand');
var SeatVO = require('SeatVO');
var ReceiveJoinGameCommand = require('ReceiveJoinGameCommand');

var puremvc = BaseCommand.puremvc;

module.exports = puremvc.define(
    // CLASS INFO
    {
        parent: ReceiveJoinGameCommand
    },

    // INSTANCE MEMBERS
    {
        execute: function (notification) {
            ReceiveJoinGameCommand.prototype.execute.call(this, notification);
        },

        updateCurGameProperties:function (body) {
            var vtPlayer = body.vtPlayer;
            var tableVO = this.gameProxy.getTable();
            tableVO.timeLeft = tableVO.TURN_TIME - body.timePass;
            for (var i = 0; i < vtPlayer.length; i++) {
                var player = vtPlayer[i];
                if (player) {
                    var seat = tableVO.getSeatByUserId(player.uid);
                    if (seat && seat.status !== SeatVO.BLOCK) {
                        seat.isSort = player.isSort;
                        if(player.uid !== tableVO.myId && (!player.cards || player.cards.length === 0)){
                            seat.cardNrReminder = 13;
                            seat.cards = [1,1,1,1,1,1,1,1,1,1,1,1,1];
                        }
                    }
                }
            }
        }
    },

    // STATIC MEMBERS
    {
        NAME: "ReceiveJoinGameBinhCommand"
    }
);
