var BasePopup = require('BasePopup');
var FacebookValidateSceneMediator = require('FacebookValidateSceneMediator');

cc.Class({
    extends: BasePopup,

    properties: {
        inputDisplayName:cc.EditBox,
    },

    // use this for initialization
    ctor: function () {
        FacebookValidateSceneMediator.getInstance.init(this);
    },
    onLoad: function () {
        this.addEventListeners();
        this.hide();
    },
    // show: function () {
    //     BasePopup.prototype.show.call(this);
    //
    // },
    addEventListeners: function () {

    },

    removeEventListeners: function () {

    },

    onConfirmClick: function () {
        this.activeSetNickName({nickName: this.inputDisplayName.string});
    },

    onUpdateSetNickName: function () {
        this.hide();
    },
});