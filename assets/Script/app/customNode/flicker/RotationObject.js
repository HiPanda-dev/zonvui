cc.Class({
    extends: cc.Component,

    properties: {
       time:50,
       isAutoStart:false,
    },

    // use this for initialization
    onLoad: function () {
        this.timer = null;
        this.node.opacity = this.opacityMax;
        if(this.isAutoStart){
            this.onStart();
        }
    },

    onStart: function() {
        if(this.timer) return;
        this.timer = setInterval(this.onTimer.bind(this), this.time);
    },
    
    onStop:function(){
        clearInterval(this.timer);
        this.timer = null;
    },

    onTimer: function () {
        this.node.angle += 10;
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
