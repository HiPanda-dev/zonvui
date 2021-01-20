var BaseCommand = require('BaseCommand');
var Constants = require('Constants');
var SFSSubMesseage = require('SFSSubMesseage');
var SFSMessage = require('SFSMessage');

var puremvc = BaseCommand.puremvc;

module.exports = puremvc.define(
    // CLASS INFO
    {
        parent: BaseCommand
    },

    // INSTANCE MEMBERS
    {
        execute: function (notification) {
            BaseCommand.prototype.execute.call(this, notification);
            var message;
            switch (notification.getBody()){
                case Constants.MINIGAME_BAU_CUA:
                    message = SFSMessage.SEND_TO_SERVER_BAU_CUA;
                    break;
                case Constants.MINIGAME_MINI_POKER:
                    message = SFSMessage.SEND_TO_SERVER_MINI_POKER;
                    break;
                case Constants.MINIGAME_SLOT3X3:
                    message = SFSMessage.SEND_TO_SERVER_POKE_GO;
                    break;
                case Constants.MINIGAME_TAI_XIU:
                    message = SFSMessage.SEND_TO_SERVER_TAI_XIU;
                    break;
                case Constants.MINIGAME_TO_NHO:
                    message = SFSMessage.SEND_TO_SERVER_TO_NHO;
                    break;
                case Constants.MINIGAME_VONG_QUAY:
                    message = SFSMessage.SEND_TO_SERVER_VONG_QUAY;
                    break;

            }

            var sendData = {
                cmd: SFSSubMesseage.DISCONNECT_NETWORK,
                data:{
                }
            };

            this.sendNotification(message, sendData);
        }
    },

    // STATIC MEMBERS
    {
        NAME: "SendDisconnectMiniGameCommand"
    }
);
