var BaseCommand = require('BaseCommand');
var GameMessage = require('GameMessage');
var InitGameCommand = require('InitGameCommand');

var puremvc = BaseCommand.puremvc;


module.exports = puremvc.define(
    // CLASS INFO
    {
        parent: InitGameCommand
    },

    // INSTANCE MEMBERS
    {
        execute: function (notification) {
            InitGameCommand.prototype.execute.call(this, notification);
        },

        updateCustomProperties:function () {
            var tableVO = this.gameProxy.getTable();
            if(tableVO.isPlaying){
                this.sendNotification(GameMessage.ON_UPDATE_CURRENT_TURN);

            }
        }
    },


    // STATIC MEMBERS
    {
        NAME: "InitGameBinhCommand"
    }
);
