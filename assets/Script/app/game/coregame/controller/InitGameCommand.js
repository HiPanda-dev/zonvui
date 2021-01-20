var BaseCommand = require('BaseCommand');
var BaseGameCommand = require('BaseGameCommand');
var Constants = require('Constants');
var SeatVO = require('SeatVO');
var LobbyMessage = require('LobbyMessage');
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
            if (this.gameProxy.isLoadDone) return;
            this.gameProxy.isLoadDone = true;

            var mySelf = this.dataUser.mySelf;
            var tableVO = this.gameProxy.getTable();

            this.sendNotification(LobbyMessage.HIDE_LOBBY);
            this.sendNotification(GameMessage.ON_INIT_GAME_UI);
            this.sendNotification(GameMessage.ON_UPDATE_USER_VIEW_STATE);

            for (var i = 0; i < tableVO.seats.length; i++) {
                var seat = tableVO.seats[i];
                if (!seat) continue;
                if (seat.user && seat.status !== SeatVO.BLANK) {
                    this.sendNotification(GameMessage.ON_SIT_DOWN, {seatId: seat.id, user: seat.user});
                }

                if (seat.cardNrReminder !== 0 && seat.cards.length === 0) {
                    for (var j = 0; j < seat.cardNrReminder; j++) {
                        seat.cards.push(0);
                    }
                }

                if (tableVO.isPlaying && seat.cards.length !== 0) {
                    this.sendNotification(GameMessage.ON_SHOW_CARDS, {seatId: seat.id, cards: seat.cards});
                }
            }
            this.updateCustomProperties();
            this.onSendQueueMsg();
            tableVO.timePass = -1;
        },

        updateCustomProperties:function () {
            
        }
    },
    
    

    // STATIC MEMBERS
    {
        NAME: "InitGameCommand"
    }
);
