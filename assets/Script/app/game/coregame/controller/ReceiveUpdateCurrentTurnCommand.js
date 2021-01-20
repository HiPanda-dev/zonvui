var BaseCommand = require('BaseCommand');
var BaseGameCommand = require('BaseGameCommand');
var GameMessage = require('GameMessage');

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

            tableVO.curTurn = params.curTurn;
            if(tableVO.isPlaying){
                this.sendNotification(GameMessage.ON_UPDATE_CURRENT_TURN);
            }
        }
    },

    // STATIC MEMBERS
    {
        NAME: "ReceiveUpdateCurrentTurnCommand"
    }
);
