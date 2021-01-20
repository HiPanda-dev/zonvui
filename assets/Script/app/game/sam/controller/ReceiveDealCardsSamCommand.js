var BaseCommand = require('BaseCommand');
var ReceiveDealCardsTLMNCommand = require('ReceiveDealCardsTLMNCommand');

var puremvc = BaseCommand.puremvc;

module.exports = puremvc.define(
    // CLASS INFO
    {
        parent: ReceiveDealCardsTLMNCommand
    },

    // INSTANCE MEMBERS
    {
        execute: function (notification) {
            ReceiveDealCardsTLMNCommand.prototype.execute.call(this, notification);
        },

        //override
        updateCurGameProperties:function (params) {
            var tableVO = this.gameProxy.getTable();
            tableVO.isWhiteWin = params.isWhiteWin;
        }
    },

    // STATIC MEMBERS
    {
        NAME: "ReceiveDealCardsSamCommand"
    }
);
