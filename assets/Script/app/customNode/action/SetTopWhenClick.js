cc.Class({
    extends: cc.Component,

    properties: {
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node.on(cc.Node.EventType.TOUCH_START, this.onHanlerDownButton, this);
    },

    onHanlerDownButton: function (evt) {
        this.node.setSiblingIndex(this.node.parent.childrenCount - 1);
        this.updateZIndex();
    },

    updateZIndex: function () {
        for (var i = 0; i < this.node.parent.children.length; i++) {
            var node = this.node.parent.children[i];
            node.setSiblingIndex(i);
            node.zIndex = i;
        }
    },
});
