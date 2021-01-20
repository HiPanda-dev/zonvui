var BasePopup = require('BasePopup');
var TabMain = require('TabMain');
var StartGamePopupMediator = require('StartGamePopupMediator');
var Utility = require("Utility");
var LocalStorage = require('LocalStorage');


cc.Class({
    extends: BasePopup,

    properties: {
        btnTab: cc.Node,
        pageContent: cc.Node,
        tabView: TabMain,
        toggleNotShowPopup: cc.Toggle
    },

    ctor: function () {
    },

    // use this for initialization
    onLoad: function () {
        StartGamePopupMediator.getInstance().init(this);
        this.hide();
    },

    updateInfoEvent: function (params) {

        this.tabView.content.removeAllChildren();
        this.tabView.tabBar.removeAllChildren();
        if (params.dataList.length === 0)
            return;

        for (var i = 0; i < params.dataList.length; i++) {
            var btnTab = cc.instantiate(this.btnTab);
            var bg = btnTab.getChildByName("Background");
            var txtTab = bg.getChildByName("lbTitle").getComponent(cc.Label);
            txtTab.string = params.dataList[i].shortTitle;
            this.tabView.tabBar.addChild(btnTab);
            if (i === 0)
                btnTab.isChecked = true;

            var pageContent = cc.instantiate(this.pageContent);
            var lbTitle = pageContent.getChildByName("lbTitle").getComponent(cc.Label);
            lbTitle.string = params.dataList[i].title;

            var scrollview = pageContent.getChildByName("scrollview");
            var view = scrollview.getChildByName(("view"));
            var lbContent = view.getChildByName("lbContentEvent").getComponent(cc.RichText);
            lbContent.string = Utility.convertToRtf(params.dataList[i].content);
            var iconEvent = view.getChildByName("iconEvent").getComponent(cc.Sprite);

            if (params.dataList[i].image !== null) {
                var path = params.dataList[i].image;
                var width = iconEvent.node.width;
                var height = iconEvent.node.height;

                Utility.loadUrlImage(path, function (mcImage, texture) {
                    mcImage.spriteFrame = new cc.SpriteFrame(texture);
                    Utility.scaleImage(mcImage.node, width, height);
                }, [iconEvent]);
            }

            this.tabView.content.addChild(pageContent);
        }

        this.tabView.initTabbarButton();
        this.tabView.initPageTab();
    },

    handlerEventNotShowPopup: function () {
        if (this.toggleNotShowPopup.isChecked) {
            var date = new Date();
            var ls = cc.sys.localStorage;
            var time = date.getTime();
            ls.setItem("timeClickNotShow", time);
        }
    }

});