var Component = require('Component');
var GameConfig = require('GameConfig');
var Utility = require('Utility');
var TopGameMenu = cc.Class({
    extends: Component,

    initComponent: function (componentId, container) {
        Component.prototype.initComponent.call(this, componentId, container);
        this.tableVO = null;
    },

    applyLayout: function () {
        this.btnBack = this.container.getChildByName("btnBack").getComponent(cc.Toggle);
        this.txtTitle = this.container.getChildByName("txtTitle").getComponent(cc.Label);
        this.txtBet = this.container.getChildByName("txtBet").getComponent(cc.Label);
    },

    initialize: function () {
        this.btnBack.notChange = true;
        this.btnBack.uncheck();
    },

    //////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////override////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////
    onLeaveGame: function () {
        this.btnBack.notChange = true;
        this.btnBack.uncheck();
    },

    sitdown: function (seatId, user) {
        if(user && this.tableVO.myId === user.id){
            this.btnBack.notChange = true;
            this.btnBack.uncheck();
        }

        this.txtTitle.string = "";//this.tableVO.channelName;
        this.txtBet.string = Utility.formatCurrency(this.tableVO.rules.bet);
    }

    //////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////

});

TopGameMenu.create = function (componentId, container) {
    var component = new TopGameMenu();
    component.initComponent(componentId, container);
    return component;
};

module.exports = TopGameMenu;
