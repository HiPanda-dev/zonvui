var BaseScene = require('BaseScene');
var ChatSceneMediator = require('ChatSceneMediator');

cc.Class({
    extends: BaseScene,

    properties: {
        scrollView: cc.ScrollView,
        txtInput: cc.EditBox,
        txtChat: cc.RichText
    },

    onLoad: function () {
        ChatSceneMediator.getInstance().init(this);
        this.arrChat = [];
        this.hide();
    },

    show: function () {
        BaseScene.prototype.show.call(this);
    },

    onHandlerSendChat: function () {
        if (this.txtInput.string === "") return;
        this.activeSendChat(this.txtInput.string);

        this.txtInput.string = "";
        TweenLite.delayedCall(0.1, function () {
            this.txtInput.setFocus(true);
        }.bind(this));

    },

    onUpdateChat: function (params) {
        this.onPushChat(params, false);
    },

    onUpdateAdminChat:function (params) {
        this.onPushChat(params, true);
    },

    onPushChat:function (params, isAdmin) {
        if (this.arrChat.length >= 50) {
            var str = this.arrChat.shift();
            this.txtChat.string = this.txtChat.string.slice(str.length + 1, this.txtChat.string.length)
        }
        var txt = "";
        if(isAdmin){
            txt = "<color=#FF0000>" + params.displayName + ": " + params.message + "</c>";
        }else{
            txt = "<color=#AB8BFF>" + params.displayName + ": " + "</c>" + params.message;
        }

        this.txtChat.string += (this.txtChat.string === "") ? txt : "\n" + txt;
        if (this.txtChat.node.height >= this.scrollView.node.height) {
            this.scrollView.scrollToBottom(0.3, true);
        }

        this.arrChat.push(txt);
    },
    
    onUpdatListChat:function (listChat) {
        for (var i = 0; i < listChat.length; i++) {
            var displayName = listChat[i].displayName;
            var message = listChat[i].chatContent;
            var txt = "<color=#AB8BFF>" + displayName + ": " + "</c>" + message;
            this.txtChat.string += (this.txtChat.string === "") ? txt : "\n" + txt;
            this.arrChat.push(txt);
        }
        if (this.txtChat.node.height >= this.scrollView.node.height) {
            this.scrollView.scrollToBottom(0.3, true);
        }
    }

});

