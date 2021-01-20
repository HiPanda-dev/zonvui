var BaseCommand = require('BaseCommand');
var BaseGameCommand = require('BaseGameCommand');
var InitGameCommand = require('InitGameCommand');
var GameMessage = require('GameMessage');

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

            var tableVO = this.gameProxy.getTable();
            tableVO.playCards = (this.gameProxy.gameRoom.gameRoom.cardsPlace) ? this.gameProxy.gameRoom.gameRoom.cardsPlace : [];

            if (tableVO.isPlaying && tableVO.playCards.length !== 0) {
                this.sendNotification(GameMessage.ON_SHOW_CARDS_PLACE, {cards: tableVO.playCards});
            }

            if(tableVO.curTurn !== -1){
                this.sendNotification(GameMessage.ON_UPDATE_CURRENT_TURN);
            }
        }
    },

    // STATIC MEMBERS
    {
        NAME: "InitGameTLMNCommand"
    }
);
