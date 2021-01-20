cc.Class({
    extends: cc.Component,

    properties: {
        isBound: true,
        events: [cc.Component.EventHandler]
    },

    // use this for initialization
    onLoad: function () {
        this.isDrag = false;
        this.node.on(cc.Node.EventType.TOUCH_START, this.onHanlerDownButton, this);
    },

    onHanlerDownButton: function (evt) {
        //this.node.setSiblingIndex(this.node.parent.childrenCount - 1);
        // this.updateZIndex();

        var touch = evt.touch;
        this.isDrag = false;
        this.draggingDistanceX = this.node.parent.convertToNodeSpace(touch.getLocation()).x - this.node.x;
        this.draggingDistanceY = this.node.parent.convertToNodeSpace(touch.getLocation()).y - this.node.y;
        this.oldX = this.node.x;
        this.oldY = this.node.y;

        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onHanlerMoveButton, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.onHanlerEndButton, this);
    },

    onHanlerMoveButton: function (evt) {
        if(evt.target.name === "editboxXiu" || evt.target.name === "editboxTai")
            return;
        var touch = evt.touch;
        this.node.x = this.node.parent.convertToNodeSpace(touch.getLocation()).x - this.draggingDistanceX;
        this.node.y = this.node.parent.convertToNodeSpace(touch.getLocation()).y - this.draggingDistanceY;
        this.onCheckBoundView();
        if (Math.abs(this.node.x - this.oldX) > 10 || Math.abs(this.node.y - this.oldY) > 10) this.isDrag = true;
    },

    onCheckBoundView: function () {
        if (!this.isBound) return;

        var sizeWidth = cc.director.getWinSize().width;
        var sizeHeight = cc.director.getWinSize().height;

        if (this.node.x > sizeWidth / 2 - this.node.width / 2) this.node.x = sizeWidth / 2 - this.node.width / 2;
        if (this.node.x < -sizeWidth / 2 + this.node.width / 2) this.node.x = -sizeWidth / 2 + this.node.width / 2;

        if (this.node.y > sizeHeight / 2 - this.node.height / 2) this.node.y = sizeHeight / 2 - this.node.height / 2;
        if (this.node.y < -sizeHeight / 2 + this.node.height / 2) this.node.y = -sizeHeight / 2 + this.node.height / 2;
    },

    onHanlerEndButton: function () {
        if (this.isDrag) return;

        for (var i = 0; i < this.events.length; i++) {
            var eventHandler = this.events[i];
            eventHandler.emit(eventHandler.params);
        }
    },

    updateZIndex: function () {
        for (var i = 0; i < this.node.parent.children.length; i++) {
            var node = this.node.parent.children[i];
            node.setSiblingIndex(i);
            node.zIndex = i;
        }
    },
});
