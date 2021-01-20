var Component = require('Component');
var ${NAME} = cc.Class({
    extends: Component,

    initComponent: function (componentId, container) {
        Component.prototype.initComponent.call(this, componentId, container);
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
    },

	//////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////override////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////
	

    //////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////
   
});

${NAME}.create = function (componentId, container) {
    var component = new ${NAME}();
    component.initComponent(componentId, container);
    return component;
};

module.exports = ${NAME};