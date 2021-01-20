cc.Class({
    extends: cc.Component,

    properties: {
        content: cc.Node,
        tabBar: cc.Node,
        panelWidth:400,
        autoSetPanelWidth:true,
        tabSwitchDuration:0.5,
        events: [cc.Component.EventHandler]
    },

    // use this for initialization
    onLoad: function () {
        this.initTabbarButton();
        this.initPageTab();
        this.curPanelIdx = 0;
    },

    initTabbarButton: function () {
        if (!this.tabBar || this.tabBar.childrenCount === 0) {
            cc.warn("has not tab button!!!");
            return;
        }
        var index = 0;
        for (var i = 0; i < this.tabBar.children.length; i++) {
            var tabButton = this.tabBar.children[i];
            if(tabButton.active === false) continue;
            tabButton.index = index;
            tabButton.on(cc.Node.EventType.TOUCH_START, this.tabPressed.bind(this), this.node);
            index++;
        }
    },

    initPageTab:function () {
        if(!this.content || this.content.children.length === 0) return;
        var pageTab = this.content.children[0];
        this.panelWidth = (this.autoSetPanelWidth)?pageTab.width:this.panelWidth;
    },

    tabPressed:function (evt) {
        var tabButton = evt.currentTarget;
        this.switchPanel(tabButton.index);
    },

    switchPanel:function (index, duration) {
        duration = (duration === undefined) ? this.tabSwitchDuration : duration;
        this.curPanelIdx = index;
        var newX = this.curPanelIdx * -this.panelWidth;
        var callback = cc.callFunc(this.onSwitchPanelFinished, this);
        var rollerMove = cc.moveTo(duration, cc.p(newX, 0)).easing(cc.easeQuinticActionInOut());
        this.content.stopAllActions();
        cc.eventManager.pauseTarget(this.content);
        this.content.runAction(cc.sequence(rollerMove, callback));
        for (var i = 0; i < this.events.length; i++) {
            var eventHandler = this.events[i];
            eventHandler.emit(eventHandler.params);
        }
    },

    openTab:function (tabId) {
        for(var i=0;i< this.tabBar.children.length;i++){
            var tab = this.tabBar.children[i];
            if(tab.active === false) continue;
            if(tab.getComponent("CustomAction") && tab.getComponent("CustomAction").code === tabId){
                tab.getComponent(cc.Toggle).check();
                this.switchPanel(tab.index);
            }
        }
    },

    openTabIndex:function (tabIndex, duration) {
        tabIndex = (tabIndex >= 0 && tabIndex < this.tabBar.children.length)?tabIndex:this.curPanelIdx;
        var tab = this.tabBar.children[tabIndex];
        tab.getComponent(cc.Toggle).check();
        this.switchPanel(tabIndex, duration);
    },

    onSwitchPanelFinished:function () {
        cc.eventManager.resumeTarget(this.content);
    },

    getCurPageView:function () {
        return this.content.children[this.curPanelIdx];
    },

    disableTab: function(tabId) {
      for(var i=0;i< this.tabBar.children.length;i++){
          var tab = this.tabBar.children[i];
          if(tab.getComponent("CustomAction") && tab.getComponent("CustomAction").code === tabId){
            tab.active = false;
          }
      }
    },

    enableTab: function(tabId) {
      for(var i=0;i< this.tabBar.children.length;i++){
          var tab = this.tabBar.children[i];
          if(tab.getComponent("CustomAction") && tab.getComponent("CustomAction").code === tabId){
            tab.active = true;
          }
      }
    },

    setEnableContentTab: function(tab, enable) {

    }

});
