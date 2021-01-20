cc.Class({
    extends: cc.Component,

    properties: {
        iconGameContainer: cc.Node,
        listIconShow: [cc.Node]
    },

    onLoad: function () {

    },

    onHandlerChooseMode: function () {
        var i, icon, customAction;
        for (i = 0; i < this.iconGameContainer.children.length; i++) {
            icon = this.iconGameContainer.children[i];
            icon.active = false;
        }

        for (i = 0; i < this.listIconShow.length; i++) {
            icon = this.listIconShow[i];
            if(icon){
              icon.active = true;
            }
        }
    }

});
