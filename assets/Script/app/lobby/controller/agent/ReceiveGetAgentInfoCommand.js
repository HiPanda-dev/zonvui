var BaseCommand = require('BaseCommand');
var LobbyMessage = require('LobbyMessage');

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
            if (this.isError(notification.getBody().data)) return;

            var params = notification.getBody().data;
            var agentProxy = this.facade.retrieveProxy('AgentProxy');
            agentProxy.updateAgentInfoList(params.dataList);

            this.sendNotification(LobbyMessage.ON_UPDATE_AGENT_INFO_LIST);
        }
    },

    // STATIC MEMBERS
    {
        NAME: "ReceiveGetAgentInfoCommand"
    }
);
