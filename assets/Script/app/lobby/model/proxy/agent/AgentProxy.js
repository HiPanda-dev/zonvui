var BaseProxy = require("BaseProxy");
var AgentVO = require("AgentVO");

export default class AgentProxy extends BaseProxy {
    static get NAME() {
      return 'AgentProxy';
    }

    onRegister() {
      this.listAgent = null
    }

    updateAgentInfoList(data) {
        this.listAgent = [];
        for (var i=0;i<data.length;i++){
            var agent = new AgentVO();
            agent.update(data[i]);
            this.listAgent.push(agent);
        }
    }
}
