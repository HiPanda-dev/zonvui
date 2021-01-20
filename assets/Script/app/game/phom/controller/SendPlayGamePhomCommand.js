var BaseCommand = require('BaseCommand');
var BaseGameCommand = require('BaseGameCommand');
var LogicTLMN = require('LogicTLMN');
var SFSSubMesseage = require('SFSSubMesseage');
var SFSMessage = require('SFSMessage');
var Utility = require('Utility');

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
            var mySelf = this.dataUser.mySelf;
            var mySeat = tableVO.getSeatByUserId(mySelf.id);
            var card = params.cards[0];
            var nextPlayer = tableVO.getNextSeat(tableVO.mySeatId).user.uId;

            var data = {
                cmd:SFSSubMesseage.SEND_PLAY_GAME,
                params:{
                    card:card,
                    nextTurn:nextPlayer
                }
            };

            this.sendNotification(SFSMessage.SEND_TO_SERVER, data);
        }
    },

    // STATIC MEMBERS
    {
        NAME: "SendPlayGamePhomCommand"
    }
);
