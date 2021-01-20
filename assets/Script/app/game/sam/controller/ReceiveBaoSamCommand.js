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
            if (params.sam === 0) return;

            var sam = params.sam;
            var userIdBaoSam = params.userId;

            var tableVO = this.gameProxy.getTable();
            if (!tableVO) return this.showWarning(BaseGameCommand.WARNING.THE_TABLE_DOES_NOT_EXIST);
            if (!tableVO.isPlaying) return this.showWarning(BaseGameCommand.WARNING.TABLE_DOES_NOT_PLAYING);
            var seatBaoSam = tableVO.getSeatByUserId(userIdBaoSam);

            if (seatBaoSam) {
                if (sam === 1) {
                    tableVO.seatIdBaoSam = seatBaoSam.id;
                    tableVO.userIdBaoSam = seatBaoSam.user.id;
                }
                this.sendNotification(GameMessage.ON_BAO_SAM, {seatId: seatBaoSam.id, sam: sam});
            }
        }
    },

    // STATIC MEMBERS
    {
        NAME: "ReceiveBaoSamCommand"
    }
);
