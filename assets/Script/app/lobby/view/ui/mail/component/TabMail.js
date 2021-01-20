var LobbyEvent = require('LobbyEvent');
var Utility = require('Utility');
cc.Class({
    extends: cc.Component,

    properties: {
        pageControl: cc.Node,
        mailDetailForm: cc.Node,
        mailListScrollview: cc.Node,
        mailListScrollviewContent: cc.Node,
        lbCurPage:cc.Label
    },

    onLoad: function () {
        this.mailDetailForm.active = false;

        this.itemTemp = this.mailListScrollviewContent.children[0];
        this.mailListScrollviewContent.removeAllChildren();
        this.curPage = 1;
        this.totalPages = 20;

        this.pageControl.active = true;
        this.mailDetailForm.active = false;
        this.mailListScrollview.active = true;
    },

    updateDeleteMail: function () {
        this.node.emit(LobbyEvent.GET_MAIL_LIST, {pageIndex: parseInt(this.curPage)});
    },

    onGetMailList:function () {
        this.node.emit(LobbyEvent.GET_MAIL_LIST, {pageIndex: parseInt(this.curPage)});
    },

    onHandlerNextPage: function() {
      this.curPage = (this.curPage < this.totalPages) ? this.curPage + 1: this.totalPages;
      this.node.emit(LobbyEvent.GET_MAIL_LIST, {pageIndex: this.curPage});
    },

    onHandlerPrevPage: function() {
      this.curPage = (this.curPage > 1) ? this.curPage - 1: 1;
      this.node.emit(LobbyEvent.GET_MAIL_LIST, {pageIndex: this.curPage});
    },

    updateMailList: function (data) {
        this.mailListScrollviewContent.removeAllChildren();
        this.lbCurPage.string = "" + this.curPage + " / " + this.totalPages;
        var item, mcGroup, btn_delete;
        for(var i=0 ; i<data.length ; i++){
          item = cc.instantiate(this.itemTemp);
          item.data = data[i];
          mcGroup = item.getChildByName("mcGroup");
          mcGroup.getChildByName("txt_title").getComponent(cc.Label).string = data[i].title;
          mcGroup.getChildByName("txt_sender").getComponent(cc.Label).string = data[i].sender;
          mcGroup.getChildByName("txt_time").getComponent(cc.Label).string = data[i].time;
          mcGroup.getChildByName("mcNew").active = data[i].state === 0 ? false : true;
          mcGroup.on(cc.Node.EventType.TOUCH_START, this.onViewMail.bind(this, data[i], this));
          btn_delete = item.getChildByName("btn_delete");
          btn_delete.on(cc.Node.EventType.TOUCH_START, this.onDeleteMail.bind(this, data[i], this));

          this.mailListScrollviewContent.addChild(item);
        }
    },

    updateMailDetail: function (mailDetail) {
        this.pageControl.active = false;
        this.mailDetailForm.active = true;
        this.mailListScrollview.active = false;

        var item, txt_title, txt_sender, txt_time;

        txt_title = this.mailDetailForm.getChildByName('txt_title').getComponent(cc.Label);
        txt_sender = this.mailDetailForm.getChildByName('txt_sender').getComponent(cc.Label);
        txt_time = this.mailDetailForm.getChildByName('txt_time').getComponent(cc.Label);

        txt_title.string = mailDetail.title;
        txt_sender.string = mailDetail.sender;
        txt_time.string = mailDetail.time;

        var contentScrollview = this.mailDetailForm.getChildByName('contentScrollview');
        var view = contentScrollview.getChildByName('view');
        var content = view.getChildByName('content');
        item = content.children[0];
        item.getComponent(cc.RichText).string = Utility.convertToRtf(mailDetail.content);
    },

    onViewMail: function (mail) {
        this.node.emit(LobbyEvent.GET_MAIL_DETAIL, {
            id: mail.id,
        });
    },

    onBackToMailList: function () {
        this.pageControl.active = true;
        this.mailDetailForm.active = false;
        this.mailListScrollview.active = true;
    },

    onDeleteMail: function (mail) {
        this.node.emit(LobbyEvent.DELETE_MAIL, {
            id: mail.id,
        });
    }
});
