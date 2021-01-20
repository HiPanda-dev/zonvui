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
            var timeLeft = notification.getBody().timeLeft;

            var tableVO = this.gameProxy.getTable();
            if (!tableVO) return this.showWarning(BaseGameCommand.WARNING.THE_TABLE_DOES_NOT_EXIST);
            //if (tableVO.isPlaying) return this.showWarning(BaseGameCommand.WARNING.TABLE_IS_PLAYING);

            this.sendNotification(GameMessage.ON_COUNT_DOWN_START_GAME, {timeLeft: timeLeft});

        }
    },

    // STATIC MEMBERS
    {
        NAME: "ReceiveCounDownStartGameCommand"
    }
);
