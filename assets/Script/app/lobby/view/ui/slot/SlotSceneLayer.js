var BaseScene = require('BaseScene');
var SlotSceneLayerMediator = require('SlotSceneLayerMediator');

cc.Class({
    extends: BaseScene,

    properties: {
      loading:cc.Node,
      loadingKN:cc.Node,
      percent:cc.Label,
      bar: cc.Node,
    },

    // use this for initialization
    onLoad: function () {
      SlotSceneLayerMediator.getInstance().init(this);
      this.loading.active = false;
      this.loadingKN.active = false;
      this.bar.width = 0;
      this.arrLight = [];
      for(var i = 1;i < 10; i++) {
        var mcLight = this.loading.getChildByName('L' + i);
        this.arrLight.push(mcLight);
      }
    },

    hideAllLight: function() {
      for(var i = 0;i < this.arrLight.length; i++) {
        this.arrLight[i].active = false;
      }
    },

    showLoading: function(name) {
      switch (name) {
          case 'slotmachine20/luckyCafe/SlotLCScene':
              this.loading.active = true;
              this.loading.opacity = 255;
              TweenLite.from(this.loading, 0.5, {y:-this.loading.height});
              break;
          case 'slotmachine20/keoNgot/SlotKNScene':
              this.loadingKN.active = true;
              break;
      }

    },

    onLoadSlotmachine: function (name, onComplete) {
      this.showLoading(name);
      this.hideAllLight();
      cc.loader.loadRes(name + ".prefab", function (completedCount, totalCount) {
          switch (name) {
              case 'slotmachine20/luckyCafe/SlotLCScene':
                  var percent = 0;
                  if (totalCount > 0) {
                      percent = Math.round(completedCount / totalCount * 100);
                  }
                  this.percent.string = percent;
                  var idx = Math.ceil(percent / 10);
                  if(this.arrLight[idx]) this.arrLight[idx].active = true;
                  break;
              case 'slotmachine20/keoNgot/SlotKNScene':
                  if (totalCount > 0) {
                      this.bar.width = 482 * completedCount / totalCount;
                  }
                  break;
          }
      }.bind(this), function(err, prefab) {
        if (err) {
            cc.error(err.message || err);
            return;
        }
        this.node.insertChild(cc.instantiate(prefab), 0);
        if (onComplete) onComplete.call();
        TweenLite.to(this.loading, 0.5, {opacity:0, onComplete:function(){
                switch (name) {
                    case 'slotmachine20/luckyCafe/SlotLCScene':
                        this.loading.active = false;
                        break;
                    case 'slotmachine20/keoNgot/SlotKNScene':
                        this.loadingKN.active = false;
                        break;
                }
        }.bind(this)});
      }.bind(this));
    },


});
