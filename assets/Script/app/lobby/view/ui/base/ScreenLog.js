var ScreenLog = cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //    default: null,      // The default value will be used only when the component attaching
        //                           to a node for the first time
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
    },

    statics: {
        infoLabel: null,

        log: function (msg) {
            console.log(msg);
            //if (!cc.sys.isNative)return;
            if (ScreenLog.infoLabel) {
                ScreenLog.infoLabel.string += '\n' + msg;
            }
        }
    },

    // use this for initialization
    onLoad: function () {
        ScreenLog.infoLabel = this.node.getComponent(cc.Label);
       //if (!cc.sys.isNative) {
       //     this.node.active = false;
       // }
    },


});

module.exports = ScreenLog;
