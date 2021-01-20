var BasePopup = require('BasePopup');
var AlertMediator = require('AlertMediator');
var i18n = require('i18n');

cc.Class({
    extends: BasePopup,

    properties: {
        registerAlertMediator:true,
        txtTitle: cc.Label,
        txtContent: cc.RichText,
        ctnAlert: cc.Node,
        ctnConfirm: cc.Node,
        component:cc.Node
    },

    getTweenNode:function () {
        return this.component;
    },

    ctor: function () {
      AlertMediator.getInstance().init(this);
    },

    // use this for initialization
    onLoad: function () {
      // if(this.registerAlertMediator) AlertMediator.getInstance().init(this);
      this.onCallBack = null;
      this.onCallbackParams = null;
      this.lbConfirm = this.ctnConfirm.getChildByName("btnOk").getChildByName("Label").getComponent(cc.Label);
      this.lbOk = this.ctnAlert.getChildByName("btnOk").getChildByName("Label").getComponent(cc.Label);
      this.defaultLbConfirm = this.lbConfirm.string;
      this.defaultLbOk = this.lbOk.string;
      this.hide();
    },

    showConfirm: function (data) {
        this.show();
        this.txtTitle.string = (data.title) ? data.title : i18n.t("C0042");
        this.txtContent.string = (data.content) ? data.content : "";
        this.onCallBack = data.callback;
        this.onCallbackParams = data.callbackParams;
        this.timeClose = data.timeClose || -1;
        this.ctnConfirm.active = true;
        this.ctnAlert.active = false;

        if(data.acceptLabel){
            this.lbConfirm.string = data.acceptLabel;
            this.lbOk.string = data.acceptLabel;
        }else{
            this.lbConfirm.string = this.defaultLbConfirm;
            this.lbOk.string = this.defaultLbOk;
        }

        if(this.timeClose !== -1)
            TweenLite.delayedCall(this.timeClose, this.hide);
    },

    showAlert: function (data) {
        this.show();
        this.txtTitle.string = (data.title) ? data.title :  i18n.t("C0042");
        this.txtContent.string = (data.content) ? data.content : "";
        this.onCallBack = data.callback;
        this.onCallbackParams = data.callbackParams;
        this.timeClose = data.timeClose || -1;
        this.ctnConfirm.active = false;
        this.ctnAlert.active = true;
        this.lbOk.string = data.acceptLabel ? data.acceptLabel : this.defaultLbOk;

        if(this.timeClose !== -1)
            TweenLite.delayedCall(this.timeClose, this.hide);
    },

    onHanlerCancelClick: function () {
        this.hide();
    },

    onHanlerConfirmClick: function () {
        this.hide();
        if (this.onCallBack) {
            this.onCallBack.apply(this, [this.onCallbackParams]);
        }
    },
});
