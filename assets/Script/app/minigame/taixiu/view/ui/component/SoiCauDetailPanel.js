var TaiXiuVO = require('TaiXiuVO');
cc.Class({
    extends: cc.Component,

    properties: {
      numHeight:6,
      numWidth:20,
      iconCau: [cc.SpriteFrame],
      iconTable: cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
      this.pageviewSoiCau = this.node.getChildByName("pageviewSoiCau").getComponent(cc.PageView);
      this.view = this.pageviewSoiCau.node.getChildByName("view");
      this.content = this.view.getChildByName("content");
      this.soiCauThongKe = this.content.getChildByName("SoiCauThongKe");
      this.soiCauChart = this.content.getChildByName("SoiCauChart");
      this.resultCau1 = this.soiCauThongKe.getChildByName("resultCau1");
      this.resultCau2 = this.soiCauThongKe.getChildByName("resultCau2");
      this.lbTable1Tai = this.soiCauThongKe.getChildByName("lbTable1Tai").getComponent(cc.Label);
      this.lbTable1Xiu = this.soiCauThongKe.getChildByName("lbTable1Xiu").getComponent(cc.Label);
      this.lbTable2Tai = this.soiCauThongKe.getChildByName("lbTable2Tai").getComponent(cc.Label);
      this.lbTable2Xiu = this.soiCauThongKe.getChildByName("lbTable2Xiu").getComponent(cc.Label);

      this.lbNearestSession = this.soiCauChart.getChildByName("lbNearestSession").getComponent(cc.Label);
      this.chartTotalDice = this.soiCauChart.getChildByName("chartTotalDice");

      this.chartDice1 = this.soiCauChart.getChildByName("chartDice1");
      this.chartDice2 = this.soiCauChart.getChildByName("chartDice2");
      this.chartDice3 = this.soiCauChart.getChildByName("chartDice3");

      this.lineTotalDice = this.soiCauChart.getChildByName("lineTotalDice");
      //if(cc.sys.isMobile){
      //  this.soiCauDetailPanel.x = 400;
      //}

      this.iconCau2 = this.resultCau2.getChildByName("iconCau0");
      this.onHide();
    },

    buildUI: function(iconCau, iconTable) {
      // this.iconCau = iconCau;
      // this.iconTable = iconTable;
    },

    onUpdateHistory: function(data) {
      this.history = data.history;
      if(this.node.active === true)
        this.updateThongkeCau();
    },

    onHandlerNextPageSoiCau: function () {
       if(this.pageviewSoiCau.getCurrentPageIndex() === 1 ){
           this.pageviewSoiCau.scrollToPage(0);
           return;
       }
       this.pageviewSoiCau.scrollToPage(this.pageviewSoiCau.getCurrentPageIndex() + 1);
   },

   onHandlerPrevPageSoiCau: function () {
       if(this.pageviewSoiCau.getCurrentPageIndex() === 0 ){
           this.pageviewSoiCau.scrollToPage(1);
           return;
       }
       this.pageviewSoiCau.scrollToPage(this.pageviewSoiCau.getCurrentPageIndex() - 1);
   },

   onHide: function() {
     this.node.active = false;
   },

    onHandlerSoiCauDetail: function() {
        this.node.active = !this.node.active;
        this.updateThongkeCau();
    },

    updateThongkeCau: function () {
      this.updateThongKeCau1();
      this.updateThongKeCau2();
      this.updateThongKeCau3();
      this.updateThongKeCau4();
    },

    updateThongKeCau1: function () {
        var rootPos = new cc.Vec2(this.iconTable.x,this.iconTable.y);
        var spaceWidth = 26.5;
        var spaceHeight = 26;
        var idx = 0, numXiu = 0, numTai = 0;
        var row = this.getRowResultHistory(this.history);
        row = this.getNumToEndArray(row, this.numWidth);

        this.resultCau1.removeAllChildren();
        for(var i = 0; i < row.length; i++) {
          var col = row[i];
          for(var j = 0; j < col.length; j++) {
            var btnCau = this.createBtnCau(col[j], true);
            btnCau.x = (i * spaceWidth) + rootPos.x;
            btnCau.y =  rootPos.y - (j * spaceHeight);
            this.resultCau1.addChild(btnCau);

            if(col[j].type === TaiXiuVO.BET_TAI) numTai++;
            else numXiu++;
          }
        }

        this.lbTable1Tai.string = "" + numTai;
        this.lbTable1Xiu.string = "" + numXiu;
    },

    updateThongKeCau2: function () {
        this.resultCau2.removeAllChildren();
        var rootPos = new cc.Vec2(this.iconCau2.x, this.iconCau2.y);
        var numTai = 0;
        var numXiu = 0;
        var spaceWidth = 26.5;
        var spaceHeight = 26;

        var row = this.getRowResultHistory(this.history);
        var result = [];

        for(var i = 0; i < row.length; i++) {
          var col = row[i];
          for(var j = 0; j < col.length; j++) {
            var btnCau = this.createBtnCau(col[j], true);
            this.resultCau2.addChild(btnCau);
            if(col[j].type === TaiXiuVO.BET_TAI) numTai++;
            else numXiu++;
            result.push(btnCau);
          }
        }

        result = this.getNumToEndArray(result, 120);

        for(var i = 0; i < result.length; i++) {
          var btnCau = result[i];
          btnCau.x = rootPos.x + Math.ceil(i / this.numHeight) * spaceWidth;
          btnCau.y = rootPos.y - (i % this.numHeight) * spaceHeight;
        }

        this.lbTable2Tai.string = "" + numTai;
        this.lbTable2Xiu.string = "" + numXiu;

    },

    updateThongKeCau3: function() {
      var tempPos = null;
      var listHistory = this.history.concat();
      var num = this.numWidth - 1;

      this.chartTotalDice.removeAllChildren();
      this.lineTotalDice.removeAllChildren();
      listHistory = this.getNumToEndArray(listHistory, this.numWidth - 1);

      for(var i = 0 ;i < listHistory.length ;i++){
        var btnCau = this.createBtnCau(listHistory[i], true);
        btnCau.x = 26 + 26.5 * i;
        btnCau.y = btnCau.score * 9;
        this.chartTotalDice.addChild(btnCau);

        if(i===0) tempPos = new cc.Vec2(btnCau.x, btnCau.y);
        else{
          var color = new cc.Color(254,248,154);
          this.lineTotalDice.addChild(this.drawLine(tempPos , new cc.Vec2(btnCau.x,btnCau.y) , color, 3));
          tempPos = new cc.Vec2(btnCau.x, btnCau.y);
        }
      }
    },

    updateThongKeCau4: function() {
      var tempPos1 = null;
      var tempPos2 = null;
      var tempPos3 = null;
      var listHistory = this.history.concat();
      var num = this.numWidth - 1;

      this.chartDice1.removeAllChildren();
      this.chartDice2.removeAllChildren();
      this.chartDice3.removeAllChildren();
      listHistory = this.getNumToEndArray(listHistory, this.numWidth - 1);

      for(var i = 0 ;i < listHistory.length ;i++){
        var array = JSON.parse("[" + listHistory[i].result + "]");
        var btnCau1 = this.createBtnCau(listHistory[i], false);
        btnCau1.getComponent(cc.Sprite).spriteFrame = this.iconCau[2];
        btnCau1.width = 14;
        btnCau1.height = 14;
        btnCau1.x = 26+26.5*i;
        btnCau1.y = array[0]*26;
        this.chartDice1.addChild(btnCau1);

        var btnCau2 = this.createBtnCau(listHistory[i], false);
        btnCau2.getComponent(cc.Sprite).spriteFrame = this.iconCau[3];
        btnCau2.width = 14;
        btnCau2.height = 14;
        btnCau2.x = 26+26.5*i;
        btnCau2.y = array[1]*26;
        this.chartDice2.addChild(btnCau2);

        var btnCau3 = this.createBtnCau(listHistory[i], false);
        btnCau3.getComponent(cc.Sprite).spriteFrame = this.iconCau[4];
        btnCau3.width = 14;
        btnCau3.height = 14;
        btnCau3.x = 26+26.5*i;
        btnCau3.y = array[2]*26;
        this.chartDice3.addChild(btnCau3);

        if(i===0) {
          tempPos1 = new cc.Vec2(btnCau1.x, btnCau1.y);
          tempPos2 = new cc.Vec2(btnCau2.x, btnCau2.y);
          tempPos3 = new cc.Vec2(btnCau3.x, btnCau3.y);
        }
        else{
          var color1 = new cc.Color(255,255,0);
          var color2 = new cc.Color(88,249,255);
          var color3 = new cc.Color(255,92,112);

          this.chartDice1.addChild(this.drawLine(tempPos1 , new cc.Vec2(btnCau1.x,btnCau1.y) , color1, 2));
          this.chartDice2.addChild(this.drawLine(tempPos2 , new cc.Vec2(btnCau2.x,btnCau2.y) , color2, 2));
          this.chartDice3.addChild(this.drawLine(tempPos3 , new cc.Vec2(btnCau3.x,btnCau3.y) , color3, 2));

          tempPos1 = new cc.Vec2(btnCau1.x, btnCau1.y);
          tempPos2 = new cc.Vec2(btnCau2.x, btnCau2.y);
          tempPos3 = new cc.Vec2(btnCau3.x, btnCau3.y);
        }
      }
    },

    getRowResultHistory: function(history) {
      var row = [];
      var idx = 0;
      var listHistory = history.concat();
      while (listHistory.length > 0) {
        var cau = listHistory.shift(0);
        if(row[idx] === undefined) {
          row[idx] = [];
          row[idx].push(cau);
          continue;
        }
        if(row[idx].length === this.numHeight || row[idx][0].type !== cau.type) {
          idx++;
          row[idx] = [];
          row[idx].push(cau);
          continue;
        }
        row[idx].push(cau);
      }
      return row;
    },

    createBtnCau: function(cau, showLabel) {
      var array = JSON.parse("[" + cau.result + "]");
      var score = array[0] + array[1] + array[2];
      var spriteFrame = (cau.type === TaiXiuVO.BET_TAI ) ? this.iconCau[5] : this.iconCau[6];
      var btnCau = cc.instantiate(this.iconTable);
      btnCau.getComponent(cc.Sprite).spriteFrame = spriteFrame;
      btnCau.score = score;
      var lbScore = btnCau.getChildByName('lbScore').getComponent(cc.Label);
      lbScore.node.color = (cau.type === TaiXiuVO.BET_TAI ) ? cc.Color.WHITE : cc.Color.BLACK;
      lbScore.string = (showLabel) ? score : "";

      return btnCau;
    },

    drawLine: function (start , end , color , lineWidth) {
        var node = new cc.Node();
        node.addComponent(cc.Graphics);
        var line = node.getComponent(cc.Graphics);

        line.lineWidth = lineWidth;
        line.moveTo(start.x, start.y);
        line.lineTo(end.x, end.y);
        line.strokeColor = color;
        line.stroke();

        // line.node.opacity = 50;
        return node;
    },

    getNumToEndArray(arr, num) {
      if(arr.length < num) return arr;
      var result = arr.slice(arr.length - num, arr.length);
      return result;
    },

});
