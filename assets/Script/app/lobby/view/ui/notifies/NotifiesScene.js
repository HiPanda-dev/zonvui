var BaseScene = require('BaseScene');
var Utility = require('Utility');
var NotifiesSceneMediator = require('NotifiesSceneMediator');

cc.Class({
    extends: BaseScene,

    properties: {
        lbNotifies: cc.RichText,
        timeSpeed: 100
    },

    // use this for initialization
    onLoad: function () {
        NotifiesSceneMediator.getInstance().init(this);

        this.isRun = false;
        this.isNewMessages = false;
        this.strNotifies = "";
        this.timer = null;
        this.lbNotifies.string = "";
        this.node.active = false;
    },

    onUpdateNotifies: function (strNotifies) {
        if (this.isRun === false) {
            this.lbNotifies.string = strNotifies;
            this.lbNotifies.node.x = this.getStartPosNotifies();
            this.timer = setInterval(this.onTimer.bind(this), this.timeSpeed);
            this.isRun = true;
        } else {
            this.isNewMessages = true;
            this.strNotifies = strNotifies;
        }

        this.node.active = (strNotifies === "")?false:true;
    },

    onTimer: function () {
        this.lbNotifies.node.x -= 1;
        if (this.lbNotifies.node.x + this.lbNotifies.node.width  > 0) return;
        if (this.isNewMessages) {
            clearInterval(this.timer);
            this.timer = null;
            this.isNewMessages = false;
            this.isRun = false;
            this.lbNotifies.string = "";
            this.onUpdateNotifies(this.strNotifies);
        } else {
            this.lbNotifies.node.x = this.getStartPosNotifies();
        }
    },

    getStartPosNotifies: function () {
        return  this.lbNotifies.node.parent.width;
    }
});
