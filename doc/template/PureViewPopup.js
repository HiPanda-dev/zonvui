var BasePopup = require('BasePopup');
var ${NAME}Mediator = require('${NAME}Mediator');

cc.Class({
    extends: BasePopup,

    properties: {},

    ctor: function () {
        ${NAME}Mediator.getInstance().init(this);
    },

    // use this for initialization
    onLoad: function () {

    }
});