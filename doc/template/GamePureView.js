var CoreGame = require('CoreGame');
var ${NAME}Mediator = require('${NAME}Mediator');

cc.Class({
    extends: CoreGame,

    properties: {},
    
    // use this for initialization
    onLoad: function () {
        ${NAME}Mediator.getInstance().init(this);
        CoreGame.prototype.onLoad.call(this);
    },
});

