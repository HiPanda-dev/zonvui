
var BaseScene = cc.Class({
    extends: cc.Component,

    properties: {
    },

    statics:{
      FADE_IN_RIGHT: 'FADE_IN_RIGHT',
      FADE_OUT_RIGHT: 'FADE_OUT_RIGHT',
    },

    onLoad: function onLoad() {
    },

    show:function(fadeIn){
        if(this.node.active) return;

        this.node.x = (this._rootPos)?this._rootPos.x:this.node.x;
        this.node.active = true;
        if(fadeIn === BaseScene.FADE_IN_RIGHT) {
          this.runFadeInRight();
        }
    },

    hide:function(fadeOut){
        if(!this.node) return;
        if(!this.node.active) return;
        if(!this._rootPos){
            this._rootPos = new cc.Vec2(this.node.x, this.node.y);
        }
        if(fadeOut === BaseScene.FADE_OUT_RIGHT) {
          this.runFadeOutRight(function(){
            this.node.x = 10000;
            this.node.active = false;
          }.bind(this));
        }else{
          this.node.x = 10000;
          this.node.active = false;
        }
    },

    runFadeInRight: function() {
      this.node.x = this._rootPos.x;
      this.node.opacity = 256;
      TweenLite.from(this.node, 0.3, {x:this.node.width, opacity:0});
    },

    runFadeOutRight: function(callback) {
      TweenLite.to(this.node, 0.3, {x:this.node.width, opacity:0, onComplete: function(){
        callback.call();
      }.bind(this)})
    },

    showAlert:function (message) {
        this.activeShowAlert(message);
    },

    showConfirmAlert:function (message) {

    }


    // sendNotification:function (notificationName, body) {
    //     var event = new cc.Event(notificationName, true);
    //     event.body = {data:body};
    //     this.node.dispatchEvent(event);
    // },
});
