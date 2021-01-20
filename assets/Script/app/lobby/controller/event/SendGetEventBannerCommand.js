/**
 * Created by Dell Precision on 10/21/2017.
 */

var BaseCommand = require('BaseCommand');
var LobbyMessage = require('LobbyMessage');
var i18n = require('i18n');
var LocalStorage = require('LocalStorage');

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

            var http = this.facade.retrieveProxy('HttpRequestProxy');
            var mySelf = this.facade.retrieveProxy('UserProxy').mySelf;

            var sendData = {
                displayName: mySelf.displayName,
                token: mySelf.token
            };

            http.getEventBannerInfo(LobbyMessage.RECEIVE_GET_EVENT_BANNER, sendData);

        }

    },

    // STATIC MEMBERS
    {
        NAME: "SendGetEventBannerCommand"
    }
);
