                                                                    var PlayerTable = require('PlayerTable');
var PlayerTableXocDia = cc.Class({
    extends: PlayerTable,

    initComponent: function (componentId, container) {
        PlayerTable.prototype.initComponent.call(this, componentId, container);
    },

    buildUI: function () {
        PlayerTable.prototype.buildUI.call(this);
    },

    applyLayout: function () {
        PlayerTable.prototype.applyLayout.call(this);
    },

    initialize: function () {
        PlayerTable.prototype.initialize.call(this);

    },

    updateOwner: function () {
        PlayerTable.prototype.updateOwner.call(this);
        var seat = this.tableVO.getSeatByUserId(this.tableVO.ownerId);
        if (this.seatId !== 1) return;
        if (this.tableVO.isSystem) this.hide();
        else if(!seat || !seat.user || seat.user.id === "LVC") this.hide();
        else this.show();
    },

    sitdown: function (seatId, user) {
        if (this.tableVO.isSystem && this.seatId === 1) this.hide();
        else if (!user || user.id === "LVC") this.hide();
        else PlayerTable.prototype.sitdown.call(this, seatId, user);
    },
    //////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////override////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////


    //////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////

});

PlayerTableXocDia.create = function (componentId, container) {
    var component = new PlayerTableXocDia();
    component.initComponent(componentId, container);
    return component;
};

module.exports = PlayerTableXocDia;