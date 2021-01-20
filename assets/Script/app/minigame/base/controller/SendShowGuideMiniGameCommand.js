var BaseCommand = require('BaseCommand');
var LobbyMessage = require('LobbyMessage');
var CustomAction = require('CustomAction');
var i18n = require('i18n');

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

            var codeAction = notification.getBody();
            var configData =  this.facade.retrieveProxy('ConfigProxy').configIngame.configData;
            var url = configData[CustomAction.ACTION_HELP].act.replace('webview','http')+"?act="+codeAction;

            this.sendNotification(LobbyMessage.SHOW_WEB_VIEW_POPUP, {url: url, title:i18n.t("C0045")});
        }
    },

    // STATIC MEMBERS
    {
        NAME: "SendShowGuideMiniGameCommand"
    }
);
