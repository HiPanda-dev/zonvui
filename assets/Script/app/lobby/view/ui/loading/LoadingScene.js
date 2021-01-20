var BaseScene = require('BaseScene');
var LoadingSceneMediator = require('LoadingSceneMediator');

cc.Class({
    extends: BaseScene,

    properties: {
        mcCycle:cc.Node,
        speed: 10
    },

    ctor: function () {
        LoadingSceneMediator.getInstance().init(this);
    },

    // use this for initialization
    onLoad: function () {

    },

    update:function () {
        if(this.mcCycle){
            this.mcCycle.angle += this.speed;
        }
    }
});
