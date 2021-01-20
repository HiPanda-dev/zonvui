var BaseScene = require('BaseScene');
var BottomMenuSceneMediator = require('BottomMenuSceneMediator');

cc.Class({
    extends: BaseScene,

    properties: {},

    // use this for initialization
    onLoad: function () {
        BottomMenuSceneMediator.getInstance().init(this);
        this.hide();
    },
    
    onHandlerShowRecharge:function () {
        this.activeShowRecharge();
    },

    onHandlerShowShop:function () {
        this.activeShowShop();
    },

    onHandlerShowEvent:function () {
        this.activeShowEvent();
    },

});

