var BaseCommand = require('BaseCommand');
var LobbyMessage = require('LobbyMessage');
var TaiXiuProxy = require('TaiXiuProxy');
var Constants = require('Constants');
var SFSEvent = require('SFSEvent');

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
            var params = notification.getBody();
            switch (params.cmd) {
                default:
                    break;

            }
        },


        /**
         *
         * @param params
         * @returns {boolean}
         * true: -> queue
         * false-> not queue
         */
        checkQueueMesseage: function (params) {
            switch (params.cmd) {
                case SFSEvent.USER_JOIN_MINIGAME:
                    return false;
                    break;
            }

            if (this.minigameProxy && this.minigameProxy.isLoadDone) {
                return false;
            } else {
                this.minigameProxy.queueMsg.push(params);
                return true;
            }
        },


    },

    // STATIC MEMBERS
    {
        NAME: "SFSMinigameResponseCommand"
    }
);
