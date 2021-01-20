var i18n = require('i18n');
var LocalStorage = require('LocalStorage');

var MainScene = cc.Class({
    extends: cc.Component,

    properties: {
        backWeb:cc.Node,
        buttonFullscreen:cc.Node
    },
    statics: {

    },

    // use this for initialization
    onLoad: function () {
      TweenLite.ticker.useRAF(false);
      TweenLite.lagSmoothing(0);

      if(window.webSocket) {
        window.webSocket.close();
        window.webSocket = undefined;
      }


      var AppFacade = require('./AppFacade');
      let lang = LocalStorage.getLanguage();
      i18n.init(lang);
      window.puremvc.Facade.removeCore("GAME-BAI");
      AppFacade.getInstance("GAME-BAI").startup();
      this.buttonFullscreen.active = false;
    },

    update: function() {
      // if(cc.sys.isBrowser && cc.sys.isMobile){
      //   if(cc.screen.fullScreen()) this.buttonFullscreen.active = false;
      //   else this.buttonFullscreen.active = true;
      // }
    },

    onHandlerFullScreen: function() {
      // if(cc.sys.isBrowser && cc.sys.isMobile){
      //   var el = document.getElementById('GameCanvas');
      //    cc.screen.autoFullScreen(el);
      // }
    }

});
