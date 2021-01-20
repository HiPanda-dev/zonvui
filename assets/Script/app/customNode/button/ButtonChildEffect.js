cc.Class({
    extends: cc.Component,

    properties: {

    },

    // use this for initialization
    onLoad: function () {
      this.node.on('mouseenter', () => {
        for (var i = 0; i < this.node.children.length; ++i) {
            var child = this.node.children[i];
            child.color = new cc.Color(184, 184, 184, 255);
        }
      })

      this.node.on('mouseleave', () => {
        for (var i = 0; i < this.node.children.length; ++i) {
            var child = this.node.children[i];
            child.color = new cc.Color(255, 255, 255, 255);
        }
      })
    }
});
