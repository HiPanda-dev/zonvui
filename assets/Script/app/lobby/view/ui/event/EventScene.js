var BasePopup = require('BasePopup');
var CustomAction = require('CustomAction');
var Utility = require('Utility');
var Constants = require('Constants');
var EventSceneMediator = require('EventSceneMediator');

cc.Class({
    extends: BasePopup,

    properties: {
        pageView: cc.PageView,
        pageContent: cc.Node,
        btnActiveEvent: cc.Node

    },

    ctor: function () {
        this.uuTienId = null;
        this.listOperatorId = [];
    },

    // use this for initialization
    onLoad: function () {
        EventSceneMediator.getInstance().init(this);
        this.hide();

        this.btnPrevPage = this.node.getChildByName("btnPrevPage").getComponent(cc.Button);
        this.btnNextPage = this.node.getChildByName("btnNextPage").getComponent(cc.Button);
        this.scrollview = this.pageContent.getChildByName("scrollview").getComponent(cc.ScrollView);
        //this.scrollview.scrollToTop(0.1);
        this.currentPage = 0;
        this.totalPages = 0;
    },

    show: function(){
        BasePopup.prototype.show.call(this);
        if(this.uuTienId){
            if(this.pageView.getPages().length === 0){
                return;
            }
            var idPage = this.getIdByOperatorId(this.uuTienId);
            if(idPage >= 0 && idPage < this.pageView.getPages().length) {
                this.pageView.setCurrentPageIndex(idPage);
                this.pageView.scrollToPage(this.pageView.getCurrentPageIndex());
            }
        }
    },

    onUpdateDetailEvent: function (params) {
        this.pageView.removeAllPages();
        this.listOperatorId = [];
        if (params.dataList.length === 0)
            return;

        this.totalPages = params.dataList.length;
        for (var i = 0; i < params.dataList.length; i++) {
            this.listOperatorId.push(params.dataList[i].operatorId);
            var pageContent = cc.instantiate(this.pageContent);
            var lbTitle = pageContent.getChildByName("lbTitle").getComponent(cc.Label);
            var lbTime = pageContent.getChildByName("lbTime").getComponent(cc.Label);
            var iconEvent = pageContent.getChildByName("iconEvent").getComponent(cc.Sprite);
            var scrollview = pageContent.getChildByName("scrollview");
            var view = scrollview.getChildByName("view");
            var lbDetailEvent = view.getChildByName("lbDetailEvent").getComponent(cc.RichText);
            var btnGroup = pageContent.getChildByName("btnGroup");

            lbTitle.string = params.dataList[i].title;
            lbTime.string = params.dataList[i].time;
            lbDetailEvent.string = Utility.convertToRtf(params.dataList[i].content);
            if (params.dataList[i].image !== null) {
                var path = params.dataList[i].image;
                var width = iconEvent.node.width;
                var height = iconEvent.node.height;

                Utility.loadUrlImage(path, function (mcImage, texture) {
                    mcImage.spriteFrame = new cc.SpriteFrame(texture);
                    Utility.scaleImage(mcImage.node , width , height);
                }, [iconEvent]);
            }

            btnGroup.removeAllChildren();
            for (var j in params.dataList[i].buttons) {
                var btnActiveEvent = cc.instantiate(this.btnActiveEvent);
                var btnTitle = btnActiveEvent.getChildByName("btnTitle").getComponent(cc.Label);
                var customAction = btnActiveEvent.getComponent(CustomAction);
                btnTitle.string = params.dataList[i].buttons[j].name;
                customAction.updateCode(j);
                btnGroup.addChild(btnActiveEvent);
            }
            pageContent.active = true;
            this.pageView.addPage(pageContent);
        }

        var uuTienPageId = this.getIdByOperatorId(this.uuTienId);
        if(uuTienPageId!== 0){
            this.pageView.scrollToPage(uuTienPageId);
            this.pageView.scrollToPage(this.pageView.getCurrentPageIndex());
        }
    },

    onPreviousPage: function () {
        if(this.totalPages === 1)
            return;

        if (this.pageView.getCurrentPageIndex() > 0)
            this.currentPage = this.pageView.getCurrentPageIndex() - 1;
        else{
            this.currentPage = this.totalPages-1;
        }
        this.pageView.scrollToPage(this.currentPage);
    },

    onNextPage: function () {
        if(this.totalPages === 1)
            return;

        if (this.pageView.getCurrentPageIndex() < this.totalPages - 1)
            this.currentPage = this.pageView.getCurrentPageIndex() + 1;
        else
            this.currentPage = 0;
        this.pageView.scrollToPage(this.currentPage);
    },

    imageExists: function (image_url) {
        try {
            var http = new XMLHttpRequest();
            http.open('GET', image_url, false);
            http.send();
            return http.status !== 404;
        } catch (ex) {
            return false;
        }
    },


    getPageTabViewById: function (id) {
        for (var i = 0; i < this.listContentEvent.length; i++) {
            if (this.listContentEvent[i].id === id) return this.listContentEvent[i];
        }
        return null;
    },

    setUuTienId: function(uuTienId){
        this.uuTienId = uuTienId;
    },

    resetUuTienId: function(){
        this.uuTienId = null;
    },

    getIdByOperatorId: function(uuTienId){
        for(var i = 0; i < this.listOperatorId.length; i++){
            if(this.listOperatorId[i] === uuTienId){
                return i;
            }
        }
        return 0;
    }
});
