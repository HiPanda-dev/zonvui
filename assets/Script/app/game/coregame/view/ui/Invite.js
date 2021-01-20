var Component = require("Component");
var GameEvent = require('GameEvent');
var Invite = cc.Class({
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
    },

    initialize: function () {
        Component.prototype.initialize.call(this);

    },

    addEventListeners: function () {
        Component.prototype.addEventListeners.call(this);
        this.container.on(cc.Node.EventType.TOUCH_START, this.onHanlerTouchButton.bind(this), this);
    },

    removeEventListeners: function () {
        Component.prototype.removeEventListeners.call(this);
        this.container.off(cc.Node.EventType.TOUCH_START, this.onHanlerTouchButton.bind(this), this);
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

    //////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////

    onHanlerTouchButton: function () {
        this.container.emit(GameEvent.SIT_DOWN, {seatId: this.seatId});
    },
});

Invite.create = function (componentId, container) {
    var component = new Invite();
    component.initComponent(componentId, container);
    return component;
};

module.exports = Invite;