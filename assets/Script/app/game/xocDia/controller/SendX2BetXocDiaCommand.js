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
            var mySelf = this.dataUser.mySelf;
            var tableVO = this.gameProxy.getTable();
            if (!tableVO && tableVO.id < 1) return this.showWarning(this.WARNING.THE_TABLE_DOES_NOT_EXIST);

            for (var i = 0; i < tableVO.listMyBet.length; i++) {
                var bet = tableVO.listMyBet[i];
                if (!bet || bet === 0 || this.dataUser.mySelf.money < bet) continue;
                this.sendNotification(GameMessage.SEND_PLAY_GAME, {
                    bet: bet,
                    pos: i,
                    userId: mySelf.id,
                    typeBet: tableVO.getTypeBetWithBet(bet)
                });
            }
        }
    },

    // STATIC MEMBERS
    {
        NAME: "SendX2BetXocDiaCommand"
    }
);
