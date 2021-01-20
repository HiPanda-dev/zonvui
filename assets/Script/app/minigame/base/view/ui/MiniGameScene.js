var BaseScene = require('BaseScene');
var Constants = require('Constants');
var MiniGameSceneMediator = require('MiniGameSceneMediator');

cc.Class({
    extends: BaseScene,

    properties: {
        menuMiniGame: cc.Node,
        container: cc.Node,
        background:cc.Node,
        menuList:cc.Node
    },


    // use this for initialization
    onLoad: function () {
        MiniGameSceneMediator.getInstance.init(this);
        this.btnMinigame = this.menuMiniGame.getChildByName('btn_minigame');
        this.timeIconMiniGame = this.btnMinigame.getChildByName('timeIconMiniGame');
        this.lbTimeTx = this.timeIconMiniGame.getChildByName('lbTimeTx');
        this.timeIconMiniGame.active = false;
        this.menuMiniGame.rootWidth = this.menuMiniGame.width;
        this.menuMiniGame.rootHeight = this.menuMiniGame.height;
        this.hideMenuMiniGame();
        this.isBlock = false;
        this.background.active = false;
    },

    onLoadMiniGame: function (name, onComplete) {
        cc.loader.loadRes('minigame/' + name + ".prefab", function (err, prefab) {
            if (err) {
                cc.error(err.message || err);
                return;
            }
            if (this.container.getChildByName(prefab.name) === null) {
              this.container.addChild(cc.instantiate(prefab));
              if (onComplete) onComplete.call();
            }
        }.bind(this));
    },

    hideMenuMiniGame: function () {
        this.isBlock = true;
        this.background.active = false;
        this.menuList.active = false;

        TweenLite.to(this.menuList, 0.3, {
            scaleX: 0, scaleY: 0, alpha: 0, angle: 0, ease: Linear.easeNone, onComplete: function () {
                this.menuList.active = false;
                this.menuList.scaleX = 1;
                this.menuList.scaleY = 1;
                this.menuList.alpha = 1;
                this.menuList.angle = 0;
                this.isBlock = false;
            }.bind(this)
        });

        this.menuMiniGame.width = this.menuMiniGame.rootWidth;
        this.menuMiniGame.height = this.menuMiniGame.rootHeight;
        this.menuMiniGame.getComponent("DragObject").onCheckBoundView();
        this.menuMiniGame.active = true;
        this.btnMinigame.active = true;
    },

    showMenuMiniGame: function () {
        this.isBlock = true;
        this.menuList.active = true;
        // this.iconRoy.active = true;
        this.btnMinigame.active = false;
        this.background.active = true;

        this.menuList.scaleX = 0;
        this.menuList.scaleY = 0;
        this.menuList.alpha = 0;
        this.menuList.angle = 180;
        // this.iconRoy.scaleX = 0;
        // this.iconRoy.scaleY = 0;
        // this.iconRoy.alpha = 0;

        // TweenLite.to(this.iconRoy, 0.3, {scaleX: 0.8, scaleY: 0.8, alpha: 1, angle: 360, ease: Linear.easeNone});
        TweenLite.to(this.menuList, 0.3, {scaleX: 0.7, scaleY: 0.7, alpha: 1, angle: 360, ease: Linear.easeNone, onComplete:function () {
                this.isBlock = false;
            }.bind(this)});
        this.menuMiniGame.getComponent("DragObject").onCheckBoundView();
        this.menuMiniGame.active = false;
    },

    onHandlerShowMenuMiniGame: function () {
        if (this.isBlock) return;
        if (this.menuList.active) {
            this.hideMenuMiniGame();
            return;
        }

        this.showMenuMiniGame();
    },

    onHandlerVongQuayClick: function () {
        this.activeJoinMinigame(Constants.MINIGAME_VONG_QUAY);
        this.hideMenuMiniGame();
    },

    onHandlerBauCuaClick: function () {
        this.activeJoinMinigame(Constants.MINIGAME_BAU_CUA);
        this.hideMenuMiniGame();
    },

    onHandlerTaiXiuClick: function () {
        this.activeJoinMinigame(Constants.MINIGAME_TAI_XIU);
        this.hideMenuMiniGame();
    },

    onHandlerPokeGoClick: function () {
        this.activeJoinMinigame(Constants.MINIGAME_SLOT3X3);
        this.hideMenuMiniGame();
    },

    onHandlerToNhoClick: function () {
        this.activeJoinMinigame(Constants.MINIGAME_TO_NHO);
        this.hideMenuMiniGame();
    },

    onHandlerMiniPokerClick: function () {
        this.activeJoinMinigame(Constants.MINIGAME_MINI_POKER);
        this.hideMenuMiniGame();
    },

    onUpdateCountDownTx: function (data) {
        if(data.s !== 1) return;
        this.timeTx = parseInt(data.cd);
        this.timer = setInterval(this.countDown.bind(this), 1000);
    },

    countDown: function () {
        this.timeTx --;
        if(this.timeTx <= 10 && this.timeTx >= 0){
            this.timeIconMiniGame.active = true;
            if (this.timeTx < 10)
                this.lbTimeTx.getComponent(cc.Label).string = '00:0' + this.timeTx;
            else
                this.lbTimeTx.getComponent(cc.Label).string = '00:' + this.timeTx;

        }
        else
            this.timeIconMiniGame.active = false;

        if(this.timeTx < 0)
            clearInterval(this.timer);
    }

});
