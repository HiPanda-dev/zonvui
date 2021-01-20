var FlickerObject = require('FlickerObject');
cc.Class({
    extends: cc.Component,

    properties: {

    },

    onLoad() {
      this.lines = [
         [],
         [7,8,9],
         [4,5,6],
         [1,2,3],
         [7,2,9],
         [1,8,3],
         [7,5,9],
         [7,5,3],
         [1,5,9],
         [4,2,6],
         [4,8,6],
         [1,5,3],
         [7,8,6],
         [4,5,3],
         [4,5,9],
         [1,2,6],
         [4,8,9],
         [1,5,6],
         [7,5,6],
         [4,2,3],
         [7,2,6],

      ];


      this.arrayLine = [];
      for(var i = 1 ;i <= 20; i++){
          this.arrayLine[i-1] = this.node.getChildByName("line" + i);
          this.arrayLine[i-1].addComponent(FlickerObject);
      }
    },

    onShowLineWin (wins) {
      this.resetLineWin();
      for(var i = 0 ;i < wins.length; i++){
          this.showLine(wins[i].line - 1);
      }
    },


    resetLineWin: function(){
        for(var i = 0; i < 20; i++){
            this.hideLine(i);
        }
    },

    hideLine: function(lineId){
        this.arrayLine[lineId].active = false;
        this.arrayLine[lineId].getComponent('FlickerObject').onStop();
    },

    showLine: function(lineId){
        this.arrayLine[lineId].active = true;
        this.arrayLine[lineId].getComponent('FlickerObject').onStart();
    },

    getItemPos: function(win) {
      var itemPos = this.lines[win.line];
      return itemPos;
    },

});
