var BaseCommand = require('BaseCommand');
var BaseGameCommand = require('BaseGameCommand');
var SFSMessage = require('SFSMessage');
var SFSSubMesseage = require('SFSSubMesseage');

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

            var tableVO = this.gameProxy.getTable();
            var mySelf	  = this.dataUser.mySelf;

            if (!tableVO) return this.showWarning(BaseGameCommand.WARNING.THE_TABLE_DOES_NOT_EXIST);
            if (!tableVO.isPlaying) return this.showWarning(BaseGameCommand.WARNING.TABLE_DOES_NOT_PLAYING);
            if (tableVO.curTurn !== mySelf.id) return this.showWarning(BaseGameCommand.WARNING.PLAYER_NOT_TURN);

            var data = {
                cmd:SFSSubMesseage.SEND_CANNEL_TURN,
                params:{
                    userName: mySelf.userName
                }
            };

            this.sendNotification(SFSMessage.SEND_TO_SERVER, data);
        }
    },

    // STATIC MEMBERS
    {
        NAME: "SendCancelTurnTLMNCommand"
    }
);
