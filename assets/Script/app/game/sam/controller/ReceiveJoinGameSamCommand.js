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

        updateCurGameProperties:function (params) {
            ReceiveJoinGameCommand.prototype.updateCurGameProperties.call(this, params);
            var gameRoom = params.gameRoom;
            var userIdBaoSam = gameRoom.samPlayer;

            var tableVO = this.gameProxy.getTable();
            tableVO.timePass = (gameRoom.timePass)?gameRoom.timePass:-1;
            tableVO.userIdBaoSam = userIdBaoSam;

            var vtPlayer = params.vtPlayer;
            for (var i = 0; i < vtPlayer.length; i++) {
                var player = vtPlayer[i];
                if (player) {
                    var seatId = tableVO.getSeatIdFormPosition(player.position);
                    var seat = this.gameProxy.getSeatBySeatId(seatId);
                    if (seat && seat.status !== SeatVO.BLOCK) {
                        seat.sam = player.sam;
                    }
                }
            }
        }
    },

    // STATIC MEMBERS
    {
        NAME: "ReceiveJoinGameSamCommand"
    }
);
