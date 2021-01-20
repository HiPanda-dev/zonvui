var BaseCommand = require('BaseCommand');
var GameMessage = require('GameMessage');
var BaseGameCommand = require('BaseGameCommand');

var puremvc = BaseCommand.puremvc;

module.exports = puremvc.define(
    // CLASS INFO
    {
        parent: BaseGameCommand
    },

    // INSTANCE MEMBERS
    {
        execute: function (notification) {
            BaseGameCommand.prototype.execute.call(this, notification);
            var params = notification.getBody();
            var tableVO = this.gameProxy.getTable();
            if (!tableVO && tableVO.id < 1) return this.showWarning(this.WARNING.THE_TABLE_DOES_NOT_EXIST);
            if (!params.sucess) return;

            var pos = params.pos;
            var bet = params.bet;
            var userId = params.uid;
            var seat = tableVO.getSeatByUserId(userId);
            if (seat && seat.user) {
                this.sendNotification(GameMessage.ON_UPDATE_USER_INFO, {seatId: seat.id, user: seat.user});
            }

            tableVO.listTotalBet[pos] += bet;
            tableVO.listMyBet[pos] = (userId === tableVO.myId) ? tableVO.listMyBet[pos] + bet : tableVO.listMyBet[pos];
            this.updateToListUserBet(tableVO, pos, userId);
            this.sendNotification(GameMessage.ON_UPDATE_BET, params);
        },

        updateToListUserBet: function (tableVO, pos, userId) {
            var hasUser = false;
            if (!tableVO.listUserBet[pos]) tableVO.listUserBet[pos] = [];
            for (var i = 0; i < tableVO.listUserBet[pos].length; i++) {
                if (userId === tableVO.listUserBet[pos][i]) {
                    hasUser = true;
                    break;
                }
            }

            if (!hasUser) tableVO.listUserBet[pos].push(userId)
        }
    },

    // STATIC MEMBERS
    {
        NAME: "ReceivePlayGameXocDiaCommand"
    }
);
