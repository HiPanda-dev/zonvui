cc.Class({
    extends: cc.Component,

    properties: {
        dropListPrefabs: cc.Prefab,
        defaultText:"",
        changeEvent: [cc.Component.EventHandler],
        clickArrowEvent: [cc.Component.EventHandler]
    },

    onLoad: function () {
        this.itemDropList = cc.instantiate(this.dropListPrefabs);
        this.dropListMain = this.itemDropList.getComponent("DropListMain");
        this.dropListMain.changeEvent = this.changeEvent;
        this.dropListMain.clickArrowEvent = this.clickArrowEvent;
        this.dropListMain.updateDefaultText(this.defaultText);

        this.node.removeAllChildren();
        this.node.addChild(this.itemDropList);
        this.isLoad = true;
    },

    ////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////ITEM DROP LIST//////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////
    setupData: function (vtDataList) {
        if(!this.isLoad){
            TweenLite.delayedCall(0.2, function (data) {
                this.setupData(data)
            }.bind(this),[vtDataList]);
            return;
        }
        this.dropListMain.setupData(vtDataList);
    },

    setSelectIndex: function (index) {
        this.dropListMain.setSelectIndex(index);
    },

    onSelectItem: function (event) {
        this.dropListMain.onSelectItem(event);
    },

    onHandlerHidePanelView: function () {
        this.dropListMain.onHandlerHidePanelView();
    },

    setNameButton: function (button, name) {
        this.dropListMain.setNameButton(button, name);
    },

    getItemSelect: function () {
        return this.dropListMain.getItemSelect();
    }
});
