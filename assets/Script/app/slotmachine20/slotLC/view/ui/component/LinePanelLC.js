var FlickerObject = require('FlickerObject');
cc.Class({
    extends: cc.Component,

    properties: {
        posLeftNum: cc.Vec2,
        posRightNum: cc.Vec2,
        space: 0,
    },

    onLoad () {
      this.lines = [
         [],
         [6, 7, 8, 9, 10],
         [11, 12, 13, 14, 15],
         [1, 2, 3, 4, 5],
         [11, 7, 3, 9, 15],
         [1, 7, 13, 9, 5],
         [6, 12, 13, 14, 10],
         [6, 2, 3, 4, 10],
         [11, 12, 8, 4, 5],
         [1, 2, 8, 14, 15],
         [6, 12, 8, 4, 10],
         [6, 2, 8, 14, 10],
         [11, 7, 8, 9, 15],
         [1, 7, 8, 9, 5],
         [11, 7, 13, 9, 15],
         [1, 7, 3, 9, 5],
         [6, 7, 13, 9, 10],
         [6, 7, 3, 9, 10],
         [11, 12, 3, 14, 15],
         [1, 2, 13, 4, 5],
         [11, 2, 3, 4, 15]
      ];

      var ctnLine = this.node.getChildByName("lineGroup");
      var ctnDot = this.node.getChildByName("dotGroup");

      this.arrayLine = [];

      for(var i = 1 ;i <= 20; i++){
          this.arrayLine[i-1] = ctnLine.getChildByName("line" + i);
          this.arrayLine[i-1].addComponent(FlickerObject);
          this.arrayLine[i-1].active = false;
          var node = ctnDot.getChildByName('dot' + i);
          node.id = i - 1;
          node.on('mouseenter', this.onHandlerEventOverNumber.bind(this));
          node.on('mouseleave', this.onHandlerEventOutNumber.bind(this));
      }

    },

    onHandlerEventOverNumber: function(evt) {
      var node = evt.target;
      this.arrayLine[node.id].active = true;
    },

    onHandlerEventOutNumber: function(evt) {
      var node = evt.target;
      this.arrayLine[node.id].active = false;
    },

    getItemPos: function(win) {
      var itemPos = this.lines[win.line];
      return itemPos;
    },

    resetLineWin: function(){
      for(var lineId in this.arrayLine){
          this.arrayLine[lineId].active = false;
      }
    },

    onShowLineWin: function(wins) {
      this.resetLineWin();
      for(var i = 0 ;i < wins.length; i++){
          this.arrayLine[wins[i].line - 1].active = true;
      }
    }
});
