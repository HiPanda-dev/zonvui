var BaseScene = require('BaseScene');
var ChatGameSceneMediator = require('ChatGameSceneMediator');
var Constants = require('Constants');
var i18n = require('i18n');

cc.Class({
    extends: BaseScene,

    properties: {
        posStart: cc.Vec2,
        posEnd: cc.Vec2,
        scrollView: cc.ScrollView,
        txtInput: cc.EditBox,
        txtChat: cc.RichText
    },

    onLoad: function () {
        ChatGameSceneMediator.getInstance().init(this);

        this.quickChatLayer = this.node.getChildByName("quickChatLayer");
        this.emoChatLayer = this.node.getChildByName("emoChatLayer");
        this.arrChat = [];
        this.hide();
    },

    show: function (data) {
        BaseScene.prototype.show.call(this);

        if(data.chatType === 0){
            this.quickChatLayer.active = true;
            this.emoChatLayer.active = false;
        }
        else{
            this.quickChatLayer.active = false;
            this.emoChatLayer.active = true;
        }

        var ls = cc.sys.localStorage;
        var pos = ls.getItem("rootPosChat");
        this.rootPosX = (pos) ? pos : this.posEnd.x;
        if(!this.node) return;

        this.node.opacity = 0;
        TweenLite.to(this.node, 0.3, {opacity: 255});

        this.loadContentChatGame(data.currentGame);
    },

    loadContentChatGame: function (currentGame) {

        var chatName = "";
        switch (currentGame){
            case Constants.GAME_TLMN:
                chatName = "TLMN";
                break;
            case Constants.GAME_TLMN_SOLO:
                chatName = "TLMN";
                break;
            case Constants.GAME_SAM:
                chatName = "TLMN";
                break;
            case Constants.GAME_SAM_SOLO:
                chatName = "TLMN";
                break;
            case Constants.GAME_BINH:
                chatName = "BINH";
                break;
        }
        for(var i = 0; i < 12; i++)
        {
            var node = this.quickChatLayer.getChildByName("quickChat" + ( i + 1));
            var label = node.getChildByName("label").getComponent(cc.Label);
            label.string = i18n.t(chatName + (i + 1));
        }
    },

    hide: function () {
        BaseScene.prototype.hide.call(this);
        if(!this.node) return;
        TweenLite.to(this.node, 0.3, {opacity:0});
        //this.arrChat = [];
        //this.txtChat.string = "";
    },

    onHandlerShowQuickChat: function () {
        this.quickChatLayer.active = true;
        this.emoChatLayer.active = false;
    },

    onHandlerShowEmoChat: function () {
        this.quickChatLayer.active = false;
        this.emoChatLayer.active = true;
    },

    onQuickChatClick: function (event) {
        var label = event.target.getChildByName("label").getComponent(cc.Label);
        this.activeSendChat({type:0, content:label.string});
    },

    onEmoChatClick: function (event) {
        var index = event.target.name.slice(9);
        this.activeSendChat({type:1, content:index});
    },

    onHandlerSendChat: function () {
        if (this.txtInput.string === "") return;
        this.activeSendChat({type:0, content:this.txtInput.string});

        this.txtInput.string = "";
        TweenLite.delayedCall(0.1, function () {
            this.txtInput.setFocus(true);
        }.bind(this));

    },

    onUpdateChat: function (params) {
        this.onPushChat(params, false);
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
    
    onUpdateListChat:function (listChat) {
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

