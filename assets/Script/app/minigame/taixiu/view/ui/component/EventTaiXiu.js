var BasePopup = require('BasePopup');
var EventTaiXiuMediator = require('EventTaiXiuMediator');
var Utility = require('Utility');

cc.Class({
    extends: BasePopup,

    properties: {
    },

    // use this for initialization
    onLoad: function () {
        EventTaiXiuMediator.getInstance().init(this);
        this.hide();

        this.content = this.node.getChildByName("content");
        this.item = this.content.getChildByName("item");
        this.lbDate = this.node.getChildByName("lbDate").getComponent(cc.Label);
        this.toggleGr = this.node.getChildByName("toggleGroupTop");
        this.btnWin = this.toggleGr.getChildByName("btnTopWin").getComponent(cc.Toggle);
        this.btnLoss = this.toggleGr.getChildByName("btnTopLoss").getComponent(cc.Toggle);
        this.btnNextDate = this.node.getChildByName("btnNextDate").getComponent(cc.Button);
        this.btnPrevDate = this.node.getChildByName("btnPrevDate").getComponent(cc.Button);
        this.btnWin.isChecked = true;
        this.btnLoss.isChecked = false;
        this.lbDate.string = this.date.toISOString().slice(0,10).replace(/-/g,"/").split("/").reverse().join("/");
        this.btnNextDate.enabled = false;
    },

    show: function (){
      this.isWin = 1;
      this.date = new Date();
      if(this.btnWin !== undefined){
        this.btnWin.isChecked = true;
        this.btnLoss.isChecked = false;
        this.lbDate.string = this.date.toISOString().slice(0,10).replace(/-/g,"/").split("/").reverse().join("/");
      }
      BasePopup.prototype.show.call(this);
    },

    onHandlerClickNextDate: function () {
      this.date.setDate(this.date.getDate() + 1);
      this.lbDate.string = this.date.toISOString().slice(0,10).replace(/-/g,"/").split("/").reverse().join("/");

      var params = {};
      params.isWin = this.isWin;
      params.date = this.date.toISOString().slice(0,10).replace(/-/g,"");

      this.node.emit('ACTIVE_EVENT_UPDATE', params);
        var params = {};
        // params.type = this.type;
        params.isWin = this.isWin;
        params.indexDate = this.indexDate;

        this.node.emit('ACTIVE_EVENT_UPDATE', params);
    },

    onHandlerClickPrevDate: function () {
        this.date.setDate(this.date.getDate() - 1);
        this.lbDate.string = this.date.toISOString().slice(0,10).replace(/-/g,"/").split("/").reverse().join("/");

        var params = {};
        params.isWin = this.isWin;
        params.date = this.date.toISOString().slice(0,10).replace(/-/g,"");

        this.node.emit('ACTIVE_EVENT_UPDATE', params);
    },

    onHandlerClickBxhTotal: function () {
        // this.type = 1;

        var params = {};
        // params.type = this.type;
        params.isWin = this.isWin;
        params.indexDate = this.indexDate;

        this.activeGetTopEventTaiXiu(params);
    },

    onHandlerClickBxhDaily: function () {
        // this.type = 0;

        var params = {};
        // params.type = this.type;
        params.isWin = this.isWin;
        params.indexDate = this.indexDate;

        this.node.emit('ACTIVE_EVENT_UPDATE', params);
    },

    onHandlerClickTopWin: function () {
        this.isWin = 1;

        var params = {};
        params.isWin = this.isWin;
        params.date = this.date.toISOString().slice(0,10).replace(/-/g,"");

        this.node.emit('ACTIVE_EVENT_UPDATE', params);

    },

    onHandlerClickTopLoss: function () {
        this.isWin = 0;

        var params = {};
        params.isWin = this.isWin;
        params.date = this.date.toISOString().slice(0,10).replace(/-/g,"");

        this.node.emit('ACTIVE_EVENT_UPDATE', params);
    },

    updateEventTaiXiu: function (data) {
        this.content.removeAllChildren();

        for(var i=0 ; i<data.length ; i++){
            var item = cc.instantiate(this.item);
            item.getChildByName("bgLine").active = (i % 2 !== 0);
            item.getChildByName("lbSTT").getComponent(cc.Label).string = i + 1;
            item.getChildByName("lbName").getComponent(cc.Label).string = data[i].a;
            item.getChildByName("lbSoVan").getComponent(cc.Label).string = data[i].c;
            item.getChildByName("lbSessionBegin").getComponent(cc.Label).string =data[i].idB;
            item.getChildByName("lbSessionEnd").getComponent(cc.Label).string =data[i].idE;
            item.getChildByName("lbWin").getComponent(cc.Label).string = Utility.formatCurrency(data[i].v);
            item.getChildByName("lbPrize").getComponent(cc.Label).string = data[i].b;
            this.content.addChild(item);
        }
    }

});
