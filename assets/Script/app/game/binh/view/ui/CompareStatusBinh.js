var Component = require('Component');
var CompareStatusControl = require('CompareStatusControl');

var CompareStatusBinh = cc.Class({
    extends: Component,

    initComponent: function (componentId, container) {
        Component.prototype.initComponent.call(this, componentId, container);
    },

    applyLayout: function () {
        Component.prototype.applyLayout.call(this);
        this.statusControl = this.container.getComponent("CompareStatusControl");
    },

    initialize: function () {
        Component.prototype.initialize.call(this);
        this.hide();
    },

    //////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////override////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////
    startGame: function () {
        this.hide();
    },

    soChi: function (seatId, indexChi) {
        this.statusControl.setCompareState(indexChi);
        this.show();
    },

    finishGame: function (listResult) {
        this.hide();
    },

    binhLung: function (seatId, isLung) {
        this.hide();
    },

    sapLang: function (seatId) {
        this.statusControl.setEmptyState();
        var mySeat = this.tableVO.getSeatByUserId(this.tableVO.myId);
        if (!mySeat) return;
        //if (mySeat.biSapLang) this.statusControl.setCompareState(CompareStatusControl.IDX_SAP_LANG);
        //if (mySeat.batSapLang) this.statusControl.setCompareState(CompareStatusControl.IDX_SAP_LANG);
        this.statusControl.setCompareState(CompareStatusControl.IDX_SAP_LANG);
        this.show();
    },


    batSapLang: function (seatId) {
        this.statusControl.setCompareState(CompareStatusControl.IDX_SAP_LANG);
        this.show();
    },

    sapHam: function () {
        this.statusControl.setCompareState(CompareStatusControl.IDX_SAP_HAM);
        this.show();
    },

    onLeaveGame: function () {
      this.hide();
    },

    //////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////

    setCardTypeList: function (type,status) {
        if (type >= 0) {
            this.statusControl.setCardTypeList(type,status);
            this.show();
        } else {
            this.hide();
        }

    }

});

CompareStatusBinh.create = function (componentId, container) {
    var component = new CompareStatusBinh();
    component.initComponent(componentId, container);
    return component;
};

module.exports = CompareStatusBinh;