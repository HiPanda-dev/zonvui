cc.Class({
    extends: cc.Component,

    properties: {
        btnArrow: cc.Node,
        txtSelect: cc.Label,
        panelView: cc.Node,
        mcBack: cc.Node,
        mcBackItem: cc.Node,
        content: cc.Node,
        maxItem: 6,
        defaultText:"",
        changeEvent: [cc.Component.EventHandler],
        clickArrowEvent: [cc.Component.EventHandler]
    },

    // use this for initialization
    onLoad: function () {
        this.panelView.active = false;
        this.mcBack.active = false;
        this.mcBackItem.active = false;
        this.biHeight = this.mcBackItem.height;
        this.scrollBar = this.panelView.getChildByName("scrollBar");
    },

    onHanlerArrowClick: function () {
        this.panelView.active = !this.panelView.active;
        this.mcBack.active = this.panelView.active;
        this.mcBackItem.active = this.panelView.active;

        for (var i = 0; i < this.clickArrowEvent.length; i++) {
            var eventHandler = this.clickArrowEvent[i];
            eventHandler.emit(eventHandler.params);
        }
    },

    /**
     *
     * @param vtDataList
     * [
     *      {name, value}
     *
     * ]
     */
    setupData: function (vtDataList) {
        this.vtDataList = vtDataList;
        this.panelView.active = false;
        this.item_temp = (this.item_temp) ? this.item_temp : this.content.getChildByName("item");
        this.content.removeAllChildren();

        var wHeight = 0;

        for (var i = 0; i < vtDataList.length; i++) {
            if (i === 0 && this.defaultText === "") {
                this.txtSelect.string = vtDataList[i].name;
                this.itemSelect = vtDataList[i];
            }
            var item = cc.instantiate(this.item_temp);
            item.data = vtDataList[i];
            this.setNameButton(item, vtDataList[i].name);
            item.on(cc.Node.EventType.TOUCH_END, this.onSelectItem.bind(this), item);
            this.content.addChild(item);
            wHeight = item.height;
        }
        
        //TH có text default thì reset lại the
        this.mcBackItem.height = this.biHeight;
        this.scrollBar.active = true;
        if (vtDataList.length < this.maxItem) {
            this.mcBackItem.height -= (this.maxItem - vtDataList.length) * wHeight;
            this.scrollBar.active = false;
        }
    },

    setSelectIndex: function (index) {
        if (!this.vtDataList || !this.vtDataList[index]) return;

        this.txtSelect.string = this.vtDataList[index].name;
        this.panelView.active = false;
        this.itemSelect = this.vtDataList[index];

        for (var i = 0; i < this.changeEvent.length; i++) {
            var eventHandler = this.changeEvent[i];
            eventHandler.emit(eventHandler.params);
        }
    },

    onSelectItem: function (event) {
        var item = event.currentTarget;
        this.txtSelect.string = item.data.name;
        this.panelView.active = false;
        this.itemSelect = item.data;
        this.mcBack.active = false;
        this.mcBackItem.active = false;
        for (var i = 0; i < this.changeEvent.length; i++) {
            var eventHandler = this.changeEvent[i];
            eventHandler.emit(eventHandler.params);
        }
    },

    onHandlerHidePanelView: function () {
        this.panelView.active = false;
        this.mcBack.active = this.panelView.active;
        this.mcBackItem.active = this.panelView.active;
    },

    setNameButton: function (button, name) {
        button.getChildByName("Label").getComponent(cc.Label).string = name;
    },

    getItemSelect: function () {
        return this.itemSelect;
    },

    ////////////PRIVATE////////////////////////
    updateDefaultText: function (text) {
        this.defaultText = text;
        this.txtSelect.string = this.defaultText;
        this.itemSelect = null;
    }
});
