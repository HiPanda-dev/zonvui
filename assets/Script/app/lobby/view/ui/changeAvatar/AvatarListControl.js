var GameConfig = require('GameConfig');
var Avatar = require('Avatar');
var LobbyEvent = require('LobbyEvent');
cc.Class({
    extends: cc.Component,

    properties: {
        numWidth: 3,
        numHeight: 3,

        avatar1: cc.Node,
        avatar2: cc.Node,
        avatar3: cc.Node,
        pageViewControl: cc.PageView,
    },

    // use this for initialization
    onLoad: function () {
        this.rootPos = new cc.Vec2(this.avatar1.x, this.avatar1.y);
        this.spaceW = this.avatar2.x - this.avatar1.x;
        this.spaceH = this.avatar3.y - this.avatar1.y;
        this.sizeWidth = this.avatar2.parent.width;
        this.sizeHeight = this.avatar2.parent.height;

        this.pageViewControl.removeAllPages();
        this.pageCount = 0;
        this.channelNode = null;
        this.isDrag = false;
        this.sortBet = 0;
        this.avatarPrefab = this.avatar1;
    },

    updatePageView: function (data) {
        this.data = data;
        if (!this.data) return;
        var num = this.numWidth * this.numHeight;
        var curPageIndex = this.pageViewControl.getCurrentPageIndex();
        this.pageViewControl.removeAllPages();
        this.pageCount = 0;
        if (!data || data.length === 0) return;

        for (var i = 0; i < data.length; i += num) {
            var dataInPage = [];
            for (var j = 0; j < num; j++) {
                if (j + i >= data.length) break;
                dataInPage.push(data[j + i]);
            }
            var page = this.createPage(dataInPage);
            this.pageViewControl.addPage(page);
            this.pageCount++;
        }

        curPageIndex = (curPageIndex < this.pageViewControl.getPages().length) ? curPageIndex : this.pageViewControl.getPages().length - 1;
        this.pageViewControl.scrollToPage(curPageIndex, 0);
    },

    createPage: function (pageData) {
        var page = new cc.Node();
        page.width = this.sizeWidth;
        page.height = this.sizeHeight;
        for (var i = 0; i < pageData.length; i++) {
            var avatarNode = cc.instantiate(this.avatarPrefab);
            avatarNode.x = this.rootPos.x + this.spaceW * (i % this.numWidth);
            avatarNode.y = this.rootPos.y + this.spaceH * parseInt(i / this.numWidth);
            avatarNode.getComponent(Avatar).updateImg(pageData[i].link);
            avatarNode.on(cc.Node.EventType.TOUCH_START, this.onChangeAvatar.bind(this, pageData[i], this));
            page.addChild(avatarNode);
        }
        return page;
    },

    onChangeAvatar: function (data) {
        this.node.emit(LobbyEvent.CHANGE_AVATAR, {
            avatar: data.name,
            link: data.link,
        });
    },
});
