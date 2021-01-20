var BaseCommand = require('BaseCommand');
var BaseGameCommand = require('BaseGameCommand');
var GameMessage = require('GameMessage');
var LocalStorage = require('LocalStorage');

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

            var userId = params.userId;
            var isQuit = params.isQuit;
            var tableVO = this.gameProxy.getTable();
            if (tableVO === null || tableVO.id < 1) return this.showWarning(BaseGameCommand.WARNING.THE_TABLE_DOES_NOT_EXIST);
            var seat = this.gameProxy.getSeatByUserId(userId);

            if(seat){
                this.sendNotification(GameMessage.ON_REGISTER_QUIT, {seatId: seat.id, isQuit: isQuit});
            }

        }
    },

    // STATIC MEMBERS
    {
        NAME: "ReceiveRegisterQuitCommand"
    }
);
