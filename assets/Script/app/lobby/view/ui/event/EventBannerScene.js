var BaseScene = require('BaseScene');
var EventBannerSceneMediator = require('EventBannerSceneMediator');
var Utility = require('Utility');

cc.Class({
    extends: BaseScene,

    properties: {
        pageView: cc.Node,
        bannerDefault : cc.Node,
        pageContent: cc.Node,
        timeSlide: 15
    },

    // use this for initialization
    onLoad: function () {
        EventBannerSceneMediator.getInstance().init(this);
        this.sign = false;
    },

    updateEventBanner: function(dataList){
        this.pageView.getComponent(cc.PageView).removeAllPages();

        this.bannerDefault.active = false;
        this.pageView.active = true;
        this.listOpertatorId = [];

        for (var i = 0; i < dataList.length; i++) {
            this.listOpertatorId.push(dataList[i].operatorId);
            var item = cc.instantiate(this.pageContent);
            item.id = i;
            item.operatorId = dataList[i].operatorId;

            item.on(cc.Node.EventType.TOUCH_END, function (event) {
                var id = event.target.operatorId;
                this.onActiveEventBanner(id);
            }.bind(this));

            var node = item.getChildByName("page");
            var image = node.getComponent(cc.Sprite);

            if (dataList[i].image != null) {
                var path = dataList[i].image;
                var width = this.bannerDefault.width;
                var height = this.bannerDefault.height;

                Utility.loadUrlImage(path, function (mcImage, texture) {
                    mcImage.spriteFrame = new cc.SpriteFrame(texture);
                    mcImage.node.width = width;
                    mcImage.node.height = height;
                }, [image]);
            }

            this.pageView.getComponent(cc.PageView).addPage(item);
        }

        var r = Math.floor(Math.random(dataList.length));
        var t = this.pageView.getComponent(cc.PageView);
        t.scrollToPage(r);
        this.node.runAction(cc.sequence(cc.delayTime(this.timeSlide), cc.callFunc(this.scrollNextPage.bind(this), this)).repeatForever());
    },

    onPreviousPage: function () {
        this.pageViewCo = this.pageView.getComponent(cc.PageView);
        if (this.pageViewCo.getCurrentPageIndex() > 0)
            this.pageViewCo.scrollToPage(this.pageViewCo.getCurrentPageIndex() - 1);
    },

    onNextPage: function () {
        this.pageViewCo = this.pageView.getComponent(cc.PageView);
        if (this.pageViewCo.getCurrentPageIndex() < this.pageViewCo.getPages().length - 1)
            this.pageViewCo.scrollToPage(this.pageViewCo.getCurrentPageIndex() + 1);
    },

    scrollNextPage: function(){
        this.pageViewCo = this.pageView.getComponent(cc.PageView);
        if(!this.sign){
            if (this.pageViewCo.getCurrentPageIndex() < this.pageViewCo.getPages().length - 1)
                this.pageViewCo.scrollToPage(this.pageViewCo.getCurrentPageIndex() + 1);
            else{
                this.sign = true;
                this.onPreviousPage();
            }
        }
        else{
            if (this.pageViewCo.getCurrentPageIndex() > 0)
                this.pageViewCo.scrollToPage(this.pageViewCo.getCurrentPageIndex() -1);
            else{
                this.sign = false;
                this.onNextPage();
            }
        }
    },
});

