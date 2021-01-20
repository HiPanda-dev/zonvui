var Component = require("Component");
var Utility = require('Utility');
var AddMoney = cc.Class({
    extends: Component,

    initComponent: function (componentId, container) {
        Component.prototype.initComponent.call(this, componentId, container);
        this.seatId = -1;
        this.tableVO = null;
    },

    buildUI: function () {
        Component.prototype.buildUI.call(this);
    },

    applyLayout: function () {
        Component.prototype.applyLayout.call(this);

        this.txtSubMoney = this.container.getChildByName("txtSubMoney").getComponent(cc.Label);
        this.txtAddMoney = this.container.getChildByName("txtAddMoney").getComponent(cc.Label);
    },

    initialize: function () {
        Component.prototype.initialize.call(this);

        this.txtSubMoney.node.active = false;
        this.txtAddMoney.node.active = false;
    },

    setup: function (seatId, tableVO) {
        this.seatId = seatId;
        this.tableVO = tableVO;
    },

    //////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////override////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////
    snapWithPlayer: function () {
        var pos = this.tableVO.listPlayerPos[this.seatId];
        if (pos) {
            this.container.x = pos.x;
            this.container.y = pos.y;
        }
    },

    updateMoney:function (seatId, addMoney) {
        if (seatId !== this.seatId) return;
        var seat = this.tableVO.getSeatBySeatId(this.seatId);
        if(seat){
            this.showEarnMoney(addMoney);
        }
    },

    showEarnMoney: function (money) {
        if (money > 0) {
            this.txtAddMoney.string = "+" + Utility.formatCurrency(money);
            this.txtAddMoney.node.active = true;
            this.txtSubMoney.node.active = false;
        } else {
            this.txtSubMoney.string = Utility.formatCurrency(money);
            this.txtSubMoney.node.active = true;
            this.txtAddMoney.node.active = false;
        }

        TweenLite.from(this.txtSubMoney.node, 0.3, {y:this.txtSubMoney.node.y-50,alpha:0});
        TweenLite.from(this.txtAddMoney.node, 0.3, {y:this.txtAddMoney.node.y-50,alpha:0});

        TweenLite.delayedCall(2, function () {
            this.txtSubMoney.node.active = false;
            this.txtAddMoney.node.active = false;
        }.bind(this))
    },

    //////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////


});

AddMoney.create = function (componentId, container) {
    var component = new AddMoney();
    component.initComponent(componentId, container);
    return component;
};

module.exports = AddMoney;