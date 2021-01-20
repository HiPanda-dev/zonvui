var BaseScene = require('BaseScene');
var ${NAME}Mediator = require('${NAME}Mediator');

cc.Class({
    extends: BaseScene,
    
    properties: {
      
    },
    
    // use this for initialization
    onLoad: function () {
        ${NAME}Mediator.getInstance().init(this);
    }
});

