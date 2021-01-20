cc.Class({
    extends: cc.Component,

    properties: {

    },

    update:function () {
        if(this.node.getSiblingIndex()!==0){
            this.node.setSiblingIndex(0);
        }
    }
});
