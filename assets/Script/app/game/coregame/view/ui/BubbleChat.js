var Component = require("Component");
var BubbleChat = cc.Class({
    extends: Component,

    properties: {
        emoList: [cc.SpriteFrame]
    },

    initComponent: function (componentId, container) {
        Component.prototype.initComponent.call(this, componentId, container);
        this.seatId = -1;
        this.tableVO = null;

        //this.container =
    },

    applyLayout: function () {

        this.chatContent = this.container.getChildByName("chatContent").getComponent(cc.RichText);
        this.chatEmo = this.container.getChildByName("chatEmo").getComponent(cc.RichText);
        this.bgChat = this.container.getChildByName("bgChat");
    },

    initialize: function () {
        this.container.active = false;
    },

    setup: function (seatId, tableVO) {
        this.seatId = seatId;
        this.tableVO = tableVO;
    },

    showChatContent: function (seatId, chatContent, chatType) {
        if (seatId !== this.seatId) return;
        this.container.active = true;
        this.container.stopAllActions();

        var seat = this.tableVO.getSeatBySeatId(this.seatId);
        if(seat){
            if(chatType === 0) {
                this.chatEmo.string = "";
                this.chatContent.lineHeight = 24;
                this.chatContent.string = this.convertChatContent(chatContent);
                this.bgChat.width = this.chatContent.node.width;
                this.bgChat.height = this.chatContent.node.height + 20;
            }
            else {
                this.bgChat.width = 0;
                this.bgChat.height = 0;
                this.chatContent.string = "";
                this.chatEmo.lineHeight = 84;
                this.chatEmo.string = '<img src="emoticon_' + chatContent + '"/>';
            }
        }

        this.container.opacity = 255;
        var move = cc.moveBy(1,cc.p(0,5));
        var action = cc.sequence(move,move.reverse()).repeat(4);

        var self = this;
        this.container.runAction(cc.sequence(action, cc.callFunc(function () {
            self.container.active = false;
        })));

        // TweenMax.to(this.container, .3, {
        //     y: this.container.y-5,
        //     ease: Quad.easeInOut
        // });
        // TweenMax.to(this.container, .3, {
        //     repeat: 7,
        //     y:this.container.y+5,
        //     yoyo: true,
        //     delay: .3,
        //     ease: Quad.easeInOut
        // });
        // TweenMax.to(this.container, .3, {
        //     y: this.container.y,
        //     delay: .3 * 7
        // });
        //
        // TweenLite.delayedCall(3, function () {
        //     this.container.active = false;
        //     this.container.active = false;
        // }.bind(this))
    },

    convertChatContent: function (str) {
        str = " " + str;
        if(str.length > 20){
            for(var i=19 ; i>=0 ; i--){
                if(str.charAt(i) === " "){
                    str = str.slice(0, i) + " <br/>" + str.slice(i);
                    return str;
                }
            }
        }
        return str + " ";
    }

    //////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////override////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////

});

BubbleChat.create = function (componentId, container) {
    var component = new BubbleChat();
    component.initComponent(componentId, container);
    return component;
};

module.exports = BubbleChat;