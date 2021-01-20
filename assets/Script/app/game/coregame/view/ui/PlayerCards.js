var Component = require("Component");
module.exports = cc.Class({
    extends: Component,

    initComponent:function (componentId, container) {
        Component.prototype.initComponent.call(this, componentId, container);
        this.tableVO = null;
        this.seatId = 1;
    },

    setup:function(seatId, tableVO){
        this.tableVO = tableVO;
        this.seatId = seatId;
    }
});
