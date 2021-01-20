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

            var mySelf = this.dataUser.mySelf;
            var userId = params.userIdLeave;
            var tableVO = this.gameProxy.getTable();
            var seat = this.gameProxy.getSeatByUserId(userId);

            if (tableVO === null || tableVO.id < 1) return this.showWarning(BaseGameCommand.WARNING.THE_TABLE_DOES_NOT_EXIST);

            if (mySelf.id === userId) {
                this.sendNotification(GameMessage.ON_LEAVE_GAME);
                mySelf.isInGame = false;
                tableVO.leaveGame();
                tableVO.clearData();
                this.onLeaveGame();
                LocalStorage.setIsReconnect(false);
            } else {
                if (seat) {
                    var seatId = seat.id;
                    userId  = seat.user.id;
                    tableVO.updateListSeatUserExitGame(seatId);
                    tableVO.removeSeatBySeatId(seatId);
                    this.sendNotification(GameMessage.ON_USER_LEAVE_GAME, {seatId: seatId, userId: userId});
                }

                if(tableVO.registerOwerId === userId){
                    tableVO.registerOwerId = -1;
                }

                if(tableVO.getNumPlayerWait() === 1){
                    this.sendNotification(GameMessage.ON_HIDE_READY_GAME);
                }
            }

        }
    },

    // STATIC MEMBERS
    {
        NAME: "ReceiveLeaveGameCommand"
    }
);
