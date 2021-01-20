cc.Class({
    extends: cc.Component,

    properties: {
        isInCanvas: false,
        isExactFit: false
    },

    // use this for initialization
    onLoad: function () {
        if(cc.sys.isBrowser && !cc.sys.isMobile){
            window.addEventListener('resize', this.resizeCanvas.bind(this), false);
            this.resizeCanvas();
        }
    },

    resizeCanvas: function () {
        // if(!this.node) {
        //     window.removeEventListener('resize', this.resizeCanvas.bind(this), false);
        //     return;
        // }
        // if (!this.isExactFit) {
        //     var scaleW = cc.view.getFrameSize().width / cc.view.getDesignResolutionSize().width;
        //     var scaleH = cc.view.getFrameSize().height / cc.view.getDesignResolutionSize().height;

        //     if (scaleW < 1 || scaleH < 1) {
        //         this.node.scale = (scaleW < scaleH) ? scaleW : scaleH;
        //     } else {
        //         this.node.scale = 1;
        //     }
        //     var spaceX = (cc.view.getDesignResolutionSize().width - cc.view.getDesignResolutionSize().width * this.node.scale) / 2;
        //     var spaceY = (cc.view.getDesignResolutionSize().height - cc.view.getDesignResolutionSize().height * this.node.scale) / 2;

        //     if (this.isInCanvas) {
        //         this.node.x = (this.node.scale === 1) ? (cc.view.getFrameSize().width - cc.view.getDesignResolutionSize().width) / 2 : -spaceX;
        //         this.node.y = (cc.view.getFrameSize().height - cc.view.getDesignResolutionSize().height) + spaceY;
        //     } else {
        //         this.node.x = (this.node.scale === 1) ? cc.view.getFrameSize().width / 2 : cc.view.getDesignResolutionSize().width/2 - spaceX;
        //         this.node.y = (cc.view.getFrameSize().height - cc.view.getDesignResolutionSize().height / 2) + spaceY;
        //     }
        // } else {
        //     this.node.x = cc.view.getFrameSize().width / 2;
        //     this.node.y = cc.view.getFrameSize().height / 2;
        //     this.node.width = cc.view.getFrameSize().width;
        //     this.node.height = cc.view.getFrameSize().height;
        // }

    },

    setExactFix: function () {
        this.node.width = cc.view.getFrameSize().width;
        this.node.height = cc.view.getFrameSize().height;
    },
});
