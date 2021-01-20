var BaseCommand = require('BaseCommand');
var BaseGameCommand = require('BaseGameCommand');
var GameMessage = require('GameMessage');
var LocalStorage = require('LocalStorage');
var Constants = require('Constants');
var SeatVO = require('SeatVO');

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
            var table = this.gameProxy.getTable();
            if (!table && table.id < 1) return this.showWarning(this.WARNING.THE_TABLE_DOES_NOT_EXIST);

            table.isPlaying = true;
            table.isShot = false;
            for(var i=0;i<table.seats.length;i++){
                var seatVO = table.seats[i];
                if(!seatVO || !seatVO.user) continue;
                seatVO.status = SeatVO.PLAY;
            }

            LocalStorage.setIsReconnect(Constants.CURRENT_GAME);
            this.sendNotification(GameMessage.ON_START_GAME);

        }
    },

    // STATIC MEMBERS
    {
        NAME: "ReceiveStartGameCommand"
    }
);
