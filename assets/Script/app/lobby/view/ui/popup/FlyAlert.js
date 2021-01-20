var BasePopup = require('BasePopup');
var FlyAlertMediator = require('FlyAlertMediator');
cc.Class({
    extends: BasePopup,

    properties: {
        txtContent: cc.RichText
    },

    ctor: function () {
        FlyAlertMediator.getInstance.init(this);
    },

    showAlert: function (data) {
        this.txtContent.string = (data.content) ? data.content : "";
        this.show();

        if(this.timeout) {
            clearTimeout(this.timeout);
            this.timeout = null;
        }
        this.timeout = setTimeout(this.hide.bind(this), 2000);
    }

});
