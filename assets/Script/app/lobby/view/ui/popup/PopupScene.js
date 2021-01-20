var BaseScene = require('BaseScene');
var PopupSceneMediator = require('PopupSceneMediator');

cc.Class({
    extends: BaseScene,

    properties: {
        background: cc.Node,
        popupList: [cc.Prefab]
    },

    // use this for initialization
    onLoad: function () {
        PopupSceneMediator.getInstance().init(this);
        this.background.active = false;
        this.initialize();
        this.iCount = 0;
    },

    show: function () {
        this.iCount++;
        this.background.active = true;
    },

    hide: function () {
        this.iCount--;
        this.iCount = ( this.iCount <= 0) ? 0 : this.iCount;
        if (this.iCount === 0)
            this.background.active = false;
    },

    initialize: function () {
        for (var i = 0; i < this.popupList.length; i++) {
            if (!this.popupList[i]) continue;
            var node = cc.instantiate(this.popupList[i]);
            if (!node) continue;
            node.active = false;
            node.popupScene = this;
            this.node.addChild(node);
        }
    },

    hideAll: function () {
        for (var i = 0; i < this.popupList.length; i++) {
            if (!this.popupList[i]) continue;
            var node = cc.instantiate(this.popupList[i]);
            node.active = false;
        }
    }
});
