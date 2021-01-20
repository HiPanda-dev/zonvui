var BaseCommand = require('BaseCommand');
var BaseGameCommand = require('BaseGameCommand');
var GameMessage = require('GameMessage');
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
            var body = notification.getBody();
            var user = body.user;
            var tableVO = this.gameProxy.getTable();
            var vtPlayer = [user];
            this.updateVtPlayer(vtPlayer);

            if(!this.gameProxy.isLoadDone) return;

            var seatId = tableVO.getSeatIdFormPosition(user.position);
            var seat = tableVO.getSeatBySeatId(seatId);
            if (seat && seat.user && seat.status !== SeatVO.BLANK) {
                user.seatId = seatId;
                user.isViewer = tableVO.isPlaying;

                this.sendNotification(GameMessage.ON_SIT_DOWN, { seatId:seat.id, user:seat.user} );
                this.sendNotification(GameMessage.ON_UPDATE_USER_VIEW_STATE);
            }
        }
    },

    // STATIC MEMBERS
    {
        NAME: "ReceiveUserJoinGameCommand"
    }
);
