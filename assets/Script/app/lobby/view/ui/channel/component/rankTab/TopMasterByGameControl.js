var LocalStorage = require('LocalStorage');
cc.Class({
    extends: cc.Component,

    properties: {
        content: cc.Node, //content item rick
        toggleTopMoney: cc.Toggle
    },

    // use this for initialization
    onLoad: function () {
        if(this.isLoad) return;
        var item = this.content.getChildByName("item");
        this.topChipList = null;
        this.topMoneyList = null;
        this.topRankList = null;
        this.rootPos = new cc.Vec2(item.x, item.y);
        this.item_temp =  cc.instantiate(item);
        this.content.removeAllChildren();
        this.isLoad = true;
    },

    setupRank:function (rankingVO) {
        this.topChipList = rankingVO.topChipList;
        this.topMoneyList = rankingVO.topMoneyList;
        this.topRankList =  (LocalStorage.getMode() === "MONEY")?this.topMoneyList:this.topChipList;
        this.toggleTopMoney.isChecked = (LocalStorage.getMode() === "MONEY")?false:true;
        this.showCurrentTop(this.topRankList);
    },

    showCurrentTop:function (topRankList) {
        if(!this.isLoad) this.onLoad();
        this.content.removeAllChildren();
        if(topRankList === null) return;
        for(var i=0;i<topRankList.length;i++){
            var item = cc.instantiate(this.item_temp);
            item.parent = this.content;
            item.x = this.rootPos.x;
            this.updateDataItem(item, topRankList[i], i);
        }
    },

    /**
     *
     * @param item
     * @param data = {displayName, value}
     * @param index
     */
    updateDataItem:function (item, data, index) {
        var mcIcon =  item.getChildByName("mcIcon");
        var iconTop1 = mcIcon.getChildByName("icon_top1");
        var iconTop2 = mcIcon.getChildByName("icon_top2");
        var iconTop3 = mcIcon.getChildByName("icon_top3");

        var txtUserName = item.getChildByName("txtUserName").getComponent(cc.Label);
        var txtRank = item.getChildByName("txtRank").getComponent(cc.Label);
        var txtIndex = item.getChildByName("txtIndex").getComponent(cc.Label);

        iconTop1.active = false;
        iconTop2.active = false;
        iconTop3.active = false;
        txtIndex.node.active = false;

        if(index === 0) iconTop1.active = true;
        else if(index === 1) iconTop2.active = true;
        else if(index === 2) iconTop3.active = true;
        else txtIndex.node.active = true;

        txtUserName.string = data.displayName;
        txtRank.string = data.value;
        txtIndex.string = index + 1;
    },

    onHandlerChangeTopMode:function () {
        this.topRankList = (this.topRankList === this.topChipList)?this.topMoneyList:this.topChipList;
        this.showCurrentTop(this.topRankList);
    }
});
