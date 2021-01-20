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
            var agentProxy = this.facade.retrieveProxy('AgentProxy');
            var http = this.facade.retrieveProxy('HttpRequestProxy');
            var mySelf = this.facade.retrieveProxy('UserProxy').mySelf;
            if(agentProxy.listAgent) return;

            var sendData = {
                displayName: mySelf.displayName,
                token: mySelf.token
            };

            http.getAgentInfoList(LobbyMessage.RECEIVE_GET_AGENT_INFO, sendData);
        }
    },

    // STATIC MEMBERS
    {
        NAME: "SendGetAgentInfoCommand"
    }
);
