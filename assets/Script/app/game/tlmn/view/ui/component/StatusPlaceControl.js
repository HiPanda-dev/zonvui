var GameConfig = require('GameConfig');
cc.Class({
    extends: cc.Component,

    properties: {
        winWhiteList: [cc.Node],
        specialList: [cc.Node]
    },

    // use this for initialization
    onLoad: function () {
        this.hideAllWinWhiteList();
        this.hideAllSpecialList();
    },

    showWinWhite: function (index, timeDelay) {
        if (index >= this.winWhiteList.length) return;
        this.hideAllWinWhiteList();
        this.winWhiteList[index].active = true;

        TweenLite.delayedCall(timeDelay, function () {
            this.hideAllWinWhiteList();
        }.bind(this));
    },

    showSpecial: function (index) {
        if (index >= this.specialList.length) return;
        this.hideAllSpecialList();
        this.specialList[index].active = true;
        TweenLite.delayedCall(3, function () {
            this.hideAllSpecialList();
        }.bind(this));
    },

    hideAllWinWhiteList: function () {
        for (var i = 0; i < this.winWhiteList.length; i++) {
            var mc = this.winWhiteList[i];
            if(mc) mc.active = false;
        }
    },

    hideAllSpecialList: function () {
        for (var i = 0; i < this.specialList.length; i++) {
            var mc = this.specialList[i];
            if(mc) mc.active = false;
        }
    }
});
