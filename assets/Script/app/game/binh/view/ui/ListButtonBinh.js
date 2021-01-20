var Component = require('Component');
var SeatVO = require('SeatVO');
var ListButtonBinh = cc.Class({
    extends: Component,

    initComponent: function (componentId, container) {
        Component.prototype.initComponent.call(this, componentId, container);
    },

    buildUI: function () {
        this.tableVO = null;

        this.btnXepXong = null;
        this.btnXepLai = null;
        this.isMauBinh = false;
    },

    applyLayout: function () {
        this.btnXepXong = this.container.getChildByName("btnXepXong");//.getComponent(cc.Button);
        this.btnXepLai = this.container.getChildByName("btnXepLai");//.getComponent(cc.Button);
        this.btnMauBinh = this.container.getChildByName("btnMauBinh");//.getComponent(cc.Button);
    },

    initialize: function () {
        this.setEnableButton(this.btnXepXong, false);
        this.setEnableButton(this.btnXepLai, false);
        this.setEnableButton(this.btnMauBinh, false);
    },

    //////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////override////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////
    sitdown: function (seatId, user) {
        if(!this.tableVO.isPlaying) return;
        var mySeat = this.tableVO.getSeatByUserId(this.tableVO.myId);
        if(!mySeat || mySeat.status !== SeatVO.PLAY || mySeat.id !== seatId) return;
        if(mySeat.user.isViewer) return;

        this.setEnableButton(this.btnXepXong, !mySeat.isSort);
        this.setEnableButton(this.btnXepLai, mySeat.isSort);
        this.showMauBinhButton(false);
    },

    startGame:function () {
        this.setEnableButton(this.btnXepLai, false);
        this.showMauBinhButton(false);
    },

    zoomOutCards: function () {
        this.setEnableButton(this.btnXepXong, true);
    },

    finishSortChi: function () {
        this.setEnableButton(this.btnXepXong, false);
        this.setEnableButton(this.btnXepLai, false);
        this.showMauBinhButton(false);
    },

    sortFinishBinh:function (seatId, isSort) {
        var seat = this.tableVO.getSeatByUserId(this.tableVO.myId);
        if(!seat || seat.status !== SeatVO.PLAY || seatId !== seat.id) return;
        this.onChangeSateButton(isSort);
    },

    //////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////
    onChangeSateButton:function (isSort) {
        this.setEnableButton(this.btnXepXong, !isSort);
        this.setEnableButton(this.btnXepLai, isSort);
        if(isSort) this.btnMauBinh.active = false;
        else if(this.isMauBinh){
            this.btnMauBinh.active = true;
        }
    },
    
    setEnableButton:function (button, isEnable) {
        button.active = isEnable;
    },

    showMauBinhButton:function (isEnable) {
        this.btnMauBinh.active = isEnable;
        this.isMauBinh = isEnable;
    }
});

ListButtonBinh.create = function (componentId, container) {
    var component = new ListButtonBinh();
    component.initComponent(componentId, container);
    return component;
};

module.exports = ListButtonBinh;