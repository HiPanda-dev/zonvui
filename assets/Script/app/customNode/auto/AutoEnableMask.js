cc.Class({
    extends: cc.Component,

    properties: {

    },

    // use this for initialization
    onLoad: function () {
        var mask =  this.node.getComponent(cc.Mask);
        if(mask){
            //mask.enabled = true;
        }
    }


});
