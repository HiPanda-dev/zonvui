var BaseCommand = require('BaseCommand');
var ReceiveLeaveGameCommand = require('ReceiveLeaveGameCommand');
var GameMessage = require('GameMessage');
var CoreGameProxy = require('CoreGameProxy');
var SFSData = require('SFSData');

var puremvc = BaseCommand.puremvc;

module.exports = puremvc.define(
    // CLASS INFO
    {
        parent: ReceiveLeaveGameCommand
    },

    // INSTANCE MEMBERS
    {
        execute: function (notification) {
            var params = notification.getBody();
            this.gameProxy = this.facade.retrieveProxy(CoreGameProxy.NAME);
            var tableVO = this.gameProxy.getTable();
            var nextSeat = tableVO.getNextSeat(tableVO.getSeatByUserId(params.userIdLeave));
            if(nextSeat)
            {
                if(nextSeat.id === tableVO.mySeatId && params.userIdLeave === tableVO.nextTurn)
                    this.sendNotification(GameMessage.ON_UPDATE_CURRENT_TURN);
            }
            ReceiveLeaveGameCommand.prototype.execute.call(this, notification);
        }
    },

    // STATIC MEMBERS
    {
        NAME: "ReceiveLeaveGamePhomCommand"
    }
);
