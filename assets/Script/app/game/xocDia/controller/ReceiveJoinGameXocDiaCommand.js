var BaseCommand = require('BaseCommand');
var ReceiveJoinGameCommand = require('ReceiveJoinGameCommand');
var GameMessage = require('GameMessage');
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

        updateCurGameProperties: function (params) {
            ReceiveJoinGameCommand.prototype.updateCurGameProperties.call(this, params);
            var tableVO = this.gameProxy.getTable();
            tableVO.listTotalBet = params.gameRoom.listTotalBet;
            tableVO.listMyBet = params.gameRoom.listMyBet;
            tableVO.timeBet = params.gameRoom.timeBet;

            var seatMaster = tableVO.getSeatBySeatId(1);
            if (seatMaster && seatMaster.user) {
                tableVO.ownerId = seatMaster.user.id;
            }
        }
    },

    // STATIC MEMBERS
    {
        NAME: "ReceiveJoinGameXocDiaCommand"
    }
);
