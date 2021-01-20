var LobbyEvent = require('LobbyEvent');
var Captcha = require('Captcha');
var i18n = require('i18n');
cc.Class({
    extends: cc.Component,

    properties: {},

    // use this for initialization
    onLoad: function () {
        this.contentScrollview = this.node.getChildByName('supportListScrollview');
        this.scrollView = this.contentScrollview.getComponent(cc.ScrollView);
        this.view = this.contentScrollview.getChildByName('view');
        this.content = this.view.getChildByName('content');
        this.supportRow = this.content.getChildByName('item');
    },

    updateSupportDetail: function (supportDetail) {
        var data = supportDetail.dataList.reverse();
        var item, txt_content;
        this.supportDetailList = [];
        this.content.removeAllChildren();

        item = cc.instantiate(this.supportRow);
        txt_content = item.getChildByName("form_2").getChildByName("txt_title").getComponent(cc.Label);
        for (var i = 0; i < data.length; i++) {
            item = cc.instantiate(this.supportRow);
            if (data[i].isSystem === 0) {
                item.getChildByName("form_2").active = false;
                item.getChildByName("form_1").active = true;
                txt_content = item.getChildByName("form_1").getChildByName("txt_title").getComponent(cc.Label);
            }
            else {
                item.getChildByName("form_1").active = false;
                item.getChildByName("form_2").active = true;
                txt_content = item.getChildByName("form_2").getChildByName("txt_title").getComponent(cc.Label);
            }
            txt_content.string = data[i].content;

            this.content.addChild(item);
        }

        this.scrollView.scrollToBottom(0.3, true);

    },

    onViewSupport: function (support) {
        this.support = support;
        this.node.emit(LobbyEvent.GET_SUPPORT_DETAIL);

        this.refeshCaptcha();
    },

    onSendSupportAnswer: function (support) {
        this.node.emit(LobbyEvent.SEND_SUPPORT_ANSWER, {
            content: this.node.getChildByName('input_answer').getComponent(cc.EditBox).string,
            captcha: this.node.getChildByName('input_code').getComponent(cc.EditBox).string
        });
    },


    updateSupportAnswer: function (data) {
        this.refeshCaptcha();
        this.node.getChildByName('input_answer').getComponent(cc.EditBox).string = '';
        this.node.getChildByName('input_code').getComponent(cc.EditBox).string = '';

        this.node.emit(LobbyEvent.GET_SUPPORT_DETAIL);
    },

    refeshCaptcha: function () {
        var captcha = this.node.getChildByName('captcha').getComponent(Captcha);
        captcha.refeshCaptcha();
    }
});
