var BaseScene = require('BaseScene');
var LobbySceneMediator = require('LobbySceneMediator');

// var SceneList = cc.Class({
//     properties: {
//         prefabs: cc.Prefab,
//         isShow: false,
//     },
// })

cc.Class({
    extends: BaseScene,
    properties: {
        prefabs: [cc.Prefab],
        showList: [cc.Boolean]
    },

    ctor: function () {
        LobbySceneMediator.getInstance().init(this);
    },

    show: function () {
        this.node.x = this.rootX;
        BaseScene.prototype.show.call(this);
    },

    // use this for initialization
    onLoad: function () {
        this.rootX = this.node.x;
        this.initialize();
    },

    initialize: function () {
        for (var i = 0; i < this.prefabs.length; i++) {
            if(!this.prefabs[i]) continue;
            var screen = this.prefabs[i];
            if(!screen) continue;
            var node = cc.instantiate(screen);
            node.active = this.showList[i];
            this.node.addChild(node);
        }

       // this.resizeScene();
    },

    // resizeScene:function () {
    //     if(cc.sys.isBrowser){
    //         this.node.scaleX =  1280/window.innerWidth;
    //         this.node.scaleY =  720/window.innerHeight;
    //     }
    // },

    update: function () {

    }
});
