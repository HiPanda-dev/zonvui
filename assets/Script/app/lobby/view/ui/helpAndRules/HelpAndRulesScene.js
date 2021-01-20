var BasePopup = require('BasePopup');
var HelpAndRulesSceneMediator = require('HelpAndRulesSceneMediator');
var TabMain = require('TabMain');
var DropListMainTemplate = require('DropListMainTemplate');
var Constants = require('Constants');
var i18n = require('i18n');
cc.Class({
    extends: BasePopup,

    properties: {
      tabMain:TabMain,
      dropListGuide:DropListMainTemplate,
      pageGuide:cc.Node,
      pageRules:cc.Node
    },

    ctor: function() {
      HelpAndRulesSceneMediator.getInstance.init(this);
    },

    // use this for initialization
    onLoad: function () {
      var list = [
        {
          name:i18n.t('C0182'),
          value:1
        },
        {
          name:i18n.t('C0196'),
          value:2
        },
        {
          name:i18n.t('C0197'),
          value:3
        }
      ]

      this.dropListGuide.setupData(list);
      this.hide();
    },

    show:function (url) {
        BasePopup.prototype.show.call(this);
    },

    hideAllGuide: function(){
      this.pageGuide.getChildByName('taixiu').active = false;
      this.pageGuide.getChildByName('minipoker').active = false;
      this.pageGuide.getChildByName('slot3x3').active = false;
    },

    onHandlerChooseTypeGuide:function() {
      var selectItem = this.dropListGuide.getItemSelect();
      this.hideAllGuide();
      if(selectItem.value === 1) {
        this.pageGuide.getChildByName('taixiu').active = true;
      }else if(selectItem.value === 2){
        this.pageGuide.getChildByName('minipoker').active = true;
      }else if(selectItem.value === 3){
        this.pageGuide.getChildByName('slot3x3').active = true;
      }
    },

    handlerScrollViewEvent(evt) {
      //if(evt.content.y < -200) evt.scrollToTop(1);
      console.log(evt);
    },

    showGuide:function(typeGuide) {
      this.show();
      this.tabMain.openTabIndex(1);
      // this.hideAllGuide();
      switch (typeGuide) {
        case Constants.MINIGAME_TAI_XIU:
          this.dropListGuide.setSelectIndex(0);
          // this.pageGuide.getChildByName('taixiu').active = true;
          break;
        case Constants.MINIGAME_MINI_POKER:
          this.dropListGuide.setSelectIndex(1);
          // this.pageGuide.getChildByName('minipoker').active = true;
        break;
        case Constants.MINIGAME_SLOT3X3:
          this.dropListGuide.setSelectIndex(2);
          // this.pageGuide.getChildByName('slot3x3').active = true;
        break;
        default:

      }
    },

    showRules:function () {
      this.show();
      this.tabMain.openTabIndex(0);
    },

    callback:function () {

    }
});
