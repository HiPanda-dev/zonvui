cc.Class({
    extends: cc.Component,

    properties: {
      scrollView: cc.ScrollView,
      txtInput: cc.EditBox,
      txtChat: cc.RichText
    },

    onLoad: function () {
        this.arrChat = [];
        this.hide();
    },

    buildUI : function (mySelf) {
        this.mySelf = mySelf;
    },

    onHandlerSendChat: function () {
        if (this.txtInput.string === "") return;
        this.node.emit('ACTIVE_SEND_CHAT', this.txtInput.string);
        cc.log('send chat');
        this.txtInput.string = "";
        TweenLite.delayedCall(0.1, function () {
            this.txtInput.setFocus(true);
        }.bind(this));

    },

    hide: function() {
      this.node.active = false;
    },

    show: function() {
      this.node.active = true;
    },

    onHandlerChatBtn: function() {
      this.node.active = !this.node.active;
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
        }else if (params.displayName === this.mySelf.displayName){
            txt = "<color=#C23AEC>" + params.displayName + ": " + "</c>" + params.message;
        }
        else{
            txt = "<color=#BDE6FD>" + params.displayName + ": " + "</c>" + params.message;
        }

        this.txtChat.string += (this.txtChat.string === "") ? txt : "\n" + txt;
        if (this.txtChat.node.height >= this.scrollView.node.height) {
            this.scrollView.scrollToBottom(0.3, true);
        }

        this.arrChat.push(txt);
    }
});
