var DragObject = require("DragObject");

cc.Class({
    extends: DragObject,

    properties: {
    },

    // use this for initialization
    onCheckBoundView:function () {
        if (this.node.x > cc.director.getWinSize().width / 2 - this.node.width / 2) this.node.x = cc.director.getWinSize().width / 2 - this.node.width / 2;
        if (this.node.x < -cc.director.getWinSize().width / 2 + this.node.width / 2) this.node.x = -cc.director.getWinSize().width / 2 + this.node.width / 2;

        if (this.node.y > cc.director.getWinSize().height / 2 - this.node.height / 2) this.node.y = cc.director.getWinSize().height / 2 - this.node.height / 2;
        if (this.node.y < -cc.director.getWinSize().height / 2 + this.node.height / 2) this.node.y = -cc.director.getWinSize().height / 2 + this.node.height / 2;

        if (this.node.x > 240 || this.node.x < -240 || this.node.y > 340 || this.node.y < -140) {
            this.node.active = false;
            this.node.x = 3;
            this.node.y = 102;
        }
    }


});
