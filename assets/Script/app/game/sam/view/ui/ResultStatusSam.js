var ResultStatusTLMN = require('ResultStatusTLMN');
var ResultStatusSam = cc.Class({
    extends: ResultStatusTLMN,

    initComponent: function (componentId, container) {
        ResultStatusTLMN.prototype.initComponent.call(this, componentId, container);
    },

    applyLayout: function () {
        ResultStatusTLMN.prototype.applyLayout.call(this);
    },

    initialize: function () {
        ResultStatusTLMN.prototype.initialize.call(this);

    },

    //////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////override////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////


    //////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////

});

ResultStatusSam.create = function (componentId, container) {
    var component = new ResultStatusSam();
    component.initComponent(componentId, container);
    return component;
};

module.exports = ResultStatusSam;