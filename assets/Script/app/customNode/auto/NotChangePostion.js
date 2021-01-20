/*
class nàu dùng để sửa lỗi
 */

cc.Class({
    extends: cc.Component,

    properties: {

    },

    // use this for initialization
    onLoad: function () {
       this.rootY =  this.node.y;
    },

    update:function () {
       //  if(this.node.y !== this.rootY){
       //     this.node.y = this.rootY;
       // }
    }
});
