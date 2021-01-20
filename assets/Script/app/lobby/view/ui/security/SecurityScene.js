var BasePopup = require('BasePopup');
var TabMain = require('TabMain');
var SecuritySceneMediator = require('SecuritySceneMediator');
var LobbyMessage = require('LobbyMessage');
var Utility = require('Utility');

cc.Class({
    extends: BasePopup,

    properties: {
        input_old_pass:cc.EditBox,
        input_new_pass:cc.EditBox,
        input_confirm_new_pass:cc.EditBox,
        input_phone:cc.EditBox,
        node_phone:cc.Node,
        input_otp:cc.EditBox,
        input_otp2:cc.EditBox,
        node_otp:cc.Node,
        node_otp2:cc.Node,
        txt_note:cc.Node,
        bg_code2:cc.Node,
        tabMain:TabMain,
        updateForm:cc.Node,
        infoForm:cc.Node,
        validateButton:cc.Node,
        infoFormDes:cc.Node,
        accountTxt:cc.Label,
        phoneTxt:cc.Label,
        txtRules:cc.RichText,
    },

    // use this for initialization
    onLoad: function () {
        SecuritySceneMediator.getInstance().init(this);
        this.addEventListeners();
        this.hide();
        this.node_otp.active = false;
        this.txt_note.active = false;
        this.updateForm.active = false;
        this.infoForm.active = false;
    },

    show:function (params) {
        BasePopup.prototype.show.call(this);
        this.mySelf = params;
    },

    onShowTab:function (params) {
        switch (params)
        {
            case LobbyMessage.CHANGE_PASS_TAB_INDEX:
                this.tabMain.openTabIndex(0);
                break;
            case LobbyMessage.VALIDATE_TAB_INDEX:
                this.tabMain.openTabIndex(1);
                break;
        }


        var tab = this.tabMain.getCurPageView();
        switch (tab.name) {
            case  'tabValidate':
                this.renderValidateTab();
                break;
        }
        this.activeGetDescription();
    },

    onChangeTab: function (params) {
        var tab = this.tabMain.getCurPageView();
        switch (tab.name) {
            case  'tabValidate':
                this.renderValidateTab();
                break;
        }
    },

    renderValidateTab: function () {
        if(this.mySelf.phone === '')
        {
            this.showUpdatePhoneForm();
        }
        else
        {
            this.showPhoneInfoForm();
        }
    },

    showUpdatePhoneForm: function () {
        this.updateForm.active = true;
        this.infoForm.active = false;

        this.input_phone.string = '';
        this.input_otp.string = '';
        this.input_otp2.string = '';
        this.node_phone.active = true;
        this.node_otp.active = false;
        this.node_otp2.active = false;
        this.bg_code2.active = false;
        this.txt_note.active = false;
    },

    showResetPhoneForm: function () {
        this.updateForm.active = true;
        this.infoForm.active = false;

        this.input_phone.string = '';
        this.input_otp.string = '';
        this.input_otp2.string = '';
        this.node_phone.active = true;
        this.node_otp2.active = true;
        this.bg_code2.active = true;
        this.node_otp.active = false;
        this.txt_note.active = false;
    },

    showValidatePhoneForm: function () {
        this.updateForm.active = true;
        this.infoForm.active = false;

        this.input_phone.string = '';
        this.input_otp.string = '';
        this.input_otp2.string = '';
        this.node_phone.active = false;
        this.node_otp2.active = false;
        this.bg_code2.active = false;
        this.node_otp.active = true;
        this.txt_note.active = true;
    },

    onHandlerShowInfo:function () {
        this.activeShowInfo();
    },

    showPhoneInfoForm: function () {
        if(this.mySelf.isActivePhone === 0)
        {
            this.infoFormDes.active = false;
            this.validateButton.active = true;
        }
        else
        {
            this.infoFormDes.active = true;
            this.validateButton.active = false;
        }
        this.updateForm.active = false;
        this.infoForm.active = true;
        this.accountTxt.string = this.mySelf.loginName;
        this.phoneTxt.string = this.mySelf.phone;
    },

    onChangePhone: function () {
        if(this.mySelf.isActivePhone === 0)
        {
            this.showUpdatePhoneForm();
        }
        else
        {
            this.showResetPhoneForm();
        }
    },

    onConfirmChangePass: function () {
        var tempObject = {};
        tempObject.currentPassword = this.input_old_pass.string;
        tempObject.newPassword = this.input_new_pass.string;
        tempObject.reNewPassword = this.input_confirm_new_pass.string;
        this.activeChangePass(tempObject);
    },

    onSetPhone: function () {
        if(this.node_phone.active)
        {
            this.activeSetPhone({phone:this.input_phone.string,OTP:this.input_otp2.string});
        }
        else
        {
            this.activeSetOtp({OTP:this.input_otp.string});
        }
    },

    onValidatePhone: function () {
        this.showValidatePhoneForm();
    },

    onUpdateChangePass: function () {
        this.input_old_pass.string = '';
        this.input_new_pass.string = '';
        this.input_confirm_new_pass.string = '';
    },

    onUpdateSetPhone: function () {
        if(this.mySelf.phone === '')
        {
            this.mySelf.phone = this.input_phone.string;
            this.showValidatePhoneForm();
        }
        else
        {
            this.mySelf.phone = this.input_phone.string;
            this.showPhoneInfoForm();
        }
    },

    onUpdateSetOtp: function () {
        this.mySelf.isActivePhone = 1;
        this.showPhoneInfoForm();
    },

    onUpdateGetDescription: function (params) {
        this.txtRules.string = Utility.convertToRtf(params.activeDes.activePhoneDes);
    },

    addEventListeners: function () {

    },

    removeEventListeners: function () {

    }
});